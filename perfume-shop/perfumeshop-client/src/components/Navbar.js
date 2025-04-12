import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import '../styles/navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="logo">
                Sugandh-Vatika
            </Link>

            <button className="menu-btn" onClick={toggleMenu}>
                ☰
            </button>

            <ul className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
                <li><Link to="/products">Perfumes</Link></li>
                <li><Link to="/fragrance-sets">Fragrance Sets</Link></li>
                <li><Link to="/gift-sets">Gift Sets</Link></li>
                <li><Link to="/luxury-collection">Luxury Collection</Link></li>
                <li><Link to="/account"><FaUser /></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
