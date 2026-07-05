import useAuth from '../store/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';
import toast from 'react-hot-toast';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return (
    <div className="profile-page container">
      <div className="page-empty">
        <h2>Please sign in to view your profile</h2>
        <Link to="/login" className="btn btn-primary">Sign In</Link>
      </div>
    </div>
  );

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="profile-page container">
      <h1 className="section-title">MY ACCOUNT</h1>
      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">{user?.username?.[0]?.toUpperCase() || 'U'}</div>
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <button className="btn btn-outline" onClick={handleLogout} style={{width:'100%', marginTop:16}}>Sign Out</button>
        </div>
        <div className="profile-menu">
          {[['📦','My Orders','/orders','View and track all your orders'],['❤️','Wishlist','/wishlist','Your saved items'],['👟','Recently Viewed','#','Shoes you\'ve looked at'],['📍','Addresses','#','Manage delivery addresses'],['🔔','Notifications','#','Manage your preferences'],['🔒','Security','#','Password and login settings']].map(([icon,title,link,desc]) => (
            <Link key={title} to={link} className="profile-menu-item">
              <span className="pm-icon">{icon}</span>
              <div><h3>{title}</h3><p>{desc}</p></div>
              <span className="pm-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}