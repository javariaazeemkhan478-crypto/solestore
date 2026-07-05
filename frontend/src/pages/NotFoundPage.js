import { Link } from 'react-router-dom';
import './InfoPages.css';
export default function NotFoundPage() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}