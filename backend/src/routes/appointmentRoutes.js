const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

// Get all appointments
router.get('/', AppointmentController.getAppointments);

// Get appointment by ID
router.get('/:appointment_id', AppointmentController.getAppointment);

// Create new appointment
router.post('/', AppointmentController.createAppointment);

// Get appointments by user_id (history)
router.post('/history', AppointmentController.getAppointmentsByUser);

// Update appointment by ID
router.put('/:appointment_id', AppointmentController.updateAppointment);

// Delete appointment by ID
router.delete('/:appointment_id', AppointmentController.deleteAppointment);

module.exports = router;
