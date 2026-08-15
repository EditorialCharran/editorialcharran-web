import React from 'react';
import {
  BookOpen,
  Brain,
  Heart,
  BarChart3,
  Feather,
  Sprout,
} from 'lucide-react';
import { LanguageFilter } from '../types';
import { translations } from '../data/i18n';

interface WhyDualMethodProps {
  currentLang: LanguageFilter;
}

export const WhyDualMethod: React.FC<WhyDualMethodProps> = ({ currentLang }) => {
  const t = translations[currentLang].methodSection;

  // Icon mapping for each of the 6 methodology cards faithfully matching the image
  const iconMap: Record<string, React.ReactNode> = {
    comprension: <BookOpen className="w-6 h-6 text-[#7E242B]" strokeWidth={1.75} />,
    vocabulario: <Brain className="w-6 h-6 text-[#7E242B]" strokeWidth={1.75} />,
    historias: <Heart className="w-6 h-6 text-[#7E242B]" strokeWidth={1.75} />,
    adaptaciones: <BarChart3 className="w-6 h-6 text-[#7E242B]" strokeWidth={1.75} />,
    resumenes: <Feather className="w-6 h-6 text-[#7E242B]" strokeWidth={1.75} />,
    aprendizaje: <Sprout className="w-6 h-6 text-[#7E242B]" strokeWidth={1.75} />,
  };

  return (
    <section
      id="porque-charran"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F5EE] border-t border-[#EAE1D2]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96B43]">
            {t.subtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2B231D] font-serif mt-2">
            {t.title}
          </h2>
        </div>

        {/* 6 Cards Grid (3 columns on large screens, 2 on tablets, 1 on mobile) matching the reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {t.cards.map((card) => {
            const icon = iconMap[card.id] || (
              <BookOpen className="w-6 h-6 text-[#7E242B]" />
            );

            return (
              <div
                key={card.id}
                id={`method-card-${card.id}`}
                className="bg-white p-7 sm:p-8 rounded-xl border border-[#E9E1D4] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon in clean circular container */}
                  <div className="w-12 h-12 rounded-full bg-[#FAF5F0] border border-[#EFE5D8] flex items-center justify-center mb-6 shadow-xs">
                    {icon}
                  </div>

                  {/* Title in Serif Bold */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F1914] font-serif mb-2.5 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#6C5E53] leading-relaxed font-normal min-h-[42px]">
                    {card.description}
                  </p>
                </div>

                {/* Bullets List with Dot separator */}
                <div className="mt-6 pt-5 border-t border-[#F2ECE1]">
                  <ul className="space-y-2 text-[11px] sm:text-xs font-bold text-[#827164] tracking-wider uppercase">
                    {card.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7E242B] flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
