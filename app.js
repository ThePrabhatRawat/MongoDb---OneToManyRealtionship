const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/database");
const User = require("./models/User");
const Address = require("./models/Address");

const app = express();

// middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// for registering
app.post("/register", async (req, res) => {
  // extracting user details and address from the request body
  const { name, street, city, state, zipCode } = req.body;

  try {
    const user = await User.create({ name });

    const address = await Address.create({
      street,
      city,
      state,
      zipCode,
      userId: user._id,// reference the _id of the created user
    });
    // operations succeed
    res.status(201).json({ message: "addedd successfully", user, address });
  } catch (error) {

     // error handling
    console.error("error while saving user and address:", error);
    res.status(500).json({ message: "error occurred", error });
  }
});

// for additional address
app.post("/add-address", async (req, res) => {
  const { userId, street, city, state, zipCode } = req.body;

  try {
    // find the user
    const user = await User.findById(userId);
    if (!user) {
        // user not found
      return res.status(404).json({ message: "user not found" });
    }

    const address = await Address.create({
      street,
      city,
      state,
      zipCode,
      userId: user._id,
    });
    // address added successfully
    res.status(201).json({ message: "Address added successfully", address });
  } catch (error) {
    // error occured while saving
    console.error("Error while adding address:", error);
    res.status(500).json({ message: "Error occurred", error });
  }
});

app.listen(3000, () => {
  console.log(`listening on ${3000}`);
});
