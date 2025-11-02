import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter } from 'lucide-react';
import logoUrl from '@/assets/images/1760686469887.jpeg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
  { name: 'Changelog', path: '/insights' },
    ],
    services: [
      { name: 'Web Design', path: '/services/web-design' },
      { name: 'Social Media Management', path: '/services/social-media-management' },
      { name: 'Filmography & Video Editing', path: '/services/filmography-video-editing' },
      { name: 'Graphic Design', path: '/services/graphic-design' },
      { name: 'ZIM File Installation', path: '/services/zim-installation' },
      { name: 'Digital Automations', path: '/services/digital-automations' },
      { name: 'AI Integrations', path: '/services/ai-integrations' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  ];

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoUrl} alt="CTEX logo" className="h-8 w-8 rounded-lg bg-transparent" />
              <span className="text-lg font-bold text-foreground">CTEX</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transforming businesses through innovative technology solutions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} CTEX Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
