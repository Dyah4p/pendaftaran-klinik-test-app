const db = require('../config/database');
const Polis = require('../models/polisModel'); // Import Polis model for validation

class Appointment {
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM appointments');
            return rows;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw new Error('Failed to fetch appointments');
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error fetching appointment by ID:', error);
            throw new Error('Failed to fetch appointment');
        }
    }

    static async findByUser(user_id) {
        try {
            const [rows] = await db.query('SELECT * FROM appointments WHERE user_id = ?', [user_id]);
            return rows; // Returns an array of appointments for the given user_id
        } catch (error) {
            console.error('Error fetching appointments by user_id:', error);
            throw new Error('Failed to fetch appointments by user');
        }
    }

    static async create(data) {
        try {
            const status = data.status || 'pending'; // Default status

            if (!data.user_id || !data.nama || !data.tanggal_lahir || !data.nomor_telepon || !data.email || !data.jadwal_id || !data.dokter_id || !data.polis_id) {
                throw new Error('All fields are required');
            }

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
                    status,
                ]
            );

            return result.insertId;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw new Error('Failed to create appointment');
        }
    }

    static async update(id, data) {
        try {
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
                    data.status || 'pending',
                    id,
                ]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw new Error('Failed to update appointment');
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw new Error('Failed to delete appointment');
        }
    }
}

module.exports = Appointment;
