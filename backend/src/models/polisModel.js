const db = require('../config/database');

class Polis {
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM polis');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM polis WHERE polis_id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.query(
                'INSERT INTO polis (nama, image, created_at) VALUES (?, ?, ?)',
                [data.nama, data.image, data.created_at]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const [result] = await db.query(
                'UPDATE polis SET nama = ?, image = ?, created_at = ? WHERE polis_id = ?',
                [data.nama, data.image, data.created_at, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM polis WHERE polis_id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Polis;
