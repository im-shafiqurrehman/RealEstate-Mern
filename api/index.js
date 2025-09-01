import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import listingRouter from './routes/listing.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { errorHandler } from './utils/error.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 📌 Middleware for CORS (Cross-Origin Resource Sharing)

// Browser ki ek security feature hoti hai jo unknown (unauthorized) requests ko block kar deti hai.
// CORS middleware server ko batata hai ki kis origin se request allow karni chahiye aur kis se nahi.

// Yahan humne `allowedOrigins` ki ek list banayi hai, jahan se requests allow ki jayengi.
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'https://real-estate-mern-frontend-pied.vercel.app',
  'https://real-estate-mern-backend-rho.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Agar request ka origin allowedOrigins me hai, ya origin hi nahi (server to server request),
    // to request ko allow kar do.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Agar request allowed nahi hai to error bhej do.
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,           // Agar request cookies ke sath aa rahi hai to allow karo.
  optionsSuccessStatus: 200,   // For successful preflight requests, 200 status code send karo.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));



// 📌 Middleware (jaty hoye mil kr jana) 

// 📦 JSON parsing ka matlab hai: 
// Frontend (browser, Postman, mobile app, etc.) jab bhi request bhejta hai, wo aksar JSON format mein hoti hai.
// Express by default JSON ko samajh nahi pata, isiliye agar hum JSON request bhejein to `req.body` undefined milta hai.
// ⚡ express.json() middleware se hum JSON ko parse kar ke use JavaScript object bana lete hain.
// Iss tarah hum `req.body` se easily data access kar sakte hain.
app.use(express.json());

// 🍪 Cookie parsing ka matlab hai: 
// Jab client request ke sath cookies bhejta hai, wo headers ke form mein hoti hain.
// express-cookie-parser middleware cookies ko parse kar ke `req.cookies` object mein convert kar deta hai.
// Agar hum ye na lagayen to cookies undefined rehti hain.
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

app.use("/health", (req, res) => {
  console.log("Server is running")
  res.status(200).json({ message: "Server is running", success: true });
});
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
