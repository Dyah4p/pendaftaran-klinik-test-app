const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

// Appointment routes
// Ambil semua janji temu
router.get('/', AppointmentController.getAppointments);

// Ambil janji temu berdasarkan ID
router.get('/:appointment_id', AppointmentController.getAppointment);

// Buat janji temu baru
router.post('/', AppointmentController.createAppointment);

// Update janji temu berdasarkan ID
router.put('/:appointment_id', AppointmentController.updateAppointment);

// Hapus janji temu berdasarkan ID
router.delete('/:appointment_id', AppointmentController.deleteAppointment);

module.exports = router;

