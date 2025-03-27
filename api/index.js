import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import listingRouter from './routes/listing.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for CORS
app.use(cors({
  origin: [
    'https://real-estate-mern-frontend-pied.vercel.app',
    'http://localhost:3000',
    // 'http://13.61.126.206:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Middleware for JSON parsing and cookies
app.use(express.json());
app.use(cookieParser());

// Serve static files from the build folder in production
const __dirname = path.resolve(); 
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));


mongoose
  .connect(process.env.MONGO_URI, {
   
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve frontend (React/Vite SPA) in production
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`Error: ${message}, Status Code: ${statusCode}`);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
