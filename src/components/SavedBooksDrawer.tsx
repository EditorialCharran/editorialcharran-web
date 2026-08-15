import React from 'react';
import { Book, LanguageFilter } from '../types';
import { BookCoverArt } from './BookCoverArt';
import { X, Trash2, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { translations } from '../data/i18n';

interface SavedBooksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedBooks: Book[];
  onRemove: (bookId: string) => void;
  onOpenModal: (book: Book) => void;
  onOpenSample: (book: Book) => void;
  currentLang: LanguageFilter;
}

export const SavedBooksDrawer: React.FC<SavedBooksDrawerProps> = ({
  isOpen,
  onClose,
  savedBooks,
  onRemove,
  onOpenModal,
  onOpenSample,
  currentLang,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang].drawer;

  return (
    <div
      id="saved-books-drawer-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
    >
      <div
        id="saved-books-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF7F0] h-full shadow-2xl border-l border-[#E2D7C5] p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        <div>
          <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#2B231D] font-serif">
                {t.title}
              </h3>
              <p className="text-xs text-[#7A6B5F]">
                {savedBooks.length} {t.countSub}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7A6B5F] hover:text-[#2B231D] hover:bg-[#EDE5D6] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {savedBooks.length === 0 ? (
            <div className="text-center py-16 px-4">
              <BookOpen className="w-12 h-12 text-[#C4B7A8] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#2B231D]">
                {t.emptyTitle}
              </p>
              <p className="text-xs text-[#7A6B5F] mt-1">
                {t.emptySub}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E5DDD0] shadow-sm hover:shadow transition-shadow"
                >
                  <div
                    className="w-16 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      onOpenModal(book);
                      onClose();
                    }}
                  >
                    <BookCoverArt type={book.coverType} coverImage={book.coverImage} title={book.title} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => {
                          onOpenModal(book);
                          onClose();
                        }}
                        className="text-xs font-bold text-[#2B231D] hover:text-[#D96B43] cursor-pointer line-clamp-1"
                      >
                        {currentLang === 'en' && book.titleEn ? book.titleEn : book.title}
                      </h4>
                      <p className="text-[11px] text-[#78695E]">{book.author}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-[#F2EDE1] text-[#635043] rounded">
                        {book.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#F2ECE0]">
                      <button
                        onClick={() => {
                          onOpenSample(book);
                          onClose();
                        }}
                        className="text-[11px] font-bold text-[#3F6A78] hover:text-[#284954] flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" /> {t.trySample}
                      </button>
                      <button
                        onClick={() => {
                          const targetUrl =
                            book.amazonUrl ||
                            `https://www.amazon.com/s?k=${encodeURIComponent(
                              'Editorial Charrán ' + book.title
                            )}`;
                          window.open(targetUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="text-[11px] font-bold text-[#C95D3B] hover:text-[#A64426] flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" /> Amazon
                      </button>
                      <button
                        onClick={() => onRemove(book.id)}
                        className="text-[11px] text-[#A6978A] hover:text-red-600 p-1 cursor-pointer"
                        title={t.removeTooltip}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {savedBooks.length > 0 && (
          <div className="pt-6 border-t border-[#E8E0D2]">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#2B231D] text-white font-bold text-xs rounded-xl hover:bg-black transition-colors cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
