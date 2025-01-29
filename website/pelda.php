<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Change Color Button</title>
<style>
    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: blue;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>
</head>
<body>
<button id="colorButton">Click to Change Color</button>
<script>
    const button = document.getElementById('colorButton');
    button.addEventListener('click', function() {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        button.style.backgroundColor = randomColor;
    });
</script>
</body>
</html>