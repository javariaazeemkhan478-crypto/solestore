import './InfoPages.css';
export default function TermsPage() {
  return (
    <div className="info-body container legal-page" style={{paddingTop:60}}>
      <h1 className="section-title" style={{marginBottom:8}}>TERMS OF SERVICE</h1>
      <p style={{color:'var(--gray-400)',marginBottom:40}}>Last updated: June 1, 2025</p>
      {[['Acceptance','By accessing and purchasing from SoleStore, you agree to these terms.'],['Products','All products are subject to availability. We reserve the right to limit quantities and discontinue products.'],['Pricing','Prices are in USD. We reserve the right to change prices at any time. Taxes are calculated at checkout.'],['Payment','Payment is processed securely. Orders are not confirmed until payment is approved.'],['Limitation of Liability','SoleStore is not liable for indirect damages arising from use of our service beyond the purchase price paid.']].map(([title, text]) => (
        <div key={title} className="legal-section"><h3>{title}</h3><p>{text}</p></div>
      ))}
    </div>
  );
}