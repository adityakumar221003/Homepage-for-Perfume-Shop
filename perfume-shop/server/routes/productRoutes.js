import express from 'express';
import {
    getAllProducts,
    getProductById,
    addReview
} from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products/:id/reviews', addReview);

// Get all reviews for a product
router.get('/products/:id/reviews', async (req, res) => {
    try {
        const { reviews } = await getProductById(req, res);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default router;
