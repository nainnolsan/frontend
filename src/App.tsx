import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import Footer from './components/Footer'
import Login from './components/Login'
import SignIn from './components/SignIn'
import ThemeToggle from './components/ThemeToggle'

function AppContent() {
  const { currentPage, setPage } = useNavigation();

  // Simple navigation handling
  if (currentPage === 'login') {
    return (
      <>
        <Login onSwitchToSignup={() => setPage('signup')} />
        <ThemeToggle />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        <SignIn onSwitchToLogin={() => setPage('login')} />
        <ThemeToggle />
      </>
    );
  }

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, product management, and payment integration.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      featured: true
    },
    {
      title: "Task Management App",
      description: "Real-time collaborative task manager built with React and GraphQL. Supports team workspaces and live updates.",
      tags: ["React", "GraphQL", "WebSocket"],
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive maps using modern APIs.",
      tags: ["TypeScript", "React", "APIs"],
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with dark mode, smooth animations and responsive design built with React and Tailwind CSS.",
      tags: ["React", "Tailwind", "TypeScript"],
    },
  ];

  return (
    <div className="min-h-screen text-black dark:text-white transition-colors">
      <Navbar />
      
      {/* Hero Section - Fondo Negro */}
      <section className="bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <Hero />
        </div>
      </section>
      
      {/* Projects Section - Fondo Negro */}
      <section className="bg-white dark:bg-black transition-colors py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ThemeToggle />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App
