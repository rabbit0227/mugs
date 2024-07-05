const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://rabbit:27ofFeb99@rabbit.qzzjrfv.mongodb.net/?retryWrites=true&w=majority&appName=rabbit"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Node API app is running on port 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes for mug products
app.get("/api/mugs", async (req, res) => {
  try {
    const mugs = await Product.find({ category: "mug" });
    res.status(200).json(mugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/mugs/:id", async (req, res) => {
  try {
    const mug = await Product.findById(req.params.id);
    if (!mug) throw Error("Mug not found");
    res.status(200).json(mug);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/api/mugs", async (req, res) => {
  try {
    const mug = await Product.create(req.body);
    res.status(201).json(mug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/mugs/:id", async (req, res) => {
  try {
    const mug = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!mug) throw Error("Mug not found");
    res.status(200).json(mug);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.delete("/api/mugs/:id", async (req, res) => {
  try {
    const mug = await Product.findByIdAndDelete(req.params.id);
    if (!mug) throw Error("Mug not found");
    res.status(200).json({ message: "Mug deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
