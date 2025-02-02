<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>prompt</title>
    
</head>
<body>
<body>
    <div class="menu">
        <a href="./index.html">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </div>


        <object class="smallHTML" type="text/html" data="editer.html" width="100%" height="500px"></object>
        <textarea id="HTMLCode" class="HTMLCode"></textarea>


    <div id="prompt" class="prompt">
    <div id="bigtext" class="input-container">
        <textarea id="user-input" placeholder="Type your message..."></textarea>
    </div>
    <button id="send-btn" >Send</button>
    
</div>

<button id="up-down" class="toggle-btn">down-up</button>

<button id="showCode" class="showCode">Show code</button>

<button id="saveChanges" class="saveChanges">Save changes</button>






    <script type="module" src="index.js"></script>
    <script>

    document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("user-input");

    textarea.addEventListener("input", function () {
            this.style.height = `${this.scrollHeight}px`;
    });

    textarea.addEventListener("focus", function () {
         this.style.height = `${this.scrollHeight}px`;
    });

    textarea.addEventListener("blur", function () {
        textarea.style.height = "21px";
    });

    document.getElementById("send-btn").addEventListener("click", function () {
        textarea.value = "";
        textarea.style.height = "21px"; 
    });


    const prompt = document.getElementById("prompt")
    const updown = document.getElementById("up-down")
    let hidden =false
    updown.addEventListener("click", function (){
        
        console.log(hidden)
        if (hidden == false){
            hidden =true
            prompt.style.bottom = "-20%"
            document.body.style.overflow = "hidden"
        }
        else{
            hidden =false
            prompt.style.bottom = "5%"
            prompt.addEventListener("transitionend", function (elem) {
            document.body.style.overflow = "visible"
            })
        }
    })
    const HTMLCodeBtn =document.getElementById("showCode")
    const HTMLCode =document.getElementById("HTMLCode")
    let codeHidden =false
    HTMLCodeBtn.addEventListener("click", function(){
        if (codeHidden == false){
            HTMLCode.style.display = "flex"
            codeHidden =true
        }
        else{
            HTMLCode.style.display = "none"
            codeHidden =false
        }
    })
    const saveChangesBtn =document.getElementById("saveChanges")
    saveChangesBtn.addEventListener("click", function (){
        saveStageFunc()
    })

    async function saveStageFunc() {
        const url = "http://localhost/easywebsite/website/backend/api.php/saveStage";
        try {
            
            const bodyContent = {
                websiteID: localStorage.getItem("websiteID"),
                stage: parseInt(localStorage.getItem("stage"))+1,
                code: localStorage.getItem("sourceHTML")
            }
            const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyContent),
            });

            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            requestedData = await response.json();
            console.log(requestedData)
        }
        catch (error) {
            console.error(error.message);
        }
    }
});

    </script>
</body>
</html>