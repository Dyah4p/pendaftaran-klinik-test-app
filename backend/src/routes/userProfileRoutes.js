const express = require('express');
const router = express.Router();
const UserProfileController = require('../controllers/userProfileController');

// Routes untuk profil pengguna
router.get('/', UserProfileController.getUserProfiles);
router.get('/:user_id', UserProfileController.getUserProfile); // Gunakan user_id sebagai parameter
router.post('/', UserProfileController.createUserProfile);
router.put('/:user_id', UserProfileController.updateUserProfile); // Gunakan user_id sebagai parameter
router.delete('/:user_id', UserProfileController.deleteUserProfile); // Gunakan user_id sebagai parameter

module.exports = router;
