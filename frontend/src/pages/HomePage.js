import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeatured, getNewArrivals, getBestSellers, getCategories } from '../api/products';
import ProductCard from '../components/product/ProductCard';
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield, FiHeadphones } from 'react-icons/fi';
import './HomePage.css';

const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900',
    eyebrow: 'New Season 2025',
    title: 'RUN YOUR\nWORLD',
    sub: 'Nike Air Max — engineered for those who never stop.',
    cta: 'Shop Nike',
    link: '/shop?brand=nike',
    color: '#1a1a2e'
  },
  {
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900',
    eyebrow: 'Adidas Collection',
    title: 'BOOST\nBEYOND',
    sub: 'Ultraboost 22 — every step energised.',
    cta: 'Shop Adidas',
    link: '/shop?brand=adidas',
    color: '#0d1b2a'
  },
  {
    img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=900',
    eyebrow: 'Jordan Brand',
    title: 'BORN TO\nFLY HIGH',
    sub: 'Air Jordan 1 — an icon, elevated.',
    cta: 'Shop Jordan',
    link: '/shop?brand=jordan',
    color: '#1a0a0a'
  },
];

const DEMO_PRODUCTS = [
  { id:1, name:'Air Max 270 React', brand_name:'Nike', price:150, sale_price:120, slug:'air-max-270-react', discount_percentage:20, is_new_arrival:true, primary_image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock:10 },
  { id:2, name:'Ultraboost 22', brand_name:'Adidas', price:180, slug:'ultraboost-22', is_best_seller:true, primary_image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', stock:8 },
  { id:3, name:'Air Jordan 1 Retro High OG', brand_name:'Jordan', price:170, slug:'air-jordan-1-high-og', is_featured:true, primary_image:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', stock:5 },
  { id:4, name:'990v5 Made in USA', brand_name:'New Balance', price:185, sale_price:150, slug:'990v5', discount_percentage:19, primary_image:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', stock:12 },
  { id:5, name:"RS-X³ Puzzle", brand_name:'Puma', price:110, sale_price:89, slug:'rs-x3-puzzle', discount_percentage:19, primary_image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', stock:7 },
  { id:6, name:'Old Skool Platform', brand_name:'Vans', price:80, slug:'old-skool-platform', is_new_arrival:true, primary_image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', stock:15 },
  { id:7, name:'Chuck 70 High Top', brand_name:'Converse', price:85, sale_price:70, slug:'chuck-70-high', discount_percentage:18, primary_image:'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400', stock:9 },
  { id:8, name:"Air Force 1 '07", brand_name:'Nike', price:100, slug:'air-force-1-07', primary_image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', stock:20 },
];

const CATEGORIES = [
  { label:'Sneakers', sub:'100+ styles', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', link:'/shop?category=sneakers' },
  { label:'Running', sub:'Speed & comfort', img:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500', link:'/shop?category=running' },
  { label:'Basketball', sub:'Court-ready', img:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500', link:'/shop?category=basketball' },
  { label:'Casual', sub:'Everyday wear', img:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500', link:'/shop?category=casual' },
  { label:'Women', sub:'Her collection', img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500', link:'/shop?gender=W' },
  { label:'Kids', sub:'Young & bold', img:'https://images.unsplash.com/photo-1571950006418-f2e5db2ee70c?w=500', link:'/shop?gender=K' },
];

const BRANDS = ['Nike','Adidas','Jordan','New Balance','Puma','Vans','Converse','Reebok','Asics','Skechers'];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    getFeatured().then(r => setFeatured(r.data)).catch(() => {});
    getNewArrivals().then(r => setNewArrivals(r.data)).catch(() => {});
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[slide];
  const featuredProducts = featured.length > 0 ? featured : DEMO_PRODUCTS;
  const newProducts = newArrivals.length > 0 ? newArrivals : DEMO_PRODUCTS.filter(p => p.is_new_arrival);

  return (
    <div className="homepage">

      {/* ── HERO ── */}
      <section className="hero" style={{ '--hero-bg': current.color }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <img src={s.img} alt={s.title} className="hero-slide-img" />
          </div>
        ))}
        <div className="hero-overlay" />
        <div className="hero-content container">
          <span className="hero-eyebrow">{current.eyebrow}</span>
          <h1 className="hero-title">{current.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</h1>
          <p className="hero-sub">{current.sub}</p>
          <div className="hero-btns">
            <Link to={current.link} className="btn btn-accent">{current.cta}</Link>
            <Link to="/shop" className="btn btn-white">View All Shoes</Link>
          </div>
        </div>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
        <div className="hero-scroll-hint">
          <span>↓ Scroll to explore</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS].map((b, i) => <span key={i}>{b} <span className="mq-dot">·</span></span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Browse by Style</span>
            <h2 className="section-title">SHOP BY CATEGORY</h2>
          </div>
          <Link to="/shop" className="btn btn-outline">All Products <FiArrowRight /></Link>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.label} to={cat.link} className={`cat-card ${i === 0 ? 'cat-card-large' : ''}`}>
              <img src={cat.img} alt={cat.label} loading="lazy" />
              <div className="cat-card-overlay">
                <h3>{cat.label}</h3>
                <p>{cat.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Handpicked for You</span>
            <h2 className="section-title">FEATURED PICKS</h2>
          </div>
          <Link to="/shop?featured=true" className="btn btn-outline">View All <FiArrowRight /></Link>
        </div>
        <div className="products-grid-4">
          {featuredProducts.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ── PROMO SPLIT ── */}
      <section className="promo-split">
        <div className="promo-half promo-half-dark">
          <span className="section-eyebrow">Limited Time</span>
          <h2 className="section-title" style={{color:'white'}}>UP TO<br/><span style={{color:'var(--accent)'}}>40% OFF</span></h2>
          <p>End-of-season clearance on 200+ styles. Don't miss out.</p>
          <Link to="/sale" className="btn btn-accent">Shop Sale →</Link>
        </div>
        <div className="promo-half promo-half-img">
          <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700" alt="Sale" />
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      {newProducts.length > 0 && (
        <section className="section container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Just Dropped</span>
              <h2 className="section-title">NEW ARRIVALS</h2>
            </div>
            <Link to="/shop?new_arrival=true" className="btn btn-outline">See All <FiArrowRight /></Link>
          </div>
          <div className="products-grid-4">
            {newProducts.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}

      {/* ── BRAND LOGOS ── */}
      <section className="brands-section">
        <div className="container">
          <span className="section-eyebrow" style={{display:'block', textAlign:'center', marginBottom:'24px'}}>Featured Brands</span>
          <div className="brands-row">
            {BRANDS.map(b => (
              <Link key={b} to={`/shop?brand=${b.toLowerCase().replace(' ','-')}`} className="brand-pill">{b}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="trust-section">
        <div className="container trust-grid">
          {[
            [<FiTruck size={28} />, 'Free Shipping', 'On all orders over $50. Express delivery available.'],
            [<FiRefreshCw size={28} />, '30-Day Returns', 'Not happy? Return for free within 30 days.'],
            [<FiShield size={28} />, '100% Authentic', 'Every shoe sourced directly from the brand.'],
            [<FiHeadphones size={28} />, '24/7 Support', 'Our team is here whenever you need us.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="trust-item">
              <div className="trust-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}