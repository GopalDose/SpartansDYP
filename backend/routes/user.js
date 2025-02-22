const express = require('express');
const router = express.Router();

// Import user controller (if using controllers)
const userController = require('../controllers/userController');

// Sample user routes

// Get all users
router.get('/', userController.getAllUsers);

// Get a specific user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

router.post('/login',userController.loginUser)

module.exports = router;
