const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('Menginisialisasi aplikasi...');

// Import Routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorsRoutes = require('./routes/doctorsRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');
const polisRoutes = require('./routes/polisRoutes');
const userRoutes = require('./routes/userRoutes');  // Rute pengguna
const UserProfileRoutes = require('./routes/userProfileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

console.log('Menambahkan middleware...');

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/jadwals', jadwalRoutes);
app.use('/api/polis', polisRoutes);
app.use('/api/users', userRoutes);  // Rute pengguna untuk login dan register
app.use('/api/user_profiles',UserProfileRoutes);

console.log('Menambahkan rute...');

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ status: 'error', message: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
