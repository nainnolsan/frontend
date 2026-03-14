import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import Footer from './components/Footer'
import Login from './components/Login'
import SignIn from './components/SignIn'
import ThemeToggle from './components/ThemeToggle'
import { FiCheckCircle, FiClock, FiCode, FiDatabase, FiFilter, FiGrid, FiKey, FiLayers, FiLock, FiServer, FiX } from 'react-icons/fi'
import { SiDocker, SiGraphql, SiNodedotjs, SiPostgresql, SiReact, SiSocketdotio, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { TbLayoutSidebar } from 'react-icons/tb'

type ProjectType = 'API' | 'Frontend' | 'Full Stack'
type ProjectStatus = 'Production Ready' | 'In Progress' | 'Planned Projects'

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
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isTechPickerOpen, setIsTechPickerOpen] = useState(false);
  const [draftTechSelection, setDraftTechSelection] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<'All' | ProjectType>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProjectStatus>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'alpha'>('recent');
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
      status: 'Production Ready',
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
      status: 'Planned Projects',
      year: 2024,
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with dark mode, smooth animations and responsive design built with React and Tailwind CSS.",
      tags: ["React", "Tailwind", "TypeScript"],
      projectUrl: "#",
      type: 'Frontend',
      status: 'Production Ready',
      year: 2026,
    },
  ];

  const allTechnologies = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects],
  );

  const technologyVisuals: Record<string, { Icon: IconType; colorClass: string }> = {
    React: { Icon: SiReact, colorClass: 'text-[#61DAFB]' },
    'Node.js': { Icon: SiNodedotjs, colorClass: 'text-[#5FA04E]' },
    Express: { Icon: FiServer, colorClass: 'text-black dark:text-white' },
    PostgreSQL: { Icon: SiPostgresql, colorClass: 'text-[#4169E1]' },
    TypeORM: { Icon: FiDatabase, colorClass: 'text-[#EF4444]' },
    JWT: { Icon: FiKey, colorClass: 'text-[#F59E0B]' },
    Bcrypt: { Icon: FiLock, colorClass: 'text-[#14B8A6]' },
    Docker: { Icon: SiDocker, colorClass: 'text-[#2496ED]' },
    GraphQL: { Icon: SiGraphql, colorClass: 'text-[#E10098]' },
    WebSocket: { Icon: SiSocketdotio, colorClass: 'text-black dark:text-white' },
    TypeScript: { Icon: SiTypescript, colorClass: 'text-[#3178C6]' },
    Tailwind: { Icon: SiTailwindcss, colorClass: 'text-[#06B6D4]' },
    APIs: { Icon: TbApi, colorClass: 'text-[#22C55E]' },
  };

  const openTechPicker = () => {
    const initialSelection = selectedTechs;
    setDraftTechSelection(initialSelection);
    setIsTechPickerOpen(true);
  };

  const toggleDraftTech = (tech: string) => {
    setDraftTechSelection((prev) => (prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]));
  };

  const saveTechSelection = () => {
    if (draftTechSelection.length === allTechnologies.length) {
      setSelectedTechs([]);
    } else {
      setSelectedTechs(draftTechSelection);
    }
    setIsTechPickerOpen(false);
  };

  const resetFilters = () => {
    setSelectedTechs([]);
    setSelectedType('All');
    setSelectedStatus('All');
    setSortBy('recent');
  };

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesTech = selectedTechs.length === 0 || selectedTechs.some((tech) => project.tags.includes(tech));
      const matchesType = selectedType === 'All' || project.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

      return matchesTech && matchesType && matchesStatus;
    });

    const sorted = [...filtered];

    if (sortBy === 'alpha') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      return sorted;
    }

    sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [projects, selectedTechs, selectedType, selectedStatus, sortBy]);

  const productionCount = filteredProjects.filter((project) => project.status === 'Production Ready').length;
  const inProgressCount = filteredProjects.filter((project) => project.status === 'In Progress').length;
  const plannedCount = filteredProjects.filter((project) => project.status === 'Planned Projects').length;

  const iconRailClass = 'w-10 h-10 inline-flex items-center justify-center rounded-lg border border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors';

  const quickFilters = [
    {
      label: 'All Projects',
      icon: <FiGrid className="w-5 h-5" />,
      onClick: resetFilters,
      active: selectedStatus === 'All' && selectedType === 'All' && selectedTechs.length === 0,
    },
    {
      label: 'Production',
      icon: <FiCheckCircle className="w-5 h-5" />,
      onClick: () => setSelectedStatus('Production Ready'),
      active: selectedStatus === 'Production Ready',
    },
    {
      label: 'In Progress',
      icon: <FiClock className="w-5 h-5" />,
      onClick: () => setSelectedStatus('In Progress'),
      active: selectedStatus === 'In Progress',
    },
    {
      label: 'Planned Projects',
      icon: <FiLayers className="w-5 h-5" />,
      onClick: () => setSelectedStatus('Planned Projects'),
      active: selectedStatus === 'Planned Projects',
    },
  ];

  const filterPanel = (
    <div className="relative h-full flex flex-col bg-white dark:bg-[#0f0f11] text-gray-700 dark:text-gray-200">
      {sidebarCollapsed ? (
        <div className="border-b border-gray-200 dark:border-white/10 px-2 pt-4 pb-3">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(false)}
              className={iconRailClass}
              aria-label="Expand filters"
              title="Expand filters"
            >
              <TbLayoutSidebar className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="border-b border-gray-200 dark:border-white/10 px-3 py-3">
          <button
            type="button"
            onClick={() => setSidebarCollapsed(true)}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Collapse filters"
            title="Collapse filters"
          >
            <TbLayoutSidebar className="w-5 h-5" />
          </button>
        </div>
      )}

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
                onClick={resetFilters}
                className="w-full text-left px-3 py-2 rounded-md bg-gray-100 dark:bg-white/10 text-black dark:text-white text-sm flex items-center gap-2"
              >
                <FiGrid className="w-4 h-4 text-black dark:text-white" />
                All Projects
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('Production Ready')}
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
                onClick={() => setSelectedStatus('Planned Projects')}
                className="w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <FiLayers className="w-4 h-4" />
                Planned Projects
              </button>
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-200 dark:border-white/10">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3 block">Technologies</label>
            <button
              type="button"
              onClick={openTechPicker}
              className="w-full group bg-transparent dark:bg-[#0f0f11] overflow-hidden transition-colors"
              aria-label="Open technologies selector"
            >
              {selectedTechs.length === 0 ? (
                <div className="tech-marquee-track py-2.5">
                  {[...allTechnologies, ...allTechnologies].map((tech, index) => {
                    const visual = technologyVisuals[tech];
                    if (!visual) {
                      return null;
                    }

                    const Icon = visual.Icon;

                    return (
                      <span key={`${tech}-${index}`} className="inline-flex items-center justify-center px-4">
                        <Icon className="w-5 h-5 text-gray-900 dark:text-white transition-transform duration-200 group-hover:scale-105" />
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4 py-2.5">
                  {selectedTechs.map((tech) => {
                    const visual = technologyVisuals[tech];
                    if (!visual) {
                      return null;
                    }

                    const Icon = visual.Icon;

                    return <Icon key={tech} className={`w-5 h-5 ${visual.colorClass}`} />;
                  })}
                </div>
              )}
            </button>
            <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-500">
              Click to choose which technologies are highlighted.
            </p>
          </div>

          {isTechPickerOpen && (
            <div className="fixed inset-0 z-[66]">
              <button
                type="button"
                onClick={() => setIsTechPickerOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-label="Close technologies picker"
              />

              <div className="relative z-10 w-full max-w-2xl mx-auto mt-24 px-4">
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10">
                    <h3 className="text-base font-semibold text-black dark:text-white">Select technologies you want to highlight</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Choose as many as you want. Selected technologies will appear in color in the carousel.
                    </p>
                  </div>

                  <div className="p-4 max-h-[55vh] overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {allTechnologies.map((tech) => {
                        const visual = technologyVisuals[tech];
                        if (!visual) {
                          return null;
                        }

                        const Icon = visual.Icon;
                        const selected = draftTechSelection.includes(tech);

                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleDraftTech(tech)}
                            className={`group flex flex-col items-center justify-center gap-2 p-3 min-h-[96px] rounded-xl border text-sm transition-colors ${
                              selected
                                ? 'border-gray-400 dark:border-white/30 bg-gray-100 dark:bg-white/10 text-black dark:text-white'
                                : 'border-gray-300 dark:border-white/15 bg-white dark:bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                          >
                            <Icon className={`w-7 h-7 transition-colors ${selected ? visual.colorClass : 'text-gray-500 dark:text-gray-500'}`} />
                            <span className="text-[11px] font-medium text-center leading-tight">{tech}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsTechPickerOpen(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-white/15 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveTechSelection}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-white/15 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              <option value="Production Ready">Production Ready</option>
              <option value="In Progress">In Progress</option>
              <option value="Planned Projects">Planned Projects</option>
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
                <span className="text-gray-600 dark:text-gray-300">Planned</span>
                <span className="text-black dark:text-white font-semibold">{plannedCount}</span>
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
                          Showing <span className="text-black dark:text-white font-semibold">{filteredProjects.length}</span> results
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Sort:</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as 'recent' | 'alpha')}
                          className="px-2.5 py-1 rounded-md border border-gray-300 dark:border-white/15 bg-white dark:bg-black text-xs text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
                        >
                          <option value="recent">Most Recent</option>
                          <option value="alpha">Alphabetical</option>
                        </select>
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
