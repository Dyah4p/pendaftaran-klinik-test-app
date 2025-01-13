const express = require('express');
const router = express.Router();
const JadwalController = require('../controllers/jadwalController');

// Rute untuk mendapatkan semua jadwal
router.get('/', JadwalController.getJadwals);

// Rute untuk mendapatkan jadwal berdasarkan ID dokter
router.get('/:dokter_id', JadwalController.getJadwalsByDokter);

// Rute untuk memilih jadwal tertentu
router.post('/', JadwalController.selectJadwal); // Perubahan di sini hanya menambahkan "/select" untuk memilih jadwal

module.exports = router;
