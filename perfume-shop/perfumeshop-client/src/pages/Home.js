import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/productcard.css';
import '../styles/Home.css'


function ProductCardSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
                console.log("Data aa rha hai re bhai",data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
      
            <section className="product-section">
                <h2>Our Collection</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description ? product.description.slice(0, 100) + '...' : ''}</p>
                            <p>Price: ₹{product.price}</p>
                        </Link>
                    ))}
                </div>
            </section>
    );
}


export default ProductCardSection;
