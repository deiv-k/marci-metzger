import Photo from './Photo.jsx';
import { images } from '../data/images.js';
import { sold } from '../data/content.js';

export default function GetItSold() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow rust">Top residential sales, last 5 years</p>
        <h2 className="h-xl">Get it sold</h2>
        <div className="grid-3">
          {sold.map((s, i) => (
            <article key={s.title} className={`card sold sold-${s.tone}`}>
              <Photo src={images.sold[i].src} label={images.sold[i].alt} tone="sage" className="sold-photo" />
              <p className="big">{s.big}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
