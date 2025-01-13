const db = require('../config/database');

class User {
    // Ambil semua pengguna
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT user_id, username, role FROM users');
            return rows;
        } catch (error) {
            console.error('Error finding all users:', error.message);
            throw new Error('Failed to retrieve users.');
        }
    }

    // Ambil pengguna berdasarkan ID
    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT user_id, username, role FROM users WHERE user_id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error(`Error finding user with ID ${id}:`, error.message);
            throw new Error('Failed to retrieve user.');
        }
    }

    // Ambil pengguna berdasarkan username
    static async findByUsername(username) {
        try {
            const [rows] = await db.query('SELECT user_id, username, password, role FROM users WHERE username = ?', [username]);
            return rows[0]; // Pastikan mengembalikan objek dengan user_id
        } catch (error) {
            console.error(`Error finding user with username ${username}:`, error.message);
            throw new Error('Failed to find user.');
        }
    }

    // Buat pengguna baru
    static async create(data) {
        try {
            const { username, password, role = 'user' } = data;  // Default role adalah 'user'

            // Pastikan hanya 'user' atau 'admin' yang dapat digunakan untuk role
            if (role !== 'user' && role !== 'admin') {
                throw new Error('Role must be "user" or "admin".');
            }

            const [result] = await db.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, password, role]
            );

            return result.insertId; // Kembalikan insertId yang merujuk pada user_id
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new Error('Failed to create user.');
        }
    }

    // Perbarui pengguna berdasarkan ID
    static async update(id, data) {
        try {
            const updates = [];
            const values = [];

            // Tambahkan field yang akan diupdate jika ada
            if (data.username) {
                updates.push('username = ?');
                values.push(data.username);
            }
            if (data.password) {
                updates.push('password = ?');
                values.push(data.password);
            }
            if (data.role) {
                // Pastikan hanya role 'user' atau 'admin' yang dapat diperbarui
                if (data.role !== 'user' && data.role !== 'admin') {
                    throw new Error('Role must be "user" or "admin".');
                }
                updates.push('role = ?');
                values.push(data.role);
            }

            if (updates.length === 0) {
                throw new Error('No fields to update.');
            }

            values.push(id); // Tambahkan ID ke akhir array values

            const query = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`;
            const [result] = await db.query(query, values);

            return result.affectedRows > 0;  // Memastikan bahwa ada perubahan pada data
        } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error.message);
            throw new Error('Failed to update user.');
        }
    }

    // Hapus pengguna berdasarkan ID
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);
            return result.affectedRows > 0;  // Memastikan bahwa data dihapus
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error.message);
            throw new Error('Failed to delete user.');
        }
    }
}

module.exports = User;
