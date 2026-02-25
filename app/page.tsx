'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Calendar,
  MapPin,
  Award,
  Terminal,
  Cpu,
  Zap,
  Activity,
  Code,
} from 'lucide-react';
import NeuralNetworkBackground from './components/NeuralNetworkBackground';
import FloatingCodeParticles from './components/FloatingCodeParticles';
import ScrollReveal from './components/ScrollReveal';
import TypingHeader from './components/TypingHeader';
import TypingText from './components/TypingText';

const EXPERIENCE = [
  {
    title: 'AI Engineer',
    company: 'Centrics Networks',
    location: 'Philippines',
    period: 'Oct 2025 -- Present',
    description: [
      'Sole-architected enterprise multi-tenant RAG system with Next.js, LangGraph, Milvus, and vLLM',
      'Built SOC AI Agent serving 2M+ daily events with custom MCP tools for FortiSIEM',
      'Benchmarked sub-500ms median latency (p50: 485ms, p95: 1.9s)',
    ],
    tech: ['Next.js', 'LangGraph', 'vLLM', 'Milvus', 'FortiSIEM', 'OpsRamp'],
    metrics: { events: '2M+', latency: '485ms p50' },
  },
  {
    title: 'Software Engineering Intern',
    company: 'Department of Science and Technology',
    location: 'Butuan City',
    period: 'Feb 2025 -- May 2025',
    description: [
      'Engineered RESTful APIs with Laravel and MySQL for inter-agency digital transformation',
      'Delivered full-stack features from Figma-to-frontend to deployment',
    ],
    tech: ['Laravel', 'MySQL', 'REST APIs'],
    metrics: null,
  },
];

const PROJECTS = [
  {
    title: 'LLM Training & Distillation',
    description: 'Trained 11 GPT-2 models on 500K+ synthetic conversations. Optimized attention mechanisms improving compute-performance ratio by 17%.',
    tech: ['PyTorch', 'WandB', 'Tesla GPUs', 'Custom Training'],
    stats: { models: '11', data: '500K+', improvement: '17%' },
    year: '2025',
  },
  {
    title: 'Automated Video Generator',
    description: 'End-to-end pipeline with Airflow DAGs and Celery workers for parallel voiceover, image scraping, and MoviePy compositing.',
    tech: ['Airflow', 'Celery', 'MoviePy', 'Python'],
    stats: { pipeline: 'automated', workers: 'parallel' },
    year: '2025',
  },
  {
    title: 'LLM Evaluation Framework',
    description: 'Custom evaluation pipeline for synthetic conversational datasets using prompt-based meta-evaluation for coherence, factuality, and relevance.',
    tech: ['Python', 'Kiln AI', 'Custom Eval'],
    stats: { metrics: 'custom', pipeline: 'full' },
    year: '2025',
  },
  {
    title: 'MNIST Recognition',
    description: 'Draw-and-predict web app with real-time ML inference. Deployed TensorFlow model via Google Cloud Functions.',
    tech: ['Flask', 'TensorFlow', 'GCP', 'Serverless'],
    stats: { accuracy: '98%', deployed: 'serverless' },
    year: '2024',
  },
];

const CERTIFICATIONS = [
  { name: 'Data Communication and Network Technology', issuer: 'Huawei', year: '2025' },
  { name: 'TOPCIT - Level 3', issuer: 'Top 10% Nationwide', year: '2024' },
  { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2023' },
  { name: 'Supervised Machine Learning', issuer: 'Stanford Online', year: '2023' },
];

const SKILLS_CATEGORIES = [
  { name: 'Core', skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C++', 'Go', 'PHP'] },
  { name: 'Web', skills: ['React', 'Next.js', 'Laravel', 'Node.js', 'REST APIs', 'GraphQL'] },
  { name: 'AI/ML', skills: ['LangGraph', 'PyTorch', 'vLLM', 'Milvus', 'WandB', 'RAG', 'NLP', 'LLMs'] },
  { name: 'Tools', skills: ['Git', 'Docker', 'GCP', 'Airflow', 'FortiSIEM', 'OpsRamp', 'Linux', 'Claude Code'] },
];

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#030305]/90 backdrop-blur-md border-b border-[rgba(0,255,245,0.15)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => scrollToSection('about')} className="font-display font-bold text-white text-lg">
            RA<span style={{ color: 'var(--cyan)' }}>.</span>
          </button>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--cyan)' }}>
            <span className="opacity-60">SYSTEM_STATUS:</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full status-dot" />
              ONLINE
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['about', 'work', 'projects', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-sm text-gray-500 hover:text-[#00fff5] transition-colors uppercase tracking-widest font-mono relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00fff5] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:block text-xs font-mono opacity-50">{currentTime}</div>
          <a href="https://github.com/ronaldjohnatanoso" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00fff5] transition-colors">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/ronaldjohnatanoso" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00fff5] transition-colors">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-8 font-mono text-xs" style={{ color: 'var(--cyan)' }}>
              <span className="w-2 h-2 rounded-full status-dot" />
              <span>AVAILABLE_FOR_OPPORTUNITIES</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-none">
              <span style={{ color: 'var(--cyan)' }}>Ronald John</span>
              <br />
              <span className="text-gray-400">Atanoso</span>
            </h1>

            <div className="mb-8">
              <p className="text-xl text-gray-400 mb-2">AI Engineer</p>
              <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                <TypingText
                  text="Building intelligent systems at scale — from multi-tenant RAG architectures serving 2M+ daily events to custom LLM training pipelines on Tesla GPUs."
                  speed={{ min: 20, max: 45 }}
                  tokenSize={4}
                  delay={500}
                />
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
              {['Next.js', 'LangGraph', 'vLLM', 'Milvus', 'PyTorch'].map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[#00fff5] text-[#030305] font-mono text-sm font-semibold hover:bg-[#39ff14] transition-colors"
              >
                INITIATE_CONTACT
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-[rgba(0,255,245,0.3)] hover:border-[#00fff5] hover:bg-[rgba(0,255,245,0.05)] transition-all font-mono text-sm"
              >
                VIEW_PROJECTS
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,245,0.1)_0%,_transparent_70%)] blur-3xl" />
            <div className="relative card rounded-lg p-10">
              <div className="font-mono text-xs mb-6" style={{ color: 'var(--cyan)' }}>
                // SYSTEM_METRICS
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-mono">ROLE</span>
                  <span className="text-white">AI Engineer</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-mono">ORG</span>
                  <span>Centrics Networks</span>
                </div>
                <div className="h-px bg-[rgba(0,255,245,0.1)]" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">DEVICE</span>
                    <span className="metric-value text-sm">ASUS Ascent GX10</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">GPU</span>
                    <span className="text-white text-sm">NVIDIA Blackwell</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">RAM</span>
                    <span className="text-white text-sm">128GB Unified</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">AI PERF</span>
                    <span className="metric-value text-sm">1000 TOPS</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <a href="#work" className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#00fff5] transition-colors font-mono text-xs">
          <span>SCROLL_DOWN</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#00fff5] to-transparent" />
        </a>
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="work">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-16">
          <div className="flex-1">
            <TypingHeader prefix="CAREER_JOURNEY" title="Experience" />
          </div>
          <p className="hidden md:block text-gray-500 max-w-sm text-right font-mono text-sm">
            &lt;building_ai_systems_that_scale/&gt;
          </p>
        </div>

        <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="card rounded-lg p-10 project-card">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="hidden md:flex w-12 h-12 items-center justify-center font-mono font-bold" style={{
                            color: 'var(--cyan)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)'
                          }}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <h3 className="text-2xl font-display font-bold text-white">{exp.title}</h3>
                        </div>
                        <p className="text-lg mb-2" style={{ color: 'var(--cyan)' }}>{exp.company}</p>
                        <div className="flex items-center gap-6 text-gray-500 text-sm font-mono">
                          <span className="flex items-center gap-2">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 font-mono text-sm">
                          <span style={{ color: 'var(--green)' }}>►</span>
                          <span className="flex-1">
                            <TypingText
                              text={desc}
                              delay={i * 200}
                              speed={{ min: 15, max: 40 }}
                              tokenSize={4}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.tech.map((t) => (
                        <span key={t} className="tech-badge text-xs">
                          {t}
                        </span>
                      ))}
                    </div>

                    {exp.metrics && (
                      <div className="p-6 bg-[rgba(0,0,0,0.3)] rounded border-l-2" style={{ borderColor: 'var(--amber)' }}>
                        <div className="font-mono text-xs text-gray-500 mb-3">// METRICS</div>
                        <div className="flex gap-6">
                          {Object.entries(exp.metrics).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-600 text-xs block mb-1">{key.toUpperCase()}</span>
                              <span className="font-mono text-sm" style={{ color: 'var(--cyan)' }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

        {/* Education card */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="card rounded-lg p-10 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] text-amber-500 text-sm font-mono font-semibold mb-6">
                <Award size={14} />
                CUM_LAUDE
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-gray-400 mb-2">Caraga State University</p>
              <p className="text-gray-500 text-sm font-mono">Butuan City, Philippines · 2021 -- 2025</p>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <TypingHeader prefix="FEATURED_WORK" title="Projects" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.div
                className="card rounded-lg p-10 project-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded flex items-center justify-center bg-[rgba(0,255,245,0.1)] border border-[rgba(0,255,245,0.3)]">
                    <Terminal size={20} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-gray-600 mb-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'var(--amber)' }}>
                      {project.year}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  <TypingText
                    text={project.description}
                    speed={{ min: 20, max: 50 }}
                    tokenSize={5}
                  />
                </p>

                {project.stats && (
                  <div className="mb-6 pb-6 border-b border-[rgba(0,255,245,0.1)]">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-600 text-xs block mb-1">{key.toUpperCase()}</span>
                          <span className="font-mono text-sm" style={{ color: 'var(--green)' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-badge text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <TypingHeader prefix="CREDENTIALS" title="Certifications" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.div
                className="card rounded-lg p-10 hover:-translate-y-1 transition-transform"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded flex items-center justify-center bg-[rgba(0,255,245,0.1)] border border-[rgba(0,255,245,0.3)]">
                    <Award size={16} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold text-sm">
                      <TypingText text={cert.name} delay={index * 100} speed={{ min: 30, max: 60 }} tokenSize={2} />
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-2">{cert.issuer}</p>
                <p className="font-mono text-xs" style={{ color: 'var(--amber)' }}>{cert.year}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <TypingHeader prefix="EXPERTISE" title="Skills" suffix="& Stack" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_CATEGORIES.map((category, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="card rounded-lg p-10 hover:-translate-y-1 transition-transform"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded flex items-center justify-center bg-[rgba(0,255,245,0.1)] border border-[rgba(0,255,245,0.3)]">
                    <Code size={20} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">{category.name}</h3>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded border border-[rgba(0,255,245,0.15)] hover:border-[#00fff5] hover:bg-[rgba(0,255,245,0.05)] transition-all text-gray-300 hover:text-white cursor-default font-mono text-sm"
                    >
                      <TypingText
                        text={skill}
                        delay={skillIndex * 50}
                        speed={{ min: 40, max: 80 }}
                        tokenSize={1}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[rgba(0,255,245,0.05)] border border-[rgba(0,255,245,0.2)] font-mono text-xs mb-8" style={{ color: 'var(--cyan)' }}>
            <span className="w-2 h-2 rounded-full status-dot" />
            OPEN_FOR_OPPORTUNITIES
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
            <span className="text-gray-400">Let's work</span>
            <span className="block" style={{ color: 'var(--cyan)' }}>together</span>
          </h2>

          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed font-mono text-sm">
            <TypingText
              text="Interested in collaborating on AI innovations? Have a question? I'd love to hear from you."
              speed={{ min: 25, max: 55 }}
              tokenSize={3}
            />
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <ScrollReveal delay={0.1}>
            <motion.a
              href="mailto:ronaldjohnatanoso@gmail.com"
              className="card rounded-lg p-10 hover:-translate-y-1 transition-transform"
              whileHover={{ y: -4 }}
            >
              <div className="w-14 h-14 rounded flex items-center justify-center mx-auto mb-5 bg-[rgba(0,255,245,0.1)] border border-[rgba(0,255,245,0.3)] group-hover:bg-[rgba(0,255,245,0.2)] transition-colors">
                <Mail size={24} style={{ color: 'var(--cyan)' }} />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-500 text-sm break-all font-mono">ronaldjohnatanoso@gmail.com</p>
            </motion.a>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.a
              href="https://linkedin.com/in/ronaldjohnatanoso"
              target="_blank"
              rel="noopener noreferrer"
              className="card rounded-lg p-10 hover:-translate-y-1 transition-transform"
              whileHover={{ y: -4 }}
            >
              <div className="w-14 h-14 rounded flex items-center justify-center mx-auto mb-5 bg-[rgba(0,255,245,0.1)] border border-[rgba(0,255,245,0.3)] group-hover:bg-[rgba(0,255,245,0.2)] transition-colors">
                <Linkedin size={24} style={{ color: 'var(--cyan)' }} />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-500 text-sm font-mono">ronaldjohnatanoso</p>
            </motion.a>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.a
              href="https://github.com/ronaldjohnatanoso"
              target="_blank"
              rel="noopener noreferrer"
              className="card rounded-lg p-10 hover:-translate-y-1 transition-transform"
              whileHover={{ y: -4 }}
            >
              <div className="w-14 h-14 rounded flex items-center justify-center mx-auto mb-5 bg-[rgba(0,255,245,0.1)] border border-[rgba(0,255,245,0.3)] group-hover:bg-[rgba(0,255,245,0.2)] transition-colors">
                <Github size={24} style={{ color: 'var(--cyan)' }} />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-500 text-sm font-mono">ronaldjohnatanoso</p>
            </motion.a>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4}>
          <div className="card rounded-lg p-10 inline-block">
            <p className="text-gray-500 text-sm mb-3 font-mono">DIRECT_LINE</p>
            <a href="tel:+639163105015" className="text-2xl hover:text-[#00fff5] transition-colors font-mono" style={{ color: 'var(--cyan)' }}>
              0916 310 5015
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm font-mono">
            © 2025 Ronald John C. Atanoso
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/ronaldjohnatanoso" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00fff5] transition-colors">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com/in/ronaldjohnatanoso" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00fff5] transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="mailto:ronaldjohnatanoso@gmail.com" className="text-gray-500 hover:text-[#00fff5] transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen scan-lines selection:bg-[rgba(0,255,245,0.3)]" style={{ background: 'var(--void)' }}>
      <NeuralNetworkBackground />
      <FloatingCodeParticles />

      <div className="content-overlay">
        <NavBar />
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
