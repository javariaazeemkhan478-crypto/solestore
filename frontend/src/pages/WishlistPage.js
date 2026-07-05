import useWishlist from '../store/useWishlist';
import ProductCard from '../components/product/ProductCard';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import './SimplePage.css';

export default function WishlistPage() {
  const { items } = useWishlist();
  return (
    <div className="simple-page container">
      <div className="simple-page-head">
        <h1 className="section-title">MY WISHLIST</h1>
        <p>{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
      </div>
      {items.length === 0 ? (
        <div className="page-empty">
          <FiHeart size={64} color="var(--gray-200)" />
          <h2>Your wishlist is empty</h2>
          <p>Save items you love for later.</p>
          <Link to="/shop" className="btn btn-primary">Browse Shoes</Link>
        </div>
      ) : (
        <div className="products-grid-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}