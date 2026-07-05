import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../store/useCart';
import { createOrder } from '../api/orders';
import useAuth from '../store/useAuth';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [shipping, setShipping] = useState({ firstName:'',lastName:'',email:'',phone:'',address:'',city:'',postal:'',country:'Pakistan' });
  const [payment, setPayment] = useState({ cardNumber:'',expiry:'',cvv:'',name:'' });

  const shippingCost = total >= 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const orderTotal = total + shippingCost + tax;

  const handlePlace = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        await createOrder({
          shipping_address: `${shipping.address}, ${shipping.city}`,
          city: shipping.city,
          postal_code: shipping.postal,
          country: shipping.country,
          phone: shipping.phone,
          total_price: orderTotal.toFixed(2),
          items: items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.sale_price || item.product.price,
          }))
        });
      }
    } catch {}
    clearCart();
    setPlaced(true);
    window.scrollTo(0, 0);
  };

  if (placed) return (
    <div className="checkout-success container">
      <div className="success-checkmark">✓</div>
      <h1>ORDER CONFIRMED!</h1>
      <p className="success-order-id">Order #SS-{orderId}</p>
      <p>Thank you for your purchase! You'll receive a confirmation email shortly.</p>
      <div className="success-btns">
        <Link to="/orders" className="btn btn-outline">Track Order</Link>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="checkout-success container">
      <h1>YOUR CART IS EMPTY</h1>
      <Link to="/shop" className="btn btn-primary" style={{marginTop:24}}>Shop Now</Link>
    </div>
  );

  return (
    <div className="checkout-page container">
      <h1 className="section-title">CHECKOUT</h1>

      <div className="ck-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`ck-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <span className="ck-step-num">{i < step ? '✓' : i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="ck-layout">
        <div className="ck-form-area">
          {step === 0 && (
            <div className="ck-section">
              <h3>Shipping Information</h3>
              <div className="ck-row">
                <div className="ck-field"><label>First Name</label><input value={shipping.firstName} onChange={e => setShipping({...shipping, firstName:e.target.value})} required /></div>
                <div className="ck-field"><label>Last Name</label><input value={shipping.lastName} onChange={e => setShipping({...shipping, lastName:e.target.value})} required /></div>
              </div>
              <div className="ck-field"><label>Email</label><input type="email" value={shipping.email} onChange={e => setShipping({...shipping, email:e.target.value})} required /></div>
              <div className="ck-field"><label>Phone</label><input type="tel" value={shipping.phone} onChange={e => setShipping({...shipping, phone:e.target.value})} required /></div>
              <div className="ck-field"><label>Address</label><input value={shipping.address} onChange={e => setShipping({...shipping, address:e.target.value})} required /></div>
              <div className="ck-row">
                <div className="ck-field"><label>City</label><input value={shipping.city} onChange={e => setShipping({...shipping, city:e.target.value})} required /></div>
                <div className="ck-field"><label>Postal Code</label><input value={shipping.postal} onChange={e => setShipping({...shipping, postal:e.target.value})} required /></div>
              </div>
              <div className="ck-field">
                <label>Country</label>
                <select value={shipping.country} onChange={e => setShipping({...shipping, country:e.target.value})}>
                  {['Pakistan','United States','United Kingdom','Canada','Australia','UAE'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button className="btn btn-primary ck-next" onClick={() => {
                if (!shipping.firstName || !shipping.email || !shipping.address) { toast.error('Please fill all fields'); return; }
                setStep(1);
              }}>Continue to Payment →</button>
            </div>
          )}

          {step === 1 && (
            <div className="ck-section">
              <h3>Payment Details</h3>
              <div className="ck-field"><label>Card Number</label><input placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber:e.target.value})} /></div>
              <div className="ck-row">
                <div className="ck-field"><label>Expiry Date</label><input placeholder="MM / YY" value={payment.expiry} onChange={e => setPayment({...payment, expiry:e.target.value})} /></div>
                <div className="ck-field"><label>CVV</label><input placeholder="•••" type="password" maxLength="4" value={payment.cvv} onChange={e => setPayment({...payment, cvv:e.target.value})} /></div>
              </div>
              <div className="ck-field"><label>Cardholder Name</label><input placeholder="Name on card" value={payment.name} onChange={e => setPayment({...payment, name:e.target.value})} /></div>
              <div className="ck-payment-icons">
                <span>VISA</span><span>MC</span><span>AMEX</span><span>PayPal</span>
              </div>
              <div style={{display:'flex',gap:12}}>
                <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn-primary ck-next" style={{flex:1}} onClick={() => setStep(2)}>Review Order →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form className="ck-section" onSubmit={handlePlace}>
              <h3>Review Your Order</h3>
              {items.map(item => (
                <div key={item.key} className="ck-review-item">
                  <img src={item.product.primary_image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80'} alt="" />
                  <div>
                    <strong>{item.product.name}</strong>
                    <p>Qty: {item.quantity} {item.variant && `· Size ${item.variant.size}`}</p>
                  </div>
                  <span>${(parseFloat(item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="ck-review-address">
                <strong>Shipping to:</strong> {shipping.firstName} {shipping.lastName}, {shipping.address}, {shipping.city}, {shipping.country}
              </div>
              <div style={{display:'flex',gap:12,marginTop:24}}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn btn-accent ck-next" style={{flex:1}}>Place Order ✓</button>
              </div>
            </form>
          )}
        </div>

        <div className="ck-summary">
          <h3>Summary</h3>
          {items.slice(0, 3).map(item => (
            <div key={item.key} className="ck-sum-item">
              <img src={item.product.primary_image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60'} alt="" />
              <span>{item.product.name} ×{item.quantity}</span>
              <span>${(parseFloat(item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {items.length > 3 && <p className="ck-more">+{items.length - 3} more items</p>}
          <div className="ck-sum-rows">
            <div className="ck-sum-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="ck-sum-row"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
            <div className="ck-sum-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="ck-sum-row ck-sum-total"><strong>Total</strong><strong>${orderTotal.toFixed(2)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}