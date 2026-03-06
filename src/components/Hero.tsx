import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [showTitle, setShowTitle] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorLine, setCursorLine] = useState(1);

  useEffect(() => {
    let timeoutId: number;
    let line1Value = '';
    let line2Value = '';
    
    const runAnimation = async () => {
      // Step 1: Write "HELLO WORLD"
      line1Value = await typeText('HELLO WORLD', setLine1, line1Value, 100);
      await wait(800);
      
      // Step 2: Delete and write "Helloworld" (no space)
      line1Value = await deleteAndType('HELLO WORLD', 'Helloworld', setLine1, 50, 100);
      await wait(800);
      
      // Step 3: Go back and add space -> "Hello world"
      line1Value = await deleteAndType('Helloworld', 'Hello world', setLine1, 50, 100);
      await wait(800);
      
      // Step 4: Fix capitalization and add "!" -> "Hello World !"
      line1Value = await deleteAndType('Hello world', 'Hello World !', setLine1, 50, 100);
      await wait(1000);
      
      // Step 5: Move to line 2 and write "My name is Nain Nolasco"
      setCursorLine(2);
      await wait(300);
      line2Value = await typeText('My name is ', setLine2, line2Value, 80);
      line2Value = await typeText('My name is Nain Nolasco', setLine2, line2Value, 80);
      await wait(800);
      
      // Hide cursor and show final title
      setShowCursor(false);
      await wait(500);
      setShowTitle(true);
    };

    const typeText = (
      fullText: string, 
      setter: React.Dispatch<React.SetStateAction<string>>, 
      currentValue: string, 
      speed: number
    ): Promise<string> => {
      return new Promise((resolve) => {
        let currentIndex = currentValue.length;
        const interval = setInterval(() => {
          if (currentIndex < fullText.length) {
            const newText = fullText.substring(0, currentIndex + 1);
            setter(newText);
            currentIndex++;
          } else {
            clearInterval(interval);
            resolve(fullText);
          }
        }, speed);
      });
    };

    const deleteAndType = (
      oldText: string, 
      newText: string, 
      setter: React.Dispatch<React.SetStateAction<string>>, 
      deleteSpeed: number, 
      typeSpeed: number
    ): Promise<string> => {
      return new Promise((resolve) => {
        // Find common prefix
        let commonLength = 0;
        for (let i = 0; i < Math.min(oldText.length, newText.length); i++) {
          if (oldText[i].toLowerCase() === newText[i].toLowerCase()) {
            commonLength++;
          } else {
            break;
          }
        }

        let currentLength = oldText.length;

        // Delete from end to common point
        const deleteInterval = setInterval(() => {
          if (currentLength > commonLength) {
            setter(oldText.substring(0, currentLength - 1));
            currentLength--;
          } else {
            clearInterval(deleteInterval);
            
            // Now type the new part
            let newIndex = commonLength;
            const typeInterval = setInterval(() => {
              if (newIndex < newText.length) {
                setter(newText.substring(0, newIndex + 1));
                newIndex++;
              } else {
                clearInterval(typeInterval);
                resolve(newText);
              }
            }, typeSpeed);
          }
        }, deleteSpeed);
      });
    };

    const wait = (ms: number) => new Promise<void>(resolve => {
      timeoutId = setTimeout(resolve, ms);
    });

    runAnimation();

    return () => clearTimeout(timeoutId);
  }, []);

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
            {!showTitle && (
              <div className="typing-container">
                <div className="typing-line">
                  {line1}
                  {cursorLine === 1 && showCursor && <span className="cursor">|</span>}
                </div>
                {line2 && (
                  <div className="typing-line">
                    {line2}
                    {cursorLine === 2 && showCursor && <span className="cursor">|</span>}
                  </div>
                )}
              </div>
            )}
            
            {showTitle && (
              <div className="title-animation">
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
            )}
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
