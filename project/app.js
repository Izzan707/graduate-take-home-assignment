const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
