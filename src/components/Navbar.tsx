import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { LanguageFilter } from '../types';
import { translations } from '../data/i18n';

interface NavbarProps {
  currentLang: LanguageFilter;
  onSelectLang: (lang: LanguageFilter) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  savedCount,
  onOpenSaved,
  onSearchChange,
  searchQuery,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const t = translations[currentLang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-nav"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E1D5]'
          : 'bg-[#FBF9F5] border-b border-[#EFE9DF]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[84px] sm:min-h-[92px] py-1.5">
          {/* Brand Logo & Name */}
          <div
            id="brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img
              src="https://i.postimg.cc/YqRqF6q5/Logo-con-fondo-highlight.png"
              alt="Editorial Charrán"
              className="h-16 sm:h-[68px] w-auto object-contain group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B231D] group-hover:text-[#D96B43] transition-colors">
                {t.brandTitle}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#7C6E65] -mt-1">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-link-hero"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-2 text-sm font-semibold text-[#4A4039] hover:text-[#D96B43] hover:bg-[#F3EDE2] rounded-lg transition-colors"
            >
              {t.home}
            </button>
            <button
              id="nav-link-catalogue"
              onClick={() => scrollTo('catalogo')}
              className="px-3 py-2 text-sm font-semibold text-[#4A4039] hover:text-[#D96B43] hover:bg-[#F3EDE2] rounded-lg transition-colors"
            >
              {t.catalogue}
            </button>
            <button
              id="nav-link-demo"
              onClick={() => scrollTo('metodo-en-vivo')}
              className="px-3 py-2 text-sm font-semibold text-[#4A4039] hover:text-[#D96B43] hover:bg-[#F3EDE2] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#D96B43]" />
              {t.demo}
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollTo('porque-charran')}
              className="px-3 py-2 text-sm font-semibold text-[#4A4039] hover:text-[#D96B43] hover:bg-[#F3EDE2] rounded-lg transition-colors"
            >
              {t.method}
            </button>
          </nav>

          {/* Right Action Tools: Search, Lang Switch, Saved */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input expander */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-[#DDD5C7] rounded-full px-3 py-1.5 shadow-inner">
                  <Search className="w-4 h-4 text-[#8C7E72] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      scrollTo('catalogo');
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-36 sm:w-48 bg-transparent text-xs text-[#2B231D] focus:outline-none placeholder-[#A4978A]"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-xs text-[#8C7E72] hover:text-black ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="search-toggle-btn"
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-[#5E5248] hover:text-[#D96B43] hover:bg-[#F3EDE2] rounded-full transition-colors"
                  title={t.searchPlaceholder}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Language Selector: Only ES and EN */}
            <div className="flex items-center bg-[#EDE6D9] p-1 rounded-full text-xs font-bold border border-[#E0D7C9] shadow-inner">
              <button
                id="lang-pill-es"
                onClick={() => onSelectLang('es')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  currentLang === 'es'
                    ? 'bg-[#D96B43] text-white shadow-sm ring-1 ring-[#B8532F]'
                    : 'text-[#6C5E53] hover:text-[#D96B43]'
                }`}
              >
                <span>🇪🇸</span> ES
              </button>
              <button
                id="lang-pill-en"
                onClick={() => onSelectLang('en')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  currentLang === 'en'
                    ? 'bg-[#4C6E7E] text-white shadow-sm ring-1 ring-[#314C5A]'
                    : 'text-[#6C5E53] hover:text-[#4C6E7E]'
                }`}
              >
                <span>🇬🇧</span> EN
              </button>
            </div>

            {/* Saved Wishlist Button */}
            <button
              id="saved-books-btn"
              onClick={onOpenSaved}
              className="relative p-2 text-[#5E5248] hover:text-[#D96B43] hover:bg-[#F3EDE2] rounded-full transition-colors cursor-pointer"
              title={t.savedTitle}
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D96B43] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5E5248] hover:text-[#D96B43] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-[#E8E1D5] px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollTo('catalogo')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-[#2B231D] hover:bg-[#F3EDE2] flex items-center justify-between"
          >
            <span>{t.catalogue}</span>
            <ChevronRight className="w-4 h-4 text-[#8C7E72]" />
          </button>
          <button
            onClick={() => scrollTo('metodo-en-vivo')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-[#D96B43] bg-[#FAF1EC] hover:bg-[#F5E6DD] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> {t.demo}
            </span>
            <ChevronRight className="w-4 h-4 text-[#D96B43]" />
          </button>
          <button
            onClick={() => scrollTo('porque-charran')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-[#2B231D] hover:bg-[#F3EDE2] flex items-center justify-between"
          >
            <span>{t.method}</span>
            <ChevronRight className="w-4 h-4 text-[#8C7E72]" />
          </button>
        </div>
      )}
    </header>
  );
};

