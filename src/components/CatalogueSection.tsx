import React from 'react';
import { Book, BookCategory, LanguageFilter, LearningTarget } from '../types';
import { BookCoverArt } from './BookCoverArt';
import { BookMarked, Eye, Sparkles, Bookmark } from 'lucide-react';
import { translations } from '../data/i18n';

interface CatalogueSectionProps {
  books: Book[];
  selectedCategory: BookCategory;
  onSelectCategory: (cat: BookCategory) => void;
  learningTarget: LearningTarget;
  onSelectLearningTarget: (target: LearningTarget) => void;
  currentLang: LanguageFilter;
  onOpenBookModal: (book: Book) => void;
  onOpenQuickSample: (book: Book) => void;
  savedBookIds: string[];
  onToggleSaveBook: (bookId: string) => void;
  searchQuery: string;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  books,
  selectedCategory,
  onSelectCategory,
  learningTarget,
  onSelectLearningTarget,
  currentLang,
  onOpenBookModal,
  onOpenQuickSample,
  savedBookIds,
  onToggleSaveBook,
  searchQuery,
}) => {
  const t = translations[currentLang].catalogue;

  // Filter books: strictly match learningTarget, category, and search query
  const filteredBooks = books.filter((book) => {
    // 1. Learning target partition (Spanish learning vs English learning)
    if (book.learningTarget !== learningTarget) {
      return false;
    }

    // 2. Category match
    if (selectedCategory !== 'all' && book.category !== selectedCategory) {
      return false;
    }

    // 3. Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle =
        book.title.toLowerCase().includes(q) ||
        (book.titleEn && book.titleEn.toLowerCase().includes(q));
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchSyn =
        book.synopsis.es.toLowerCase().includes(q) ||
        book.synopsis.en.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchSyn) return false;
    }

    return true;
  });

  return (
    <section id="catalogo" className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="text-center mb-8">
          <h2
            id="catalogue-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2B231D] font-serif uppercase"
          >
            {t.title}
          </h2>
        </div>

        {/* Primary Division: Títulos para Aprender Español vs Títulos para Aprender Inglés */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-[#EAE2D5] rounded-2xl shadow-inner border border-[#D8CFC0] max-w-xl w-full">
            <button
              id="tab-target-es"
              onClick={() => onSelectLearningTarget('es')}
              className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                learningTarget === 'es'
                  ? 'bg-[#D26645] text-white shadow-md ring-2 ring-[#B8532F]'
                  : 'text-[#635347] hover:text-[#2B231D] hover:bg-[#F3EDE2]'
              }`}
            >
              <span>{t.targetSpanishTab}</span>
            </button>
            <button
              id="tab-target-en"
              onClick={() => onSelectLearningTarget('en')}
              className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                learningTarget === 'en'
                  ? 'bg-[#43677A] text-white shadow-md ring-2 ring-[#2F4D5C]'
                  : 'text-[#635347] hover:text-[#2B231D] hover:bg-[#F3EDE2]'
              }`}
            >
              <span>{t.targetEnglishTab}</span>
            </button>
          </div>
        </div>

        {/* Category Sub-Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          <button
            id="tab-all-categories"
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all border-2 cursor-pointer shadow-sm ${
              selectedCategory === 'all'
                ? 'bg-[#2B231D] text-white border-[#2B231D]'
                : 'bg-white text-[#55473E] border-[#E0D7C9] hover:bg-[#F3EDE2]'
            }`}
          >
            {t.catAll}
          </button>

          <button
            id="tab-clasicos-literarios"
            onClick={() => onSelectCategory('clasicos-literarios')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all border-2 cursor-pointer shadow-sm ${
              selectedCategory === 'clasicos-literarios'
                ? 'bg-[#D26645] text-white border-[#BD5535]'
                : 'bg-[#D26645]/10 text-[#A84526] border-[#D26645]/30 hover:bg-[#D26645]/20'
            }`}
          >
            {t.catLiterary}
          </button>

          <button
            id="tab-clasicos-adolescentes"
            onClick={() => onSelectCategory('clasicos-adolescentes')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all border-2 cursor-pointer shadow-sm ${
              selectedCategory === 'clasicos-adolescentes'
                ? 'bg-[#5B7B8C] text-white border-[#4A697A]'
                : 'bg-[#5B7B8C]/10 text-[#3F5F6E] border-[#5B7B8C]/30 hover:bg-[#5B7B8C]/20'
            }`}
          >
            {t.catYA}
          </button>

          <button
            id="tab-historias-interactivas"
            onClick={() => onSelectCategory('historias-interactivas')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all border-2 cursor-pointer shadow-sm ${
              selectedCategory === 'historias-interactivas'
                ? 'bg-[#376970] text-white border-[#275359]'
                : 'bg-[#376970]/10 text-[#275359] border-[#376970]/30 hover:bg-[#376970]/20'
            }`}
          >
            {t.catInteractive}
          </button>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#E5DDD0] p-8 max-w-lg mx-auto">
            <BookMarked className="w-12 h-12 text-[#A8988A] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#2B231D]">{t.emptyTitle}</h3>
            <p className="text-sm text-[#736357] mt-1">{t.emptySub}</p>
            <button
              onClick={() => {
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#D96B43] text-white font-bold text-xs rounded-lg hover:bg-[#B8532F] cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-5 sm:gap-6">
            {filteredBooks.map((book) => {
              const isSaved = savedBookIds.includes(book.id);

              return (
                <div
                  key={book.id}
                  id={`book-card-${book.id}`}
                  className="group flex flex-col items-center cursor-pointer transition-all duration-300"
                >
                  {/* Book Spine & Cover */}
                  <div
                    onClick={() => onOpenBookModal(book)}
                    className="relative w-full rounded-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[0_16px_32px_rgba(0,0,0,0.22)]"
                  >
                    {/* Level badge */}
                    <div className="absolute top-2 right-2 z-30">
                      <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {book.level}
                      </span>
                    </div>

                    {/* Bookmark button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveBook(book.id);
                      }}
                      className={`absolute top-2 left-2 z-30 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-[#D96B43] text-white shadow-md'
                          : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white'
                      }`}
                      title={isSaved ? t.savedTooltip : t.saveTooltip}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>

                    {/* Book Cover Visual Graphic */}
                    <BookCoverArt type={book.coverType} coverImage={book.coverImage} title={book.title} />

                    {/* Interactive Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex flex-col justify-end p-2.5 gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBookModal(book);
                        }}
                        className="w-full py-1.5 bg-white text-[#2B231D] text-xs font-bold rounded-lg shadow hover:bg-[#F3EDE2] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> {t.synopsisBtn}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickSample(book);
                        }}
                        className="w-full py-1.5 bg-[#D96B43] text-white text-xs font-bold rounded-lg shadow hover:bg-[#BD5535] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> {t.sampleBtn}
                      </button>
                    </div>
                  </div>

                  {/* Title & Info Underneath */}
                  <div
                    onClick={() => onOpenBookModal(book)}
                    className="mt-3 text-center w-full px-1"
                  >
                    <h3 className="font-extrabold text-xs sm:text-sm text-[#241D17] leading-snug group-hover:text-[#D96B43] transition-colors">
                      {currentLang === 'en' && book.titleEn ? book.titleEn : book.title}
                    </h3>
                    <p className="text-[11px] text-[#78695E] font-medium mt-0.5 truncate">
                      {book.author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
