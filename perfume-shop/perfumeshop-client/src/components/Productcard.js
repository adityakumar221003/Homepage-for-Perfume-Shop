import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <span className="price">₹{product.price}</span>
        </Link>
    );
}

export default ProductCard;
