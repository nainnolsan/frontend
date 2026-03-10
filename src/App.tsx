import { NavigationProvider, useNavigation } from './context/NavigationContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import SignIn from './components/SignIn'

function AppContent() {
  const { currentPage, setPage } = useNavigation();

  // Simple navigation handling
  if (currentPage === 'login') {
    return <Login onSwitchToSignup={() => setPage('signup')} />;
  }

  if (currentPage === 'signup') {
    return <SignIn onSwitchToLogin={() => setPage('login')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App
