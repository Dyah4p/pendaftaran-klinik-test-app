const Polis = require('../models/polisModel'); // Import model Polis

class PolisController {
    // Get all polis
    static async getPolis(req, res) {
        try {
            const polis = await Polis.findAll();
            res.json({
                success: true,
                data: polis
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get single poli by ID
    static async getPolisById(req, res) {
        try {
            const poli = await Polis.findById(req.params.id);
            if (!poli) {
                return res.status(404).json({
                    success: false,
                    message: 'Poli not found'
                });
            }
            res.json({
                success: true,
                data: poli
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Create new poli
    static async createPoli(req, res) {
        try {
            const { nama, image, created_at } = req.body;

            // Validate input
            if (!nama || !image || !created_at) {
                return res.status(400).json({
                    success: false,
                    message: 'Nama, Gambar, dan Created At harus diisi'
                });
            }

            const poliId = await Polis.create({ nama, image, created_at });
            res.status(201).json({
                success: true,
                message: 'Poli berhasil ditambahkan',
                poliId
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update poli
    static async updatePoli(req, res) {
        try {
            const poliId = req.params.id;
            const { nama, image, created_at } = req.body;

            // Validate input
            if (!nama || !image || !created_at) {
                return res.status(400).json({
                    success: false,
                    message: 'Nama, Gambar, dan Created At harus diisi'
                });
            }

            const updated = await Polis.update(poliId, { nama, image, created_at });

            if (updated) {
                res.json({
                    success: true,
                    message: `Poli dengan ID ${poliId} berhasil diperbarui`
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Poli tidak ditemukan'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete poli
    static async deletePoli(req, res) {
        try {
            const poliId = req.params.id;
            const deleted = await Polis.delete(poliId);

            if (deleted) {
                res.json({
                    success: true,
                    message: `Poli dengan ID ${poliId} berhasil dihapus`
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Poli tidak ditemukan'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Select a poli
    static async selectPoli(req, res) {
        try {
            const { polisId } = req.body; // Get selected poli ID from request body

            // Validasi input
            if (!polisId) {
                return res.status(400).json({
                    success: false,
                    message: 'Polis ID is required'
                });
            }

            // Here, you can add logic for storing the selected poli, if needed.
            // For example, save it in a session, database, or perform further operations.

            res.json({
                success: true,
                message: `Polis with ID ${polisId} selected successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = PolisController;
