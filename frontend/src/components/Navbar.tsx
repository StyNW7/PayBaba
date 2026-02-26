// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap, Home, Info, MessageSquare, HelpCircle, Phone } from 'lucide-react';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Info className="w-4 h-4" /> },
    { name: 'Features', href: '#features', icon: <Zap className="w-4 h-4" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'FAQ', href: '#faq', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <img src='/Images/logo-only.png'/>
            </div>
            <span className="text-2xl font-bold text-[#2DAEAA]">
              Pay<span className="text-[#F15A22]">Baba</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                
                  <a
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#F15A22] rounded-lg hover:bg-[#F15A22]/5 transition-all duration-300"
                  >
                    {item.icon}
                    {item.name}
                  </a>

              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/merchant/dashboard"
              className="px-6 py-2.5 bg-[#F15A22] text-white rounded-xl font-semibold hover:bg-[#d94e1e] transition-all duration-300 hover:shadow-lg hover:shadow-[#F15A22]/25"
            >
              Dashboard
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-[#F15A22] hover:bg-[#F15A22]/5 transition-all duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navItems.map((item) => (
              <div key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#F15A22] hover:bg-[#F15A22]/5 rounded-lg transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </a>
              </div>
            ))}
            <div className="pt-4">
              <a
                href="#get-started"
                className="block w-full px-4 py-3 bg-[#F15A22] text-white rounded-xl font-semibold text-center hover:bg-[#d94e1e] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;