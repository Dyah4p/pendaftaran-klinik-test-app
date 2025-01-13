const Appointment = require('../models/appointmentModel');
const Polis = require('../models/polisModel');  // Menambahkan referensi model Polis

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
            const appointment = await Appointment.findById(req.params.appointment_id);
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

            // Validate input fields
            if (!user_id || !nama || !tanggal_lahir || !nomor_telepon || !email || !jadwal_id || !dokter_id || !polis_id || !status) {
                return res.status(400).json({ status: 'error', message: 'All fields are required' });
            }

            // Periksa apakah polis_id yang diberikan valid
            const polis = await Polis.findById(polis_id);
            if (!polis) {
                return res.status(400).json({ status: 'error', message: 'Invalid Polis ID' });
            }

            // Create new appointment in the database
            const appointment = await Appointment.create({
                user_id,
                nama,
                tanggal_lahir,
                nomor_telepon,
                email,
                jadwal_id,
                dokter_id,
                polis_id, // Ensure polis_id is properly saved
                status,
            });

            res.status(201).json({
                status: 'success',
                message: 'Appointment created successfully',
                data: appointment, // Return the full appointment object
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            res.status(500).json({ status: 'error', message: 'Failed to create appointment' });
        }
    }

    // Update appointment
    static async updateAppointment(req, res) {
        try {
            const { appointment_id } = req.params; // Ensure the parameter is consistent
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
            const { appointment_id } = req.params; // Consistent parameter
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
}

module.exports = AppointmentController;
