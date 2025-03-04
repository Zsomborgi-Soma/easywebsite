<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello on my webshop</h1>
    <a href="/">select</a>
    <a href="/uploadPage">upload</a>
    <a href="/updatePage">update</a>
    <a href="/deletePage">delete</a>

    <table>
        <?php
        foreach ($items_list as $item) {
            echo "<ul>";
            foreach ($item as $key => $value) {
                echo "<li>$key: $value</li>";
            }
            echo "</ul>";
        }
        ?>
    </table>
</body>
</html>