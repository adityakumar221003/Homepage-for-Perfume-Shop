import Review  from "../models/Reviews.js";
import Product  from "../models/Products.js";

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithReviews = await Promise.all(products.map(async (product) => {
            const reviews = await Review.find({ productId: product._id });
            return {
                ...product.toObject(),
                reviews
            };
        }));
        res.json(productsWithReviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get product details by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const reviews = await Review.find({ productId: req.params.id });

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({ product, reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new review
const addReview = async (req, res) => {
    try {
        const { username, comment, rating } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // Validate product exists
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = new Review({
            productId: req.params.id,
            username,
            comment,
            rating,
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllProducts,
    getProductById,
    addReview,
};

