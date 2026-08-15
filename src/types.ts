export type LanguageFilter = 'es' | 'en';

export type BookCategory = 'all' | 'clasicos-literarios' | 'clasicos-adolescentes' | 'historias-interactivas';

export type LearningTarget = 'es' | 'en';

export interface BilingualParagraph {
  id: number;
  es: string;
  en: string;
  notes?: string;
}

export interface VocabularyItem {
  word: string;
  lang: 'es' | 'en';
  translation: string;
  definition: string;
  phonetic: string;
  type: string;
}

export interface Book {
  id: string;
  title: string;
  titleEn?: string;
  author: string;
  coverType: string;
  coverImage?: string;
  category: 'clasicos-literarios' | 'clasicos-adolescentes' | 'historias-interactivas';
  categoryLabel: {
    es: string;
    en: string;
  };
  learningTarget: LearningTarget; // 'es' = for learning Spanish, 'en' = for learning English
  badgeIcon: string;
  synopsis: {
    es: string;
    en: string;
  };
  sampleExcerpt: BilingualParagraph[];
  vocabulary?: VocabularyItem[];
  level: string;
  pages: number;
  amazonUrl: string;
  tag: string;
  tagEn?: string;
  year?: string;
}
