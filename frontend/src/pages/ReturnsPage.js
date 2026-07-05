import './InfoPages.css';
export default function ReturnsPage() {
  return (
    <div className="info-body container" style={{paddingTop:60}}>
      <span className="section-eyebrow">Peace of Mind</span>
      <h1 className="section-title" style={{marginBottom:16}}>RETURNS & EXCHANGES</h1>
      <p style={{color:'var(--gray-400)',marginBottom:40}}>We want you to love your purchase. If you don't, we make returns easy.</p>
      <div className="info-steps">
        {[['1','Request a Return','Log into your account and go to My Orders. Click "Return Item" within 30 days of delivery.'],['2','Pack Your Shoes','Place the shoes back in their original box with all tags and packaging intact. Shoes must be unworn.'],['3','Drop Off or Pickup','Drop off at any of our 50+ partner locations, or schedule a free home pickup (selected cities).'],['4','Get Your Refund','Refunds are processed within 5–7 business days to your original payment method.']].map(([num,title,desc]) => (
          <div key={num} className="info-step"><span className="info-step-num">{num}</span><div><h3>{title}</h3><p>{desc}</p></div></div>
        ))}
      </div>
    </div>
  );
}