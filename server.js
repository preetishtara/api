const express = require("express");
const mongoose = require("mongoose");
// require('dotenv').config();
const path = require('path');
const bodyParser = require("body-parser");

const PORT = 7777;

const app = express();


const cors = require('cors');

// Middleware - IMPORTANT: Add these before your routes
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://deft-jelly-27c5b3.netlify.app"
  ],
  credentials: true
}));


// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://deft-jelly-27c5b3.netlify.app"
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     // allow requests with no origin like curl/postman
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = "The CORS policy for this site does not allow access from the specified Origin.";
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

// app.options('*', cors());

app.use(bodyParser.json());

mongoURI = "mongodb+srv://tarapreetish:abcd1234@cluster0.qynqj8e.mongodb.net/jay_db?appName=Cluster0";

// const mongoURI = process.env.MONGODB_URI;


mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose Schema and Model
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// Root route
app.get("/", (req, res) => {
  res.send("hello world");
});

// POST endpoint to create new contact
app.post("/api/contacts", async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const newContact = new Contact({ firstName, lastName, email, phone });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

app.get("/api/info", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to get contacts" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



