const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.use(express.json());

const pool = mysql.createPool({
    host: "localhost",
    user: "test_user",
    password: "password",
    database: "users"
})

function connectDB() {
    connection.connect((err) => {
        if (err) {
            console.log(err);
        }
        console.log("Connected " + connection.threadId);
        return connection;
    })
}


async function checkLoginDetails(email, password) {
    try {
        const [rows] = await pool.promise().query(`SELECT * FROM users_table WHERE email = ? LIMIT 1`, [email]);

        if (rows.length === 0) return { found: false };

        const user = rows[0];

        // Simple password comparison (not secure for production)
        const isMatch = user.password === password;
        return isMatch ? { found: true, data: user } : { found: false };
    } catch (err) {
        console.error("Database error:", err);
        return { found: false };
    }
}

// Use POST instead of GET
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ response: "Email and password required" });
    }

    try {
        const { found, data } = await checkLoginDetails(email, password);

        if (!found) {
            return res.status(401).json({ response: "Invalid email or password" });
        }

        console.log("User found:", data);
        res.status(200).json({ user: data });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ response: "Server error" });
    }
});

async function registerUser(email, password, name) {
    try {
        const [result] = await pool.promise().query(
            `INSERT INTO users_table (email, password, name) VALUES (?, ?, ?)`,
            [email, password, name]
        );
        return result;
    } catch (err) {
        console.error("Error inserting user:", err);
        return null;
    }
}

// Register route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!email || !password || !username) {
        return res.status(400).json({ response: "Email, password, and name are required" });
    }

    try {
        // Check if the email is already taken
        const [existingUser] = await pool.promise().query(
            `SELECT * FROM users_table WHERE email = ? LIMIT 1`,
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ response: "Email is already taken" });
        }

        // Insert new user into the database
        const result = await registerUser(email, password, username);

        if (result) {
            return res.status(201).json({ response: "User registered successfully", user: result });
        } else {
            return res.status(500).json({ response: "Error registering user" });
        }
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ response: "Server error" });
    }
});
module.exports = router;