// middlewares/validateUser.js
module.exports = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Username is required and must be a string' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({
            status: 'error',
            message: 'Password is required and must be at least 6 characters long',
        });
    }

    next(); // Lanjutkan ke controller jika validasi lolos
};
