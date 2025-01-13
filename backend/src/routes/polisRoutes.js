const express = require('express');
const router = express.Router();
const PolisController = require('../controllers/polisController');

router.get('/', PolisController.getPolis);
router.get('/:polis_id', PolisController.getPolisById);
router.post('/add', PolisController.createPoli);  // Create poli
router.put('/update/:polis_id', PolisController.updatePoli);  // Update poli
router.delete('/delete/:polis_id', PolisController.deletePoli);  // Delete poli

module.exports = router;
