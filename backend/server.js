import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/index.js';
import userRoutes from './src/route/userRoutes.js';
import employeeRoutes from './src/route/employeeRoutes.js';
dotenv.config();
// import { jwtAuthMiddleware } from './src/middleware/jwt.js';



const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// app.use(jwtAuthMiddleware);

app.use('/employees', employeeRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
