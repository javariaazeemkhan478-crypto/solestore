import { useParams, Link } from 'react-router-dom';
import './InfoPages.css';
import './BlogPostPage.css';

const POSTS = {
  'nike-most-comfortable-running-shoes-2025': {
    title: "Nike's Most Comfortable Running Shoes of 2025",
    category: 'Reviews',
    date: 'June 10, 2025',
    readTime: '5 min read',
    author: 'Ali Hassan',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200',
    content: [
      { type: 'intro', text: "We spent 3 months testing 12 Nike running shoes across different terrains and conditions. From daily trainers to race-day rockets, here's our definitive ranking of the most comfortable Nike running shoes you can buy right now." },
      { type: 'heading', text: '1. Nike Air Max 270 React — Best All-Day Comfort' },
      { type: 'text', text: 'The Air Max 270 React combines Nike\'s Max Air heel unit with React foam, creating a shoe that feels like walking on clouds. The 270-degree Air unit is the largest in Nike history, providing unmatched cushioning for long days on your feet.' },
      { type: 'text', text: 'We wore these for 8+ hour days and felt zero fatigue. The React foam is springy without being bouncy, making each step feel effortless.' },
      { type: 'heading', text: '2. Nike ZoomX Invincible Run — Best for Long Runs' },
      { type: 'text', text: 'Loaded with ZoomX foam (the same material in elite racing shoes), the Invincible Run offers maximum energy return. It\'s plush, stable, and built for the long haul.' },
      { type: 'heading', text: '3. Nike React Infinity Run — Best for Injury Prevention' },
      { type: 'text', text: 'Designed with Nike\'s Flywire technology and React foam, the Infinity Run was built to reduce common running injuries. A wider base provides extra stability without sacrificing comfort.' },
      { type: 'tip', text: 'Pro Tip: If you\'re between sizes, go half a size up with Nike running shoes for the best fit.' },
      { type: 'heading', text: 'Our Verdict' },
      { type: 'text', text: 'For most runners, the Air Max 270 React offers the best balance of comfort, style, and value. If you run serious distances, step up to the ZoomX Invincible Run — you won\'t regret it.' },
    ],
    tags: ['Nike', 'Running', 'Reviews', 'Comfort'],
    related: [
      { slug: 'adidas-ultraboost-vs-nike-react', title: 'Adidas Ultraboost vs Nike React', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
      { slug: 'best-shoes-for-pakistani-weather-2025', title: 'Best Shoes for Pakistani Weather', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400' },
    ],
  },
  'how-to-style-air-jordan-1s': {
    title: 'How to Style Air Jordan 1s: 5 Outfit Ideas',
    category: 'Style',
    date: 'May 28, 2025',
    readTime: '4 min read',
    author: 'Sara Malik',
    img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200',
    content: [
      { type: 'intro', text: 'The Air Jordan 1 is arguably the most versatile sneaker ever made. Originally a basketball shoe, it\'s now worn everywhere from the streets to high fashion runways. Here are 5 outfits that prove it.' },
      { type: 'heading', text: '1. The Classic Streetwear Look' },
      { type: 'text', text: 'Pair your Jordan 1s with slim-fit joggers, a white oversized tee, and a bomber jacket. This is the go-to look for a reason — it\'s effortlessly cool and works in almost any colour combination.' },
      { type: 'heading', text: '2. Smart Casual' },
      { type: 'text', text: 'Yes, you can dress up Jordans. Try them with straight-leg chinos, a tucked-in polo shirt, and a watch. Stick to neutral colourways like the Chicago or Bred for this look.' },
      { type: 'heading', text: '3. All Black Everything' },
      { type: 'text', text: 'The Jordan 1 in black/black colourway with black jeans and a black hoodie is a timeless combo. Add a silver chain to break up the monochrome.' },
      { type: 'tip', text: 'Style Tip: Let your Jordans be the statement piece. Keep the rest of the outfit simple so the shoes do the talking.' },
      { type: 'heading', text: '4. The Vintage Prep' },
      { type: 'text', text: 'Vintage wash jeans, a graphic tee tucked in slightly, and a flannel shirt tied at the waist. Jordan 1s in a retro colourway like Mocha or Shadow complete this 90s-inspired look perfectly.' },
      { type: 'heading', text: '5. Summer Casual' },
      { type: 'text', text: 'Cargo shorts, a linen shirt, and Jordan 1 Lows in a clean white colourway. Fresh, comfortable, and ready for Lahore heat.' },
    ],
    tags: ['Jordan', 'Style', 'Outfits', 'Sneakers'],
    related: [
      { slug: 'nike-most-comfortable-running-shoes-2025', title: "Nike's Most Comfortable Shoes", img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { slug: 'best-shoes-for-pakistani-weather-2025', title: 'Best Shoes for Pakistani Weather', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400' },
    ],
  },
  'adidas-ultraboost-vs-nike-react': {
    title: 'Adidas Ultraboost vs Nike React: Which Is Better?',
    category: 'Comparison',
    date: 'May 15, 2025',
    readTime: '6 min read',
    author: 'Bilal Ahmed',
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200',
    content: [
      { type: 'intro', text: 'Two of the most hyped running technologies of the decade go head to head. We tested both extensively to give you a definitive answer on which is better — and for whom.' },
      { type: 'heading', text: 'The Technology' },
      { type: 'text', text: 'Adidas Boost is made from thermoplastic polyurethane (TPU) pellets fused together. It provides excellent energy return and holds up well over time. Nike React is a proprietary foam that\'s lighter, softer, and more responsive than traditional EVA foam.' },
      { type: 'heading', text: 'Comfort: Boost Wins' },
      { type: 'text', text: 'Boost foam has a distinctly plusher feel underfoot. It absorbs impact well and has a slight squish that many runners love. React is firmer and more stable — great for performance but less indulgent for casual wear.' },
      { type: 'heading', text: 'Performance: Too Close to Call' },
      { type: 'text', text: 'For running, both are excellent. Boost offers better energy return on longer distances. React is more consistent across paces and doesn\'t break down as quickly in heat.' },
      { type: 'tip', text: 'Our Pick: For daily wear and casual running, go Ultraboost. For performance running, Nike React Infinity Run edges ahead.' },
      { type: 'heading', text: 'Price & Value' },
      { type: 'text', text: 'Both sit in the $150–$180 range at full price. The Ultraboost goes on sale more frequently. The React holds its price better.' },
      { type: 'heading', text: 'Final Verdict' },
      { type: 'text', text: 'If you want one shoe for everything — work, gym, streets — get the Ultraboost. If you\'re a dedicated runner who wants the best performance foam money can buy, go Nike React.' },
    ],
    tags: ['Adidas', 'Nike', 'Comparison', 'Running'],
    related: [
      { slug: 'nike-most-comfortable-running-shoes-2025', title: "Nike's Most Comfortable Shoes", img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { slug: 'how-to-style-air-jordan-1s', title: 'How to Style Air Jordan 1s', img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400' },
    ],
  },
  'best-shoes-for-pakistani-weather-2025': {
    title: 'Best Shoes for Pakistani Weather (2025)',
    category: 'Guide',
    date: 'April 30, 2025',
    readTime: '7 min read',
    author: 'Fatima Khan',
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200',
    content: [
      { type: 'intro', text: 'Pakistan\'s climate is brutal on footwear. From Karachi\'s coastal humidity to Lahore\'s summer heat and Islamabad\'s occasional rain — your shoes need to handle it all. Here\'s our guide to the best footwear for every Pakistani season.' },
      { type: 'heading', text: 'Summer (April–September): Breathability is Everything' },
      { type: 'text', text: 'When temperatures hit 40°C+, you need shoes with mesh uppers and moisture-wicking linings. The Nike Air Max 270 and Adidas Ultraboost both feature Primeknit uppers that breathe exceptionally well.' },
      { type: 'text', text: 'Avoid leather and synthetic uppers in summer — your feet will thank you. White and light grey colourways also keep feet cooler by reflecting sunlight.' },
      { type: 'heading', text: 'Monsoon (July–September): Waterproofing Matters' },
      { type: 'text', text: 'For Lahore and Karachi monsoon season, look for shoes with water-resistant treatments or Gore-Tex uppers. The Nike React WR ISPA and Adidas Terrex are solid options.' },
      { type: 'tip', text: 'Quick Tip: Spray your sneakers with a water-repellent protector spray before monsoon season. Reapply every 2–3 weeks.' },
      { type: 'heading', text: 'Winter (November–February): Insulation for the North' },
      { type: 'text', text: 'If you\'re in Islamabad or Peshawar, winters get cold. Opt for higher cut shoes with padding. The Nike Air Force 1 High and Timberland boots handle the cold well while still looking sharp.' },
      { type: 'heading', text: 'Our Top Picks by City' },
      { type: 'text', text: 'Karachi: Nike Air Max 270 (year-round breathability). Lahore: Adidas Ultraboost (versatile for all seasons). Islamabad: New Balance 990v5 (durable and weather-resistant).' },
    ],
    tags: ['Guide', 'Pakistan', 'Weather', 'Seasonal'],
    related: [
      { slug: 'nike-most-comfortable-running-shoes-2025', title: "Nike's Most Comfortable Shoes", img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { slug: 'adidas-ultraboost-vs-nike-react', title: 'Ultraboost vs Nike React', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    ],
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = POSTS[slug];

  if (!post) return (
    <div style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48 }}>POST NOT FOUND</h2>
      <Link to="/blog" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>← Back to Blog</Link>
    </div>
  );

  return (
    <div className="blog-post-page">
      {/* Hero */}
      <div className="bp-hero">
        <img src={post.img} alt={post.title} />
        <div className="bp-hero-overlay">
          <div className="container">
            <span className="blog-cat">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="bp-meta">
              <span>✍️ {post.author}</span>
              <span>📅 {post.date}</span>
              <span>⏱ {post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bp-body container">
        <div className="bp-content">
          {post.content.map((block, i) => {
            if (block.type === 'intro') return <p key={i} className="bp-intro">{block.text}</p>;
            if (block.type === 'heading') return <h2 key={i} className="bp-heading">{block.text}</h2>;
            if (block.type === 'text') return <p key={i} className="bp-text">{block.text}</p>;
            if (block.type === 'tip') return (
              <div key={i} className="bp-tip">
                <span>💡</span>
                <p>{block.text}</p>
              </div>
            );
            return null;
          })}

          {/* Tags */}
          <div className="bp-tags">
            {post.tags.map(tag => (
              <span key={tag} className="bp-tag">{tag}</span>
            ))}
          </div>

          {/* Back */}
          <Link to="/blog" className="bp-back">← Back to Blog</Link>
        </div>

        {/* Related */}
        <aside className="bp-sidebar">
          <h3>Related Articles</h3>
          {post.related.map(r => (
            <Link key={r.slug} to={`/blog/${r.slug}`} className="bp-related-card">
              <img src={r.img} alt={r.title} />
              <p>{r.title}</p>
            </Link>
          ))}

          <div className="bp-share">
            <h3>Share</h3>
            <div className="bp-share-btns">
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); }}>
                🔗 Copy Link
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}