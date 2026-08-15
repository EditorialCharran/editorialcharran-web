import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { LanguageFilter } from '../types';
import { translations } from '../data/i18n';

interface FooterProps {
  currentLang: LanguageFilter;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const t = translations[currentLang].footer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#241E1A] text-[#E5DDD2] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#3B322B]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3E342C]">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <img
              src="https://i.postimg.cc/YqRqF6q5/Logo-con-fondo-highlight.png"
              alt="Editorial Charrán"
              className="h-16 sm:h-[68px] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
              EDITORIAL CHARRÁN
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#A89C90] leading-relaxed max-w-sm">
            {t.mission}
          </p>
          <div className="flex items-center gap-3 text-xs text-[#C2B7A9]">
            <ShieldCheck className="w-4 h-4 text-[#5B8C65]" />
            <span>{t.verified}</span>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D96B43] mb-4">
            {t.collectionsTitle}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#BDB1A3]">
            <li>
              <a href="#catalogo" className="hover:text-white transition-colors">
                {t.colLiterary}
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-white transition-colors">
                {t.colYA}
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-white transition-colors">
                {t.colInteractive}
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D96B43] mb-4">
            {t.resourcesTitle}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#BDB1A3]">
            <li>
              <a href="#catalogo" className="hover:text-white transition-colors">
                {t.resCatalogue}
              </a>
            </li>
            <li>
              <a href="#metodo-en-vivo" className="hover:text-white transition-colors">
                {t.resLiveDemo}
              </a>
            </li>
            <li>
              <a href="#porque-charran" className="hover:text-white transition-colors">
                {t.resMethodGuide}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D96B43] mb-4">
            {t.newsletterTitle}
          </h4>
          <p className="text-xs text-[#A89C90] mb-3">{t.newsletterDesc}</p>

          {subscribed ? (
            <div className="p-3 bg-[#334638] text-[#A6E2B6] rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{t.newsletterSuccess}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletterPlaceholder}
                  className="w-full bg-[#181310] border border-[#443830] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#D96B43]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#D96B43] hover:bg-[#BD5535] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{t.newsletterBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright & Legal Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7E72] gap-4">
        <p>© {new Date().getFullYear()} Editorial Charrán. {t.copyright}</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#BDB1A3] cursor-pointer">{t.legalNotice}</span>
          <span className="hover:text-[#BDB1A3] cursor-pointer">{t.privacyPolicy}</span>
          <span className="hover:text-[#BDB1A3] cursor-pointer">{t.termsConditions}</span>
        </div>
      </div>
    </footer>
  );
};
