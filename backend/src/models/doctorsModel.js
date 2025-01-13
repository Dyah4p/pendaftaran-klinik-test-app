const db = require('../config/database');

class Doctor {
    // Get all doctors
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM doctors');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get doctors by polis_id
    static async findByPolisId(polis_id) {
        try {
            const [rows] = await db.query('SELECT * FROM doctors WHERE polis_id = ?', [polis_id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Create a new doctor
    static async create(data) {
        try {
            const [result] = await db.query(
                'INSERT INTO doctors (polis_id, nama, image, created_at) VALUES (?, ?, ?, ?)',
                [data.polis_id, data.nama, data.image, data.created_at]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Update doctor details
    static async update(id, data) {
        try {
            const [result] = await db.query(
                'UPDATE doctors SET polis_id = ?, nama = ?, image = ?, created_at = ? WHERE id = ?',
                [data.polis_id, data.nama, data.image, data.created_at, id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Delete a doctor
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM doctors WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Doctor;
