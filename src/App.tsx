import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
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
