const express = require('express');
const router = express.Router();

// Import user controller (if using controllers)
const userCropController = require('../controllers/userCropController');

// Sample user routes

// Get all users
router.get('/', userCropController.getAllUserCrops);

// Get a specific user by ID
router.get('/:id', userCropController.getCropByUserId);

// Create a new user
router.post('/', userCropController.createUserCrop);

// Update a user by ID
// router.put('/:id', userController.createUserCrop);

router.put('/deactivate' , userCropController.deactivateUserCrop)
// // Delete a user by ID
router.delete('/:id', userCropController.deleteUserCrop);

module.exports = router;
