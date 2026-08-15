import React, { useEffect } from 'react';
import { Book, LanguageFilter } from '../types';
import { BookCoverArt } from './BookCoverArt';
import { X, ExternalLink, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';
import { translations } from '../data/i18n';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onOpenSample: (book: Book) => void;
  isSaved: boolean;
  onToggleSave: (bookId: string) => void;
  currentLang: LanguageFilter;
}

export const BookModal: React.FC<BookModalProps> = ({
  book,
  onClose,
  onOpenSample,
  isSaved,
  onToggleSave,
  currentLang,
}) => {
  const t = translations[currentLang].modal;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!book) return null;

  const handleVerPrueba = () => {
    onClose();
    onOpenSample(book);
  };

  const handleAmazon = () => {
    const targetUrl =
      book.amazonUrl ||
      `https://www.amazon.com/s?k=${encodeURIComponent('Editorial Charrán ' + book.title)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const displayTitle = currentLang === 'en' && book.titleEn ? book.titleEn : book.title;
  const displaySynopsis = currentLang === 'en' ? book.synopsis.en : book.synopsis.es;
  const displayCategory = currentLang === 'en' ? book.categoryLabel.en : book.categoryLabel.es;

  return (
    <div
      id="book-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
    >
      {/* Modal Dialog Card (faithfully matching Image 3) */}
      <div
        id="book-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-[#E2D8C6] overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6B5F] hover:text-[#2B231D] hover:bg-[#EBE2D3] rounded-full transition-colors z-20 cursor-pointer"
          title={t.closeTooltip}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Layout: Book Cover on Left, Details & 2 Buttons on Right (Image 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left: 3D Book Cover */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center">
            <div className="w-44 sm:w-full max-w-[190px] shadow-2xl rounded-md transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <BookCoverArt type={book.coverType} coverImage={book.coverImage} title={book.title} />
            </div>

            {/* Quick meta under cover */}
            <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-[#6D5D51]">
              <span className="px-2 py-0.5 bg-[#EDE4D5] rounded-full">{book.level}</span>
              <span>•</span>
              <span>
                {book.pages} {t.pages}
              </span>
              <span>•</span>
              <span>{book.tag}</span>
            </div>
          </div>

          {/* Right: Book Title, Synopsis, and the 2 Action Buttons */}
          <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
            {/* Title & Author */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D96B43]">
                  {displayCategory}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleSave(book.id)}
                  className="text-xs font-semibold text-[#6D5D51] hover:text-[#D96B43] flex items-center gap-1 cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isSaved ? 'fill-[#D96B43] text-[#D96B43]' : ''
                    }`}
                  />
                  <span>{isSaved ? t.savedBtn : t.saveBtn}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#241D17] font-serif mt-1 leading-tight">
                {displayTitle}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#736357] mt-0.5">
                {t.byAuthor} {book.author}
              </p>
            </div>

            {/* Synopsis Section matching Image 3 */}
            <div className="space-y-1.5 bg-[#F2EDE1]/60 p-3.5 rounded-xl border border-[#E5DAC8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A3D33]">
                {t.synopsisHeader}
              </h3>
              <p className="text-xs sm:text-sm text-[#382F27] leading-relaxed font-serif">
                {displaySynopsis}
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#54473D] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B8C65]" /> {t.featureSideBySide}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B8C65]" /> {t.featureGlossary}
              </span>
            </div>

            {/* The 2 Primary Action Buttons (matching Image 3: Terracotta & Slate/Teal Buttons) */}
            <div className="space-y-2.5 pt-1">
              {/* 1. Ver en Amazon (Terracotta button) */}
              <button
                id="btn-ver-en-amazon"
                onClick={handleAmazon}
                className="w-full py-3 px-6 bg-[#C95D3B] hover:bg-[#B34E2E] text-white font-bold text-sm sm:text-base rounded-xl shadow-md border-2 border-[#A34324] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.amazonBtn}</span>
                <ExternalLink className="w-4 h-4 text-white/90" />
              </button>

              {/* 2. Ver una prueba / Ver un ejemplo (Teal/Slate button) */}
              <button
                id="btn-ver-una-prueba"
                onClick={handleVerPrueba}
                className="w-full py-3 px-6 bg-[#3F6A78] hover:bg-[#325662] text-white font-bold text-sm sm:text-base rounded-xl shadow-md border-2 border-[#2C4E59] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#A7D8E6]" />
                <span>{t.sampleBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
