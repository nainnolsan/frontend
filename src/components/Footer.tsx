import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">Nain.</div>
            <p className="footer-text">Creating amazing digital experiences</p>
          </div>
          <div className="footer-links">
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Dribbble</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Nain Nolasco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
