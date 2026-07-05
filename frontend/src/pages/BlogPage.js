import { Link } from 'react-router-dom';
import './InfoPages.css';

const POSTS = [
  {
    id: 1,
    slug: 'nike-most-comfortable-running-shoes-2025',
    title: "Nike's Most Comfortable Running Shoes of 2025",
    category: 'Reviews',
    date: 'June 10, 2025',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    excerpt: "We tested 12 Nike models over 3 months. Here's what we found.",
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'how-to-style-air-jordan-1s',
    title: 'How to Style Air Jordan 1s: 5 Outfit Ideas',
    category: 'Style',
    date: 'May 28, 2025',
    img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
    excerpt: 'The Jordan 1 is one of the most versatile sneakers ever made. Here\'s how to wear it.',
    readTime: '4 min read',
  },
  {
    id: 3,
    slug: 'adidas-ultraboost-vs-nike-react',
    title: 'Adidas Ultraboost vs Nike React: Which Is Better?',
    category: 'Comparison',
    date: 'May 15, 2025',
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
    excerpt: 'Both promise energy return. Only one delivers.',
    readTime: '6 min read',
  },
  {
    id: 4,
    slug: 'best-shoes-for-pakistani-weather-2025',
    title: 'Best Shoes for Pakistani Weather (2025)',
    category: 'Guide',
    date: 'April 30, 2025',
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    excerpt: 'Humidity, dust, and heat — we pick the best shoes for every season.',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="info-body container" style={{ paddingTop: 60 }}>
      <span className="section-eyebrow">Stories & Guides</span>
      <h1 className="section-title" style={{ marginBottom: 48 }}>THE SOLE BLOG</h1>
      <div className="blog-grid">
        {POSTS.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
            <div className="blog-card-img">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span className="blog-cat">{post.category}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-footer">
                <span>{post.date}</span>
                <span className="blog-read">Read More →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}