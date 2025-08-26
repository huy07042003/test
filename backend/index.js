const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/userModel");

const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());

//Connect to db
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.wx5rnmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

//db
mongoose.connect(url).then(() => {
  console.log("Connected to db succesfully");
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});

// Routes
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, age, des } = req.body;
    if (!name || !age || !des) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User({ name, age, des });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
