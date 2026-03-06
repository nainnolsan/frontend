import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach((card) => {
              card.classList.add('animate');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm Nain Nolasco, a passionate full stack developer dedicated to creating 
              incredible digital experiences. With over 5 years of experience in the industry, 
              I've worked on projects ranging from web applications to mobile solutions.
            </p>
            <p>
              I specialize in creating intuitive user interfaces and robust backends. My goal 
              is always to deliver solutions that not only look great but also work flawlessly.
            </p>
            <p>
              When I'm not coding, I enjoy exploring new technologies, contributing to open 
              source projects, and sharing my knowledge with the community.
            </p>
          </div>
          <div className="about-stats" ref={statsRef}>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Completed Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">30+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
