import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import useCart from '../../store/useCart';
import useWishlist from '../../store/useWishlist';
import toast from 'react-hot-toast';
import './ProductCard.css';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400',
];

export default function ProductCard({ product, index = 0 }) {
  const addItem = useCart(s => s.addItem);
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const imgSrc = product.primary_image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, null, 1);
    toast.success(
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={imgSrc} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4 }} />
        <span><strong>{product.name}</strong> added!</span>
      </div>
    );
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  return (
    <Link to={`/product/${product.slug}`} className="pcard">
      <div className="pcard-img-wrap">
        <img src={imgSrc} alt={product.name} className="pcard-img" loading="lazy" />
        <div className="pcard-badges">
          {product.sale_price && <span className="badge badge-sale">−{product.discount_percentage}%</span>}
          {product.is_new_arrival && <span className="badge badge-new">New</span>}
          {product.is_best_seller && <span className="badge badge-hot">Hot</span>}
        </div>
        <div className="pcard-actions">
          <button className="pcard-action-btn" onClick={handleAddToCart} title="Add to Cart">
            <FiShoppingBag size={17} />
          </button>
          <button className={`pcard-action-btn ${wishlisted ? 'wishlisted' : ''}`} onClick={handleWishlist} title="Wishlist">
            {wishlisted ? <FaHeart size={16} /> : <FiHeart size={17} />}
          </button>
          <Link to={`/product/${product.slug}`} className="pcard-action-btn" title="Quick View" onClick={e => e.stopPropagation()}>
            <FiEye size={17} />
          </Link>
        </div>
      </div>
      <div className="pcard-body">
        <span className="pcard-brand">{product.brand_name}</span>
        <h3 className="pcard-name">{product.name}</h3>
        <div className="pcard-price">
          {product.sale_price ? (
            <>
              <span className="pcard-price-sale">${parseFloat(product.sale_price).toFixed(0)}</span>
              <span className="pcard-price-orig">${parseFloat(product.price).toFixed(0)}</span>
            </>
          ) : (
            <span className="pcard-price-curr">${parseFloat(product.price).toFixed(0)}</span>
          )}
        </div>
        {product.stock === 0 && <span className="pcard-oos">Out of Stock</span>}
      </div>
    </Link>
  );
}