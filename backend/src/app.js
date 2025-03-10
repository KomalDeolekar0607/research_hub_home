import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { urlencoded } from 'express';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "20kb"})); 

app.use(urlencoded({extended:true, limit: "20kb"}))

app.use(express.static('public'));  

app.use(cookieParser());



//import routes
import userRoutes from './routes/user.routes.js';



//routes
app.use('/api/v1/users', userRoutes);

export { app }; 