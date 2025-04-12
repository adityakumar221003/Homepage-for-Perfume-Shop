import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './models/Reviews.js';

dotenv.config();
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

const seedData = async () => {
    try {

        

        const oceanBreezeId = '67f8ac352c5530e358b3d50f'
        const royalOudId = '67f8ac352c5530e358b3d510'

        await Review.insertMany([
            {
                productId: oceanBreezeId,
                username: "Aditya",
                comment: "Super fresh, great for daytime!",
                rating: 4
            },
            {
                productId: royalOudId,
                username: "Sneha",
                comment: "Elegant and powerful fragrance.",
                rating: 5
            }
        ]);

        console.log("🌟 Sample products and reviews added!");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
