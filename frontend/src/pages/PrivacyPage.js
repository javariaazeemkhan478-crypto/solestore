import './InfoPages.css';
export default function PrivacyPage() {
  return (
    <div className="info-body container legal-page" style={{paddingTop:60}}>
      <h1 className="section-title" style={{marginBottom:8}}>PRIVACY POLICY</h1>
      <p style={{color:'var(--gray-400)',marginBottom:40}}>Last updated: June 1, 2025</p>
      {[['Information We Collect','We collect information you provide directly (name, email, address, payment info), automatically when you use our services (browsing data, cookies), and from third parties (social login providers).'],['How We Use Your Information','To process and fulfill your orders, send order confirmations and shipping updates, improve our website and services, personalize your experience, and send marketing emails (you can unsubscribe at any time).'],['Data Security','We use industry-standard SSL encryption and never store your full card details. We partner with PCI-compliant payment processors.'],['Your Rights','You can request access, correction, or deletion of your data by contacting support@solestore.com. We will respond within 30 days.'],['Cookies','We use essential cookies for our website to function and optional analytics cookies to improve your experience. You can manage cookies in your browser settings.']].map(([title, text]) => (
        <div key={title} className="legal-section"><h3>{title}</h3><p>{text}</p></div>
      ))}
    </div>
  );
}