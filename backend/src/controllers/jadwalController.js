const Jadwal = require('../models/jadwalModel');

class JadwalController {
    // Mendapatkan semua jadwal
    static async getJadwals(req, res) {
        try {
            const jadwals = await Jadwal.findAll(); // Ambil semua jadwal
            if (jadwals.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No jadwals available'
                });
            }
            res.json({
                status: 'success',
                data: jadwals
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Mendapatkan jadwal berdasarkan dokter_id
    static async getJadwalsByDokter(req, res) {
        try {
            const dokterId = req.params.dokter_id;
            const jadwals = await Jadwal.findByDokterId(dokterId);
            if (jadwals.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No jadwals found for this doctor'
                });
            }
            res.json({
                status: 'success',
                data: jadwals
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Menangani pemilihan jadwal (hanya memilih jadwal)
    static async selectJadwal(req, res) {
        try {
            const { jadwal_id, user_id } = req.body; // Menerima jadwal_id dan user_id dari permintaan

            // Validasi input
            if (!jadwal_id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide both jadwal_id and user_id'
                });
            }

            // Proses pemilihan jadwal
            const jadwal = await Jadwal.selectJadwal(jadwal_id, user_id);
            if (!jadwal) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Jadwal not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Jadwal selected successfully',
                data: jadwal
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = JadwalController;
