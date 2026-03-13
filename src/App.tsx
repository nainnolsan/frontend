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

  const projects = [
    {
      title: "Auth Service REST API",
      description: "Authentication microservice with secure login, refresh tokens, profile endpoint, and production-ready PostgreSQL persistence.",
      tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "TypeORM", "JWT", "Bcrypt", "Docker"],
      featured: true,
      projectUrl: "https://nain.mintlify.app/apis/auth-service/overview"
    },
    {
      title: "Task Management App",
      description: "Real-time collaborative task manager built with React and GraphQL. Supports team workspaces and live updates.",
      tags: ["React", "GraphQL", "WebSocket"],
      docUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive maps using modern APIs.",
      tags: ["TypeScript", "React", "APIs"],
      docUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with dark mode, smooth animations and responsive design built with React and Tailwind CSS.",
      tags: ["React", "Tailwind", "TypeScript"],
      projectUrl: "#"
    },
  ];

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

  if (currentPage === 'projects') {
    return (
      <div className="min-h-screen text-black dark:text-white transition-colors">
        <Navbar />

        <section className="bg-white dark:bg-black transition-colors py-14 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">My Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-10">
              A curated list of projects with direct links to documentation and live implementations.
            </p>

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
    );
  }

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
