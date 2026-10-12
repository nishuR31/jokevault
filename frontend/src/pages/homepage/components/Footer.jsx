import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { systemApi } from '../../../services/api';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();
  const [apiStatus, setApiStatus] = useState({ online: null, latency: null });

  useEffect(() => {
    let mounted = true;
    const checkApi = async () => {
      const start = Date.now();
      try {
        await systemApi.getHealth();
        if (mounted) {
          setApiStatus({ online: true, latency: Date.now() - start });
        }
      } catch {
        if (mounted) {
          setApiStatus({ online: false, latency: null });
        }
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const footerSections = [
    {
      title: 'Discover',
      links: [
        { name: 'Browse Categories', path: '/category-explorer' },
        { name: 'Search Jokes', path: '/search-discovery' },
        { name: 'Trending Humour', path: '/homepage' },
        { name: 'Joke of the Day', path: '/joke-detail-page' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { name: 'User Dashboard', path: '/user-dashboard' },
        { name: 'Interactive API Docs', path: '/docs' },
        { name: 'Swagger / Spec', path: '/api-docs' },
        { name: 'Sign In / Register', path: '/authentication-portal' },
      ],
    },
    {
      title: 'Support & Help',
      links: [
        { name: 'API Reference', path: '/docs' },
        { name: 'Community Guidelines', path: '/guidelines' },
        { name: 'Report Joke', path: '/report' },
        { name: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { name: 'REST Endpoints (/j/:id)', path: '/docs' },
        { name: 'RBAC Authorization', path: '/docs' },
        { name: 'Fastify Microservice', path: '/docs' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
    { name: 'GitHub', icon: 'Github', url: 'https://github.com' },
    { name: 'Discord', icon: 'MessageCircle', url: 'https://discord.gg' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/40 backdrop-blur-xl text-slate-300">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/homepage" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="flex items-center justify-center w-11 h-11 glassmorphic rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-30 blur-sm group-hover:opacity-60 transition duration-300"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold font-poppins text-white tracking-tight">
                    Joke<span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Vault</span>
                  </span>
                  <span className="block text-[11px] font-mono tracking-widest text-primary font-semibold uppercase">
                    Fastify REST Microservice
                  </span>
                </div>
              </Link>

              <p className="max-w-sm text-sm text-slate-400 font-inter leading-relaxed">
                High-performance comedy engine powered by Fastify, MongoDB, and granular Role-Based Access Control. Curate, deliver, and share laughs at ultra-low latency.
              </p>

              {/* API Live Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-mono glassmorphic-badge border border-white/10">
                <span className="relative flex h-2 w-2">
                  {apiStatus.online === true ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </>
                  ) : apiStatus.online === false ? (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 animate-pulse"></span>
                  )}
                </span>
                <span className="text-slate-300">
                  {apiStatus.online === true
                    ? `Fastify API v1.0.0 Online${apiStatus.latency ? ` (${apiStatus.latency}ms)` : ''}`
                    : apiStatus.online === false
                    ? 'API Standby'
                    : 'Pinging Fastify Cluster...'}
                </span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-xl glassmorphic border border-white/10 text-slate-400 hover:text-white hover:border-primary/40 hover:scale-110 transition-all duration-200"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold font-poppins text-white uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 block py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Banner */}
        <div className="py-6 border-t border-white/10">
          <div className="p-6 glassmorphic-card rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-primary font-mono text-sm font-bold">API v1.0.0</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/20 text-primary uppercase">
                  Fastify RESTful
                </span>
              </div>
              <p className="text-sm text-slate-300">
                Explore the unified endpoints under <code className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded text-xs">/api/v1/j/:id</code> with RBAC security.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/docs"
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                Interactive Docs & Console →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span>© {currentYear} JokeVault. Engineered with Fastify & React.</span>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/docs" className="hover:text-primary transition-colors">
                API Docs
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span>Crafted for high performance & infinite laughs</span>
              <span className="text-rose-500">♥</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;