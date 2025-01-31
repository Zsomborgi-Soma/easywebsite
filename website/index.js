// Ensure the page loads previously saved AI-generated HTML
if (localStorage.getItem("sourceHTML")) {
    window.onload = function () {
        settingAIHTML(getHTMLFromText(localStorage.getItem("sourceHTML")));
    };
}

// Define sendMessage globally
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

        loadOriginalHTML();

        const aiContent = data.choices[0].message.content;
        const textHTML = getHTMLFromText(aiContent);
        const inputArea = `
        <div class="prompt">
            <input type="text" id="user-input" placeholder="Type your message...">
            <button id="send-btn">Send</button>
        </div>`;

        localStorage.setItem("sourceHTML", textHTML);
        document.body.innerHTML = inputArea;
        settingAIHTML(textHTML);

        attachSendButtonListener();

        document.getElementById("user-input").value = "";
    } catch (error) {
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
    console.log(text.slice(0, start) + text.slice(end, text.length-1))
    return text.slice(0, start) + text.slice(end, text.length-1);

}

function loadOriginalHTML() {
    document.querySelectorAll('style').forEach(style => style.remove());
    document.body.innerHTML = "";
    document.querySelectorAll("script").forEach(script => script.remove());
}

function settingAIHTML(textHTML) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(textHTML, "text/html");

    const styleTag = doc.querySelector("style");
    if (styleTag) {
        const styleElement = document.createElement("style");
        styleElement.textContent = styleTag.innerHTML;
        document.head.appendChild(styleElement);
    }

    const bodyContent = doc.body.innerHTML;
    const responseContainer = document.getElementById("response-container");
    if (responseContainer) {
        responseContainer.innerHTML = bodyContent;
    } else {
        console.log(doc.body.innerHTML)
        document.body.innerHTML += removeScriptFromText(bodyContent);
    }
    let scriptcounter = 0
    doc.querySelectorAll("script").forEach((script) => {
        if (script.innerHTML.includes("browser.")) {
            console.warn("Skipped script using 'browser.' API, which is not supported.");
            return;
        }
        const newScript = document.createElement("script");
        newScript.textContent = script.innerHTML;
        document.body.appendChild(newScript);
    });


    attachSendButtonListener();
}

function attachSendButtonListener() {
    setTimeout(() => {
        const sendBtn = document.getElementById("send-btn");
        if (sendBtn) {
            sendBtn.addEventListener("click", sendMessage);
        } else {
            console.warn("Send button not found");
        }
    }, 100);
}

// Ensure initial event listener is attached
document.addEventListener("DOMContentLoaded", attachSendButtonListener);