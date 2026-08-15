import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LanguageFilter } from '../types';

interface SplitHeroProps {
  onSelectSide: (lang: LanguageFilter) => void;
}

export const SplitHero: React.FC<SplitHeroProps> = ({ onSelectSide }) => {
  const [hoveredSide, setHoveredSide] = useState<'es' | 'en' | null>(null);

  const handleChoose = (lang: LanguageFilter) => {
    onSelectSide(lang);
    const cat = document.getElementById('catalogo');
    if (cat) {
      cat.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-split-section" className="relative w-full overflow-hidden bg-[#FBF9F5]">
      {/* 2-Column Split Hero Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[460px] lg:min-h-[520px] w-full">
        
        {/* ================= LEFT SIDE: SPANISH (Terracotta Windmill) ================= */}
        <div
          id="hero-side-spanish"
          onMouseEnter={() => setHoveredSide('es')}
          onMouseLeave={() => setHoveredSide(null)}
          className={`relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 transition-all duration-500 overflow-hidden ${
            hoveredSide === 'en' ? 'opacity-90' : 'opacity-100'
          }`}
          style={{
            background: 'linear-gradient(135deg, #D46947 0%, #C05837 55%, #A84526 100%)',
          }}
        >
          {/* Subtle desert hills and landscape layers in background */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full object-cover" viewBox="0 0 500 400" preserveAspectRatio="none">
              <path d="M0,280 Q140,240 280,290 T500,270 L500,400 L0,400 Z" fill="#88351B" opacity="0.6" />
              <path d="M0,320 Q180,290 340,340 T500,310 L500,400 L0,400 Z" fill="#692510" opacity="0.8" />
            </svg>
          </div>

          {/* Windmill Vector Illustration on Left (faithfully matching Image 1) */}
          <div className="absolute left-4 sm:left-10 lg:left-14 bottom-6 sm:bottom-12 w-36 sm:w-48 lg:w-60 pointer-events-none transition-transform duration-700 transform group-hover:scale-105">
            <svg viewBox="0 0 200 240" className="w-full h-auto drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
              {/* Ground dune */}
              <ellipse cx="100" cy="225" rx="90" ry="12" fill="#7C2B14" opacity="0.5" />
              {/* Mill base */}
              <polygon points="65,110 50,220 150,220 135,110" fill="#F0E8DC" stroke="#4F2314" strokeWidth="2.5" />
              {/* Shade side of mill */}
              <polygon points="100,110 100,220 150,220 135,110" fill="#D9CCBA" />
              {/* Mill Door */}
              <rect x="86" y="180" width="28" height="40" rx="3" fill="#58291B" stroke="#37170D" strokeWidth="1.5" />
              {/* Windows */}
              <rect x="90" y="135" width="18" height="18" rx="2" fill="#58291B" stroke="#37170D" strokeWidth="1.5" />
              {/* Roof */}
              <path d="M54,110 Q100,60 146,110 Z" fill="#BD4B2B" stroke="#4F2314" strokeWidth="2.5" />
              
              {/* Blades & Rotor Hub */}
              <circle cx="100" cy="100" r="7" fill="#3D1D13" />
              <g transform="translate(100, 100) rotate(32)">
                {/* 4 Blades */}
                {/* Top Blade */}
                <line x1="0" y1="0" x2="0" y2="-90" stroke="#3D1D13" strokeWidth="3" />
                <rect x="-14" y="-85" width="13" height="70" fill="#F2E6D5" stroke="#3D1D13" strokeWidth="1.5" opacity="0.9" />
                <line x1="-14" y1="-70" x2="-1" y2="-70" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="-14" y1="-55" x2="-1" y2="-55" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="-14" y1="-40" x2="-1" y2="-40" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="-14" y1="-25" x2="-1" y2="-25" stroke="#3D1D13" strokeWidth="1.5" />

                {/* Bottom Blade */}
                <line x1="0" y1="0" x2="0" y2="90" stroke="#3D1D13" strokeWidth="3" />
                <rect x="1" y="15" width="13" height="70" fill="#F2E6D5" stroke="#3D1D13" strokeWidth="1.5" opacity="0.9" />
                <line x1="1" y1="30" x2="14" y2="30" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="1" y1="45" x2="14" y2="45" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="1" y1="60" x2="14" y2="60" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="1" y1="75" x2="14" y2="75" stroke="#3D1D13" strokeWidth="1.5" />

                {/* Left Blade */}
                <line x1="0" y1="0" x2="-90" y2="0" stroke="#3D1D13" strokeWidth="3" />
                <rect x="-85" y="1" width="70" height="13" fill="#F2E6D5" stroke="#3D1D13" strokeWidth="1.5" opacity="0.9" />
                <line x1="-70" y1="1" x2="-70" y2="14" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="-55" y1="1" x2="-55" y2="14" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="-40" y1="1" x2="-40" y2="14" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="-25" y1="1" x2="-25" y2="14" stroke="#3D1D13" strokeWidth="1.5" />

                {/* Right Blade */}
                <line x1="0" y1="0" x2="90" y2="0" stroke="#3D1D13" strokeWidth="3" />
                <rect x="15" y="-14" width="70" height="13" fill="#F2E6D5" stroke="#3D1D13" strokeWidth="1.5" opacity="0.9" />
                <line x1="30" y1="-14" x2="30" y2="-1" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="45" y1="-14" x2="45" y2="-1" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="60" y1="-14" x2="60" y2="-1" stroke="#3D1D13" strokeWidth="1.5" />
                <line x1="75" y1="-14" x2="75" y2="-1" stroke="#3D1D13" strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Text and Button content aligned to right side of left column (matching Image 1 layout) */}
          <div className="relative z-10 flex flex-col items-end text-right justify-center h-full max-w-xs sm:max-w-md ml-auto pr-2 sm:pr-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
              Quiero <br />
              aprender <br />
              español
            </h2>

            <div className="mt-8 sm:mt-10">
              <button
                id="btn-hero-ver-catalogo-es"
                onClick={() => handleChoose('es')}
                className="group relative inline-flex items-center gap-2 px-7 py-3 bg-white text-[#632210] font-bold text-base sm:text-lg rounded-xl shadow-lg border-2 border-[#5E1E0E] hover:bg-[#FAF4EF] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>ver catálogo</span>
                <ArrowRight className="w-5 h-5 text-[#88351B] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: ENGLISH (Slate Blue Tea Cup) ================= */}
        <div
          id="hero-side-english"
          onMouseEnter={() => setHoveredSide('en')}
          onMouseLeave={() => setHoveredSide(null)}
          className={`relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 transition-all duration-500 overflow-hidden ${
            hoveredSide === 'es' ? 'opacity-90' : 'opacity-100'
          }`}
          style={{
            background: 'linear-gradient(135deg, #537586 0%, #446474 55%, #314C5A 100%)',
          }}
        >
          {/* Subtle background hills */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full object-cover" viewBox="0 0 500 400" preserveAspectRatio="none">
              <path d="M0,260 Q180,230 320,270 T500,250 L500,400 L0,400 Z" fill="#20343E" opacity="0.6" />
              <path d="M0,310 Q140,280 280,330 T500,300 L500,400 L0,400 Z" fill="#142229" opacity="0.8" />
            </svg>
          </div>

          {/* Text and Button content aligned to left side of right column (matching Image 1 layout) */}
          <div className="relative z-10 flex flex-col items-start text-left justify-center h-full max-w-xs sm:max-w-md mr-auto pl-2 sm:pl-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
              I want <br />
              to learn <br />
              English
            </h2>

            <div className="mt-8 sm:mt-10">
              <button
                id="btn-hero-view-catalogue-en"
                onClick={() => handleChoose('en')}
                className="group relative inline-flex items-center gap-2 px-7 py-3 bg-white text-[#1E3E4E] font-bold text-base sm:text-lg rounded-xl shadow-lg border-2 border-[#1B3644] hover:bg-[#F2F7F9] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>view catalogue</span>
                <ArrowRight className="w-5 h-5 text-[#2A5266] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Classic Porcelain English Tea Cup & Saucer Illustration on Right (faithfully matching Image 1) */}
          <div className="absolute right-4 sm:right-8 lg:right-12 bottom-4 sm:bottom-8 w-44 sm:w-60 lg:w-72 pointer-events-none transition-transform duration-700 transform group-hover:scale-105">
            <svg viewBox="0 0 240 220" className="w-full h-auto drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="tea-glow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#9E4D18" />
                  <stop offset="65%" stopColor="#6C2E0A" />
                  <stop offset="100%" stopColor="#431A05" />
                </radialGradient>
                <linearGradient id="saucer-rim" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F9F7F2" />
                  <stop offset="100%" stopColor="#D5CFBE" />
                </linearGradient>
                <linearGradient id="gold-trim" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ECC875" />
                  <stop offset="50%" stopColor="#C49C42" />
                  <stop offset="100%" stopColor="#967222" />
                </linearGradient>
              </defs>

              {/* Saucer shadow on table */}
              <ellipse cx="120" cy="180" rx="100" ry="32" fill="#18272F" opacity="0.45" />

              {/* Large Porcelain Saucer Plate */}
              <ellipse cx="120" cy="170" rx="98" ry="30" fill="url(#saucer-rim)" stroke="url(#gold-trim)" strokeWidth="2.5" />
              <ellipse cx="120" cy="170" rx="92" ry="26" fill="none" stroke="#315364" strokeWidth="1.2" strokeDasharray="3 2" />
              <ellipse cx="120" cy="170" rx="84" ry="22" fill="#ECE6D8" />
              
              {/* Blue floral pattern on saucer rim */}
              <g fill="#2D4D5E" opacity="0.75">
                <path d="M45,160 Q55,152 65,162 Q55,170 45,160 Z" />
                <path d="M175,160 Q185,152 195,162 Q185,170 175,160 Z" />
                <path d="M80,180 Q90,175 100,182 Q90,188 80,180 Z" />
                <path d="M140,180 Q150,175 160,182 Q150,188 140,180 Z" />
              </g>

              {/* Teacup Handle (Ornate Victorian gold & porcelain handle) */}
              <path
                d="M170,80 C215,75 220,135 165,138 C155,138 152,130 162,126 C195,124 195,90 165,92 Z"
                fill="url(#saucer-rim)"
                stroke="url(#gold-trim)"
                strokeWidth="2.5"
              />

              {/* Teacup Body */}
              <path
                d="M60,65 C60,125 78,155 120,155 C162,155 180,125 180,65 Z"
                fill="url(#saucer-rim)"
                stroke="url(#gold-trim)"
                strokeWidth="2"
              />
              <path
                d="M60,65 C60,125 78,155 120,155 C162,155 180,125 180,65 Z"
                fill="#FDFBFA"
                opacity="0.9"
              />

              {/* Blue Chintz Floral Pattern on Teacup Face */}
              <g transform="translate(70, 75)" fill="#234252" opacity="0.85">
                {/* Detailed rose & leaves motif */}
                <circle cx="50" cy="35" r="16" fill="#284B5D" opacity="0.6" />
                <path d="M50,22 C42,22 36,28 36,36 C36,44 44,50 52,50 C58,50 64,44 64,36 C64,28 58,22 50,22 Z" fill="#1C3746" />
                <path d="M48,26 C44,28 42,32 44,36 C46,40 50,42 54,40 C58,38 58,32 56,28 Z" fill="#6A97AC" opacity="0.8" />
                <path d="M30,30 C20,25 15,35 22,42 C28,42 32,35 30,30 Z" fill="#234252" />
                <path d="M70,30 C80,25 85,35 78,42 C72,42 68,35 70,30 Z" fill="#234252" />
                <path d="M50,52 C45,62 55,68 62,60 C60,54 55,50 50,52 Z" fill="#234252" />
              </g>

              {/* Steaming Amber Black Tea Liquid Inside Rim */}
              <ellipse cx="120" cy="65" rx="60" ry="20" fill="url(#tea-glow)" stroke="url(#gold-trim)" strokeWidth="2.5" />
              <ellipse cx="115" cy="62" rx="45" ry="12" fill="#BA6324" opacity="0.5" />
              <ellipse cx="108" cy="59" rx="16" ry="4" fill="#FFFFFF" opacity="0.45" />

              {/* Tea Steam wisps */}
              <path d="M105,45 Q95,30 108,18 Q120,5 110,-5" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
              <path d="M125,42 Q135,28 122,15 Q112,2 125,-8" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

