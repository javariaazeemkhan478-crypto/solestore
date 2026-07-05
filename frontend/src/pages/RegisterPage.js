import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import useAuth from '../store/useAuth';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password1: '', password2: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password1 !== form.password2) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await registerUser(form);
      login(res.data.user, res.data.key);
      toast.success('Account created! Welcome to SoleStore!');
      navigate('/');
    } catch { toast.error('Registration failed. Username may already be taken.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">SOLE<span>STORE</span></Link>
        <h1>Create Account</h1>
        <p>Join thousands of shoe lovers</p>
        <form onSubmit={handleSubmit}>
          {[['username','Username','text','yourusername'],['email','Email','email','you@example.com'],['password1','Password','password','min. 8 characters'],['password2','Confirm Password','password','repeat password']].map(([k,l,t,ph]) => (
            <div className="auth-field" key={k}><label>{l}</label><input type={t} placeholder={ph} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} required /></div>
          ))}
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in →</Link></p>
      </div>
    </div>
  );
}