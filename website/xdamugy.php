<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

   
    
        <script type="module">
        const apiKey = "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";

        async function getHaiku() {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4",  // Or the model you're using
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: "Write a haiku about recursion in programming." }
                    ]
                })
            });

            const data = await response.json();
            console.log(data.choices[0].message.content);
        }

        getHaiku();


    </script>
</body>
</html>
    <?php
    /* 
     <script type="module">
        const API_KEY = "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";

        async function getCompletion(prompt) {
            const response = await fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    prompt: prompt,
                    max_tokens: 100,
                }),
            });

            const data = await response.json();
            console.log(data);
        }

        getCompletion("Say hello!");
    </script>
    
    */
    
    ?>
