const Doctor = require('../models/doctorsModel');

class DoctorController {
    // Get all doctors
    static async getDoctors(req, res) {
        try {
            const doctors = await Doctor.findAll();
            res.json({
                success: true,
                data: doctors,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Get doctors by polis_id
    static async getDoctorsByPolis(req, res) {
        try {
            const doctors = await Doctor.findByPolisId(req.params.polis_id);
            if (doctors.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No doctors found for this poli',
                });
            }
            res.json({
                success: true,
                data: doctors,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Select a doctor (for appointment or further action)
    static async selectDoctor(req, res) {
        try {
            const { dokterId } = req.body;

            if (!dokterId) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide dokterId',
                });
            }

            res.json({
                success: true,
                message: 'Doctor selected successfully',
                data: { dokterId },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Create new doctor
    static async createDoctor(req, res) {
        try {
            const { polis_id, nama, image, created_at } = req.body;

            if (!polis_id || !nama || !image || !created_at) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields: polis_id, nama, image, and created_at',
                });
            }

            const doctorId = await Doctor.create({ polis_id, nama, image, created_at });
            res.status(201).json({
                success: true,
                message: 'Doctor created successfully',
                data: { id: doctorId },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Update doctor information
    static async updateDoctor(req, res) {
        try {
            const { id } = req.params;
            const { polis_id, nama, image, created_at } = req.body;

            if (!polis_id || !nama || !image || !created_at) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields: polis_id, nama, image, and created_at',
                });
            }

            const result = await Doctor.update(id, { polis_id, nama, image, created_at });
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Doctor not found',
                });
            }

            res.json({
                success: true,
                message: 'Doctor updated successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Delete doctor
    static async deleteDoctor(req, res) {
        try {
            const { id } = req.params;
            const result = await Doctor.delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Doctor not found',
                });
            }

            res.json({
                success: true,
                message: 'Doctor deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = DoctorController;
