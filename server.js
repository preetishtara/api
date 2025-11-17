const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 7777;

const app = express();

// Middleware - IMPORTANT: Add these before your routes
app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://tarapreetish:abcd1234@cluster0.qynqj8e.mongodb.net/jay_db?appName=Cluster0";

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













// const express = require("express");
// const mongoose = require("mongoose");
// const path = require('path')
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const PORT = 7777

// const app = express();

// const mongoURI = "mongodb+srv://tarapreetish:abcd1234@cluster0.qynqj8e.mongodb.net/jay_db?appName=Cluster0";

// mongoose.connect(mongoURI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

//   // Define Mongoose Schema and Model
// const contactSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   phone: String,
// }, { timestamps: true });

// const Contact = mongoose.model("Contact", contactSchema);

// // POST endpoint to create new contact
// app.post("/api/contacts", async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone } = req.body;
//     const newContact = new Contact({ firstName, lastName, email, phone });
//     const savedContact = await newContact.save();
//     res.status(201).json(savedContact);
//   } catch (error) {
//     console.error("Error saving contact:", error);
//     res.status(500).json({ error: "Failed to save contact" });
//   }
// });



// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));