import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import useAuth from '../store/useAuth';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.key);
      toast.success('Welcome back!');
      navigate('/');
    } catch {
      toast.error('Invalid username or password.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">SOLE<span>STORE</span></Link>
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="auth-field"><label>Username</label><input type="text" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required placeholder="your username" /></div>
          <div className="auth-field"><label>Password</label><input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required placeholder="••••••••" /></div>
          <div className="auth-forgot"><Link to="/forgot-password">Forgot password?</Link></div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create one →</Link></p>
      </div>
    </div>
  );
}