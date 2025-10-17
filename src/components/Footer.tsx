import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-slate-400 flex items-center justify-center gap-2">
            {t.footer.made} <Heart size={16} className="text-red-500 fill-current" /> {t.footer.by} Ilias Jebrane
          </p>
          <p className="text-slate-500 text-sm mt-2">
            © {currentYear} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
