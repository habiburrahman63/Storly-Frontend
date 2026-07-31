import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your inquiry has been sent successfully.', 'success');
    }, 800);
  };

  const FAQS = [
    {
      q: 'How does Storly ensure 100% organic freshness during delivery?',
      a: 'All produce is harvested daily from certified organic farms and dispatched in eco-friendly insulated cold-packs maintained at 2-4°C.',
    },
    {
      q: 'What are your delivery hours and coverage areas?',
      a: 'We deliver 7 days a week from 8:00 AM to 10:00 PM across all major urban and suburban zip codes with same-day express options.',
    },
    {
      q: 'What is your satisfaction guarantee policy?',
      a: 'If any organic item does not meet your quality expectation, simply snap a picture in your order dashboard within 24 hours for a full instant refund or replacement.',
    },
    {
      q: 'Can I set up weekly recurring subscription deliveries?',
      a: 'Yes! You can customize recurring organic milk, egg, and vegetable baskets directly from your user dashboard with a 10% subscription discount.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* 1. Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#72bf44]">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          We’re Here To Help You Eat Fresh & Live Healthy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Have questions about our organic farm products, order tracking, or vendor partnerships? Reach out to our dedicated support team anytime.
        </p>
      </div>

      {/* 2. Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#034848] flex items-center justify-center shrink-0 font-bold">
            <Phone className="w-6 h-6 text-[#72bf44]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Support Hotline
            </h4>
            <p className="text-xs font-bold text-[#034848]">+1 (888) 777-999</p>
            <p className="text-[11px] text-slate-400">Toll-free 24/7 hotline</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#034848] flex items-center justify-center shrink-0 font-bold">
            <Mail className="w-6 h-6 text-[#72bf44]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Email Customer Care
            </h4>
            <p className="text-xs font-bold text-[#034848]">support@storly.com</p>
            <p className="text-[11px] text-slate-400">Response within 2 hours</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#034848] flex items-center justify-center shrink-0 font-bold">
            <MapPin className="w-6 h-6 text-[#72bf44]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Store Headquarters
            </h4>
            <p className="text-xs font-bold text-slate-700">2972 Westheimer Rd.</p>
            <p className="text-[11px] text-slate-400">Santa Ana, Illinois 85486</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#034848] flex items-center justify-center shrink-0 font-bold">
            <Clock className="w-6 h-6 text-[#72bf44]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Operating Hours
            </h4>
            <p className="text-xs font-bold text-slate-700">Mon - Sun: 8:00 AM - 10:00 PM</p>
            <p className="text-[11px] text-slate-400">Open 365 days a year</p>
          </div>
        </div>
      </div>

      {/* 3. Form & Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#034848] text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#72bf44]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Send Us A Message</h2>
              <p className="text-xs text-slate-500">We respond to all customer messages rapidly.</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl text-center space-y-4 border border-emerald-200 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#72bf44] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-[#034848]">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-slate-800">{formData.name}</span>! Our organic customer care specialist will review your request and reply to <span className="font-bold text-slate-800">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-6 py-2.5 bg-[#034848] hover:bg-[#023838] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-[#034848] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-[#034848] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-[#034848] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-[#034848] focus:bg-white transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status & Delivery">Order Status & Delivery</option>
                    <option value="Organic Product Quality">Organic Product Quality</option>
                    <option value="Vendor / Farm Partnership">Vendor / Farm Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we assist you with your organic grocery order?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-[#034848] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#034848] hover:bg-[#023838] active:bg-[#72bf44] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#72bf44]" /> Submit Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Store Locations & FAQ side */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Map / Location Card */}
          <div className="bg-[#034848] text-white p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-[#72bf44] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" /> Store Locations
            </div>
            <h3 className="text-lg font-black">Visit Our Local Organic Hubs</h3>
            <div className="space-y-3 text-xs text-stone-200">
              <div className="p-3 bg-[#023838] rounded-xl border border-emerald-800/60">
                <p className="font-extrabold text-white">1. Brown Shop Market</p>
                <p className="text-[11px] text-slate-300">104 Bay Area Boulevard, San Francisco, California</p>
                <p className="text-[10px] text-[#72bf44] font-bold mt-1">Status: Open Today until 10:00 PM</p>
              </div>
              <div className="p-3 bg-[#023838] rounded-xl border border-emerald-800/60">
                <p className="font-extrabold text-white">2. Green Harvest Hub</p>
                <p className="text-[11px] text-slate-300">89 Organic Valley Rd, Portland, Oregon</p>
                <p className="text-[10px] text-[#72bf44] font-bold mt-1">Status: Open Today until 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#034848]" />
              <h3 className="text-sm font-black text-slate-900">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-2">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border border-stone-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-4 py-3 text-left text-xs font-bold text-slate-800 bg-stone-50/60 hover:bg-stone-100 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 py-3 text-xs text-slate-600 bg-white border-t border-stone-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
