import { useEffect, useState } from 'react';

export default function Footer() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    try {
      setAccepted(localStorage.getItem('cookies-accepted') === '1');
    } catch {
      setAccepted(false);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem('cookies-accepted', '1'); } catch { /* ignore */ }
    setAccepted(true);
  };

  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <p>Copyright © {new Date().getFullYear()} Marci Metzger. All Rights Reserved.</p>
        {!accepted && (
          <p className="cookie">
            This website uses cookies to analyze traffic and optimize your experience.{' '}
            <button type="button" className="link-btn" onClick={accept}>Accept</button>
          </p>
        )}
      </div>
    </footer>
  );
}
