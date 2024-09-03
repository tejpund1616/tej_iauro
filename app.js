const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

