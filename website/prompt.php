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
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </div>

    <div class="container">
        <object class="smallHTML" type="text/html" data="editer.html" width="100%" height="500px"></object>
    </div>

    <div class="prompt">
    <div id="bigtext" class="input-container">
        <textarea id="user-input" placeholder="Type your message..."></textarea>
    </div>
    <button id="send-btn">Send</button>
</div>

    <script type="module" src="index.js"></script>
    <script>
        let rows = 0
        let focus = false
        document.getElementById("user-input").addEventListener("input", function() {
            console.log(focus)
            if (focus == true){
                const elem = document.getElementById("bigtext")
                rows = getTextareaRows(textarea)
                let calc = 16*rows
                elem.style.height = calc +"px"
                document.getElementById("user-input").style.height = calc +"px"

            }
            else {
                const elem = document.getElementById("bigtext")
                elem.style.height = 18 + "px"
                this.style.height = 18+"px"
            }
           
        })
        
        document.getElementById("user-input").addEventListener("focus", function() {
            focus =true
            
            
        });
        document.getElementById("user-input").addEventListener("blur", function() {
            focus =false
            
            
        });

        function getTextareaRows(textarea) {
        const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight);
        return Math.round(textarea.scrollHeight / lineHeight);
        }
        
    </script>
</body>
</html>