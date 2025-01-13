const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Middleware untuk validasi ID
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid user ID.' });
    }
    next();
};

// GET: Ambil semua pengguna
router.get('/', UserController.getUsers);

// GET: Ambil pengguna berdasarkan ID
router.get('/:id', validateId, UserController.getUser);  // Validasi ID sebelum meneruskan ke controller

// POST: Registrasi pengguna baru
router.post('/register', UserController.createUser);  // Rute registrasi

// POST: Login pengguna
router.post('/login', UserController.loginUser);  // Rute login

// PUT: Update pengguna berdasarkan ID
router.put('/:id', validateId, UserController.updateUser);  // Validasi ID sebelum meneruskan ke controller

// DELETE: Hapus pengguna berdasarkan ID
router.delete('/:id', validateId, UserController.deleteUser);  // Validasi ID sebelum meneruskan ke controller

module.exports = router;
