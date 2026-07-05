import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiSearch, FiUser, FiHeart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import useCart from '../../store/useCart';
import useAuth from '../../store/useAuth';
import useWishlist from '../../store/useWishlist';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  {
    label: 'Men', path: '/shop?gender=M',
    sub: [
      { label: 'Sneakers', path: '/shop?gender=M&category=sneakers' },
      { label: 'Running', path: '/shop?gender=M&category=running' },
      { label: 'Basketball', path: '/shop?gender=M&category=basketball' },
    ]
  },
  {
    label: 'Women', path: '/shop?gender=W',
    sub: [
      { label: 'Sneakers', path: '/shop?gender=W&category=sneakers' },
      { label: 'Casual', path: '/shop?gender=W&category=casual' },
      { label: 'Boots', path: '/shop?gender=W&category=boots' },
    ]
  },
  { label: 'Kids', path: '/shop?gender=K' },
  { label: 'Brands', path: '/brands' },
  { label: 'Sale 🔥', path: '/sale' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useCart(s => s.count);
  const wishCount = useWishlist(s => s.items.length);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-top container">
          <span>Free shipping on orders over $50 · Free 30-day returns</span>
          <div className="nav-top-links">
            <Link to="/blog">Blog</Link>
            <Link to="/size-guide">Size Guide</Link>
            <Link to="/contact">Help</Link>
          </div>
        </div>

        <div className="nav-main container">
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/" className="nav-logo">
            SOLE<span>STORE</span>
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.label}
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
                className={link.sub ? 'has-dropdown' : ''}
              >
                <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                  {link.label} {link.sub && <FiChevronDown size={12} />}
                </Link>
                {link.sub && activeDropdown === link.label && (
                  <div className="nav-dropdown">
                    {link.sub.map(s => (
                      <Link key={s.label} to={s.path}>{s.label}</Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)} title="Search">
              <FiSearch size={20} />
            </button>
            <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
              <FiHeart size={20} />
              {wishCount > 0 && <span className="nav-badge">{wishCount}</span>}
            </Link>
            <Link to={isAuthenticated ? '/profile' : '/login'} className="nav-icon-btn" title={isAuthenticated ? user?.username : 'Login'}>
              <FiUser size={20} />
            </Link>
            <Link to="/cart" className="nav-icon-btn cart-btn" title="Cart">
              <FiShoppingBag size={20} />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div className={`nav-search-bar ${searchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch} className="container">
            <FiSearch size={20} />
            <input
              autoFocus={searchOpen}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for shoes, brands, styles..."
            />
            <button type="button" onClick={() => setSearchOpen(false)}><FiX size={20} /></button>
          </form>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map(link => (
            <Link key={link.label} to={link.path} className="mobile-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="mobile-divider" />
          <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>Create Account</Link>
        </div>
      </div>
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}