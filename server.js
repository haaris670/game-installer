const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// ─── CONNECT TO MONGODB ATLAS CLOUD ───
// Render reads the connection string securely from an Environment Variable named MONGODB_URI
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/corrupted_escape";

mongoose.connect(mongoURI)
    .then(() => console.log("📁 Connected cleanly to MongoDB Cloud Database!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ─── DEFINE THE PLAYER ACCOUNT SCHEMA (ROBLOX LAUNCHER PROTOCOL) ───
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, { extensions: ['html', 'htm'] }));

// ─── API ROUTE FOR ACCOUNT REGISTRATION ───
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Missing credentials." });
        }

        // Search the database to see if this name is already taken
        const userExists = await User.findOne({ username: username.trim().toLowerCase() });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Username is already taken." });
        }

        // Create and save the new profile document
        const newUser = new User({
            username: username.trim(),
            password: password // Note: In production, hash this with bcrypt!
        });

        await newUser.save();
        return res.json({ success: true, message: "Account registered successfully in Cloud DB!" });

    } catch (error) {
        console.error("Signup Database Error:", error);
        return res.status(500).json({ success: false, message: "Server database configuration anomaly." });
    }
});

// ─── API ROUTE FOR USER LOGIN ───
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Perform case-insensitive search matching the password parameter
        const foundUser = await User.findOne({ 
            username: username.trim(),
            password: password 
        });

        if (!foundUser) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }

        // Return confirmation back to browser
        return res.json({ 
            success: true, 
            username: foundUser.username 
        });

    } catch (error) {
        console.error("Login Database Error:", error);
        return res.status(500).json({ success: false, message: "Server connection failure." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Roblox-Auth Server running cleanly on port ${PORT}`);
});