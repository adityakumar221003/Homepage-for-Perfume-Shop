
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
import productRoutes from './routes/productRoutes.js';


app.use(cors());
app.use(express.json());
app.use("/api", productRoutes);

// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/perfumeShop", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => console.error(err));
