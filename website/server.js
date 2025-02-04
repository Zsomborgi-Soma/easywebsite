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
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());



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




// **User Registration**
// **User Registration (with Email)**
app.post("/register", async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;
        const validate = validateRegistration(email,username,password,confirmPassword)
        if (validate){
            return res.status(400).json({ message: validate});
        }
        // Check if email or username already exists
        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [email, username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email or Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await db.query(
            "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
            [email, username, hashedPassword]
        );

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function validateRegistration(email, username, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password != confirmPassword){ return "The passwords are not the same"}
    if (!emailRegex.test(email)) return "Invalid email format";
    if (!usernameRegex.test(username)) return "Username must be at least 3 characters";
    if (!passwordRegex.test(password)) return "Password must be at least 8 characters with 1 uppercase and 1 number";

    return null; // Valid data
}


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
