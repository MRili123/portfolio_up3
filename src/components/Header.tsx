import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'AR', flag: '🇸🇦' }
  ];

  const navLinks = [
    { name: t.nav.home, path: '/', hash: '' },
    { name: t.nav.skills, path: '/', hash: '#skills' },
    { name: t.nav.projects, path: '/', hash: '#projects' },
    { name: t.nav.contact, path: '/', hash: '#contact' }
  ];

  const scrollToSection = (hash: string) => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => scrollToSection('')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          >
            Ilias Jebrane
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={(e) => {
                  if (link.hash) {
                    e.preventDefault();
                    if (location.pathname !== '/') {
                      window.location.href = `/${link.hash}`;
                    } else {
                      scrollToSection(link.hash);
                    }
                  }
                }}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-500 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="text-slate-700 dark:text-slate-300" size={20} />
              ) : (
                <Moon className="text-slate-700 dark:text-slate-300" size={20} />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="text-slate-700 dark:text-slate-300" size={24} />
              ) : (
                <Menu className="text-slate-700 dark:text-slate-300" size={24} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={(e) => {
                      if (link.hash) {
                        e.preventDefault();
                        if (location.pathname !== '/') {
                          window.location.href = `/${link.hash}`;
                        } else {
                          scrollToSection(link.hash);
                        }
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-500 font-medium transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
