const db = require('../config/database');
const Polis = require('../models/polisModel');  // Menambahkan referensi model Polis

class Appointment {
    // Get all appointments
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM appointments');
            return rows;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw new Error('Failed to fetch appointments');
        }
    }

    // Get appointment by ID
    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error fetching appointment by ID:', error);
            throw new Error('Failed to fetch appointment');
        }
    }

    // Create new appointment
    static async create(data) {
        try {
            // Validasi data input
            if (!data.user_id || !data.nama || !data.tanggal_lahir || !data.nomor_telepon || !data.email || !data.jadwal_id || !data.dokter_id || !data.polis_id || !data.status) {
                throw new Error('All fields are required');
            }

            // Periksa apakah polis_id yang diberikan valid
            const polis = await Polis.findById(data.polis_id);
            if (!polis) {
                throw new Error('Invalid Polis ID');
            }

            const [result] = await db.query(
                `INSERT INTO appointments 
                (user_id, nama, tanggal_lahir, nomor_telepon, email, created_at, jadwal_id, dokter_id, polis_id, status) 
                VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)`,
                [
                    data.user_id,
                    data.nama,
                    data.tanggal_lahir,
                    data.nomor_telepon,
                    data.email,
                    data.jadwal_id,
                    data.dokter_id,
                    data.polis_id,
                    data.status,
                ]
            );

            return result.insertId; // Return the id of the newly created appointment
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw new Error('Failed to create appointment');
        }
    }

    // Update appointment
    static async update(id, data) {
        try {
            // Validasi data input
            if (!data.user_id || !data.nama || !data.tanggal_lahir || !data.nomor_telepon || !data.email || !data.jadwal_id || !data.dokter_id || !data.polis_id || !data.status) {
                throw new Error('All fields are required');
            }

            // Periksa apakah polis_id yang diberikan valid
            const polis = await Polis.findById(data.polis_id);
            if (!polis) {
                throw new Error('Invalid Polis ID');
            }

            const [result] = await db.query(
                `UPDATE appointments SET 
                user_id = ?, nama = ?, tanggal_lahir = ?, nomor_telepon = ?, email = ?, 
                jadwal_id = ?, dokter_id = ?, polis_id = ?, status = ? 
                WHERE id = ?`,
                [
                    data.user_id,
                    data.nama,
                    data.tanggal_lahir,
                    data.nomor_telepon,
                    data.email,
                    data.jadwal_id,
                    data.dokter_id,
                    data.polis_id,
                    data.status,
                    id,
                ]
            );

            if (result.affectedRows > 0) {
                return true;
            }

            return false; // If no rows were affected, return false
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw new Error('Failed to update appointment');
        }
    }

    // Delete appointment
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false; // If no rows were affected, return false
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw new Error('Failed to delete appointment');
        }
    }
}

module.exports = Appointment;
