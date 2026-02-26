'use client';

import { useEffect, useState } from 'react';
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
} from 'lucide-react';

// Animation component for scroll reveal
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(entry.target);
      }
    });

    const element = document.getElementById(`reveal-${delay}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      id={`reveal-${delay}`}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const stats = [
    { label: 'MSMEs Supported', value: '50,000+' },
    { label: 'Transactions Analyzed', value: '100M+' },
    { label: 'Approval Rate', value: '85%' },
    { label: 'Processing Time', value: '24hrs' },
  ];

  const howItWorks = [
    {
      step: '1',
      icon: <Database className="w-6 h-6" />,
      title: 'Merchant Data Collection',
      description: 'Secure connection to merchant payment gateways to collect transaction data',
    },
    {
      step: '2',
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Payment Gateway Pipeline',
      description: 'PayLabs payment gateway aggregates and structures all transaction data',
    },
    {
      step: '3',
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Engine Analysis',
      description: 'Alibaba Cloud AI analyzes patterns and generates creditworthiness scores',
    },
    {
      step: '4',
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Intelligence Dashboard',
      description: 'Real-time metrics and insights for business growth optimization',
    },
    {
      step: '5',
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Bank Decision System',
      description: 'Automated underwriting and instant financing decisions',
    },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Analysis',
      description: 'Instant credit scoring and analysis of transaction patterns in real-time',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level encryption and compliance with international standards',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning models powered by Alibaba Cloud infrastructure',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Intelligence',
      description: 'Actionable insights to help merchants grow their business faster',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Multi-Stakeholder',
      description: 'Seamless integration for merchants, banks, and payment gateways',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Industry Leading',
      description: 'Trusted by 50,000+ MSMEs and major financial institutions',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder, Digital Store',
      content: 'PayBaba transformed how we access financing. What took weeks now takes hours, and we got better rates!',
      avatar: '🎯',
    },
    {
      name: 'Priya Singh',
      role: 'Operations Manager, E-Commerce',
      content: 'The insights provided by PayBaba helped us optimize our business strategy and increase revenue by 40%.',
      avatar: '📈',
    },
    {
      name: 'Anil Patel',
      role: 'CFO, Manufacturing Co.',
      content: 'Finally, a transparent and fair way to get credit. PayBaba is a game-changer for small businesses.',
      avatar: '⭐',
    },
  ];

  const faqs = [
    {
      question: 'How does PayBaba collect and secure transaction data?',
      answer: 'PayBaba connects securely to PayLabs payment gateway using industry-standard encryption. All data transmission follows international security protocols and complies with data protection regulations. Your transaction data is never stored permanently and is only used for credit analysis.',
    },
    {
      question: 'What does the AI Engine analyze to determine creditworthiness?',
      answer: 'Our Alibaba Cloud-powered AI engine analyzes transaction patterns, frequency, consistency, payment history, growth trends, and market indicators. It considers 100+ parameters to provide a comprehensive credit score that goes beyond traditional scoring methods.',
    },
    {
      question: 'How long does it take to get a credit decision?',
      answer: 'Most credit decisions are made within 24 hours. Our automated underwriting system works round-the-clock, and you can track your application status in real-time through our dashboard.',
    },
    {
      question: 'Which payment gateways are supported?',
      answer: 'PayBaba supports integration with all major payment gateways including PayLabs, Razorpay, PayU, Instamojo, and more. We continuously add new gateway integrations to expand our network.',
    },
    {
      question: 'What are the eligibility criteria for MSMEs?',
      answer: 'MSMEs with minimum 6 months of transaction history and consistent monthly revenue are eligible. There are no requirements for physical collateral or traditional credit history.',
    },
    {
      question: 'How is my credit score determined?',
      answer: 'Your credit score is based on a proprietary algorithm that analyzes your payment gateway transaction data. Factors include transaction volume, frequency, growth rate, payment timeliness, and business stability metrics.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-72 h-72 bg-[#F15A22]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#2DAEAA]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="text-sm font-semibold text-[#F15A22] bg-orange-50 px-4 py-2 rounded-full">
                      AI-Powered Credit Intelligence
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Transform MSME
                    <span className="bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent"> Financing </span>
                    with AI
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Intelligent credit scoring system that uses payment gateway data to help MSMEs access bank financing in minutes, not months. Powered by Alibaba Cloud.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="px-8 py-3.5 bg-[#F15A22] text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 group">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-3.5 border-2 border-[#2DAEAA] text-[#2DAEAA] rounded-full font-semibold hover:bg-teal-50 transition-all duration-300">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right Content - Visual */}
              <ScrollReveal delay={100}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-2xl p-8 text-white shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold opacity-80">Credit Score</span>
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Live Analysis</span>
                      </div>
                      <div className="text-5xl font-bold">8.7/10</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/20 rounded-full h-2">
                          <div className="bg-white rounded-full h-2 w-4/5"></div>
                        </div>
                      </div>
                      <div className="pt-6 space-y-3 border-t border-white/20">
                        <div className="flex justify-between text-sm">
                          <span>Transaction Volume</span>
                          <span className="text-green-300">↑ 45%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Payment Reliability</span>
                          <span className="text-green-300">Excellent</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Growth Rate</span>
                          <span className="text-green-300">↑ 32%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A seamless flow from merchant data to bank financing decisions
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2">
              {howItWorks.map((item, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="relative">
                    {/* Connector line */}
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-12 -right-1 w-full h-0.5 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA]" />
                    )}
                    
                    <div className="bg-white rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-full flex items-center justify-center text-white font-bold mb-4 relative z-10">
                        {index + 1}
                      </div>
                      <div className="text-[#F15A22] mb-3">{item.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need for intelligent credit scoring and growth
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:border-[#F15A22] transition-all duration-300 hover:shadow-lg">
                    <div className="text-[#F15A22] mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">About PayBaba</h2>
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
                        <Check className="w-5 h-5 text-[#2DAEAA] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ScrollReveal delay={100}>
                  <div className="bg-gradient-to-br from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-2xl p-8 border-2 border-dashed border-[#F15A22]/30">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent mb-2">
                          500K+
                        </div>
                        <p className="text-gray-600 text-sm">Transactions Daily</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent mb-2">
                          $2B+
                        </div>
                        <p className="text-gray-600 text-sm">Credit Provided</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent mb-2">
                          15+
                        </div>
                        <p className="text-gray-600 text-sm">Bank Partners</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent mb-2">
                          99.9%
                        </div>
                        <p className="text-gray-600 text-sm">Uptime SLA</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Technology Partners Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900">Powered by Alibaba Cloud</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Leveraging Alibaba Cloud's enterprise-grade AI and machine learning capabilities for advanced credit analysis and real-time processing.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Advanced AI Engine</p>
                      <p className="text-sm text-gray-600">Predictive analytics and pattern recognition</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900">Supported by PayLabs</h3>
                  <p className="text-gray-600 leading-relaxed">
                    PayLabs provides the payment gateway infrastructure and transaction data connectivity that powers our credit scoring system.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-[#F15A22]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Secure Gateway</p>
                      <p className="text-sm text-gray-600">Enterprise-grade transaction processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What MSMEs Say</h2>
                <p className="text-lg text-gray-600">Real stories from real businesses using PayBaba</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">{testimonial.content}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">Everything you need to know about PayBaba</p>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#F15A22] transition-colors duration-300">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-orange-50 hover:to-teal-50 transition-colors duration-300"
                    >
                      <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-[#F15A22] transition-transform duration-300 flex-shrink-0 ${
                          activeAccordion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeAccordion === index && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] py-20 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 left-20 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-700"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join 50,000+ MSMEs who have already accessed fair credit through PayBaba. Get approved in 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-[#F15A22] rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Start Free Trial Today
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
