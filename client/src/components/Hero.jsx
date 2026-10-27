import { useState } from 'react';
import Photo from './Photo.jsx';
import { images } from '../data/images.js';
import { site } from '../data/content.js';

export default function Hero() {
  const [bgFailed, setBgFailed] = useState(false);

  return (
    <>
      <section id="top" className="hero">
        {!bgFailed && (
          <div className="hero-bg" aria-hidden="true">
            <img src={images.hero} alt="" decoding="async" fetchPriority="high" onError={() => setBgFailed(true)} />
          </div>
        )}
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow sand">{site.name} · {site.group}</p>
            <h1>Pahrump Realtor</h1>
            <p className="lead">Nearly three decades helping neighbors buy, sell and invest across Southern Nevada.</p>
            <div className="hero-actions">
              <a className="btn" href={site.phoneHref}>Call Now</a>
              <a className="link-light" href="#listings">Search listings</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="intro">
        <div className="wrap">
          <div className="card intro-card">
            <Photo src={images.marci} label="Marci Metzger" tone="mid" className="headshot" priority />
            <div className="intro-copy">
              <p className="eyebrow rust">Realtor for nearly 3 decades</p>
              <h2>Marci Metzger</h2>
              <p>Over two decades in real estate. Licensed broker in Seattle, now serving Southern Nevada as Pahrump's top real estate agent.</p>
              <div className="intro-actions">
                <a className="btn" href={site.phoneHref}>{site.phone}</a>
                <a href="#about">More about Marci</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
