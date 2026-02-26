'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Zap,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Check,
  ChevronDown,
  Database,
  Brain,
  DollarSign,
  BarChart3,
  Award,
  Lock,
  Play,
  Star,
  Clock,
  Layers,
  Sparkles,
  MessageSquare,
  CreditCard,
  Activity,
  Cpu,
  Server,
  HelpCircle,
  Info,
  Headphones,
  ThumbsUp,
  Cloud,
  ShoppingBag,
  Landmark,
} from 'lucide-react';

// Animation component for scroll reveal with improved timing
const ScrollReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Floating animation for cards
const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      className="animate-float"
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('merchant');

  // useEffect(() => {
  //   setIsVisible(true);
    
  //   // Counter animation
  //   const interval = setInterval(() => {
  //     setCounter((prev) => {
  //       if (prev < 100) return prev + 1;
  //       clearInterval(interval);
  //       return 100;
  //     });
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, []);

  const stats = [
    { label: 'MSMEs Supported', value: '50,000+', icon: <Users className="w-6 h-6" /> },
    { label: 'Transactions Analyzed', value: '100M+', icon: <Database className="w-6 h-6" /> },
    { label: 'Approval Rate', value: '85%', icon: <ThumbsUp className="w-6 h-6" /> },
    { label: 'Processing Time', value: '24hrs', icon: <Clock className="w-6 h-6" /> },
  ];

  const howItWorks = [
    {
      step: '01',
      icon: <Database className="w-8 h-8" />,
      title: 'Merchant Data Collection',
      description: 'Secure connection to merchant payment gateways to collect transaction data',
      color: '#F15A22',
      details: [
        'Real-time transaction monitoring',
        'Secure API integration',
        'Multi-gateway support',
        'Historical data analysis',
      ],
    },
    {
      step: '02',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Payment Gateway Pipeline',
      description: 'PayLabs payment gateway aggregates and structures all transaction data',
      color: '#2DAEAA',
      details: [
        'Data normalization',
        'Fraud detection',
        'Transaction categorization',
        'Revenue verification',
      ],
    },
    {
      step: '03',
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Engine Analysis',
      description: 'Alibaba Cloud AI analyzes patterns and generates creditworthiness scores',
      color: '#F15A22',
      details: [
        'Machine learning models',
        'Pattern recognition',
        'Predictive analytics',
        'Risk assessment',
      ],
    },
    {
      step: '04',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Intelligence Dashboard',
      description: 'Real-time metrics and insights for business growth optimization',
      color: '#2DAEAA',
      details: [
        'Performance metrics',
        'Growth opportunities',
        'Benchmarking',
        'Actionable insights',
      ],
    },
    {
      step: '05',
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Bank Decision System',
      description: 'Automated underwriting and instant financing decisions',
      color: '#F15A22',
      details: [
        'Automated underwriting',
        'Risk scoring',
        'Compliance checking',
        'Instant decisions',
      ],
    },
  ];

  const features = [
    {
      icon: <Zap className="w-10 h-10" />,
      title: 'Real-Time Analysis',
      description: 'Instant credit scoring and analysis of transaction patterns in real-time',
      color: '#F15A22',
      stats: '< 2 seconds',
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level encryption and compliance with international standards',
      color: '#2DAEAA',
      stats: '256-bit',
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning models powered by Alibaba Cloud infrastructure',
      color: '#F15A22',
      stats: '99.9%',
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Growth Intelligence',
      description: 'Actionable insights to help merchants grow their business faster',
      color: '#2DAEAA',
      stats: '+45%',
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Multi-Stakeholder',
      description: 'Seamless integration for merchants, banks, and payment gateways',
      color: '#F15A22',
      stats: '3-way',
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Industry Leading',
      description: 'Trusted by 50,000+ MSMEs and major financial institutions',
      color: '#2DAEAA',
      stats: '#1',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder, Digital Store',
      content: 'PayBaba transformed how we access financing. What took weeks now takes hours, and we got better rates!',
      avatar: '🎯',
      rating: 5,
      company: 'Digital Store',
      revenue: '+45%',
    },
    {
      name: 'Priya Singh',
      role: 'Operations Manager, E-Commerce',
      content: 'The insights provided by PayBaba helped us optimize our business strategy and increase revenue by 40%.',
      avatar: '📈',
      rating: 5,
      company: 'E-Commerce Co',
      revenue: '+40%',
    },
    {
      name: 'Anil Patel',
      role: 'CFO, Manufacturing Co.',
      content: 'Finally, a transparent and fair way to get credit. PayBaba is a game-changer for small businesses.',
      avatar: '⭐',
      rating: 5,
      company: 'Manufacturing Co',
      revenue: '+60%',
    },
    {
      name: 'Meera Sharma',
      role: 'CEO, Retail Chain',
      content: 'The AI-powered insights helped us identify growth opportunities we never knew existed.',
      avatar: '💼',
      rating: 5,
      company: 'Retail Chain',
      revenue: '+35%',
    },
  ];

  const faqs = [
    {
      question: 'How does PayBaba collect and secure transaction data?',
      answer: 'PayBaba connects securely to PayLabs payment gateway using industry-standard encryption. All data transmission follows international security protocols and complies with data protection regulations. Your transaction data is never stored permanently and is only used for credit analysis.',
      category: 'security',
    },
    {
      question: 'What does the AI Engine analyze to determine creditworthiness?',
      answer: 'Our Alibaba Cloud-powered AI engine analyzes transaction patterns, frequency, consistency, payment history, growth trends, and market indicators. It considers 100+ parameters to provide a comprehensive credit score that goes beyond traditional scoring methods.',
      category: 'technology',
    },
    {
      question: 'How long does it take to get a credit decision?',
      answer: 'Most credit decisions are made within 24 hours. Our automated underwriting system works round-the-clock, and you can track your application status in real-time through our dashboard.',
      category: 'process',
    },
    {
      question: 'Which payment gateways are supported?',
      answer: 'PayBaba supports integration with all major payment gateways including PayLabs, Razorpay, PayU, Instamojo, and more. We continuously add new gateway integrations to expand our network.',
      category: 'integration',
    },
    {
      question: 'What are the eligibility criteria for MSMEs?',
      answer: 'MSMEs with minimum 6 months of transaction history and consistent monthly revenue are eligible. There are no requirements for physical collateral or traditional credit history.',
      category: 'eligibility',
    },
    {
      question: 'How is my credit score determined?',
      answer: 'Your credit score is based on a proprietary algorithm that analyzes your payment gateway transaction data. Factors include transaction volume, frequency, growth rate, payment timeliness, and business stability metrics.',
      category: 'scoring',
    },
    {
      question: 'Is there any cost to use PayBaba?',
      answer: 'PayBaba is free for merchants to use. We earn a small fee from partner banks when you successfully secure financing through our platform.',
      category: 'pricing',
    },
    {
      question: 'Can I integrate with multiple payment gateways?',
      answer: 'Yes, PayBaba can aggregate data from multiple payment gateways to provide a complete picture of your business transactions.',
      category: 'integration',
    },
  ];

  const partners = [
    { name: 'Alibaba Cloud', icon: <Cloud className="w-12 h-12" />, color: '#F15A22' },
    { name: 'PayLabs', icon: <CreditCard className="w-12 h-12" />, color: '#2DAEAA' },
    { name: 'Razorpay', icon: <Zap className="w-12 h-12" />, color: '#F15A22' },
    { name: 'PayU', icon: <DollarSign className="w-12 h-12" />, color: '#2DAEAA' },
    { name: 'Instamojo', icon: <ShoppingBag className="w-12 h-12" />, color: '#F15A22' },
    { name: 'HDFC Bank', icon: <Landmark className="w-12 h-12" />, color: '#2DAEAA' },
    { name: 'ICICI Bank', icon: <Landmark className="w-12 h-12" />, color: '#F15A22' },
    { name: 'SBI', icon: <Landmark className="w-12 h-12" />, color: '#2DAEAA' },
  ];

  const processTabs = [
    { id: 'merchant', label: 'Merchant', icon: <Users className="w-5 h-5" /> },
    { id: 'gateway', label: 'PayLabs', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'pipeline', label: 'Data Pipeline', icon: <Database className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Engine', icon: <Brain className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'bank', label: 'Bank Decision', icon: <DollarSign className="w-5 h-5" /> },
  ];

  const tabContent = {
    merchant: {
      title: 'Merchant Data Collection',
      description: 'Secure and seamless data collection from your payment systems',
      points: [
        'Real-time transaction monitoring',
        'Multi-gateway integration',
        'Automated data aggregation',
        'Historical data analysis',
      ],
      image: '📊',
    },
    gateway: {
      title: 'PayLabs Payment Gateway',
      description: 'Enterprise-grade payment processing and data aggregation',
      points: [
        'Secure transaction processing',
        'Fraud detection algorithms',
        'Revenue verification',
        'Payment analytics',
      ],
      image: '💳',
    },
    pipeline: {
      title: 'Data Pipeline Architecture',
      description: 'Scalable data processing infrastructure',
      points: [
        'Data normalization',
        'ETL processes',
        'Real-time streaming',
        'Data warehousing',
      ],
      image: '🔄',
    },
    ai: {
      title: 'Alibaba Cloud AI Engine',
      description: 'Advanced machine learning for credit analysis',
      points: [
        'Pattern recognition',
        'Predictive modeling',
        'Risk assessment',
        'Credit scoring',
      ],
      image: '🧠',
    },
    dashboard: {
      title: 'Growth Intelligence Dashboard',
      description: 'Real-time insights and analytics',
      points: [
        'Performance metrics',
        'Growth opportunities',
        'Benchmarking tools',
        'Actionable insights',
      ],
      image: '📈',
    },
    bank: {
      title: 'Automated Bank Decision System',
      description: 'Instant financing decisions based on AI analysis',
      points: [
        'Automated underwriting',
        'Compliance checking',
        'Risk scoring',
        'Instant approvals',
      ],
      image: '🏦',
    },
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-hidden">
        {/* Hero Section - Clean and Minimal */}
        <section className="relative min-h-[90vh] flex items-center bg-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#F15A22]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2DAEAA]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-[#F15A22]/10 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-[#F15A22]" />
                    <span className="text-sm font-medium text-[#F15A22]">AI-Powered Credit Intelligence</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Transform MSME
                    <span className="text-[#F15A22] block">Financing with AI</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                    Intelligent credit scoring system that uses payment gateway data to help MSMEs access bank financing in minutes, not months. Powered by Alibaba Cloud.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="px-8 py-4 bg-[#F15A22] text-white rounded-xl font-semibold hover:bg-[#d94e1e] transition-all duration-300 hover:shadow-lg hover:shadow-[#F15A22]/25 flex items-center justify-center gap-2 group">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 border-2 border-[#2DAEAA] text-[#2DAEAA] rounded-xl font-semibold hover:bg-[#2DAEAA]/5 transition-all duration-300 flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </button>
                  </div>

                  <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">50,000+ MSMEs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#F15A22] fill-current" />
                      <span className="text-sm text-gray-600">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right Content - Visual */}
              <ScrollReveal delay={200}>
                <FloatingCard>
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F15A22]/10 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-[#F15A22]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Live Analysis</p>
                            <p className="font-semibold text-gray-900">Credit Score</p>
                          </div>
                        </div>
                        <div className="text-4xl font-bold text-[#2DAEAA]">8.7</div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Transaction Volume</span>
                            <span className="text-[#F15A22] font-semibold">↑ 45%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-[#F15A22] rounded-full"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Payment Reliability</span>
                            <span className="text-[#2DAEAA] font-semibold">98%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-[98%] bg-[#2DAEAA] rounded-full"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Growth Rate</span>
                            <span className="text-[#F15A22] font-semibold">↑ 32%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-[72%] bg-[#F15A22] rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">100+</p>
                          <p className="text-xs text-gray-500">Parameters</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">24h</p>
                          <p className="text-xs text-gray-500">Processing</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">15+</p>
                          <p className="text-xs text-gray-500">Banks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section - Clean Numbers */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#F15A22]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F15A22] transition-all duration-300">
                      <div className="text-[#F15A22] group-hover:text-white transition-colors duration-300">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section - Detailed Flow */}
        <section id="how-it-works" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#2DAEAA]/10 px-4 py-2 rounded-full mb-4">
                  <Layers className="w-4 h-4 text-[#2DAEAA]" />
                  <span className="text-sm font-medium text-[#2DAEAA]">Process Flow</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  A seamless flow from merchant data to bank financing decisions
                </p>
              </div>
            </ScrollReveal>

            {/* Interactive Tabs */}
            <ScrollReveal delay={100}>
              <div className="mb-12">
                <div className="flex flex-wrap justify-center gap-2 p-1 bg-white rounded-2xl shadow-sm max-w-3xl mx-auto">
                  {processTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-[#F15A22] text-white shadow-lg shadow-[#F15A22]/25'
                          : 'text-gray-600 hover:text-[#F15A22] hover:bg-[#F15A22]/5'
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Tab Content */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#F15A22]/10 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-[#F15A22]">Step {activeTab === 'merchant' ? '01' : activeTab === 'gateway' ? '02' : activeTab === 'pipeline' ? '03' : activeTab === 'ai' ? '04' : activeTab === 'dashboard' ? '05' : '06'}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{tabContent[activeTab as keyof typeof tabContent].title}</h3>
                    <p className="text-lg text-gray-600">{tabContent[activeTab as keyof typeof tabContent].description}</p>
                    <ul className="space-y-3">
                      {tabContent[activeTab as keyof typeof tabContent].points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#2DAEAA]/10 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#2DAEAA]" />
                          </div>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-3xl flex items-center justify-center">
                      <span className="text-8xl">{tabContent[activeTab as keyof typeof tabContent].image}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline View */}
            <div className="mt-16 grid md:grid-cols-5 gap-4">
              {howItWorks.map((item, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="relative group">
                    {index < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200">
                        <div className="absolute top-0 left-0 h-full bg-[#F15A22] transition-all duration-500 group-hover:w-full" style={{ width: '0%' }}></div>
                      </div>
                    )}
                    <div className="relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#F15A22]">
                      <div className="w-12 h-12 rounded-xl bg-[#F15A22] text-white flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                      <div className="text-[#F15A22] mb-3">{item.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#F15A22] rounded-full"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Clean Cards */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#F15A22]/10 px-4 py-2 rounded-full mb-4">
                  <Zap className="w-4 h-4 text-[#F15A22]" />
                  <span className="text-sm font-medium text-[#F15A22]">Powerful Features</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Everything You Need</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Comprehensive tools for intelligent credit scoring and business growth
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#F15A22] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="w-16 h-16 bg-[#F15A22]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F15A22] transition-all duration-300">
                      <div className="text-[#F15A22] group-hover:text-white transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <span className="text-2xl font-bold text-[#2DAEAA]">{feature.stats}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="w-12 h-1 bg-[#F15A22] rounded-full group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Clean Split */}
        <section id="about" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-[#2DAEAA]/10 px-4 py-2 rounded-full">
                    <Info className="w-4 h-4 text-[#2DAEAA]" />
                    <span className="text-sm font-medium text-[#2DAEAA]">About PayBaba</span>
                  </div>
                  <h2 className="text-5xl font-bold text-gray-900">Intelligent Credit for MSMEs</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    PayBaba is a collaboration between PayLabs and Alibaba to revolutionize MSME financing. We believe every small business deserves access to fair credit based on their actual business performance.
                  </p>
                  <div className="space-y-4">
                    {[
                      'AI-powered credit analysis leveraging payment transaction data',
                      'Integration with PayLabs payment gateway network',
                      'Alibaba Cloud infrastructure for scalability and security',
                      'Bank-agnostic platform supporting multiple financial institutions',
                    ].map((point, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-6 h-6 bg-[#2DAEAA]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-[#2DAEAA]" />
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <ScrollReveal delay={200}>
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gray-50 rounded-2xl">
                        <div className="text-4xl font-bold text-[#F15A22] mb-2">500K+</div>
                        <p className="text-sm text-gray-600">Transactions Daily</p>
                      </div>
                      <div className="text-center p-6 bg-gray-50 rounded-2xl">
                        <div className="text-4xl font-bold text-[#2DAEAA] mb-2">$2B+</div>
                        <p className="text-sm text-gray-600">Credit Provided</p>
                      </div>
                      <div className="text-center p-6 bg-gray-50 rounded-2xl">
                        <div className="text-4xl font-bold text-[#F15A22] mb-2">15+</div>
                        <p className="text-sm text-gray-600">Bank Partners</p>
                      </div>
                      <div className="text-center p-6 bg-gray-50 rounded-2xl">
                        <div className="text-4xl font-bold text-[#2DAEAA] mb-2">99.9%</div>
                        <p className="text-sm text-gray-600">Uptime SLA</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Technology Partners Section - Clean Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#F15A22]/10 px-4 py-2 rounded-full mb-4">
                  <Cpu className="w-4 h-4 text-[#F15A22]" />
                  <span className="text-sm font-medium text-[#F15A22]">Technology Partners</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Powered by Industry Leaders</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Leveraging cutting-edge technology from global leaders
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal delay={100}>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#F15A22] transition-all duration-300 group">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Cloud className="w-10 h-10 text-[#F15A22]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Alibaba Cloud</h3>
                      <p className="text-gray-600">AI & Machine Learning</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Leveraging Alibaba Cloud's enterprise-grade AI and machine learning capabilities for advanced credit analysis and real-time processing.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl">
                      <Brain className="w-5 h-5 text-[#F15A22] mb-2" />
                      <p className="text-sm font-medium">Advanced AI Engine</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <Server className="w-5 h-5 text-[#F15A22] mb-2" />
                      <p className="text-sm font-medium">Scalable Infrastructure</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#2DAEAA] transition-all duration-300 group">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CreditCard className="w-10 h-10 text-[#2DAEAA]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">PayLabs</h3>
                      <p className="text-gray-600">Payment Gateway</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    PayLabs provides the payment gateway infrastructure and transaction data connectivity that powers our credit scoring system.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl">
                      <Lock className="w-5 h-5 text-[#2DAEAA] mb-2" />
                      <p className="text-sm font-medium">Secure Gateway</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <Activity className="w-5 h-5 text-[#2DAEAA] mb-2" />
                      <p className="text-sm font-medium">Real-time Processing</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Partner Logos Grid */}
            <ScrollReveal delay={300}>
              <div className="mt-16">
                <p className="text-center text-gray-600 mb-8">Trusted by leading financial institutions</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {partners.map((partner, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: `${partner.color}10` }}>
                        <div style={{ color: partner.color }}>{partner.icon}</div>
                      </div>
                      <p className="text-xs font-medium text-gray-700">{partner.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials Section - Clean Cards */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#2DAEAA]/10 px-4 py-2 rounded-full mb-4">
                  <MessageSquare className="w-4 h-4 text-[#2DAEAA]" />
                  <span className="text-sm font-medium text-[#2DAEAA]">Testimonials</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">What MSMEs Say</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Real stories from real businesses using PayBaba
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#F15A22] group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#F15A22]/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#F15A22] fill-current" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-[#2DAEAA]">{testimonial.revenue}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Clean Accordion */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#F15A22]/10 px-4 py-2 rounded-full mb-4">
                  <HelpCircle className="w-4 h-4 text-[#F15A22]" />
                  <span className="text-sm font-medium text-[#F15A22]">FAQ</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">Everything you need to know about PayBaba</p>
              </div>
            </ScrollReveal>

            {/* FAQ Categories */}
            <ScrollReveal delay={100}>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['all', 'security', 'technology', 'process', 'integration', 'eligibility', 'scoring', 'pricing'].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 text-sm rounded-full border border-gray-200 hover:border-[#F15A22] hover:text-[#F15A22] transition-all duration-300 capitalize"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#F15A22] transition-colors duration-300">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#F15A22] bg-[#F15A22]/10 px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#F15A22] transition-transform duration-300 flex-shrink-0 ${
                          activeAccordion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeAccordion === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Contact Support */}
            <ScrollReveal delay={500}>
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Still have questions?</p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#2DAEAA] text-white rounded-xl font-semibold hover:bg-[#259b98] transition-all duration-300">
                  <Headphones className="w-5 h-5" />
                  Contact Support
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section - Clean and Bold */}
        <section className="py-24 bg-[#F15A22] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join 50,000+ MSMEs who have already accessed fair credit through PayBaba. Get approved in 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-[#F15A22] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                  Start Free Trial Today
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Schedule Demo
                </button>
              </div>
              <p className="text-white/80 text-sm mt-6">
                No credit card required • Free forever • Cancel anytime
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}