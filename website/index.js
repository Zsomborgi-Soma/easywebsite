// Define sendMessage globally
if (localStorage.getItem("sourceHTML")){
    window.onload = () =>{

        edit(localStorage.getItem("sourceHTML"))
    }
}
else{
    window.onload = () =>{
        localStorage.setItem("sourceHTML","<html><body><h1>This is the basic webpage</h1></body></html>")
        edit("<html><body><h1>This is the basic webpage</h1></body></html>")
    }
}


async function sendMessage() {
    const userInput = document.getElementById("user-input").value;

    if (!userInput) {
        alert("Please enter a message!");
        return;
    }
    let sourceHTML = localStorage.getItem("sourceHTML") || "";
    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "source code is:" + sourceHTML + "\n the changes to make: " + userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error("Invalid response format from server");
        }


        const aiContent = data.choices[0].message.content;
        console.log(data.choices[0].message.content);
        const textHTML = getHTMLFromText(aiContent);
        localStorage.setItem("sourceHTML", textHTML)
        try {
            fetch("http://localhost:5000/update-html", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: textHTML })
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));
        }catch (error){
            console.error("Error:", error);
            alert("Something went wrong! Check the console for details.");
        }
        

        //localStorage.setItem("sourceHTML", textHTML);
        document.getElementById("user-input").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong! Check the console for details.");
    }
}

function edit(textHTML){
    try {
        fetch("http://localhost:5000/update-html", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: textHTML })
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    }catch (error){
        console.error("Error:", error);
        alert("Something went wrong! Check the console for details.");
    }
}




function getHTMLFromText(text) {
    let start = text.indexOf("<html");
    let end = text.indexOf("</html>") + 7;
    if (start === -1 || end === -1) return "";
    return text.slice(start, end);
}

function removeScriptFromText(text) {
    let start = text.indexOf("<script");
    let end = text.indexOf("</script>") + 9;
    if (start === -1 || end === -1) return "";
    return text.slice(0, start) + text.slice(end, text.length-1);

}

document.getElementById("send-btn").addEventListener("click", sendMessage)