import { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Search, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { GlowingButton } from '../GlowingButton';
import { toast } from 'sonner@2.0.3';
import type { Page } from '../../App';

interface HelpPageProps {
  onNavigate: (page: Page) => void;
}

const faqs = [
  {
    question: 'How do I add a new certification?',
    answer: 'Navigate to the Certifications page and click the "Add Certification" button. Fill in the required details including certification name, vendor, issue date, and expiry date. You can also upload supporting documents.'
  },
  {
    question: 'When will I receive expiry reminders?',
    answer: 'By default, you will receive reminders 30 days before a certification expires. You can customize this in Settings > Notifications to set your preferred reminder timeframe.'
  },
  {
    question: 'Can I track certifications for my team members?',
    answer: 'Yes! If you have Manager or HR Administrator role, you can view and manage certifications for all team members in the Team Management section. You can also assign training and send reminders.'
  },
  {
    question: 'How do I export reports?',
    answer: 'Go to the Reports page, select your desired filters (date range, department, etc.), and click the "Export PDF" or "Export CSV" button. The report will be downloaded to your device.'
  },
  {
    question: 'What is the compliance score?',
    answer: 'The compliance score is calculated based on the percentage of active certifications versus total certifications. A score of 90% or above indicates excellent compliance, while below 75% requires attention.'
  },
  {
    question: 'How do I integrate with our HRIS system?',
    answer: 'Navigate to Settings > Integrations and select your HRIS provider. You will need API credentials from your HRIS administrator to complete the connection. Contact support if you need assistance.'
  },
  {
    question: 'Can I bulk upload certifications?',
    answer: 'Yes, you can bulk upload certifications using our CSV template. Download the template from the Certifications page, fill in your data, and upload the completed file.'
  },
  {
    question: 'What happens if a certification expires?',
    answer: 'When a certification expires, it is automatically marked as "Expired" and removed from active compliance calculations. You will receive notifications before expiry, and you can track renewal progress in the Dashboard.'
  }
];

export function HelpPage({ onNavigate }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-3">How can we help you?</h1>
          <p className="text-xl text-gray-600">
            Search our knowledge base or contact support
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 text-lg h-14"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg mb-2">Documentation</h3>
            <p className="text-sm text-gray-600">
              Detailed guides and tutorials
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎥</span>
            </div>
            <h3 className="text-lg mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600">
              Step-by-step video guides
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg mb-2">Community Forum</h3>
            <p className="text-sm text-gray-600">
              Connect with other users
            </p>
          </motion.div>
        </div>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No results found. Try a different search term or contact support.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Still need help? Contact us</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitContact} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input
                    id="contact-name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-subject">Subject *</Label>
                <Input
                  id="contact-subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={6}
                  placeholder="Describe your issue or question..."
                  required
                />
              </div>

              <div className="flex justify-end">
                <GlowingButton type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </GlowingButton>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">You can also reach us at:</p>
          <p>
            Email:{' '}
            <a href="mailto:support@certtrackpro.com" className="text-[#007BFF] hover:underline">
              support@certtrackpro.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a href="tel:+15551234567" className="text-[#007BFF] hover:underline">
              +1 (555) 123-4567
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
