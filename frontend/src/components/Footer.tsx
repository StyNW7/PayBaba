'use client';

import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PB</span>
              </div>
              <span className="text-xl font-bold">PayBaba</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Intelligent credit intelligence system for MSMEs using payment gateway data and AI-powered analysis powered by Alibaba Cloud.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#F15A22] rounded-full flex items-center justify-center transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#2DAEAA] rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#F15A22] rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F15A22] transition-colors duration-300 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@paybaba.com" className="hover:text-[#F15A22] transition-colors duration-300">
                  hello@paybaba.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-[#F15A22] transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Business Street, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom as */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#F15A22] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#F15A22] transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#F15A22] transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} PayBaba. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Powered by <span className="text-[#2DAEAA] font-semibold">Alibaba Cloud</span> • Supported by <span className="text-[#F15A22] font-semibold">PayLabs</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
