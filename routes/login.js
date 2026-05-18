var express = require('express');
var router = express.Router();

const AuthService = require('../services/authService');
const authService = new AuthService();

// Render login form
router.get('/', (req, res) => {
    res.render('login', { error: null });
});

// Handle login form submission
router.post('/', (req, res) => {
    const { email, password } = req.body;
    const user = authService.findUser(email, password);
    if (!user) {
        return res.render('login', { error: 'Invalid email or password.' });
    }
    res.redirect('/login/success?email=' + encodeURIComponent(user.email));
});

// Logged in success page
router.get('/success', (req, res) => {
    const email = req.query.email;
    res.render('loginSuccess', { email: email });
});

// Logout
router.get('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;
