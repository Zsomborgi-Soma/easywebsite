import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


        

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


const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// **User Registration**
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) return res.status(400).json({ message: "Username already exists" });

        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **User Login**
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

        if (users.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, users[0].password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userID: users[0].ID }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ token, userID: users[0].ID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **Insert a New Website**
app.post("/add-website", async (req, res) => {
    try {
        const { userID, title, theme, description } = req.body;
        await db.query("INSERT INTO websites (userID, title, theme, description) VALUES (?, ?, ?, ?)", 
            [userID, title, theme, description]);
        res.json({ message: "Website added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **Insert a New Page (Stage)**
app.post("/add-page", async (req, res) => {
    try {
        const { websiteID, stage, code } = req.body;
        await db.query("INSERT INTO stages (websiteID, stage, code) VALUES (?, ?, ?)", 
            [websiteID, stage, code]);
        res.json({ message: "Page added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **Select Pages (Get all pages of a website with the highest stage value)**
app.get("/get-pages/:websiteID", async (req, res) => {
    try {
        const { websiteID } = req.params;
        const [pages] = await db.query(`
            SELECT * FROM stages 
            WHERE websiteID = ? 
            AND stage = (SELECT MAX(stage) FROM stages WHERE websiteID = ?)`, 
            [websiteID, websiteID]);
        res.json(pages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
