<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Upload an item.</h1>
    <form action="/insert" method="GET">
        name: <input type="text" name="name" placeholder="name"><br>
        price: <input type="text" name="price" placeholder="price"><br>
        description: <input type="text" name="description" placeholder="description"><br>
        category: <input type="text" name="category" placeholder="category"><br>
        <input type="submit" value="submit">

    </form>
</body>
</html>