import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSlider.css'

const HeroSlider = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        'images/perfume-1.jpg',
        'images/perfume-2.jpg',
        'images/perfume-3.jpg',
       
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-section">
            {images.map((img, index) => (
                <div

                    key={index}
                    className={`slide ${index === currentImage ? 'active' : ''}`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`
                    }}
                />
            ))}
            <div className="hero-content">
                <h1 className="hero-title">Discover Your Signature Scent Today</h1>
                <p className="hero-description">
                    Explore our exquisite range of perfumes, from elegant florals to bold musks.
                    Find your perfect fragrance with our curated collections.
                </p>
                <Link to="/perfumes">
                    <button className="shop-now-btn">Shop Now</button>
                </Link>
            </div>
        </section>
    );
};

export default HeroSlider;