const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorsController');

// Route to get all doctors
router.get('/', DoctorController.getDoctors);

// Route to get doctors by polis_id
router.get('/:polis_id', DoctorController.getDoctorsByPolis);

// Route to select a doctor
router.post('/', DoctorController.selectDoctor);

// Route to create a new doctor
router.post('/create', DoctorController.createDoctor);

// Route to update a doctor
router.put('/:id', DoctorController.updateDoctor);

// Route to delete a doctor
router.delete('/:id', DoctorController.deleteDoctor);

module.exports = router;
