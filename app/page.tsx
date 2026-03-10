'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Mail, Brain, Database, Code2, BookOpen, Briefcase, GitBranch, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SiPytorch, SiTensorflow, SiScikitlearn, SiHuggingface, SiPandas, SiNumpy, SiJupyter } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; delay: string }>>([]);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Generate random particles for background
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      delay: Math.random() * 2 + 's',
    }));
    setParticles(generatedParticles);

    // Section Observer
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['hero', 'experience', 'projects', 'stack', 'contact'];
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-accent/10 dark:bg-accent/30"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `pulse-dot 3s ease-in-out infinite`,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="flex items-center gap-6 px-6 py-3 bg-background/80 dark:bg-black/80 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2 pr-6 border-r border-border dark:border-white/10">
            <div 
              className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0"
              style={{ animation: 'status-pulse 2s ease-in-out infinite' }}
            ></div>
            <span className="font-bold text-sm tracking-widest uppercase">DRAKE.AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <button 
              onClick={() => scrollToSection('hero')} 
              className={`text-sm font-medium transition relative px-1 ${activeSection === 'hero' ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'}`}
            >
              Index
              {activeSection === 'hero' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className={`text-sm font-medium transition relative px-1 ${activeSection === 'experience' ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'}`}
            >
              Work
              {activeSection === 'experience' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className={`text-sm font-medium transition relative px-1 ${activeSection === 'projects' ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'}`}
            >
              Research
              {activeSection === 'projects' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('stack')} 
              className={`text-sm font-medium transition relative px-1 ${activeSection === 'stack' ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'}`}
            >
              Stack
              {activeSection === 'stack' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all"></div>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground dark:hover:text-white transition"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden md:block pl-6 border-l border-border dark:border-white/10">
            {mounted && (
              <button 
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="text-muted-foreground hover:text-foreground dark:hover:text-white transition pt-1"
                aria-label="Toggle dark mode"
              >
                {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-background/95 dark:bg-[#111111]/95 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl p-4 md:hidden shadow-xl pointer-events-auto">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('hero')}
                className={`text-sm transition text-left px-2 py-1 rounded-md ${activeSection === 'hero' ? 'text-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Index
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`text-sm transition text-left px-2 py-1 rounded-md ${activeSection === 'experience' ? 'text-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`text-sm transition text-left px-2 py-1 rounded-md ${activeSection === 'projects' ? 'text-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Research
              </button>
              <button
                onClick={() => scrollToSection('stack')}
                className={`text-sm transition text-left px-2 py-1 rounded-md ${activeSection === 'stack' ? 'text-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Stack
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-accent/10 rounded-full border border-accent/30">
            <div 
              className="w-2 h-2 rounded-full bg-accent flex-shrink-0"
              style={{ animation: 'status-pulse 2s ease-in-out infinite' }}
            ></div>
            <span className="text-sm text-accent">Available for Research & Development</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight text-balance">
            AI Engineer
            <br />
            Research Driven
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Building machine learning models and conducting research that transforms data into insight. Specialized in ESG
            analytics, model training, and collaborative AI development at VinUniversity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('experience')}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              View My Work <ChevronDown size={18} />
            </button>
            <a
              href="mailto:tadrake2001@gmail.com"
              className="px-8 py-3 border border-accent/50 text-accent rounded-full font-medium hover:bg-accent/10 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Experience Log Section */}
      <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-16">Experience Log</h2>
        <div className="relative pl-8 sm:pl-12">
          {/* Vertical Line */}
          <div className="absolute left-[7px] sm:left-[17px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent dark:from-accent via-accent/60 dark:via-accent/50 to-transparent shadow-[0_0_8px_rgba(20,184,166,0.1)]"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {/* Current Role */}
            <div className="relative">
              <div className="absolute -left-9 sm:-left-11 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent border-4 border-background shadow-[0_0_15px_rgba(20,184,166,0.2)]"></div>
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-1">2025 - Present</p>
                <h3 className="text-2xl font-bold mb-2">Research Assistant</h3>
                <p className="text-accent font-semibold mb-4">Smart Green Transformation Center – VinUniversity</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Leading research on ESG manipulation detection using machine learning. Responsible for model training, fine-tuning,
                  data processing, statistical analysis, and collaborative project coordination.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-accent/5 dark:bg-accent/10 border border-accent/20 dark:border-accent/30 rounded text-teal-700 dark:text-accent font-medium">Machine Learning</span>
                  <span className="text-xs px-2 py-1 bg-accent/5 dark:bg-accent/10 border border-accent/20 dark:border-accent/30 rounded text-teal-700 dark:text-accent font-medium">Data Analysis</span>
                  <span className="text-xs px-2 py-1 bg-accent/5 dark:bg-accent/10 border border-accent/20 dark:border-accent/30 rounded text-teal-700 dark:text-accent font-medium">Research</span>
                </div>
              </div>
            </div>

            {/* Past Role Example */}
            <div className="relative">
              <div className="absolute -left-9 sm:-left-11 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 dark:bg-muted border-4 border-background shadow-sm ring-1 ring-black/5 dark:ring-white/5"></div>
              <div>
                <p className="text-sm text-foreground/70 dark:text-muted-foreground font-mono mb-1">Coming Soon</p>
                <h3 className="text-2xl font-bold mb-2">Next Chapter</h3>
                <p className="text-foreground/80 dark:text-muted-foreground/60 font-semibold mb-4">Future Opportunity</p>
                <p className="text-muted-foreground leading-relaxed">Building the next phase of AI research and development career.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-12">Featured Research</h2>

        <div className="space-y-8">
          <div className="group p-6 border border-border rounded-lg hover:border-accent/50 hover:bg-accent/5 transition">
            <div className="flex items-start gap-4 mb-4">
              <Brain className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Strategic Dynamics and Behavioral Drivers of ESG Manipulation</h3>
                <p className="text-accent text-sm font-semibold mb-3">Smart Green Transformation Center – VinUniversity</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Research project investigating ESG manipulation in Vietnamese firms using machine learning and statistical analysis.
                  Developed models to detect behavioral patterns and strategic factors influencing ESG misrepresentation. Contributed to
                  data processing, model training, and empirical analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-card border border-border rounded">Python</span>
                  <span className="text-xs px-2 py-1 bg-card border border-border rounded">Machine Learning</span>
                  <span className="text-xs px-2 py-1 bg-card border border-border rounded">Data Science</span>
                  <span className="text-xs px-2 py-1 bg-card border border-border rounded">Statistical Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack Section */}
      <section id="stack" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-2">Technical Stack</h2>
        <p className="text-muted-foreground mb-12">Tools of the trade.</p>

        <div className="space-y-12">
          {/* Core Intelligence */}
          <div>
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Core Intelligence</h3>
            <div className="space-y-6">
              {/* PyTorch */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiPytorch className="w-6 h-6 text-[#EE4C2C]" />
                  </div>
                  <span className="font-semibold">PyTorch</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* TensorFlow */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiTensorflow className="w-6 h-6 text-[#FF6F00]" />
                  </div>
                  <span className="font-semibold">TensorFlow</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Scikit-learn */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiScikitlearn className="w-6 h-6 text-[#F7931E]" />
                  </div>
                  <span className="font-semibold">Scikit-learn</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              {/* Transformers */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiHuggingface className="w-6 h-6 text-[#FFD21E]" />
                  </div>
                  <span className="font-semibold">Transformers</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Data & Research Tools */}
          <div>
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Data & Research</h3>
            <div className="space-y-6">
              {/* Pandas */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiPandas className="w-6 h-6 text-[#150458] dark:text-white" />
                  </div>
                  <span className="font-semibold">Pandas</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-accent rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              {/* NumPy */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiNumpy className="w-6 h-6 text-[#4DABCF]" />
                  </div>
                  <span className="font-semibold">NumPy</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-accent rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>

              {/* Jupyter */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <SiJupyter className="w-6 h-6 text-[#F37626]" />
                  </div>
                  <span className="font-semibold">Jupyter</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-accent rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              {/* SQL */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <TbSql className="w-6 h-6 text-[#336791]" />
                  </div>
                  <span className="font-semibold">SQL</span>
                </div>
                <div className="flex-1 max-w-xs bg-border rounded-full h-1">
                  <div className="h-full bg-accent rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Interested in collaborating on research or discussing AI development opportunities?
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:tadrake2001@gmail.com"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            <Mail size={20} /> tadrake2001@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border mt-20">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">© 2025 Drake Nguyen. Crafted with logic & pixels.</p>
        </div>
      </footer>
    </div>
  );
}
