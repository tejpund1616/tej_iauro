const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

// Create Admin or User Account
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body; // role: 'admin' or 'user'
  if (role === 'admin') {
    // Ensure only one admin exists
    const [admin] = await db.promise().query('SELECT * FROM users WHERE role = "admin"');
    if (admin.length) return res.status(403).send('Admin already exists.');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], 
  (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send('User created');
  });
});

// Sign In
router.post('/signin', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, users) => {
    if (err || users.length === 0) return res.status(400).send('Invalid credentials');
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Admin Delete/Update User
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.send('User deleted');
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  db.query('UPDATE users SET username = ? WHERE id = ?', [username, id], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.send('User updated');
  });
});

module.exports = router;
