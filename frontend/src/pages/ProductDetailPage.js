import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getReviews } from '../api/products';
import useCart from '../store/useCart';
import useWishlist from '../store/useWishlist';
import toast from 'react-hot-toast';
import { FiShoppingBag, FiHeart, FiShare2, FiTruck, FiRefreshCw, FiShield, FiStar } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './ProductDetailPage.css';

const DEMO_PRODUCT = {
  id:1, name:'Air Max 270 React', brand:{name:'Nike'}, category:{name:'Sneakers'},
  price:'150.00', sale_price:'120.00', discount_percentage:20,
  description:'The Nike Air Max 270 React combines two of Nike\'s greatest cushioning technologies — Max Air and React foam — delivering all-day comfort and a bold aesthetic. The large Max Air unit provides incredible cushioning, while the React foam makes it lightweight and responsive.',
  images:[
    {id:1, image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700', is_primary:true},
    {id:2, image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=700'},
    {id:3, image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700'},
    {id:4, image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700'},
  ],
  variants:[
    {id:1,size:'7',color:'Black/White',color_hex:'#111',stock:5},
    {id:2,size:'8',color:'Black/White',color_hex:'#111',stock:8},
    {id:3,size:'9',color:'Black/White',color_hex:'#111',stock:0},
    {id:4,size:'10',color:'Black/White',color_hex:'#111',stock:3},
    {id:5,size:'11',color:'Black/White',color_hex:'#111',stock:6},
    {id:6,size:'12',color:'White/Red',color_hex:'#fff',stock:4},
  ],
  is_new_arrival:true, gender:'U', stock:26,
};

const DEMO_REVIEWS = [
  {id:1, username:'Ahmed_K', rating:5, title:'Absolutely perfect!', comment:'Best shoes I\'ve ever bought. The React foam is incredibly comfortable for all-day wear.', created_at:'2025-04-12'},
  {id:2, username:'Sara_M', rating:4, title:'Great but runs small', comment:'Love the design and comfort. Just order half a size up. Really happy with the purchase overall.', created_at:'2025-03-28'},
  {id:3, username:'Bilal_Z', rating:5, title:'Worth every penny', comment:'Super stylish, very comfortable. Got so many compliments at work!', created_at:'2025-03-15'},
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');
  const addItem = useCart(s => s.addItem);
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    setLoading(true);
    getProduct(slug)
      .then(r => { setProduct(r.data); return getReviews(r.data.id); })
      .then(r => setReviews(r.data))
      .catch(() => { setProduct(DEMO_PRODUCT); setReviews(DEMO_REVIEWS); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner text="Loading product..." />;
  const p = product || DEMO_PRODUCT;
  const wishlisted = isWishlisted(p.id);
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  const handleAddToCart = () => {
    addItem({ ...p, brand_name: p.brand?.name, price: p.price, sale_price: p.sale_price,
      primary_image: p.images?.[0]?.image }, selectedVariant, quantity);
    toast.success('Added to cart! 🛍️');
  };

  return (
    <div className="pdp container">
      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb">
        <Link to="/">Home</Link> <span>/</span>
        <Link to="/shop">Shop</Link> <span>/</span>
        <Link to={`/shop?category=${p.category?.slug}`}>{p.category?.name}</Link> <span>/</span>
        <span>{p.name}</span>
      </nav>

      <div className="pdp-grid">
        {/* Images */}
        <div className="pdp-images">
          <div className="pdp-thumbs">
            {(p.images || []).map((img, i) => (
              <button key={img.id} className={`pdp-thumb ${i === selectedImg ? 'active' : ''}`}
                onClick={() => setSelectedImg(i)}>
                <img src={img.image || img} alt="" />
              </button>
            ))}
          </div>
          <div className="pdp-main-img">
            <img src={p.images?.[selectedImg]?.image || p.images?.[selectedImg] || DEMO_PRODUCT.images[0].image} alt={p.name} />
            <div className="pdp-badges">
              {p.sale_price && <span className="badge badge-sale">−{p.discount_percentage}%</span>}
              {p.is_new_arrival && <span className="badge badge-new">New</span>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pdp-info">
          <div className="pdp-brand-cat">
            <span className="pdp-brand">{p.brand?.name}</span>
            <span className="pdp-cat">{p.category?.name}</span>
          </div>
          <h1 className="pdp-name">{p.name}</h1>

          {avgRating && (
            <div className="pdp-rating">
              {[1,2,3,4,5].map(i => (
                <FaStar key={i} size={14} color={i <= Math.round(avgRating) ? '#f59e0b' : '#e5e7eb'} />
              ))}
              <span>{avgRating}</span>
              <span>({reviews.length} reviews)</span>
            </div>
          )}

          <div className="pdp-price">
            {p.sale_price ? (
              <>
                <span className="pdp-price-sale">${parseFloat(p.sale_price).toFixed(0)}</span>
                <span className="pdp-price-orig">${parseFloat(p.price).toFixed(0)}</span>
                <span className="pdp-save">Save ${(parseFloat(p.price) - parseFloat(p.sale_price)).toFixed(0)}</span>
              </>
            ) : (
              <span className="pdp-price-curr">${parseFloat(p.price).toFixed(0)}</span>
            )}
          </div>

          {/* Color */}
          {selectedVariant && (
            <div className="pdp-selected-variant">
              <strong>Color:</strong> {selectedVariant.color}
            </div>
          )}

          {/* Sizes */}
          <div className="pdp-selector">
            <div className="pdp-selector-head">
              <span>Select Size</span>
              <Link to="/size-guide" className="size-guide-link">Size Guide →</Link>
            </div>
            <div className="pdp-sizes">
              {(p.variants || []).map(v => (
                <button key={v.id}
                  className={`pdp-size-btn ${selectedVariant?.id === v.id ? 'selected' : ''} ${v.stock === 0 ? 'oos' : ''}`}
                  onClick={() => v.stock > 0 && setSelectedVariant(v)}
                  disabled={v.stock === 0}
                  title={v.stock === 0 ? 'Out of stock' : `Size ${v.size}`}
                >{v.size}</button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="pdp-qty">
            <span>Quantity</span>
            <div className="qty-ctrl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            {p.stock > 0 && p.stock < 10 && (
              <span className="pdp-low-stock">Only {p.stock} left!</span>
            )}
          </div>

          <div className="pdp-ctas">
            <button className="btn btn-primary pdp-add-btn" onClick={handleAddToCart}>
              <FiShoppingBag /> Add to Cart
            </button>
            <button
              className={`pdp-icon-btn ${wishlisted ? 'wishlisted' : ''}`}
              onClick={() => { toggle(p); toast.success(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist ❤️'); }}
            >
              {wishlisted ? <FaHeart /> : <FiHeart />}
            </button>
            <button className="pdp-icon-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}>
              <FiShare2 />
            </button>
          </div>

          <div className="pdp-assurances">
            {[[<FiTruck />, 'Free shipping on orders over $50'],
              [<FiRefreshCw />, 'Free 30-day returns'],
              [<FiShield />, '100% authentic guarantee']].map(([icon, text]) => (
              <div key={text} className="pdp-assurance"><span>{icon}</span>{text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pdp-tabs">
        <div className="pdp-tab-nav">
          {['description','reviews','shipping'].map(t => (
            <button key={t} className={`pdp-tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'reviews' ? `Reviews (${reviews.length})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="pdp-tab-body">
          {tab === 'description' && (
            <div className="pdp-description">
              <p>{p.description}</p>
              <ul>
                <li>Brand: {p.brand?.name}</li>
                <li>Category: {p.category?.name}</li>
                <li>Gender: {{'M':'Men','W':'Women','K':'Kids','U':'Unisex'}[p.gender] || 'Unisex'}</li>
                <li>SKU: SS-{p.id?.toString().padStart(5,'0')}</li>
              </ul>
            </div>
          )}
          {tab === 'reviews' && (
            <div className="pdp-reviews">
              {reviews.map(r => (
                <div key={r.id} className="review-card">
                  <div className="review-header">
                    <div>
                      <strong>{r.username}</strong>
                      <div className="review-stars">
                        {[1,2,3,4,5].map(i => <FaStar key={i} size={12} color={i <= r.rating ? '#f59e0b' : '#e5e7eb'} />)}
                      </div>
                    </div>
                    <span className="review-date">{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4>{r.title}</h4>
                  <p>{r.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && <p style={{color:'var(--gray-400)'}}>No reviews yet. Be the first!</p>}
            </div>
          )}
          {tab === 'shipping' && (
            <div className="pdp-description">
              <p><strong>Standard Shipping</strong> (3–5 business days): Free on orders over $50, otherwise $9.99</p>
              <p><strong>Express Shipping</strong> (1–2 business days): $19.99</p>
              <p><strong>Returns:</strong> Free returns within 30 days of delivery. Items must be unworn and in original packaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}