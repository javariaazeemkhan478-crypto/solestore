import './InfoPages.css';
const SIZES = [[6,39,'24.0'],[7,40,'24.6'],[8,41,'25.4'],[9,42,'26.2'],[10,43,'27.0'],[11,44,'27.9'],[12,45,'28.6'],[13,46,'29.4']];
export default function SizeGuidePage() {
  return (
    <div className="info-body container" style={{paddingTop:60}}>
      <span className="section-eyebrow">Fit Guide</span>
      <h1 className="section-title" style={{marginBottom:16}}>SIZE GUIDE</h1>
      <p style={{color:'var(--gray-400)',marginBottom:40,maxWidth:600}}>Measure your foot length while standing, then find your size in the chart below. When between sizes, we recommend sizing up.</p>
      <div className="info-table-wrap">
        <table className="info-table">
          <thead><tr><th>US Size</th><th>EU Size</th><th>Foot Length (cm)</th><th>Width</th></tr></thead>
          <tbody>{SIZES.map(([us,eu,cm]) => <tr key={us}><td>{us}</td><td>{eu}</td><td>{cm} cm</td><td>Standard</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}