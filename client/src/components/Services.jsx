import Photo from './Photo.jsx';
import { images } from '../data/images.js';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYelp } from 'react-icons/fa6';
import { services, socials } from '../data/content.js';

const icons = { Facebook: FaFacebookF, Instagram: FaInstagram, LinkedIn: FaLinkedinIn, Yelp: FaYelp };

const tones = ['sage', 'sand', 'mid'];

export default function Services() {
  return (
    <section id="services" className="section section-dark">
      <div className="wrap">
        <h2 className="h-xl">Our services</h2>
        <div className="grid-3 services">
          {services.map((s, i) => (
            <article key={s.label} className="service">
              <Photo src={images.services[i].src} label={images.services[i].alt} tone={tones[i]} className="service-photo" />
              <p className="eyebrow sand">{s.label}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
        <div className="socials">
          <span className="eyebrow sand">Follow along</span>
          {socials.map((s) => {
            const Icon = icons[s.label];
            return (
              <a key={s.label} className="soc" href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
