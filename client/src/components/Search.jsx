import { useState } from 'react';
import Photo from './Photo.jsx';
import { images } from '../data/images.js';
import { sortOptions } from '../data/content.js';

const initial = { location: '', type: '', beds: '', baths: '', minPrice: '', maxPrice: '', sort: 'newest' };
const money = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const tones = ['sage', 'sand', 'mid', 'dark'];

export default function Search() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [results, setResults] = useState([]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const params = new URLSearchParams(Object.entries(form).filter(([, v]) => v !== ''));
      const res = await fetch(`/api/listings?${params}`);
      if (!res.ok) throw new Error('bad response');
      const data = await res.json();
      setResults(data.listings);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="listings" className="section section-white">
      <div className="wrap">
        <h2 className="h-xl narrow">Find your dream home</h2>

        <form className="search" onSubmit={onSubmit} aria-label="Search listings">
          <label>Location
            <input type="text" value={form.location} onChange={set('location')} placeholder="City, zip or area" />
          </label>
          <label>Type
            <select value={form.type} onChange={set('type')}>
              <option value="">Any type</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </label>
          <label>Bedrooms
            <select value={form.beds} onChange={set('beds')}>
              <option value="">Any Number</option>
              <option value="0">Studio</option>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </label>
          <label>Baths
            <select value={form.baths} onChange={set('baths')}>
              <option value="">Any Number</option>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </label>
          <label>Min Price
            <input type="number" inputMode="numeric" min="0" value={form.minPrice} onChange={set('minPrice')} placeholder="No min" />
          </label>
          <label>Max Price
            <input type="number" inputMode="numeric" min="0" value={form.maxPrice} onChange={set('maxPrice')} placeholder="No max" />
          </label>
          <label>Sort By
            <select value={form.sort} onChange={set('sort')}>
              {sortOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <button className="btn btn-field" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Searching…' : 'Search Now'}
          </button>
        </form>

        <div aria-live="polite" className="search-status">
          {status === 'error' && <p className="msg error">We couldn't load listings right now. Please call us at 206-919-6886.</p>}
          {status === 'done' && results.length === 0 && <p className="msg">No listings match that search. Try widening your filters.</p>}
          {status === 'done' && results.length > 0 && <p className="msg">{results.length} sample listing{results.length > 1 ? 's' : ''} found</p>}
        </div>

        {status === 'done' && results.length > 0 ? (
          <ul className="results">
            {results.map((l, i) => (
              <li key={l.id} className="result">
                <Photo src={images.listings[i % 4].src} label={l.title} tone={tones[i % 4]} className="result-photo" />
                <p className="result-price">{money(l.price)}</p>
                <p className="result-title">{l.title}</p>
                <p className="result-meta">{l.beds === 0 ? 'Studio' : `${l.beds} bd`} · {l.baths} ba · {l.sqft?.toLocaleString()} sqft · {l.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="listing-strip">
            {images.listings.map((p, i) => (
              <Photo key={p.src} src={p.src} label={p.alt} tone={tones[i]} className="strip-photo" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
