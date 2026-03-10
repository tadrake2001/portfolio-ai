'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Mail, Brain, Database, Code2, BookOpen, Briefcase, GitBranch, ChevronDown, Sun, Moon, ArrowUpRight, ArrowLeft, Eye, Activity, Zap, BarChart3, TrendingUp, MessageSquare, FileText, Video, Image as ImageIcon, Users, ShieldCheck } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SiPytorch, SiTensorflow, SiScikitlearn, SiHuggingface, SiPandas, SiNumpy, SiJupyter } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';

const projects = [
  {
    id: 'esg-manipulation',
    title: 'ESG Manipulation Detection',
    subtitle: 'LLM-Powered Fraud Detection for Vietnamese Firms',
    company: 'Smart Green Transformation Center – VinUniversity',
    description: 'Detecting strategic misrepresentation in ESG reports using fine-tuned LLMs and Active Learning techniques.',
    detailedDescription: 'Analyzing ~14,500 sentences from 21 top Vietnamese corporations (FPT, VNM, TCB...) to detect reporting anomalies. Leveraged LLM models with PEFT/LoRA fine-tuning and 4-bit quantization. Integrated Active Learning (Uncertainty & Diversity sampling) to optimize labeling for E, S, G, and N categories.',
    problem: 'Manual auditing of massive PDF disclosures is inefficient and fails to detect subtle strategic misrepresentation in emerging markets like Vietnam.',
    solution: 'Engineered a specialized NLP framework using fine-tuned Qwen models with PEFT/LoRA. The solution integrates "underthesea" for precise Vietnamese tokenization and utilizes 4-bit quantization for efficient local inference, enabling deep behavioral auditing of corporate ESG reports with strict data privacy.',
    tech: ['Python', 'LLMs', 'PEFT/LoRA', 'Active Learning', 'Transformers', 'PyTorch'],
    metrics: [
      { label: 'Data Scale', value: '14,500 Sentences' },
      { label: 'Target Entities', value: '21 Top Corps' },
      { label: 'Weighted F1-Score', value: '89.8%' },
      { label: 'Quantization', value: '4-bit (bitsandbytes)' }
    ],
    icon: Brain,
    color: 'bg-accent/10'
  },
  {
    id: 'visa-bot',
    title: 'Visa Assistant AI',
    subtitle: 'Smart travel requirement guide',
    description: 'RAG-powered chatbot helping users navigate global visa requirements and stay updated on policy changes.',
    detailedDescription: 'Developed an intelligent assistant capable of parsing complex visa regulations and provide context-aware answers. It uses Retrieval-Augmented Generation (RAG) to ensure responses are based on the latest official government documentation.',
    problem: 'Navigating international visa requirements is confusing, as documentation is scattered across multiple government portals and often outdated.',
    solution: 'Architected a Retrieval-Augmented Generation (RAG) system that indexes thousands of pages of official visa regulations. By utilizing LangChain and ChromaDB, the assistant provides real-time, contextually accurate answers with direct citations to government portals.',
    tech: ['Python', 'OpenAI SDK', 'LangChain', 'ChromaDB', 'Streamlit'],
    metrics: [
      { label: 'Accuracy', value: '95%' },
      { label: 'Latency', value: '1.5s' },
      { label: 'Supported Countries', value: '10+' }
    ],
    icon: MessageSquare,
    color: 'bg-blue-500/10'
  },
  {
    id: 'easy-extract',
    title: 'EasyExtract',
    subtitle: 'Automated document parsing',
    description: 'A lightweight tool for extracting structured data from research PDFs and academic articles.',
    detailedDescription: 'EasyExtract uses zero-shot extraction techniques to automatically identify and structure metadata from academic papers, such as titles, authors, and keywords, into clean JSON format.',
    problem: 'Manually copying metadata and references from academic papers into databases is tedious and error-prone for researchers.',
    solution: 'Developed a zero-shot metadata extraction utility optimized for academic PDFs. Leveraging transformer-based models and structured parsing, the tool automates the conversion of unstructured research data into machine-readable JSON formats with high fidelity.',
    tech: ['Python', 'Pydantic', 'FastAPI', 'PyPDF2', 'NLP'],
    metrics: [
      { label: 'Extraction Rate', value: '98%' },
      { label: 'Processing Speed', value: '0.5s/page' },
      { label: 'Output Format', value: 'JSON/CSV' }
    ],
    icon: FileText,
    color: 'bg-orange-500/10'
  },
  {
    id: 'ai-influencer',
    title: 'AI Influencer Ecosystem',
    subtitle: 'Virtual persona generation',
    description: 'Creating consistent virtual identities with AI for social media and brand representation.',
    detailedDescription: 'Developing a comprehensive workflow for AI Influencer creation. This involves training LoRA models for face consistency, using IP-Adapter for pose control, and integrating LLMs for persona voice and automated content scheduling. The goal is to create believable, high-fidelity virtual personas that can maintain identity persistence across various environments.',
    problem: 'Maintaining visual consistency across different poses, lighting, and environments is a major challenge in creating believable AI personas for long-term branding.',
    solution: 'Engineered an identity persistence pipeline using ComfyUI. The system combines custom-trained LoRA models for facial consistency with IP-Adapter for pose steering and ControlNet for environmental control, ensuring stable and branded virtual persona generation.',
    tech: ['Stable Diffusion', 'LoRA', 'IP-Adapter', 'ComfyUI', 'FaceSwap'],
    metrics: [
      { label: 'Identity Consistency', value: 'High' },
    ],
    icon: Users,
    color: 'bg-purple-500/10',
    status: 'Coming Soon'
  },
  {
    id: 'esg-verifier',
    title: 'ESG Verifier AI',
    subtitle: 'Accuracy & Fact-checking',
    description: 'Automated verification system to assess the accuracy of corporate sustainability claims.',
    detailedDescription: 'Building a multi-agent system designed to cross-reference ESG disclosures with external data sources like news, financial records. The system identifies potential greenwashing by detecting discrepancies between reported claims and observable evidence.',
    problem: 'ESG reports are often self-reported and can contain misleading or unverified claims that lead to "greenwashing".',
    solution: 'Designing a multi-agent fact-checking architecture that cross-validates ESG claims against trusted external news and financial databases. Employs autonomous agents to perform deep-dive analysis, surfacing potential greenwashing risks and transparency scores.',
    tech: ['Python', 'LLMs', 'LangChain', 'Multi-Agent Systems', 'Transformers', 'PyTorch'],
    metrics: [
      { label: 'Trust Accuracy', value: 'In Development' },
      { label: 'Verification Speed', value: '~60s / Report' }
    ],
    icon: ShieldCheck,
    color: 'bg-teal-500/10',
    status: 'Coming Soon'
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
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
      rootMargin: '-40% 0px -40% 0px',
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
    const sections = ['hero', 'projects', 'experience', 'contact'];
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
        {selectedProject && (
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition pointer-events-auto"
          >
            <ArrowLeft size={16} />
            <span>Back to Works</span>
          </button>
        )}
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
              onClick={() => scrollToSection('projects')} 
              className={`text-sm font-medium transition relative px-1 ${activeSection === 'projects' ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'}`}
            >
              Work
              {activeSection === 'projects' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className={`text-sm font-medium transition relative px-1 ${activeSection === 'experience' ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'}`}
            >
              Stack
              {activeSection === 'experience' && (
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
                onClick={() => scrollToSection('projects')}
                className={`text-sm transition text-left px-2 py-1 rounded-md ${activeSection === 'projects' ? 'text-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`text-sm transition text-left px-2 py-1 rounded-md ${activeSection === 'experience' ? 'text-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Stack
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      {!selectedProject && (
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
              Building machine learning models and conducting research that transforms data into insight. Specialized in AI
              Architecture, Deep Learning, and collaborative Intelligence development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => scrollToSection('projects')}
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

            {/* Statistics Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16 pt-16 border-t border-border/50 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3">
                  1<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">Year Exp.</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3">
                  5<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">Deployed Models</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3">
                  99<span className="text-accent">%</span>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">System Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3">
                  5<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">AI Projects</div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Work Section */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        {!selectedProject ? (
          <>
            <h2 className="text-4xl font-bold mb-2">Work</h2>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Featured Project - Full Width at Top */}
              <div 
                onClick={() => setSelectedProject(projects[0].id)}
                className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card hover:border-accent/40 transition-all duration-500 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-[16/10] lg:aspect-auto flex items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10 border-b lg:border-b-0 lg:border-r border-border">
                    {(() => {
                      const Icon = projects[0].icon;
                      return <Icon className="w-24 h-24 text-accent/20 group-hover:text-accent transition-all duration-700 group-hover:scale-110" />;
                    })()}
                  </div>
                  <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Featured Project</span>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">{projects[0].title}</h3>
                    <p className="text-muted-foreground mb-8 line-clamp-2 text-lg">{projects[0].description}</p>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].tech.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-accent/5 border border-accent/10 rounded-full text-accent">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller Projects - Side by Side */}
              {projects.slice(1).map((p) => {
                const Icon = p.icon;
                return (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProject(p.id)}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-card hover:border-accent/40 transition-all duration-500 cursor-pointer p-8"
                  >
                    <div className="flex items-start justify-between mb-12">
                      <div className="w-16 h-16 flex items-center justify-center bg-accent/5 rounded-2xl border border-accent/10 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-accent/40 group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                          <ArrowUpRight size={18} />
                        </div>
                        {p.status && (
                          <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                            {p.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">{p.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-accent/5 border border-accent/10 rounded-full text-accent">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="pt-20 transition-all animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Project Detail View */}
            {(() => {
              const project = projects.find(p => p.id === selectedProject);
              if (!project) return null;
              const Icon = project.icon;
              return (
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                      <div className="aspect-video w-full rounded-3xl bg-accent/5 border border-accent/20 flex items-center justify-center mb-12 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-100 transition-opacity"></div>
                        <Icon className="w-32 h-32 text-accent/40 group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground dark:text-white tracking-tight">
                          {project.title}
                        </h1>
                        {project.status && (
                          <span className="text-[12px] font-mono text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                            {project.status}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        {project.detailedDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="relative pl-6 border-l-2 border-accent/30">
                          <h3 className="text-lg font-bold mb-4 text-foreground dark:text-white uppercase tracking-widest text-xs font-mono">The Problem</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                        <div className="relative pl-6 border-l-2 border-accent/30">
                          <h3 className="text-lg font-bold mb-4 text-foreground dark:text-white uppercase tracking-widest text-xs font-mono">The Solution</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                      <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
                        <h3 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech?.map(t => (
                            <span key={t} className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs font-bold text-accent uppercase tracking-wider">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 rounded-3xl bg-card border border-border">
                        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Performance</h3>
                        <div className="space-y-6">
                          {project.metrics?.map(m => (
                            <div key={m.label} className="flex items-start justify-between border-b border-border last:border-0 pb-4 last:pb-0 gap-4">
                              <span className="text-muted-foreground text-sm shrink-0">{m.label}</span>
                              <span className="font-mono text-accent font-bold text-right">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* Stack Section (Experience Log Content) */}
      {!selectedProject && (
        <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
          <h2 className="text-4xl font-bold mb-16">Stack</h2>
          
          <div className="space-y-24">
            {/* Technical Stack Part */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Core Intelligence */}
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">Core Intelligence</h3>
                  <div className="space-y-8">
                    {/* PyTorch */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <SiPytorch className="w-5 h-5 text-[#EE4C2C]" />
                          <span className="font-semibold text-sm">PyTorch</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    {/* Transformers */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <SiHuggingface className="w-5 h-5 text-[#FFD21E]" />
                          <span className="font-semibold text-sm">Transformers</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    {/* Scikit-learn */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <SiScikitlearn className="w-5 h-5 text-[#F7931E]" />
                          <span className="font-semibold text-sm">Scikit-learn</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full transition-all duration-1000" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data & Research */}
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">Data & Research</h3>
                  <div className="space-y-8">
                    {/* Pandas */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <SiPandas className="w-5 h-5 text-[#150458] dark:text-white" />
                          <span className="font-semibold text-sm">Pandas</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    {/* NumPy */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <SiNumpy className="w-5 h-5 text-[#4DABCF]" />
                          <span className="font-semibold text-sm">NumPy</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: '93%' }}></div>
                      </div>
                    </div>
                    {/* SQL */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <TbSql className="w-5 h-5 text-[#336791]" />
                          <span className="font-semibold text-sm">SQL</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Log Part */}
            <div className="pt-12 border-t border-border/50">
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-12">Experience Log</h3>
              <div className="relative pl-8 sm:pl-12">
                <div className="absolute left-[7px] sm:left-[17px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent dark:from-accent via-accent/60 dark:via-accent/50 to-transparent shadow-[0_0_8px_rgba(20,184,166,0.1)]"></div>
                <div className="space-y-16">
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
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {!selectedProject && (
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
      )}

      {/* Footer */}
      {!selectedProject && (
        <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border mt-20">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground text-sm">© 2025 Drake Nguyen. Crafted with logic & pixels.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
