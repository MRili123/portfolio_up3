import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Github, Linkedin, Briefcase, Send, CheckCircle, XCircle } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com',
      color: 'hover:text-slate-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Indeed',
      icon: Briefcase,
      url: 'https://indeed.com',
      color: 'hover:text-blue-700'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:ilias.jebrane@example.com',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Let's Connect
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-xl transition-all ${social.color}`}
                      >
                        <Icon size={32} className="mb-3" />
                        <span className="text-sm font-medium">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/50 dark:bg-slate-900/50 rounded-xl backdrop-blur-sm">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  "I'm always excited to collaborate on innovative projects and discuss new opportunities. Whether you have a project in mind or just want to connect, feel free to reach out!"
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.contact.sending}
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    {t.contact.success}
                  </>
                ) : status === 'error' ? (
                  <>
                    <XCircle size={20} />
                    {t.contact.error}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t.contact.send}
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl"
                >
                  <p className="text-green-700 dark:text-green-400 text-sm text-center">
                    {t.contact.success}
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
