const db = require('../config/database');

class UserProfile {
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM user_profiles');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(user_id) {
        try {
            const [rows] = await db.query('SELECT * FROM user_profiles WHERE user_id = ?', [user_id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.query(
                'INSERT INTO user_profiles (user_id, nama, tanggal_lahir, nomor_telepon, email, alamat, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data.user_id, data.nama, data.tanggal_lahir, data.nomor_telepon, data.email, data.alamat, data.created_at]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(user_id, data) {
        try {
            await db.query(
                'UPDATE user_profiles SET nama = ?, tanggal_lahir = ?, nomor_telepon = ?, email = ?, alamat = ?',
                [data.nama, data.tanggal_lahir, data.nomor_telepon, data.email, data.alamat, new Date(), user_id]
            );

            // Ambil data terbaru setelah pembaruan
            return await this.findByUserId(user_id);
        } catch (error) {
            throw error;
        }
    }

    static async delete(user_id) {
        try {
            const [result] = await db.query('DELETE FROM user_profiles WHERE user_id = ?', [user_id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserProfile;
