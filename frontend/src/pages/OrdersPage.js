import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api/orders';
import useAuth from '../store/useAuth';
import './SimplePage.css';

const STATUS_COLORS = { pending:'#f59e0b', processing:'#3b82f6', shipped:'#8b5cf6', delivered:'#10b981', cancelled:'#ef4444' };
const DEMO_ORDERS = [
  { id:1001, status:'delivered', total_price:'269.99', created_at:'2025-05-10', items:[{id:1},{id:2}] },
  { id:1002, status:'shipped', total_price:'170.00', created_at:'2025-05-22', items:[{id:3}] },
  { id:1003, status:'processing', total_price:'154.99', created_at:'2025-06-01', items:[{id:4},{id:5}] },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getOrders().then(r => setOrders(r.data.results || r.data)).catch(() => setOrders(DEMO_ORDERS));
    } else { setOrders(DEMO_ORDERS); }
  }, [isAuthenticated]);

  return (
    <div className="simple-page container">
      <div className="simple-page-head">
        <h1 className="section-title">MY ORDERS</h1>
        <p>{orders.length} orders</p>
      </div>
      {orders.length === 0 ? (
        <div className="page-empty">
          <h2>No orders yet</h2>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-top">
                <div>
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.created_at).toLocaleDateString('en-US', {day:'numeric', month:'long', year:'numeric'})}</span>
                </div>
                <div className="order-right">
                  <span className="order-status" style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>{order.status}</span>
                  <span className="order-total">${parseFloat(order.total_price).toFixed(2)}</span>
                </div>
              </div>
              <div className="order-card-footer">
                <span>{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span>
                <Link to={`/orders`} className="btn btn-outline" style={{padding:'8px 20px', fontSize:'12px'}}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}