import { useState } from 'react';
import { site } from '../data/content.js';

// Real Google Map of the office (no API key needed for this embed).
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`;

function OfficeMap() {
  return (
    <iframe
      className="map-frame"
      title="Map showing the Marci Metzger office at 3190 HW-160, Suite F, Pahrump, Nevada"
      src={mapSrc}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your message.');
      setStatus('sent');
      setForm({ name: '', email: '' });
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <section className="section">
      <div className="wrap">
        <h2 className="h-xl">Call or visit</h2>
        <div className="contact-grid">
          <form className="card form-card" onSubmit={onSubmit} aria-label="Send message" noValidate>
            <h3>Send message</h3>
            <label>Name
              <input type="text" autoComplete="name" value={form.name} onChange={set('name')} />
            </label>
            <label>Email *
              <input type="email" autoComplete="email" required value={form.email} onChange={set('email')} />
            </label>
            <button className="btn btn-field" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            <div aria-live="polite">
              {status === 'sent' && <p className="msg ok">Thanks! Marci will be in touch soon.</p>}
              {status === 'error' && <p className="msg error">{error}</p>}
            </div>
            <p className="fine">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
          </form>

          <div className="card visit-card">
            <div>
              <h3>{site.name} · {site.group}</h3>
              <p>{site.address}</p>
              <a className="phone-link" href={site.phoneHref}>(206) 919-6886</a>
            </div>
            <div>
              <h4>Office hours</h4>
              <p>{site.hours}</p>
              <p className="small">{site.hoursNote}</p>
            </div>
            <OfficeMap />
            <a className="btn btn-dark" href={site.mapsHref} target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
        </div>
      </div>
    </section>
  );
}
