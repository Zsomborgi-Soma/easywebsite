<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kártya Kereső</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="menu">
        <div class="menu-left">
            <a href="#">Főoldal</a>
            <a href="#">Kártyák</a>
            <a href="./prompt.php">craft</a>
        </div>
        <div class="menu-right">
            <a href="#">Bejelentkezés</a>
            <a href="#">Regisztráció</a>
        </div>
    </div>
    <div class="container">
        <div class="search-bar">
            <input type="text" id="search" placeholder="Keresés a kártyák között...">
        </div>

        <div class="cards-container" id="cards-container">
            
        </div>
    </div>
    
    <script>
        localStorage.clear()
        getData()
        let options = []
        console.log(options)
        
        





        async function getData() {
        const url = "http://localhost/easywebsite/website/backend/api.php/websites";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({username: "xd"}),
            });

            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            
            requestedData = await response.json();
            counter = 0
            listing(requestedData)
            
        } catch (error) {
            console.error(error.message);
        }
        }
        
        function listing(json,counter) {
            let list = `<div class="cards-container" id="cards-container">`
            counter = 0
            json.forEach(element => {
                options.push(element.code)
                list +=`
                <div class="card" >
                <h3>${element.title}</h3>
                <p>${element.description}
                <a href="./prompt.php" id="${counter}">rework this website </a>
                </p>
                </div>`
                counter++
            });
            list += `</div>`
            document.getElementById("cards-container").innerHTML = list
        }
        
        const onClick = (event) => {
            let clicked = event.srcElement.id
            if (isInteger(clicked)){
                localStorage.setItem("sourceHTML", options[clicked])
            }
        }
        window.addEventListener('click', onClick);

        var regInteger = /^-?\d+$/;

        function isInteger( str ) {    
            return regInteger.test( str );
        }
        
    </script>
</body>
</html>
