import { useState } from 'react';

// Image with a labelled placeholder fallback if the file is missing.
export default function Photo({ src, label, tone = 'sage', className = '', priority = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`photo ph ph-${tone} ${className}`} role="img" aria-label={label}>
        <span>{label}</span>
      </div>
    );
  }
  return (
    <div className={`photo ${className}`}>
      <img
        src={src}
        alt={label}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
