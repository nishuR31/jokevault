import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Discover',
      links: [
        { name: 'Browse Categories', path: '/category-explorer' },
        { name: 'Search Jokes', path: '/search-discovery' },
        { name: 'Trending Now', path: '/homepage' },
        { name: 'Random Joke', path: '/joke-detail-page' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'User Dashboard', path: '/user-dashboard' },
        { name: 'Submit Joke', path: '/authentication-portal' },
        { name: 'Comedy Challenges', path: '/category-explorer' },
        { name: 'Leaderboard', path: '/user-dashboard' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Community Guidelines', path: '/guidelines' },
        { name: 'Report Content', path: '/report' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About JokeVault', path: '/about' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'API Documentation', path: '/api-docs' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/jokevault' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/jokevault' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/jokevault' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/jokevault' },
    { name: 'Discord', icon: 'MessageCircle', url: 'https://discord.gg/jokevault' }
  ];

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="flex items-center justify-center w-10 h-10 glassmorphic rounded-xl">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary"
          >
            <path
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
              fill="currentColor"
            />
            <circle cx="12" cy="18" r="2" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 blur-sm"></div>
      </div>
      <span className="text-xl font-bold font-poppins text-foreground text-shadow-glow">
        JokeVault
      </span>
    </div>
  );

  return (
    <footer className="border-t bg-gradient-to-t from-background via-primary/5 to-background border-border">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <img src="/logo.png" alt="jokevault"/>
              <p className="max-w-sm mt-4 mb-6 font-inter text-muted-foreground">
                Where great humor lives. Discover premium comedy content curated for your taste, 
                connect with fellow comedy enthusiasts, and share the joy of laughter.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg glassmorphic text-muted-foreground hover:text-primary hover:border-primary/30 comedy-timing hover-lift"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon name={social?.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h3 className="mb-4 font-semibold font-poppins text-foreground">
                  {section?.title}
                </h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.path}
                        className="font-inter text-muted-foreground hover:text-primary comedy-timing"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border">
          <div className="p-8 text-center glassmorphic-card rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold font-poppins text-foreground">
              Never Miss a
              <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"> Laugh </span>
            </h3>
            <p className="max-w-2xl mx-auto mb-6 font-inter text-muted-foreground">
              Subscribe to our newsletter for daily jokes, comedy tips, and exclusive content from the JokeVault community.
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border rounded-lg bg-input border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 comedy-timing">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© {currentYear} JokeVault. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-primary comedy-timing">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary comedy-timing">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-primary comedy-timing">
                Cookies
              </Link>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Icon name="Heart" size={16} className="text-red-400" />
              <span>for comedy lovers everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;