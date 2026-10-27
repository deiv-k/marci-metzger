import Photo from './Photo.jsx';
import { images } from '../data/images.js';

const tones = ['dark', 'sage', 'sand', 'mid'];

export default function Gallery() {
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="h-xl">Photo gallery</h2>
        <div className="gallery">
          {images.gallery.map((p, i) => (
            <Photo key={p.src} src={p.src} label={p.alt} tone={tones[i % 4]} className={`g g${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
