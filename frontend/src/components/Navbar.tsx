'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PayBaba</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#F15A22] transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-[#F15A22] text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-[#F15A22] px-2 py-2 transition-colors duration-300 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full px-6 py-2.5 bg-[#F15A22] text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
