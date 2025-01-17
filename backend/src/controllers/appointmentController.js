const Appointment = require('../models/appointmentModel');
const Polis = require('../models/polisModel');

class AppointmentController {
    // Get all appointments
    static async getAppointments(req, res) {
        try {
            const appointments = await Appointment.findAll();
            res.status(200).json({ status: 'success', data: appointments });
        } catch (error) {
            console.error('Error fetching appointments:', error);
            res.status(500).json({ status: 'error', message: 'Failed to fetch appointments' });
        }
    }

    // Get appointment by ID
    static async getAppointment(req, res) {
        try {
            const { appointment_id } = req.params;
            const appointment = await Appointment.findById(appointment_id);

            if (!appointment) {
                return res.status(404).json({ status: 'error', message: 'Appointment not found' });
            }

            res.status(200).json({ status: 'success', data: appointment });
        } catch (error) {
            console.error('Error fetching appointment:', error);
            res.status(500).json({ status: 'error', message: 'Failed to fetch appointment' });
        }
    }

    // Create new appointment
    static async createAppointment(req, res) {
        try {
            const { user_id, nama, tanggal_lahir, nomor_telepon, email, jadwal_id, dokter_id, polis_id, status } = req.body;

            if (!user_id || !nama || !tanggal_lahir || !nomor_telepon || !email || !jadwal_id || !dokter_id || !polis_id) {
                return res.status(400).json({ status: 'error', message: 'All fields are required' });
            }

            const polis = await Polis.findById(polis_id);
            if (!polis) {
                return res.status(400).json({ status: 'error', message: 'Invalid Polis ID' });
            }

            const appointmentId = await Appointment.create({
                user_id,
                nama,
                tanggal_lahir,
                nomor_telepon,
                email,
                jadwal_id,
                dokter_id,
                polis_id,
                status: status || 'pending', // Default status
            });

            res.status(201).json({
                status: 'success',
                message: 'Appointment created successfully',
                data: { id: appointmentId },
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            res.status(500).json({ status: 'error', message: 'Failed to create appointment' });
        }
    }

    // Update appointment
    static async updateAppointment(req, res) {
        try {
            const { appointment_id } = req.params;
            const updated = await Appointment.update(appointment_id, req.body);

            if (!updated) {
                return res.status(404).json({ status: 'error', message: 'Appointment not found' });
            }

            res.status(200).json({ status: 'success', message: 'Appointment updated successfully' });
        } catch (error) {
            console.error('Error updating appointment:', error);
            res.status(500).json({ status: 'error', message: 'Failed to update appointment' });
        }
    }

    // Delete appointment
    static async deleteAppointment(req, res) {
        try {
            const { appointment_id } = req.params;
            const deleted = await Appointment.delete(appointment_id);

            if (!deleted) {
                return res.status(404).json({ status: 'error', message: 'Appointment not found' });
            }

            res.status(200).json({ status: 'success', message: 'Appointment deleted successfully' });
        } catch (error) {
            console.error('Error deleting appointment:', error);
            res.status(500).json({ status: 'error', message: 'Failed to delete appointment' });
        }
    }

    // Get appointments by user_id (POST method)
    static async getAppointmentsByUser(req, res) {
        try {
            const { user_id } = req.body;  // Mengambil user_id dari body request

            if (!user_id) {
                return res.status(400).json({ status: 'error', message: 'User ID is required' });
            }

            const appointments = await Appointment.findAll(user_id);  // Mencari semua janji temu berdasarkan user_id
            res.status(200).json({ status: 'success', data: appointments });
        } catch (error) {
            console.error('Error fetching appointments by user:', error);
            res.status(500).json({ status: 'error', message: 'Failed to fetch appointments' });
        }
    }
}

module.exports = AppointmentController;
