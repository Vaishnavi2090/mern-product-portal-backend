const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: ['https://mern-product-portal-frontend.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Product Portal API Running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
