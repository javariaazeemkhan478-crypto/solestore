import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    const existing = JSON.parse(localStorage.getItem('ss_subscribers') || '[]');
    if (existing.includes(email)) {
      toast.error('This email is already subscribed!');
      return;
    }
    existing.push(email);
    localStorage.setItem('ss_subscribers', JSON.stringify(existing));
    setSubscribed(true);
    setEmail('');
    toast.success('🎉 Subscribed! Your 10% off code: SOLE10');
  };

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="container footer-nl-inner">
          <div>
            <h3>GET 10% OFF YOUR FIRST ORDER</h3>
            <p>Subscribe to our newsletter for exclusive deals and new arrivals.</p>
          </div>
          {subscribed ? (
            <div className="nl-success">
              ✅ You're subscribed! Use code: <strong>SOLE10</strong>
            </div>
          ) : (
            <form className="nl-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-accent" type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-main container">
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">SOLE<span>STORE</span></Link>
          <p>Premium footwear for every stride. Curated from the world's best brands, delivered to your door.</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FiInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FiTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FiFacebook /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><FiYoutube /></a>
          </div>
          <div className="footer-badges">
            <span>🔒 SSL Secured</span>
            <span>✅ Authentic</span>
            <span>🚚 Fast Shipping</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Shoes</Link></li>
            <li><Link to="/shop?gender=M">Men's</Link></li>
            <li><Link to="/shop?gender=W">Women's</Link></li>
            <li><Link to="/shop?gender=K">Kids'</Link></li>
            <li><Link to="/sale">Sale</Link></li>
            <li><Link to="/shop?new_arrival=true">New Arrivals</Link></li>
            <li><Link to="/shop?best_seller=true">Best Sellers</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help & Info</h4>
          <ul>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns &amp; Exchanges</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
          <h4 style={{marginTop:'24px'}}>Contact</h4>
          <ul>
            <li>
              <a href="mailto:support@solestore.com">
                <FiMail style={{marginRight:6, verticalAlign:'middle'}} />
                support@solestore.com
              </a>
            </li>
            <li style={{fontSize:'13px', color:'var(--gray-400)', marginTop:4}}>
              Mon–Fri, 9AM–6PM PKT
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2025 SoleStore. All rights reserved.</p>
          <div className="payment-icons">
            <span>VISA</span>
            <span>MC</span>
            <span>PP</span>
            <span>JC</span>
            <span>EP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}