import './Hero.css';

const Hero = () => {
  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="hero-title">
              My name<br />
              is <span className="highlight">Nain Nolasco</span>
            </h1>
            <p className="hero-subtitle">Full Stack Developer & UI/UX Designer</p>
            <button className="cta-button" onClick={handleContactClick}>
              Contact Me
            </button>
            
            <div className="tags">
              <span className="tag tag-html">HTML</span>
              <span className="tag tag-css">CSS</span>
              <span className="tag tag-js">JavaScript</span>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-container">
              <div className="image-circle">
                <div className="profile-placeholder">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="35" r="15" fill="#666"/>
                    <path d="M 20 80 Q 20 60 50 60 Q 80 60 80 80 Z" fill="#666"/>
                  </svg>
                </div>
              </div>
              <div className="experience-badge">
                <div className="badge-number">5+</div>
                <div className="badge-text">years of experience</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
