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
            <div class="card">
                <h3>Kártya 1</h3>
                <p>Ez az első kártya leírása.</p>
            </div>
            <div class="card">
                <h3>Kártya 2</h3>
                <p>Ez a második kártya leírása.</p>
            </div>
            <div class="card">
                <h3>Kártya 3</h3>
                <p>Ez a harmadik kártya leírása.</p>
            </div>
            <div class="card">
                <h3>Kártya 4</h3>
                <p>Ez a negyedik kártya leírása.</p>
            </div>
            <div class="card">
                <h3>Kártya 5</h3>
                <p>Ez az ötödik kártya leírása.</p>
            </div>
            <div class="card">
                <h3>Kártya 6</h3>
                <p>Ez a hatodik kártya leírása.</p>
            </div>
        </div>
    </div>
    <script>
        localStorage.clear()
    </script>
</body>
</html>
