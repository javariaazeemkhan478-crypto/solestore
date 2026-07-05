import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, getBrands } from '../api/products';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList } from 'react-icons/fi';
import './ShopPage.css';

const DEMO = [
  { id:1, name:'Air Max 270 React', brand_name:'Nike', price:150, sale_price:120, slug:'air-max-270-react', discount_percentage:20, is_new_arrival:true, primary_image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock:10 },
  { id:2, name:'Ultraboost 22', brand_name:'Adidas', price:180, slug:'ultraboost-22', is_best_seller:true, primary_image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', stock:8 },
  { id:3, name:'Air Jordan 1 Retro High OG', brand_name:'Jordan', price:170, slug:'air-jordan-1-high-og', primary_image:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', stock:5 },
  { id:4, name:'990v5 Made in USA', brand_name:'New Balance', price:185, sale_price:150, slug:'990v5', discount_percentage:19, primary_image:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', stock:12 },
  { id:5, name:'RS-X³ Puzzle', brand_name:'Puma', price:110, sale_price:89, slug:'rs-x3-puzzle', discount_percentage:19, primary_image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', stock:7 },
  { id:6, name:'Old Skool Platform', brand_name:'Vans', price:80, slug:'old-skool-platform', is_new_arrival:true, primary_image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', stock:15 },
  { id:7, name:'Chuck 70 High Top', brand_name:'Converse', price:85, sale_price:70, slug:'chuck-70-high', discount_percentage:18, primary_image:'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400', stock:9 },
  { id:8, name:"Air Force 1 '07", brand_name:'Nike', price:100, slug:'air-force-1-07', primary_image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', stock:20 },
  { id:9, name:'Stan Smith', brand_name:'Adidas', price:90, sale_price:75, slug:'stan-smith', discount_percentage:17, primary_image:'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400', stock:14 },
  { id:10, name:'Air Jordan 4 Retro', brand_name:'Jordan', price:200, slug:'air-jordan-4-retro', is_featured:true, primary_image:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', stock:3 },
  { id:11, name:'Fresh Foam 1080v12', brand_name:'New Balance', price:160, sale_price:140, slug:'fresh-foam-1080', discount_percentage:13, primary_image:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', stock:6 },
  { id:12, name:'Suede Classic XXI', brand_name:'Puma', price:70, slug:'suede-classic-xxi', primary_image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', stock:11 },
  { id:13, name:'Gel-Nimbus 24', brand_name:'Asics', price:155, slug:'gel-nimbus-24', primary_image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock:8 },
  { id:14, name:'Classic Leather', brand_name:'Reebok', price:75, sale_price:55, slug:'classic-leather', discount_percentage:27, primary_image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', stock:16 },
  { id:15, name:'Nike Dunk Low', brand_name:'Nike', price:110, slug:'nike-dunk-low', is_new_arrival:true, primary_image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock:4 },
  { id:16, name:'Yeezy 350 V2', brand_name:'Adidas', price:220, slug:'yeezy-350-v2', primary_image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', stock:2 },
  { id:17, name:'Air Jordan 11 Retro', brand_name:'Jordan', price:185, slug:'air-jordan-11-retro', primary_image:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', stock:5 },
  { id:18, name:'574 Core', brand_name:'New Balance', price:89, slug:'574-core', primary_image:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', stock:18 },
  { id:19, name:'Mayze Stack', brand_name:'Puma', price:95, sale_price:75, slug:'mayze-stack', discount_percentage:21, primary_image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', stock:7 },
  { id:20, name:'Era Classic', brand_name:'Vans', price:65, slug:'era-classic', primary_image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', stock:22 },
  { id:21, name:'Run Star Hike', brand_name:'Converse', price:110, slug:'run-star-hike', primary_image:'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400', stock:6 },
  { id:22, name:'Blazer Mid 77', brand_name:'Nike', price:105, slug:'blazer-mid-77', primary_image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', stock:9 },
  { id:23, name:'NMD_R1', brand_name:'Adidas', price:130, slug:'nmd-r1', is_new_arrival:true, primary_image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', stock:11 },
  { id:24, name:'Air Max 90', brand_name:'Nike', price:120, sale_price:98, slug:'air-max-90', discount_percentage:18, primary_image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock:14 },
];

const ITEMS_PER_PAGE = 12;

export default function ShopPage({ sale = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('grid');

  const search = searchParams.get('search') || '';
  const genderParam = searchParams.get('gender') || '';
  const categoryParam = searchParams.get('category') || '';

  // Build page title
  let pageTitle = 'ALL SHOES';
  if (sale) pageTitle = 'SALE';
  else if (genderParam === 'M') pageTitle = "MEN'S SHOES";
  else if (genderParam === 'W') pageTitle = "WOMEN'S SHOES";
  else if (genderParam === 'K') pageTitle = "KIDS' SHOES";
  else if (search) pageTitle = `"${search.toUpperCase()}"`;
  else if (categoryParam) pageTitle = categoryParam.toUpperCase();

  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (genderParam) params.gender = genderParam;
    if (categoryParam) params.category = categoryParam;
    if (sale) params.sale = true;
    getProducts(params)
      .then(r => {
        const data = r.data.results || r.data;
        if (Array.isArray(data) && data.length > 0) setProducts(data);
        else setProducts(DEMO);
      })
      .catch(() => setProducts(DEMO))
      .finally(() => setLoading(false));
  }, [search, genderParam, categoryParam, sale]);

  // Filter + Sort
  let filtered = [...products];
  if (sale) filtered = filtered.filter(p => p.sale_price);
  if (selectedBrands.length) filtered = filtered.filter(p => selectedBrands.includes(p.brand_name));
  if (selectedGenders.length) filtered = filtered.filter(p => selectedGenders.includes(p.gender));
  filtered = filtered.filter(p => (p.sale_price || p.price) <= maxPrice);
  if (sort === 'price_asc') filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
  if (sort === 'price_desc') filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
  if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedGenders([]);
    setMaxPrice(500);
    setSelectedSizes([]);
  };

  const activeFilterCount = selectedBrands.length + selectedGenders.length + (maxPrice < 500 ? 1 : 0);

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-hero">
        <div className="container">
          <h1 className="section-title">{pageTitle}</h1>
          <p>{filtered.length} products found</p>
        </div>
      </div>

      <div className="container shop-body">
        {/* Sidebar */}
        <aside className={`shop-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="sidebar-top">
            <h3>Filters {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}</h3>
            <div className="sidebar-top-actions">
              {activeFilterCount > 0 && <button className="clear-btn" onClick={clearFilters}>Clear all</button>}
              <button className="sidebar-close" onClick={() => setShowFilters(false)}><FiX /></button>
            </div>
          </div>

          <FilterGroup title="Gender">
            {[['M','Men'], ['W','Women'], ['K','Kids'], ['U','Unisex']].map(([val, label]) => (
              <label key={val} className="filter-label">
                <input type="checkbox" checked={selectedGenders.includes(val)}
                  onChange={() => {
                    setSelectedGenders(prev => prev.includes(val) ? prev.filter(g => g !== val) : [...prev, val]);
                    setCurrentPage(1);
                  }} />
                <span>{label}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Brand">
            {['Nike','Adidas','Jordan','New Balance','Puma','Vans','Converse','Reebok','Asics'].map(b => (
              <label key={b} className="filter-label">
                <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
                <span>{b}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title={`Max Price: $${maxPrice}`}>
            <input type="range" min={20} max={500} step={10} value={maxPrice}
              onChange={e => { setMaxPrice(+e.target.value); setCurrentPage(1); }}
              className="price-slider" />
            <div className="price-range-labels"><span>$20</span><span>$500</span></div>
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="size-grid">
              {['6','7','8','9','10','11','12','13'].map(s => (
                <button key={s}
                  className={`size-chip ${selectedSizes.includes(s) ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
                    setCurrentPage(1);
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Availability">
            {['In Stock','On Sale','New Arrivals','Best Sellers'].map(a => (
              <label key={a} className="filter-label">
                <input type="checkbox" /><span>{a}</span>
              </label>
            ))}
          </FilterGroup>
        </aside>

        {/* Overlay */}
        {showFilters && <div className="sidebar-overlay" onClick={() => setShowFilters(false)} />}

        {/* Main */}
        <main className="shop-main">
          <div className="shop-toolbar">
            <button className="btn btn-outline filter-toggle-btn" onClick={() => setShowFilters(true)}>
              <FiFilter /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <div className="toolbar-right">
              <div className="view-toggle">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><FiGrid /></button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><FiList /></button>
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                <option value="">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading shoes..." />
          ) : paginated.length === 0 ? (
            <div className="no-results">
              <span>😕</span>
              <h3>No shoes found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div className={`products-grid ${view === 'list' ? 'products-list' : 'products-grid-3'}`}>
                {paginated.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-group">
      <button className="filter-group-title" onClick={() => setOpen(!open)}>
        {title} <FiChevronDown className={`fg-icon ${open ? 'open' : ''}`} />
      </button>
      {open && <div className="filter-group-body">{children}</div>}
    </div>
  );
}