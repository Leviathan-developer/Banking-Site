import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const alldata = async (req, res) => {
  console.log("Received request for /alldata");
  try {
    const [rows] = await pool.query("SELECT * FROM bank;");
    res.json(rows);
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Query error' });
  }
};

const getDetail = async (req, res) => {
  console.log("Received request for user details");
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM bank WHERE id = ?;", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: "Something went wrong with the database query" });
  }
};

const login = async (req, res) => {
  console.log("Got request for login");
  const { email, password } = req.body;

  try {
    const [userRows] = await pool.query(
      "SELECT * FROM bank WHERE email = ?",
      [email]
    );

    if (userRows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = userRows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Server error" });
  }
};


const register = async (req, res) => {
  console.log("Got request for register");
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "All fields (email, name, password) are required" });
  }

  try {
    const [emails] = await pool.query("SELECT COUNT(*) AS emailCount FROM bank WHERE email = ?", [email]);

    if (emails[0].emailCount > 0) {
      return res.status(400).json({
        status: "error",
        message: "This email is already registered. Please use a different email address."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO bank (email, name, password, balance) VALUES (?, ?, ?, ?)",
      [email, name, hashedPassword, 100000]
    );

    res.status(201).json({
      status: "success",
      message: "Registration successful!",
      user: { email, name }
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Server error" });
  }
};

const transferFunds = async (req, res) => {
  const { senderid, senderpass, amount, receiverAccount } = req.body;
  try {
    const [senderRows] = await pool.query("SELECT * FROM bank WHERE id = ?", [senderid]);
    if (senderRows.length === 0) {
      return res.status(400).json({ error: "Invalid sender credentials" });
    }

    const sender = senderRows[0];
    const passwordMatch = await bcrypt.compare(senderpass, sender.password);
    
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid sender credentials" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const [receiverRows] = await pool.query("SELECT * FROM bank WHERE account_number = ?", [receiverAccount]);
    if (receiverRows.length === 0) {
      return res.status(400).json({ error: "Receiver not found" });
    }

    await pool.query('START TRANSACTION');

    await pool.query("UPDATE bank SET balance = balance - ? WHERE id = ?", [amount, senderid]);

    await pool.query("UPDATE bank SET balance = balance + ? WHERE account_number = ?", [amount, receiverAccount]);

    await pool.query("INSERT INTO transactions (sender_id, receiver_account, amount) VALUES (?, ?, ?)", [senderid, receiverAccount, amount]);

    await pool.query('COMMIT');

    console.log("Transfer successful");
    res.status(200).json({ message: "Transfer successful" });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error("Transfer failed:", err.message);
    res.status(500).json({ error: "Transfer failed: " + err.message });
  }
};

export default { alldata, getDetail, transferFunds, login, register };
