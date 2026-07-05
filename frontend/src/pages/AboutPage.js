import './InfoPages.css';
export default function AboutPage() {
  return (
    <div>
      <div className="info-hero" style={{backgroundImage:'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400)'}}>
        <div className="info-hero-overlay">
          <h1 className="section-title">OUR STORY</h1>
          <p>Born from a passion for footwear. Built for shoe lovers.</p>
        </div>
      </div>
      <div className="info-body container">
        <div className="info-section info-two-col">
          <div>
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="section-title">SOLE<span style={{color:'var(--accent)'}}>STORE</span></h2>
            <p>Founded in 2020, SoleStore started as a small boutique in Lahore with a simple idea: everyone deserves access to the world's best footwear. Today we serve over 100,000 customers across Pakistan and beyond.</p>
            <p>We partner directly with global brands like Nike, Adidas, and Jordan to bring you 100% authentic footwear at the best prices — with real reviews, accurate sizing guides, and hassle-free returns.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600" alt="Our Story" className="info-img" />
        </div>
        <div className="info-values">
          <span className="section-eyebrow" style={{display:'block', textAlign:'center', marginBottom:16}}>What We Stand For</span>
          <h2 className="section-title" style={{textAlign:'center', marginBottom:48}}>OUR VALUES</h2>
          <div className="info-grid-4">
            {[['🎯','Authenticity','Every shoe is 100% genuine, sourced directly from official brand distributors.'],['🌱','Sustainability','We partner with eco-conscious brands and use minimal, recyclable packaging.'],['💯','Quality','Only the best makes our collection — rigorously selected for quality and style.'],['🤝','Community','Built by shoe lovers, for shoe lovers. Your feedback shapes everything we do.']].map(([icon,title,desc]) => (
              <div key={title} className="info-value-card"><span>{icon}</span><h3>{title}</h3><p>{desc}</p></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}