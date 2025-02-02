import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: message }]
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/update-html", (req, res) => {
    const newHTML = req.body.content || "<html><body><h1>Updated Content</h1></body></html>";

    fs.writeFile("editer.html", newHTML, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            res.status(500).send("Error writing file");
        } else {
            res.send("File updated successfully");
        }
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
