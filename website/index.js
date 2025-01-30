document.getElementById("send-btn").addEventListener("click", async function sendMessage() {
    const userInput = document.getElementById("user-input").value;

    if (!userInput) {
        alert("Please enter a message!");
        return;
    }

    try {
        // Send request to your backend API
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error("Invalid response format from server");
        }

        const aiContent = data.choices[0].message.content;

        // Use DOMParser to safely extract AI-generated content
        const parser = new DOMParser();
        const doc = parser.parseFromString(aiContent, "text/html");

        // Extract and apply styles
        const styleTag = doc.querySelector("style");
        if (styleTag) {
            const styleElement = document.createElement("style");
            styleElement.textContent = styleTag.innerHTML;
            document.head.appendChild(styleElement);
        }

        // Extract AI-generated body content
        const bodyContent = doc.body.innerHTML;

        // Preserve the original input and send button
        const inputArea = `
            <div class="prompt">
                <input type="text" id="user-input" placeholder="Type your message...">
                <button id="send-btn">Send</button>
            </div>
            <div id="response-container"></div>
        `;

        // **Reset page to original structure before injecting new content**
        document.body.innerHTML = inputArea; // Reset before injecting new response
        document.getElementById("response-container").innerHTML = bodyContent;

        // Extract and execute scripts properly
        const scripts = doc.querySelectorAll("script");
        scripts.forEach((script) => {
            if (script.innerHTML.includes("browser.")) {
                console.warn("Skipped script using 'browser.' API, which is not supported.");
                return; // Skip invalid scripts
            }
            const newScript = document.createElement("script");
            newScript.textContent = script.innerHTML;
            document.body.appendChild(newScript);
        });

        // Reattach event listener for the send button
        document.getElementById("send-btn").addEventListener("click", sendMessage);

        // Clear input field
        document.getElementById("user-input").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong! Check the console for details.");
    }
});
