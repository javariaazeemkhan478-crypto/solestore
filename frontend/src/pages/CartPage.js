import { Link } from 'react-router-dom';
import useCart from '../store/useCart';
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import './CartPage.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const shipping = total >= 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  if (items.length === 0) return (
    <div className="cart-empty">
      <FiShoppingBag size={72} color="var(--gray-200)" />
      <h2>YOUR CART IS EMPTY</h2>
      <p>Looks like you haven't added any shoes yet.</p>
      <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
    </div>
  );

  return (
    <div className="cart-page container">
      <h1 className="section-title">YOUR CART <span style={{color:'var(--gray-400)', fontSize:'0.5em'}}>({items.length} items)</span></h1>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => {
            const price = parseFloat(item.product.sale_price || item.product.price);
            return (
              <div key={item.key} className="cart-item">
                <Link to={`/product/${item.product.slug}`} className="cart-item-img">
                  <img src={item.product.primary_image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'} alt={item.product.name} />
                </Link>
                <div className="cart-item-body">
                  <div className="cart-item-header">
                    <div>
                      <p className="cart-item-brand">{item.product.brand_name}</p>
                      <h3><Link to={`/product/${item.product.slug}`}>{item.product.name}</Link></h3>
                      {item.variant && <p className="cart-item-meta">Size {item.variant.size} · {item.variant.color}</p>}
                    </div>
                    <button className="cart-remove" onClick={() => removeItem(item.key)}><FiTrash2 /></button>
                  </div>
                  <div className="cart-item-footer">
                    <div className="cart-qty-ctrl">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">${(price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <Link to="/shop" className="continue-shopping"><FiArrowLeft /> Continue Shopping</Link>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="sum-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="sum-row"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
          {shipping > 0 && <p className="free-ship-note">Add ${(50 - total).toFixed(2)} more for free shipping!</p>}
          <div className="sum-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="sum-divider" />
          <div className="sum-row sum-total"><strong>Total</strong><strong>${orderTotal.toFixed(2)}</strong></div>
          <Link to="/checkout" className="btn btn-accent checkout-btn">Proceed to Checkout →</Link>
          <div className="cart-security">🔒 Secure checkout · SSL encrypted</div>
        </div>
      </div>
    </div>
  );
}