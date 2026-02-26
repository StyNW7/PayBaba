// components/Footer.tsx
'use client';

import { 
  Zap, 
  Mail, 
  // Phone, 
  // MapPin, 
  // Facebook, 
  // Twitter, 
  // Instagram, 
  // Linkedin, 
  // Github,
  // Youtube,
  Heart,
  Globe,
  Shield,
  Award,
  Users,
  BookOpen,
  HelpCircle,
  FileText,
  Briefcase,
  CreditCard,
  Lock,
  Cloud,
  Cpu
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footeras = {
    product: [
      { name: 'Features', href: '#features', icon: <Zap className="w-4 h-4" /> },
      { name: 'How It Works', href: '#how-it-works', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Pricing', href: '#pricing', icon: <CreditCard className="w-4 h-4" /> },
      { name: 'Security', href: '#security', icon: <Shield className="w-4 h-4" /> },
      { name: 'FAQ', href: '#faq', icon: <HelpCircle className="w-4 h-4" /> },
    ],
    company: [
      { name: 'About Us', href: '#about', icon: <Users className="w-4 h-4" /> },
      { name: 'Careers', href: '#careers', icon: <Briefcase className="w-4 h-4" /> },
      { name: 'Blog', href: '#blog', icon: <BookOpen className="w-4 h-4" /> },
      { name: 'Press', href: '#press', icon: <Award className="w-4 h-4" /> },
      { name: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> },
    ],
    resources: [
      { name: 'Documentation', href: '#docs', icon: <FileText className="w-4 h-4" /> },
      { name: 'API Reference', href: '#api', icon: <Cloud className="w-4 h-4" /> },
      { name: 'Support', href: '#support', icon: <HelpCircle className="w-4 h-4" /> },
      { name: 'Status', href: '#status', icon: <Globe className="w-4 h-4" /> },
      { name: 'Legal', href: '#legal', icon: <Lock className="w-4 h-4" /> },
    ],
  };

  // const socialas = [
  //   { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#', color: '#1877F2' },
  //   { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#', color: '#1DA1F2' },
  //   { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#', color: '#E4405F' },
  //   { name: 'aedIn', icon: <Linkedin className="w-5 h-5" />, href: '#', color: '#0A66C2' },
  //   { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: '#', color: '#333' },
  //   { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: '#', color: '#FF0000' },
  // ];

  // const contactInfo = [
  //   { icon: <Mail className="w-5 h-5" />, text: 'hello@paybaba.com', href: 'mailto:hello@paybaba.com' },
  //   { icon: <Phone className="w-5 h-5" />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  //   { icon: <MapPin className="w-5 h-5" />, text: 'Singapore', href: '#' },
  // ];

  return (
    <footer className="bg-white border-t border-gray-200">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <img src='Images/logo-only.png'/>
              </div>
              <span className="text-2xl font-bold text-[#2DAEAA]">
                Pay<span className="text-[#F15A22]">Baba</span>
              </span>
            </a>
            <p className="text-gray-600 mb-6 leading-relaxed">
              AI-powered credit intelligence platform helping MSMEs access fair financing through payment gateway data analysis.
            </p>
            
            {/* Contact Info */}
            {/* <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-600 hover:text-[#F15A22] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#F15A22]/10 transition-colors duration-300">
                    <span className="text-gray-600 group-hover:text-[#F15A22] transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-sm">{item.text}</span>
                </a>
              ))}
            </div> */}

            {/* Social as */}
            {/* <div className="flex flex-wrap gap-2">
              {socialas.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#F15A22] hover:text-white transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <span className="text-gray-600 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div> */}
          </div>

          {/* as Columns */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F15A22]" />
              Product
            </h4>
            <ul className="space-y-3">
              {footeras.product.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#F15A22] transition-colors duration-300 group"
                  >
                    <span className="text-gray-400 group-hover:text-[#F15A22] transition-colors duration-300">
                      {a.icon}
                    </span>
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2DAEAA]" />
              Company
            </h4>
            <ul className="space-y-3">
              {footeras.company.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#2DAEAA] transition-colors duration-300 group"
                  >
                    <span className="text-gray-400 group-hover:text-[#2DAEAA] transition-colors duration-300">
                      {a.icon}
                    </span>
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F15A22]" />
              Resources
            </h4>
            <ul className="space-y-3">
              {footeras.resources.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#F15A22] transition-colors duration-300 group"
                  >
                    <span className="text-gray-400 group-hover:text-[#F15A22] transition-colors duration-300">
                      {a.icon}
                    </span>
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2DAEAA]" />
              Partners
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#F15A22]/10 rounded-lg flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-[#F15A22]" />
                  </div>
                  <p className="font-medium text-gray-900">Alibaba Cloud</p>
                </div>
                <p className="text-xs text-gray-600">AI & Cloud Infrastructure</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#2DAEAA]/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#2DAEAA]" />
                  </div>
                  <p className="font-medium text-gray-900">PayLabs</p>
                </div>
                <p className="text-xs text-gray-600">Payment Gateway</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              © {currentYear} PayBaba. All rights reserved. Made with
              <Heart className="w-4 h-4 text-[#F15A22] mx-1 fill-current" />
              for MSMEs
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-gray-600 hover:text-[#F15A22] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-gray-600 hover:text-[#F15A22] transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#cookies" className="text-sm text-gray-600 hover:text-[#F15A22] transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;