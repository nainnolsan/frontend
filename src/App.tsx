import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import Footer from './components/Footer'
import Login from './components/Login'
import SignIn from './components/SignIn'
import ThemeToggle from './components/ThemeToggle'
import { FiActivity, FiCheckCircle, FiClock, FiCode, FiFilter, FiGrid, FiSearch, FiSliders, FiX } from 'react-icons/fi'
import { TbLayoutSidebar } from 'react-icons/tb'

type ProjectType = 'API' | 'Frontend' | 'Full Stack'
type ProjectStatus = 'Production' | 'In Progress' | 'Completed'

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  docUrl?: string;
  projectUrl?: string;
  type: ProjectType;
  status: ProjectStatus;
  year: number;
}

function AppContent() {
  const { currentPage, setPage } = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<'All' | ProjectType>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProjectStatus>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'featured' | 'alpha'>('recent');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const projects: ProjectItem[] = [
    {
      title: "Auth Service REST API",
      description: "Authentication microservice with secure login, refresh tokens, profile endpoint, and production-ready PostgreSQL persistence.",
      tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "TypeORM", "JWT", "Bcrypt", "Docker"],
      featured: true,
      projectUrl: "https://nain.mintlify.app/apis/auth-service/overview",
      type: 'API',
      status: 'Production',
      year: 2026,
    },
    {
      title: "Task Management App",
      description: "Real-time collaborative task manager built with React and GraphQL. Supports team workspaces and live updates.",
      tags: ["React", "GraphQL", "WebSocket"],
      docUrl: "#",
      projectUrl: "#",
      type: 'Full Stack',
      status: 'In Progress',
      year: 2025,
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive maps using modern APIs.",
      tags: ["TypeScript", "React", "APIs"],
      docUrl: "#",
      projectUrl: "#",
      type: 'Frontend',
      status: 'Completed',
      year: 2024,
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with dark mode, smooth animations and responsive design built with React and Tailwind CSS.",
      tags: ["React", "Tailwind", "TypeScript"],
      projectUrl: "#",
      type: 'Frontend',
      status: 'Production',
      year: 2026,
    },
  ];

  const allTechnologies = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects],
  );

  const resetFilters = () => {
    setSearch('');
    setSelectedTechs([]);
    setSelectedType('All');
    setSelectedStatus('All');
    setSortBy('recent');
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) => (prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]));
  };

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = projects.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesTech = selectedTechs.length === 0 || selectedTechs.every((tech) => project.tags.includes(tech));
      const matchesType = selectedType === 'All' || project.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

      return matchesSearch && matchesTech && matchesType && matchesStatus;
    });

    const sorted = [...filtered];

    if (sortBy === 'featured') {
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.year - a.year);
      return sorted;
    }

    if (sortBy === 'alpha') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      return sorted;
    }

    sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [projects, search, selectedTechs, selectedType, selectedStatus, sortBy]);

  const productionCount = filteredProjects.filter((project) => project.status === 'Production').length;
  const inProgressCount = filteredProjects.filter((project) => project.status === 'In Progress').length;
  const featuredCount = filteredProjects.filter((project) => project.featured).length;

  const iconRailClass = 'w-10 h-10 inline-flex items-center justify-center rounded-lg border border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors';

  const quickFilters = [
    {
      label: 'All Projects',
      icon: <FiGrid className="w-5 h-5" />,
      onClick: resetFilters,
      active: selectedStatus === 'All' && selectedType === 'All' && selectedTechs.length === 0 && search.length === 0,
    },
    {
      label: 'Production',
      icon: <FiCheckCircle className="w-5 h-5" />,
      onClick: () => setSelectedStatus('Production'),
      active: selectedStatus === 'Production',
    },
    {
      label: 'In Progress',
      icon: <FiClock className="w-5 h-5" />,
      onClick: () => setSelectedStatus('In Progress'),
      active: selectedStatus === 'In Progress',
    },
    {
      label: 'Featured First',
      icon: <FiActivity className="w-5 h-5" />,
      onClick: () => setSortBy('featured'),
      active: sortBy === 'featured',
    },
  ];

  const filterPanel = (
    <div className="h-full flex flex-col bg-white dark:bg-[#0f0f11] text-gray-700 dark:text-gray-200">
      <div className={`border-b border-gray-200 dark:border-white/10 ${sidebarCollapsed ? 'px-2 pt-4 pb-3' : 'px-4 pt-4 pb-3'}`}>
        <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && <h2 className="text-sm font-semibold text-black dark:text-white tracking-wide">Projects Workspace</h2>}
          <button
            type="button"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className={sidebarCollapsed
              ? iconRailClass
              : 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors'}
            aria-label={sidebarCollapsed ? 'Expand filters' : 'Collapse filters'}
            title={sidebarCollapsed ? 'Expand filters' : 'Collapse filters'}
          >
            <TbLayoutSidebar className="w-5 h-5" />
            {!sidebarCollapsed && 'Collapse'}
          </button>
        </div>
      </div>

      {sidebarCollapsed && (
        <div className="flex-1 px-2 py-4 flex flex-col items-center">
          <div className="flex flex-col items-center gap-3 w-full">
            {quickFilters.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                title={item.label}
                aria-label={item.label}
                className={`${iconRailClass} ${item.active ? 'bg-gray-200 dark:bg-white/15 text-black dark:text-white border-gray-300 dark:border-white/30' : ''}`}
              >
                {item.icon}
              </button>
            ))}
            <div className="w-8 border-t border-gray-200 dark:border-white/10 my-2" />
            <button
              type="button"
              onClick={resetFilters}
              title="Clear Filters"
              aria-label="Clear Filters"
              className={iconRailClass}
            >
              <FiSliders className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {!sidebarCollapsed && (
        <>
          <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-500 mb-2">Navigation</p>
            <div className="space-y-1">
              <button
                type="button"
                className="w-full text-left px-3 py-2 rounded-md bg-gray-100 dark:bg-white/10 text-black dark:text-white text-sm flex items-center gap-2"
              >
                <FiGrid className="w-4 h-4 text-black dark:text-white" />
                All Projects
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('Production')}
                className="w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <FiCheckCircle className="w-4 h-4" />
                Production Ready
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('In Progress')}
                className="w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <FiClock className="w-4 h-4" />
                In Progress
              </button>
              <button
                type="button"
                onClick={() => setSortBy('featured')}
                className="w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <FiActivity className="w-4 h-4" />
                Featured First
              </button>
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Search</label>
            <div className="relative">
              <FiSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by name, tech, or keyword"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black text-sm text-black dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
              />
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3 block">Technologies</label>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => {
                const active = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTech(tech)}
                    className={`px-2.5 py-1.5 rounded-full text-xs border transition-colors ${
                      active
                        ? 'bg-gray-200 dark:bg-white/15 text-black dark:text-white border-gray-300 dark:border-white/30'
                        : 'bg-white dark:bg-black/20 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-white/15 hover:border-gray-500 dark:hover:border-white/40 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'All' | ProjectType)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
            >
              <option value="All">All</option>
              <option value="API">API</option>
              <option value="Frontend">Frontend</option>
              <option value="Full Stack">Full Stack</option>
            </select>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'All' | ProjectStatus)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
            >
              <option value="All">All</option>
              <option value="Production">Production</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'featured' | 'alpha')}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
            >
              <option value="recent">Most Recent</option>
              <option value="featured">Featured First</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-3">Overview</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-300">Showing</span>
                <span className="text-black dark:text-white font-semibold">{filteredProjects.length}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-300">Production</span>
                <span className="text-black dark:text-white font-semibold">{productionCount}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-300">In Progress</span>
                <span className="text-black dark:text-white font-semibold">{inProgressCount}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-300">Featured</span>
                <span className="text-black dark:text-white font-semibold">{featuredCount}</span>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 mt-auto">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/15 text-sm font-medium text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <FiX className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </>
      )}
    </div>
  );

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
      <div className="min-h-screen text-black dark:text-white transition-colors bg-white dark:bg-black">
        <Navbar />

        <section className="bg-white dark:bg-black py-10 md:py-12">
          <div className="max-w-[1500px] mx-auto px-4 md:px-6">
            <div className={`transition-all ${sidebarCollapsed ? 'lg:ml-28' : 'lg:ml-[344px]'}`}>
              <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">Projects</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Browse your work with a collapsible side menu.</p>
            </div>

            <div className="lg:hidden mb-6">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/15 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="absolute inset-0 bg-black/50"
                  aria-label="Close filters"
                />
                <aside className="absolute left-0 top-0 h-full w-[85%] max-w-xs bg-white dark:bg-[#0f0f11] border-r border-gray-200 dark:border-white/10 text-black dark:text-white">
                  <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-black dark:text-white">Project Filters</h2>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                      aria-label="Close menu"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="h-[calc(100%-57px)] overflow-y-auto">{filterPanel}</div>
                </aside>
              </div>
            )}

            <div className="flex gap-6 xl:gap-8">
              <aside
                className={`hidden lg:block sticky top-24 self-start rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0f0f11] overflow-hidden transition-all ${
                  sidebarCollapsed ? 'w-20' : 'w-80'
                }`}
              >
                {filterPanel}
              </aside>

              <div className="flex-1">
                {filteredProjects.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 dark:border-white/20 bg-white dark:bg-black p-10 text-center">
                    <p className="text-lg font-semibold text-black dark:text-white">No projects with these filters</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Try another combination or clear the current filters.</p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/15 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-black px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiCode className="w-4 h-4 text-black dark:text-white" />
                        <span>
                          Showing <span className="text-black dark:text-white font-semibold">{filteredProjects.length}</span> project results
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Sort: <span className="text-gray-900 dark:text-gray-200">{sortBy === 'recent' ? 'Most Recent' : sortBy === 'featured' ? 'Featured First' : 'Alphabetical'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                      ))}
                    </div>
                  </>
                )}
              </div>
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
