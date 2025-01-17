const UserProfile = require('../models/userProfileModel');

class UserProfileController {
    static async getUserProfiles(req, res) {
        try {
            const userProfiles = await UserProfile.findAll();
            res.json({ status: 'success', data: userProfiles });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async getUserProfile(req, res) {
        try {
            const userProfile = await UserProfile.findByUserId(req.params.user_id);
            if (!userProfile) {
                return res.status(404).json({ status: 'error', message: 'User profile not found' });
            }
            res.json({ status: 'success', data: userProfile });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async createUserProfile(req, res) {
        try {
            const { user_id, nama, tanggal_lahir, nomor_telepon, email, alamat, created_at } = req.body;
            if (!user_id || !nama || !tanggal_lahir || !created_at) {
                return res.status(400).json({ status: 'error', message: 'Please provide user_id, nama, tanggal_lahir, and created_at' });
            }

            const userProfileId = await UserProfile.create({ user_id, nama, tanggal_lahir, nomor_telepon, email, alamat, created_at });
            res.status(201).json({ status: 'success', message: 'User profile created successfully', data: { id: userProfileId } });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async updateUserProfile(req, res) {
        try {
            const { nama, tanggal_lahir, nomor_telepon, email, alamat } = req.body;

            // Perbarui data di database
            const updatedUserProfile = await UserProfile.update(req.params.user_id, {
                nama,
                tanggal_lahir,
                nomor_telepon,
                email,
                alamat,
            });

            if (!updatedUserProfile) {
                return res.status(404).json({ status: 'error', message: 'User profile not found' });
            }

            res.json({
                status: 'success',
                message: 'User profile updated successfully',
                data: updatedUserProfile, // Data terbaru dikembalikan
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    static async deleteUserProfile(req, res) {
        try {
            const deleted = await UserProfile.delete(req.params.user_id);
            if (!deleted) {
                return res.status(404).json({ status: 'error', message: 'User profile not found' });
            }
            res.json({ status: 'success', message: 'User profile deleted successfully' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = UserProfileController;
