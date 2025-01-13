const db = require('../config/database');

class Jadwal {
    // Mendapatkan semua jadwal
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM jadwals');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Mendapatkan jadwal berdasarkan dokter_id
    static async findByDokterId(dokterId) {
        try {
            const [rows] = await db.query('SELECT * FROM jadwals WHERE dokter_id = ?', [dokterId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Menandai jadwal sebagai dipilih dengan memperbarui user_id
    static async selectJadwal(jadwalId, userId) {
        try {
            // Hanya mengupdate user_id pada jadwal yang dipilih
            const [result] = await db.query('UPDATE jadwals SET user_id = ? WHERE jadwal_id = ?', [userId, jadwalId]);
            return result.affectedRows > 0 ? { jadwal_id: jadwalId, user_id: userId } : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Jadwal;
