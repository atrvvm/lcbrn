import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import workRoutes from './routes/work.js';
import servicesRoutes from './routes/services.js';

dotenv.config();

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://lcbrn.onrender.com']
    : ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/work', workRoutes);
app.use('/api/services', servicesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();