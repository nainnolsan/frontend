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
  const authRedirect = new URLSearchParams(window.location.search).get('redirect');
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
      projectUrl: "https://nain.mintlify.app/apis/auth-service/overview",
      type: 'API',
      status: 'Production Ready',
      year: 2026,
    },
    {
      title: "API Gateway",
      description: "Apollo GraphQL gateway that centralizes auth-related endpoints and service orchestration.",
      tags: ["Node.js", "GraphQL", "TypeScript", "Docker"],
      docUrl: "https://nain.mintlify.app/apis/api-gateway/overview",
      type: 'API',
      status: 'In Progress',
      year: 2026,
    },
    {
      title: "inter_track_service",
      description: "Core backend service for internship tracking workflows and business rules.",
      tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Docker"],
      docUrl: "https://nain.mintlify.app/apis/inter-track-service/overview",
      type: 'API',
      status: 'Planned Projects',
      year: 2026,
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with dark mode, smooth animations and responsive design built with React and Tailwind CSS.",
      tags: ["React", "Tailwind", "TypeScript"],
      projectUrl: "https://viewsportfolio.vercel.app",
      type: 'Frontend',
      status: 'Production Ready',
      year: 2026,
    },
    {
      title: "untership_tracker_views",
      description: "Complete internship tracker platform with web views, backend integration, and production-ready workflows.",
      tags: ["React", "TypeScript", "Node.js", "APIs"],
      docUrl: "https://nain.mintlify.app/projects/untership-tracker-views/overview",
      projectUrl: "https://github.com/nainnolsan/intership_tracker_views",
      type: 'Full Stack',
      status: 'In Progress',
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
        <Login onSwitchToSignup={() => setPage('signup')} redirectTo={authRedirect} />
        <ThemeToggle />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        <SignIn onSwitchToLogin={() => setPage('login')} redirectTo={authRedirect} />
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

  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen text-black dark:text-white transition-colors bg-white dark:bg-black">
        <Navbar />

        <section className="bg-white dark:bg-black transition-colors py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start">
              <div className="rounded-2xl p-8 md:p-10 bg-white dark:bg-black">
                <div className="flex flex-col items-start gap-5">
                  <img
                    src="/Perfil_2-removebg-preview.png"
                    alt="Nain Nolasco"
                    className="w-28 h-28 object-cover rounded-full grayscale"
                  />

                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Nain Nolasco</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">AI-Enhanced Full Stack Developer</p>
                  </div>

                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md">
                    Tell me about your project, collaboration, or opportunity. I will get back to you as soon as possible.
                  </p>

                  <div className="flex items-center gap-4 pt-1">
                    <a
                      href="https://github.com/nainnolsan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white hover:opacity-60 transition-opacity"
                      aria-label="GitHub"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nain-nolasco/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white hover:opacity-60 transition-opacity"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/nainisai.nolascosantander.9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white hover:opacity-60 transition-opacity"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10 bg-white dark:bg-black">
                <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-8">Contact Me</h1>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Your Message"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="policy" className="mt-1" />
                    <label htmlFor="policy" className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the <span className="underline">Privacy Policy</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
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
