const User = require("../models/user.js");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Userame and Passowrd are required" });
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exists", exists: true });
    }
    const newUser = new User({ username, password, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Error creating user , User is already registered",
      error,
    });
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const updateUserDetails = req.body;
    const { adharno, panno } = req.body;
    const adharres = user.findOne({ adhaarno: adharno });
    const panres = user.findOne({ panno: panno });
    if (adharres || panres)
      return res
        .status(400)
        .json({ message: "User with adhaar or panno already exits" });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.updateOne(updateUserDetails);
  } catch (error) {}
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User logged in successfully" }).status(200);
  } catch (error) {
    res.status(500).json({ message: "Error user is not registered ", error });
  }
};
