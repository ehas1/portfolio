// Components
const MatrixRain = () => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#33ff33';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
};

const TerminalInput = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const commands = {
    'help': 'Available commands: help, about, skills, projects, contact',
    'about': 'Hi! I\'m Eric Haslam, an AI Researcher & Data Scientist...',
    'skills': 'Python, Machine Learning, Data Science, React, SQL...',
    'projects': 'Check out my projects section below!',
    'contact': 'Email: ericrhaslam@gmail.com'
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const command = input.toLowerCase().trim();
    setOutput(commands[command] || 'Command not found. Type "help" for available commands.');
    setInput('');
  };

  return (
    <div className="terminal-input-container">
      <form onSubmit={handleCommand}>
        <div className="input-line">
          <span className="prompt">{String.fromCharCode(62)}</span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' for commands..."
            autoFocus
          />
        </div>
      </form>
      {output && <div className="terminal-output">{output}</div>}
      <div className="command-suggestions">
        {Object.keys(commands).map(cmd => (
          <span
            key={cmd}
            className="command-suggestion"
            onClick={() => setInput(cmd)}
          >
            {cmd}
          </span>
        ))}
      </div>
    </div>
  );
};

const GlitchText = ({ text }) => {
  return (
    <div className="glitch" data-text={text}>
      {text}
    </div>
  );
};

// Main App Component
const App = () => {
  React.useEffect(() => {
    // Hide loader when app is mounted
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);

  return (
    <>
      <MatrixRain />
      <nav>
        <div className="container nav-container">
          <div className="logo">
            <GlitchText text={`${String.fromCharCode(62)} EH_`} />
          </div>
          <div className="nav-links">
            <a href="#experience">{`${String.fromCharCode(62)} experience`}</a>
            <a href="#projects">{`${String.fromCharCode(62)} projects`}</a>
            <a href="#volunteer">{`${String.fromCharCode(62)} volunteer`}</a>
            <a href="#media">{`${String.fromCharCode(62)} media`}</a>
          </div>
        </div>
      </nav>

      <main>
        <header id="header">
          <div className="container">
            <GlitchText text="Eric Haslam" />
            <h2 className="subtitle">
              {`${String.fromCharCode(62)} Artificial Intelligence Researcher & Data Scientist`}
            </h2>
            <TerminalInput />
            <div className="intro-text">
              <p>I'm a junior at <span className="highlight">Brigham Young University</span> pursuing a degree in <a href="https://acme.byu.edu/" target="_blank" rel="noopener noreferrer">Applied and Computational Mathematics (ACME)</a> with an emphasis in Biology and a minor in Business. My passion lies in leveraging AI and data to solve complex problems.</p>
              <p>In my free time, I enjoy staying active through pickleball, basketball, golfing, hiking, and skiing. When I'm not outdoors, I'm into strategic board games with friends and family.</p>
            </div>
          </div>
        </header>

        {/* Your existing sections will be added here */}
      </main>
    </>
  );
};

// Initialize React
const startApp = () => {
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
};

// Start the app when the document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
} 