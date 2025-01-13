const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

class UserController {
    // Ambil semua pengguna
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ status: 'success', data: users });
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ status: 'error', message: 'Failed to retrieve users.', error: error.message });
        }
    }

    // Ambil pengguna berdasarkan ID
    static async getUser(req, res) {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'User ID is required.' });
        }

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: 'error', message: 'User not found.' });
            }

            res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ status: 'error', message: 'Failed to retrieve user.', error: error.message });
        }
    }

    // Registrasi pengguna baru
    static async createUser(req, res) {
        const { username, password, role = 'user' } = req.body;  // Default role = 'user'

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Username and password are required.' });
        }

        try {
            // Pastikan hanya admin yang bisa membuat admin baru, jika diperlukan
            if (role !== 'user' && role !== 'admin') {
                return res.status(400).json({ status: 'error', message: 'Role must be either "user" or "admin".' });
            }

            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ status: 'error', message: 'Username already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword, role });

            res.status(201).json({ status: 'success', message: 'User created successfully.', data: user });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ status: 'error', message: 'Failed to create user.', error: error.message });
        }
    }

    // Update pengguna berdasarkan ID
    static async updateUser(req, res) {
        const userId = req.params.id;
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Username and password are required.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Pastikan hanya admin yang bisa mengubah role ke admin
            const updatedUser = await User.update(userId, { username, password: hashedPassword, role });

            if (!updatedUser) {
                return res.status(404).json({ status: 'error', message: 'User not found.' });
            }

            res.status(200).json({ status: 'success', message: 'User updated successfully.' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ status: 'error', message: 'Failed to update user.', error: error.message });
        }
    }

    // Hapus pengguna berdasarkan ID
    static async deleteUser(req, res) {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'User ID is required.' });
        }

        try {
            const deleted = await User.delete(userId);
            if (!deleted) {
                return res.status(404).json({ status: 'error', message: 'User not found.' });
            }

            res.status(200).json({ status: 'success', message: 'User deleted successfully.' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ status: 'error', message: 'Failed to delete user.', error: error.message });
        }
    }

    // Login pengguna
    static async loginUser(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Username and password are required.' });
        }

        try {
            const user = await User.findByUsername(username);
            if (!user) {
                return res.status(404).json({ status: 'error', message: 'User not found.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ status: 'error', message: 'Invalid password.' });
            }

            res.status(200).json({
                status: 'success',
                message: 'Login successful.',
                user: {
                    user_id: user.user_id,  // Gunakan user_id di sini
                    username: user.username,
                    role: user.role, // Kirimkan role pengguna (admin atau user)
                },
            });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ status: 'error', message: 'Login failed.', error: error.message });
        }
    }
}

module.exports = UserController;
