import './InfoPages.css';
export default function ShippingPage() {
  return (
    <div className="info-body container" style={{paddingTop:60}}>
      <span className="section-eyebrow">Delivery</span>
      <h1 className="section-title" style={{marginBottom:40}}>SHIPPING INFO</h1>
      <div className="info-cards">
        {[['🚚 Standard Shipping','3–5 business days','Free on orders over $50. Otherwise $9.99. Delivered by TCS, Leopards, or M&P.'],['⚡ Express Shipping','1–2 business days','$19.99 flat rate. Available in major cities: Karachi, Lahore, Islamabad, Rawalpindi.'],['🌍 International','7–14 business days','Available to UAE, UK, USA, Canada, and Australia. Rates calculated at checkout.']].map(([title,time,desc]) => (
          <div key={title} className="info-card"><h3>{title}</h3><span className="info-tag">{time}</span><p>{desc}</p></div>
        ))}
      </div>
    </div>
  );
}