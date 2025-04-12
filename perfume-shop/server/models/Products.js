import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    fullDescription: String,
    image: String,
    price: Number,
    sizes: [String],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
