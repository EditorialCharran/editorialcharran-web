import React, { useState, useRef, useEffect } from 'react';
import { Book, LanguageFilter } from '../types';
import {
  BookOpen,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookMarked,
} from 'lucide-react';
import { translations } from '../data/i18n';

interface InteractiveReaderProps {
  selectedBook: Book;
  allBooks: Book[];
  onSelectBook: (book: Book) => void;
  currentLang: LanguageFilter;
}

export const InteractiveReader: React.FC<InteractiveReaderProps> = ({
  selectedBook,
  allBooks,
  onSelectBook,
  currentLang,
}) => {
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number>(0);
  const [hoveredParagraphIndex, setHoveredParagraphIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readingTheme, setReadingTheme] = useState<'paper' | 'sepia' | 'dark'>('paper');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobilePortraitTab, setMobilePortraitTab] = useState<'both' | 'es' | 'en'>('both');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingVerticalScrubber = useRef<boolean>(false);

  const t = translations[currentLang].reader;

  // Track scroll position inside the reader container to position the vertical book handle
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      const progress = Math.max(0, Math.min(100, (scrollTop / maxScroll) * 100));
      setScrollProgress(progress);
    }
  };

  // Dragging the vertical scrubber in the center
  const handleVerticalScrubberMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingVerticalScrubber.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingVerticalScrubber.current || !scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const percentage = Math.max(0, Math.min(100, (relativeY / rect.height) * 100));
      setScrollProgress(percentage);

      const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTop = (percentage / 100) * maxScroll;
    };

    const handleMouseUp = () => {
      isDraggingVerticalScrubber.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Reset scroll to top
  const handleResetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveParagraphIndex(0);
    setScrollProgress(0);
  };

  // Font size classes
  const fontSizes = {
    sm: 'text-xs sm:text-sm md:text-base leading-relaxed',
    base: 'text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose',
    lg: 'text-base sm:text-lg md:text-xl leading-relaxed md:leading-loose',
    xl: 'text-lg sm:text-xl md:text-2xl leading-loose',
  };

  // Themes
  const themes = {
    paper: {
      bg: 'bg-[#FAF8F3]',
      card: 'bg-white',
      border: 'border-[#EAE1D2]',
      text: 'text-[#2B231D]',
      highlightLeft: 'bg-[#FBE8DE] border-[#D96B43]/60 text-[#1C1510]',
      highlightRight: 'bg-[#E3EFF4] border-[#4C6E7E]/60 text-[#12232B]',
    },
    sepia: {
      bg: 'bg-[#F4EEDC]',
      card: 'bg-[#EFE6CE]',
      border: 'border-[#DECDB2]',
      text: 'text-[#3E2E1D]',
      highlightLeft: 'bg-[#EBD2B8] border-[#B8532F]/60 text-[#2B1B0C]',
      highlightRight: 'bg-[#DFE7DD] border-[#426E55]/60 text-[#1B2B20]',
    },
    dark: {
      bg: 'bg-[#1C2024]',
      card: 'bg-[#252B30]',
      border: 'border-[#384148]',
      text: 'text-[#EDE8E1]',
      highlightLeft: 'bg-[#3D251D] border-[#D96B43]/70 text-[#FFE7DF]',
      highlightRight: 'bg-[#1B323E] border-[#5E91A6]/70 text-[#E1F3FB]',
    },
  };

  const currentTheme = themes[readingTheme];
  const activeExcerpt = selectedBook.sampleExcerpt || [];
  const isEnglishTarget = selectedBook.learningTarget === 'en';

  const leftHeaderTitle = isEnglishTarget
    ? currentLang === 'es' ? '🇬🇧 Texto en Inglés' : '🇬🇧 English Text'
    : currentLang === 'es' ? '🇪🇸 Texto en Español' : '🇪🇸 Spanish Text';

  const leftHeaderSub = currentLang === 'es' ? '(Original / Cara A)' : '(Original / Side A)';

  const rightHeaderTitle = isEnglishTarget
    ? currentLang === 'es' ? '🇪🇸 Traducción en Español' : '🇪🇸 Spanish Translation'
    : currentLang === 'es' ? '🇬🇧 Traducción en Inglés' : '🇬🇧 English Translation';

  const rightHeaderSub = currentLang === 'es' ? '(Espejo / Cara B)' : '(Mirror / Side B)';

  return (
    <section id="metodo-en-vivo" className="w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-[#F5EFE6]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DDD0] text-xs font-bold uppercase tracking-wider text-[#635043] mb-3">
            <Sparkles className="w-4 h-4 text-[#D96B43]" />
            {t.badge}
          </div>
          <h2
            id="reader-main-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2B231D] font-serif uppercase"
          >
            {t.title}
          </h2>
        </div>

        {/* Control Toolbar: Book Selector, Font Size, Theme */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 mb-5 sm:mb-6 shadow-sm border border-[#E2D7C5] flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Book Switcher Dropdown */}
          <div className="flex items-center gap-2 max-w-full">
            <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 text-[#D96B43] flex-shrink-0" />
            <span className="text-xs font-bold uppercase text-[#736357] hidden sm:inline">
              {t.sampleLabel}
            </span>
            <select
              id="select-book-sample"
              value={selectedBook.id}
              onChange={(e) => {
                const b = allBooks.find((item) => item.id === e.target.value);
                if (b) {
                  onSelectBook(b);
                  handleResetScroll();
                }
              }}
              className="bg-[#FAF7F0] border border-[#DDD3C2] text-xs sm:text-sm font-bold text-[#2B231D] rounded-xl px-2.5 sm:px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D96B43] cursor-pointer max-w-[240px] sm:max-w-sm md:max-w-md truncate"
            >
              {allBooks.map((b) => {
                const targetTag = b.learningTarget === 'en' ? 'ENG' : 'ESP';
                const bookTitle = currentLang === 'en' && b.titleEn ? b.titleEn : b.title;
                return (
                  <option key={b.id} value={b.id}>
                    {bookTitle} ({targetTag}) — {b.author}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Quick Actions: Font size & Theme switcher */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Font Zoom */}
            <div className="flex items-center bg-[#FAF7F0] border border-[#DDD3C2] rounded-lg p-0.5 sm:p-1 text-xs">
              <button
                onClick={() =>
                  setFontSize(
                    fontSize === 'xl' ? 'lg' : fontSize === 'lg' ? 'base' : 'sm'
                  )
                }
                className="p-1 text-[#6B5A4E] hover:text-[#2B231D] rounded transition-colors cursor-pointer"
                title={t.zoomOut}
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <span className="px-1.5 sm:px-2 font-bold text-[#3B2F25] uppercase text-[9px] sm:text-[10px]">
                {fontSize}
              </span>
              <button
                onClick={() =>
                  setFontSize(
                    fontSize === 'sm' ? 'base' : fontSize === 'base' ? 'lg' : 'xl'
                  )
                }
                className="p-1 text-[#6B5A4E] hover:text-[#2B231D] rounded transition-colors cursor-pointer"
                title={t.zoomIn}
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Reading Themes */}
            <div className="flex items-center bg-[#FAF7F0] border border-[#DDD3C2] rounded-lg p-0.5 sm:p-1 gap-1">
              <button
                onClick={() => setReadingTheme('paper')}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#FAF8F3] border border-[#D5CABB] flex items-center justify-center text-[9px] sm:text-[10px] font-bold cursor-pointer ${
                  readingTheme === 'paper' ? 'ring-2 ring-[#D96B43]' : ''
                }`}
                title={t.themeLight}
              >
                📄
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#F4EEDC] border border-[#D5C5A8] flex items-center justify-center text-[9px] sm:text-[10px] font-bold cursor-pointer ${
                  readingTheme === 'sepia' ? 'ring-2 ring-[#D96B43]' : ''
                }`}
                title={t.themeSepia}
              >
                📜
              </button>
              <button
                onClick={() => setReadingTheme('dark')}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1C2024] border border-[#384148] text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold cursor-pointer ${
                  readingTheme === 'dark' ? 'ring-2 ring-[#D96B43]' : ''
                }`}
                title={t.themeDark}
              >
                🌙
              </button>
            </div>

            {/* Reset Scroll */}
            <button
              onClick={handleResetScroll}
              className="p-1 sm:p-1.5 text-xs text-[#6B5A4E] hover:text-[#2B231D] hover:bg-[#FAF7F0] rounded-lg border border-transparent hover:border-[#DDD3C2] transition-colors cursor-pointer"
              title={t.resetScroll}
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Dual-Text Mirror Container with Vertical Displacement and Center Vertical Scrubber */}
        <div
          id="dual-reader-container"
          className={`relative w-full rounded-2xl shadow-xl border ${currentTheme.border} ${currentTheme.bg} overflow-hidden transition-colors duration-300`}
        >
          {/* Header Column Labels: 50% left & 50% right on landscape & desktop */}
          <div className="grid grid-cols-2 border-b border-inherit bg-black/5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider py-2.5 sm:py-3 px-3 sm:px-6 select-none">
            <div className={`flex items-center gap-1.5 sm:gap-2 ${isEnglishTarget ? 'text-[#3A6375]' : 'text-[#C05837]'} truncate pr-2`}>
              <span className="truncate">{leftHeaderTitle}</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C7A6D] hidden sm:inline">
                {leftHeaderSub}
              </span>
            </div>
            <div className={`flex items-center gap-1.5 sm:gap-2 ${isEnglishTarget ? 'text-[#C05837]' : 'text-[#3A6375]'} justify-end sm:justify-start truncate pl-2`}>
              <span className="truncate">{rightHeaderTitle}</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C7A6D] hidden sm:inline">
                {rightHeaderSub}
              </span>
            </div>
          </div>

          {/* Synchronized Scrollable Dual-Column Body with Center Vertical Scrubber */}
          <div className="relative w-full">
            {/* Scrollable text container (fits perfectly on landscape mobile screens as well) */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="relative max-h-[460px] landscape:max-h-[340px] md:max-h-[580px] overflow-y-auto p-3 sm:p-6 md:p-8 select-text scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {/* Dual Column Layout: On mobile landscape or tablet/desktop (md:), strictly 2 columns (50% / 50%) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-12 relative">
                
                {/* LEFT COLUMN: PRIMARY TEXT (English if learning English, Spanish if learning Spanish) */}
                <div id="reader-column-left" className="space-y-4 sm:space-y-6">
                  {activeExcerpt.map((para, idx) => {
                    const isActive = activeParagraphIndex === idx;
                    const isHovered = hoveredParagraphIndex === idx;
                    const isHighlighted = isActive || isHovered;
                    const text = isEnglishTarget ? para.en : para.es;

                    return (
                      <div
                        key={`left-${para.id}`}
                        id={`para-left-${idx}`}
                        onMouseEnter={() => setHoveredParagraphIndex(idx)}
                        onMouseLeave={() => setHoveredParagraphIndex(null)}
                        onClick={() => setActiveParagraphIndex(idx)}
                        className={`relative p-3.5 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer font-serif ${
                          fontSizes[fontSize]
                        } ${
                          isHighlighted
                            ? (isEnglishTarget ? currentTheme.highlightRight : currentTheme.highlightLeft) + ' shadow-md scale-[1.01]'
                            : 'border-transparent hover:bg-black/5 ' + currentTheme.text
                        }`}
                      >
                        {/* Paragraph index marker */}
                        <div className="flex items-center justify-between mb-1 select-none">
                          <span className={`text-[9px] sm:text-[11px] font-sans font-bold ${isEnglishTarget ? 'text-[#4C6E7E]' : 'text-[#D96B43]'}`}>
                            § {idx + 1}
                          </span>
                        </div>

                        <p className="hyphens-auto">{text}</p>
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT COLUMN: MIRROR TEXT (Spanish if learning English, English if learning Spanish) */}
                <div id="reader-column-right" className="space-y-4 sm:space-y-6">
                  {activeExcerpt.map((para, idx) => {
                    const isActive = activeParagraphIndex === idx;
                    const isHovered = hoveredParagraphIndex === idx;
                    const isHighlighted = isActive || isHovered;
                    const text = isEnglishTarget ? para.es : para.en;

                    return (
                      <div
                        key={`right-${para.id}`}
                        id={`para-right-${idx}`}
                        onMouseEnter={() => setHoveredParagraphIndex(idx)}
                        onMouseLeave={() => setHoveredParagraphIndex(null)}
                        onClick={() => setActiveParagraphIndex(idx)}
                        className={`relative p-3.5 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer font-serif ${
                          fontSizes[fontSize]
                        } ${
                          isHighlighted
                            ? (isEnglishTarget ? currentTheme.highlightLeft : currentTheme.highlightRight) + ' shadow-md scale-[1.01]'
                            : 'border-transparent hover:bg-black/5 ' + currentTheme.text
                        }`}
                      >
                        {/* Paragraph index marker */}
                        <div className="flex items-center justify-between mb-1 select-none">
                          <span className={`text-[9px] sm:text-[11px] font-sans font-bold ${isEnglishTarget ? 'text-[#D96B43]' : 'text-[#4C6E7E]'}`}>
                            § {idx + 1}
                          </span>
                        </div>

                        <p className="hyphens-auto">{text}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* ================= CENTRAL VERTICAL SCRUBBER / SLIDER (Visible on landscape mode and desktop) ================= */}
            <div
              id="central-vertical-scrubber"
              className="hidden landscape:flex md:flex absolute top-0 bottom-0 left-1/2 -ml-3 w-6 pointer-events-none items-center justify-center select-none"
            >
              {/* Vertical line divider */}
              <div className="w-[2px] h-full bg-gradient-to-b from-[#E0D7C9] via-[#D96B43]/50 to-[#E0D7C9]" />

              {/* Central Circular Orange Book Icon Badge moving vertically with scroll */}
              <div
                onMouseDown={handleVerticalScrubberMouseDown}
                style={{
                  top: `calc(${scrollProgress}% * 0.85 + 24px)`,
                }}
                className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#D96B43] to-[#EE7A50] text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing transform -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform duration-100"
                title={t.scrollIndicator}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
