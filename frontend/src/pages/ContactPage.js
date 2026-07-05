import { useState } from 'react';
import toast from 'react-hot-toast';
import './InfoPages.css';
import './ContactPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save message to localStorage so admin can read it
    const messages = JSON.parse(localStorage.getItem('ss_contact_messages') || '[]');
    messages.push({ ...form, date: new Date().toISOString(), id: Date.now() });
    localStorage.setItem('ss_contact_messages', JSON.stringify(messages));

    // Simulate sending (replace with real API later)
    await new Promise(r => setTimeout(r, 1000));

    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.');
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  return (
    <div className="info-body container" style={{paddingTop:60}}>
      <span className="section-eyebrow">Get In Touch</span>
      <h1 className="section-title" style={{marginBottom:48}}>CONTACT US</h1>

      <div className="contact-grid">
        {/* Info side */}
        <div className="contact-info-side">
          <h3>We'd love to hear from you</h3>
          <p>Have a question about an order, need sizing help, or just want to talk shoes? Our team is here for you.</p>

          {[
            ['📧','Email','support@solestore.com'],
            ['📞','Phone','+92 300 123 4567'],
            ['📍','Location','Gulberg III, Lahore, Pakistan'],
            ['🕐','Hours','Mon–Fri, 9AM–6PM PKT'],
          ].map(([icon,label,val]) => (
            <div key={label} className="contact-item">
              <span>{icon}</span>
              <div><strong>{label}</strong><p>{val}</p></div>
            </div>
          ))}

          <div className="contact-response-time">
            <div className="crt-dot" />
            <span>Average response time: <strong>under 2 hours</strong></span>
          </div>
        </div>

        {/* Form side */}
        <div className="contact-form-side">
          {sent ? (
            <div className="contact-success">
              <span>✅</span>
              <h3>Message Received!</h3>
              <p>Thanks <strong>{form.name || 'for reaching out'}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
              <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="cf-row">
                <div className="ck-field">
                  <label>Your Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required placeholder="John Doe" />
                </div>
                <div className="ck-field">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required placeholder="you@example.com" />
                </div>
              </div>

              <div className="ck-field">
                <label>Subject *</label>
                <select value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} required>
                  <option value="">Select a topic...</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Return / Exchange">Return / Exchange</option>
                  <option value="Size Help">Size Help</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="ck-field">
                <label>Message *</label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={e => setForm({...form, message:e.target.value})}
                  required
                  placeholder="Tell us how we can help..."
                  style={{resize:'vertical'}}
                />
              </div>

              <button type="submit" className="btn btn-primary cf-submit" disabled={loading}>
                {loading ? (
                  <span style={{display:'flex',alignItems:'center',gap:8}}>
                    <span className="cf-spinner" /> Sending...
                  </span>
                ) : 'Send Message →'}
              </button>

              <p className="cf-note">
                🔒 Your information is kept private and never shared.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="contact-map">
        <iframe
          title="SoleStore Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.123!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjAnMzYuOSJF!5e0!3m2!1sen!2spk!4v1234567890"
          width="100%"
          height="300"
          style={{border:0, borderRadius:'var(--radius-lg)'}}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </div>
  );
}