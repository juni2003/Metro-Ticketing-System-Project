require("dotenv").config();
const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//user collection / table
const userTB = async (req, res) => {
  const username = "test user";
  const password = "test password";
  const email = "test email";
  const gender = "test";
  const ticket_history = [];

  try {
    const testUser = await User.create({
      username,
      password,
      email,
      gender,
      ticket_history,
    });

    if (!testUser) {
      throw new Error("Error creating test user");
    }

    res.status(200).json({
      success: true,
      testUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// creating a single test data
const createUser = async (req, res) => {
  const { username, email, password, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
//To update a single test data
const updateData = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const user = await User.findByIdAndUpdate(id, {
      ...req.body,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
//To delete a single test data
const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await testModel.findOneAndDelete({ _id: id });

    if (!test) {
      throw new Error("Error deleting test data");
    }

    res.status(202).json({
      success: true,
      message: "Test data deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// To get all test data
const getAllData = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      throw new Error("Error fetching retest data");
    }

    res.status(200).json({
      success: true,
      retest: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// To get a single specific test data
const getSingleData = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const user = await User.findById(id);

    if (!user) {
      throw new Error("Error fetching data");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//Get ticket history

const getTicketHistory = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      throw new Error("Invalid username");
    }

    const user = await User.findOne({ username }).populate("ticket_history");

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      ticket_history: user.ticket_history,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};



const searchByAnyString = async (req, res) => {
  const { query } = req.params;

  try {
    if (!query) {
      throw new Error("Search query is required");
    }

    const regex = new RegExp(query, "i");

    const users = await User.find({
      $or: [
        { username: { $regex: regex } },
        { email: { $regex: regex } },
        { gender: { $regex: regex } },
      ],
    });

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const username = user.username;
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token, username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const checkDuplicate = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserIDByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      user_id: user._id,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePasswrod = async (req, res) => {
  const { username } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateEmail = async (req, res) => {
  const { username } = req.params;
  const { email } = req.body;

  try {
    if (!username || !email) {
      throw new Error('Username and new email are required');
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    user.email = email;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createData: createUser,
  checkDuplicate,
  deleteData,
  getAllData,
  getSingleData,
  getUserIDByUsername,
  getTicketHistory,
  loginUser,
  searchByAnyString,
  userTB,
  updateData,
  updateEmail,
  updatePasswrod,
};
