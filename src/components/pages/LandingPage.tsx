import { motion } from 'motion/react';
import { GlowingButton } from '../GlowingButton';
import { Award, Shield, Bell, TrendingUp, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import type { Page } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const testimonials = [
    {
      company: 'TalentGuard',
      quote: 'Reduced administrative time by 40% and achieved 100% compliance tracking',
      author: 'Sarah Mitchell, HR Director'
    },
    {
      company: 'MedCare Systems',
      quote: 'Never missed a single certification renewal since implementing CertTrack Pro',
      author: 'Dr. James Chen, Compliance Officer'
    },
    {
      company: 'TechManufacturing Inc',
      quote: 'Transformed our certification chaos into streamlined strategic advantage',
      author: 'Maria Rodriguez, Operations Manager'
    }
  ];

  const problems = [
    {
      icon: AlertTriangle,
      title: 'High-Stakes Consequences',
      description: 'One missed renewal can trigger regulatory fines, operational shutdowns, or liability exposure'
    },
    {
      icon: Clock,
      title: 'Manual Spreadsheet Errors',
      description: 'Tracking certifications across teams leads to data inconsistencies and missed deadlines'
    },
    {
      icon: TrendingUp,
      title: 'Scalability Issues',
      description: 'Growing organizations struggle to maintain visibility as certification complexity increases'
    }
  ];

  const solutions = [
    {
      icon: Award,
      title: 'Centralized Hub',
      description: 'Single source of truth for all professional certifications across your organization',
      color: 'bg-blue-50'
    },
    {
      icon: Bell,
      title: 'Intelligent Automation',
      description: 'Automated reminders and renewal workflows ensure zero missed deadlines',
      color: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Role-based permissions and audit trails for complete compliance confidence',
      color: 'bg-green-50'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#007BFF] via-[#0056b3] to-[#003d82] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1762330910399-95caa55acf04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2VydGlmaWNhdGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzA0NjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <span className="text-xl">CertTrack Pro</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
                Transform compliance into a strategic advantage
              </h1>
              
              <p className="text-xl mb-8 text-blue-100">
                Intelligent certification tracking technology for IT, healthcare, and manufacturing industries. 
                Centralized management, automated reminders, and powerful analytics.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <GlowingButton onClick={() => onNavigate('register')}>
                  Get Started
                </GlowingButton>
                <GlowingButton 
                  variant="secondary"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </GlowingButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">The Compliance Challenge</h2>
            <p className="text-xl text-gray-600">Critical pain points that put your organization at risk</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-red-50 p-6 rounded-xl border border-red-100"
              >
                <problem.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl mb-2 text-gray-900">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">Our Solution</h2>
            <p className="text-xl text-gray-600">Everything you need to manage certifications with confidence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 ${solution.color} rounded-xl flex items-center justify-center mb-6`}>
                  <solution.icon className="w-8 h-8 text-[#007BFF]" />
                </div>
                <h3 className="text-2xl mb-3 text-gray-900">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#007BFF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-blue-100">Real results from real organizations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur p-6 rounded-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p>{testimonial.author}</p>
                  <p className="text-sm text-blue-200">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6 text-gray-900">Ready to Transform Your Compliance Management?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of organizations that trust CertTrack Pro for certification management
          </p>
          <GlowingButton onClick={() => onNavigate('register')}>
            Start Free Trial
          </GlowingButton>
        </div>
      </section>
    </div>
  );
}
