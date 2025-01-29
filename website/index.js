document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    
    if (!userInput) {
        alert("Please enter a message!");
        return;
    }

    // Send request to your backend API
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    
    const originHead = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="prompt.css">
    <title>prompt</title>`

    const originBody = `<div class="prompt">
        <input type="text" id="user-input" placeholder="Type your message...">
        <button id="send-btn">Send</button>
    </div>

    <div id="response-container"></div>

    <script type="module" src="index.js"></script>`

    // Display the response in the frontend
    console.log(data.choices[0].message.content)
    let body = ``
    let style = ``
    let scriptAI = ``
    let bodydone = false
    let styledone = false
    for (let i = 6; i < data.choices[0].message.content.length; i++) {
        if (data.choices[0].message.content.slice(i-6,i) == "<body>" && bodydone == false){
            let j = i
            while (data.choices[0].message.content.slice(j,j+7) != "</body>") {
                

                if (data.choices[0].message.content.slice(j,j+8) == "<script>"){
                    while (data.choices[0].message.content.slice(j-9,j) != "</script>") {
                        scriptAI += data.choices[0].message.content[j]
                        j++
                    }
                }
                body+= data.choices[0].message.content[j]
                j++
            }
            bodydone = true
        }

        if ( i-8 >= 0 && data.choices[0].message.content.slice(i-7,i) == "<style>" && styledone == false){
            let j = i
            while (data.choices[0].message.content.slice(j,j+8) != "</style>") {
                style += data.choices[0].message.content[j]
                j++
            }
            styledone = true
        }
        if (styledone == true && bodydone == true){
            break
        }
        
    }
    console.log(styledone)
    console.log(body)
    console.log(style)
    console.log(scriptAI)
    document.body.innerHTML = body + originBody +scriptAI
    let stylelement = document.createElement("style")
    stylelement.textContent = style
    document.head.appendChild(stylelement)
     
    //document.getElementById("response-container").innerHTML = `
    //     <p><strong>AI:</strong> ${data.choices[0].message.content}</p>
    //`;

    // Clear input field
    document.getElementById("user-input").value = "";
});