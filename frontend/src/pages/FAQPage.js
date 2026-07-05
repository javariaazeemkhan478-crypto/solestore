import { useState } from 'react';
import './InfoPages.css';
const FAQS = [
  ['Are all shoes on SoleStore 100% authentic?','Yes, absolutely. We source directly from official brand distributors and authorised dealers. Every shoe comes with original packaging and a SoleStore authenticity seal.'],
  ['How do I find my size?','Use our Size Guide for accurate measurements. If you\'re between sizes, we generally recommend going half a size up for running shoes and true-to-size for lifestyle sneakers.'],
  ['Can I return sale items?','Yes! Sale items can be returned within 30 days as long as they are unworn and in original packaging.'],
  ['How long does shipping take?','Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available for an extra fee. See our Shipping Info page for full details.'],
  ['Do you ship internationally?','Yes, we ship to UAE, UK, USA, Canada, and Australia. International shipping rates are calculated at checkout.'],
  ['How do I track my order?','Once your order ships, you\'ll receive a tracking number via email and SMS. You can also track in My Orders in your account.'],
  ['What payment methods do you accept?','We accept Visa, Mastercard, Amex, PayPal, JazzCash, and EasyPaisa.'],
  ['Can I exchange a shoe for a different size?','Yes! Contact us within 30 days and we\'ll arrange an exchange. Stock permitting, exchanges ship within 2–3 days.'],
];
export default function FAQPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="info-body container" style={{paddingTop:60}}>
      <span className="section-eyebrow">Help Center</span>
      <h1 className="section-title" style={{marginBottom:48}}>FREQUENTLY ASKED QUESTIONS</h1>
      <div className="faq-list" style={{maxWidth:760}}>
        {FAQS.map(([q,a], i) => (
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{q} <span>{open === i ? '−' : '+'}</span></button>
            {open === i && <div className="faq-a"><p>{a}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
}