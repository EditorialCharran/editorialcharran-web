import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SplitHero } from './components/SplitHero';
import { CatalogueSection } from './components/CatalogueSection';
import { BookModal } from './components/BookModal';
import { InteractiveReader } from './components/InteractiveReader';
import { WhyDualMethod } from './components/WhyDualMethod';
import { SavedBooksDrawer } from './components/SavedBooksDrawer';
import { Footer } from './components/Footer';
import { BOOKS_DATA } from './data/books';
import { Book, BookCategory, LanguageFilter, LearningTarget } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageFilter>('es');
  const [learningTarget, setLearningTarget] = useState<LearningTarget>('es');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('all');
  const [selectedBookForModal, setSelectedBookForModal] = useState<Book | null>(null);
  const [readerBook, setReaderBook] = useState<Book>(BOOKS_DATA[0]);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle language switch from navbar: switches global website language and aligned learning target
  const handleSelectLang = (lang: LanguageFilter) => {
    setCurrentLang(lang);
    if (lang === 'es' || lang === 'en') {
      setLearningTarget(lang);
    }
  };

  // Handle hero button click: 'ver catálogo' -> spanish books, 'view catalogue' -> english books
  const handleHeroSelectSide = (target: LearningTarget) => {
    setLearningTarget(target);
    setSelectedCategory('all');
  };

  // Handle bookmark toggle
  const handleToggleSaveBook = (bookId: string) => {
    setSavedBookIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  // Open interactive reader with specific book
  const handleOpenSample = (book: Book) => {
    setReaderBook(book);
    const readerEl = document.getElementById('metodo-en-vivo');
    if (readerEl) {
      readerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Saved books list
  const savedBooks = BOOKS_DATA.filter((b) => savedBookIds.includes(b.id));

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2724] flex flex-col font-sans">
      {/* 1. Top Exploration Navigation Bar with ES / EN Switcher */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        savedCount={savedBookIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      <main className="flex-grow">
        {/* 2. Split Hero Section (Image 1) */}
        <SplitHero onSelectSide={handleHeroSelectSide} />

        {/* 3. Catalogue Section (Image 2) divided into Learn Spanish vs Learn English */}
        <CatalogueSection
          books={BOOKS_DATA}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          learningTarget={learningTarget}
          onSelectLearningTarget={(target) => setLearningTarget(target)}
          currentLang={currentLang}
          onOpenBookModal={(book) => setSelectedBookForModal(book)}
          onOpenQuickSample={(book) => handleOpenSample(book)}
          savedBookIds={savedBookIds}
          onToggleSaveBook={handleToggleSaveBook}
          searchQuery={searchQuery}
        />

        {/* 4. Interactive Live Method Dual Reader (Image 4) with Vertical Scrubber */}
        <InteractiveReader
          selectedBook={readerBook}
          allBooks={BOOKS_DATA}
          onSelectBook={(book) => setReaderBook(book)}
          currentLang={currentLang}
        />

        {/* 5. Why Parallel Books (Methodology) */}
        <WhyDualMethod currentLang={currentLang} />
      </main>

      {/* 6. Book Detail Modal Popup (Image 3) */}
      <BookModal
        book={selectedBookForModal}
        onClose={() => setSelectedBookForModal(null)}
        onOpenSample={(book) => handleOpenSample(book)}
        isSaved={selectedBookForModal ? savedBookIds.includes(selectedBookForModal.id) : false}
        onToggleSave={handleToggleSaveBook}
        currentLang={currentLang}
      />

      {/* 7. Saved Wishlist Drawer */}
      <SavedBooksDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedBooks={savedBooks}
        onRemove={handleToggleSaveBook}
        onOpenModal={(book) => setSelectedBookForModal(book)}
        onOpenSample={(book) => handleOpenSample(book)}
        currentLang={currentLang}
      />

      {/* 8. Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
