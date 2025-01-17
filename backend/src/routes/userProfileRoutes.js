const express = require('express');
const router = express.Router();
const UserProfileController = require('../controllers/userProfileController');

// Routes untuk profil pengguna
router.get('/', UserProfileController.getUserProfiles);
router.get('/:user_id', UserProfileController.getUserProfile);
router.post('/', UserProfileController.createUserProfile);
router.put('/:user_id', UserProfileController.updateUserProfile); // Pastikan data terbaru dikembalikan
router.delete('/:user_id', UserProfileController.deleteUserProfile);

module.exports = router;
