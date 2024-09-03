const express = require('express');
const router = express.Router();
const db = require('../database');

// Create Product
router.post('/', (req, res) => {
  const { name, description, userId, visible } = req.body;
  db.query('INSERT INTO products (name, description, userId, visible) VALUES (?, ?, ?, ?)', 
  [name, description, userId, visible], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send('Product created');
  });
});

// Display Products (Visible Only)
router.get('/', (req, res) => {
  db.query('SELECT * FROM products WHERE visible = 1', (err, products) => {
    if (err) return res.status(500).send('Server error');
    res.json(products);
  });
});

// Admin Delete/Update Product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.send('Product deleted');
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, visible } = req.body;
  db.query('UPDATE products SET name = ?, description = ?, visible = ? WHERE id = ?', 
  [name, description, visible, id], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.send('Product updated');
  });
});

module.exports = router;
