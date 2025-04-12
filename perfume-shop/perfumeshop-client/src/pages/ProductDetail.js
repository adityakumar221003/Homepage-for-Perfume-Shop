import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, LinkedinShareButton, LinkedinIcon, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import axios from 'axios';
import '../styles/ProductDetail.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [newReview, setNewReview] = useState({
        comment: '',
        rating: 5,
        username: 'Guest'
    });

    useEffect(() => {
        // console.log("Product details page");
        const fetchData = async () => {
            try {
                setError(null);
                setLoading(true); const [productResponse, allProductsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/products/${id}`),
                    axios.get('http://localhost:5000/api/products')
                ]);

                setProduct(productResponse.data.product);
                setReviews(productResponse.data.reviews);

                // Filter related products (same category or similar price range)
                const related = allProductsResponse.data
                    .filter(p => p._id !== id)
                    .slice(0, 4); // Show only 4 related products
                setRelatedProducts(related);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    if (loading) return (
        <div className="loading-container">
            <ClipLoader color="#36d7b7" size={50} />
            <p>Loading amazing products...</p>
        </div>
    );

    if (error) return <motion.div
        className="error-message"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >{error}</motion.div>;






    const handleAddReview = async () => {
        if (!newReview.comment.trim()) return;
        try {
            const response = await axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
                productId: id,
                username: newReview.username,
                comment: newReview.comment,
                rating: newReview.rating
            });

            if (response.status === 201) {
                // Reset the review form
                setNewReview({
                    comment: '',
                    rating: 5,
                    username: 'Guest'
                });

                // Update reviews list
                const updatedData = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(updatedData.data.product);
                setReviews(updatedData.data.reviews);
            }
        } catch (err) {
            console.error('Error adding review:', err);
            setError('Failed to add review. Please try again.');
        }
    };




    return (
        <motion.div
            className={`product-page }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
           

            <motion.div
                className="image-gallery"
                whileHover={{ scale: 1.02 }}
            >
                <img src={product.image} alt={product.name} />
            </motion.div>

            <motion.div
                className="product-info"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1>{product.name}</h1>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p>{product.description}</p>
                <p>{product.fullDescription}</p>
                <div><strong>Available Sizes:</strong> {product.sizes?.join(', ')}</div>
            </motion.div>


            <div className="share-button">
                <button onClick={() => {
                    console.log(product.description)
                }}>Share this perfume</button>


            </div>
            <section className='share-icons'>
                <FacebookShareButton url={window.location.href}
                    title={`Check out ${product.name}\n\n${product.fullDescription}\n\nPrice: ₹${product.price}`}
                    separator={`\n\n`}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <LinkedinShareButton url={window.location.href}
                    title={`Check out ${product.name}\n\n${product.fullDescription}\n\nPrice: ₹${product.price}`}
                    separator={`\n\n`}
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TwitterShareButton url={window.location.href}
                    title={`Check out ${product.name}\n\n${product.fullDescription}\n\nPrice: ₹${product.price}`}
                    separator={`\n\n`}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                    url={window.location.href}
                    title={`Check out ${product.name}\n\n${product.fullDescription}\n\nPrice: ₹${product.price}`}
                    separator={`\n\n`}
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </section>


            <motion.div
                className="related-products"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2>Related Products</h2>
                <div className="related-products-grid">
                    {relatedProducts.map(relatedProduct => (
                        <motion.div
                            key={relatedProduct._id}
                            className="related-product-card"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img src={relatedProduct.image} alt={relatedProduct.name} />
                            <h3>{relatedProduct.name}</h3>
                            <p>₹{relatedProduct.price}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="reviews-section"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((rev, i) => (
                        <div key={i} className="review">
                            <p><strong>{rev.username}</strong></p>
                            <p>Rating: {rev.rating}/5</p>
                            <p>{rev.comment}</p>
                        </div>
                    ))
                ) : <p>No reviews yet.</p>}

                <div className="add-review">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={newReview.username}
                        onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                    />
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Add your review"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                    <button onClick={handleAddReview}>Submit Review</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductPage;