import React from 'react';

interface BookCoverArtProps {
  type?: string;
  coverImage?: string;
  title?: string;
  className?: string;
  is3d?: boolean;
}

export const BookCoverArt: React.FC<BookCoverArtProps> = ({
  type = '',
  coverImage,
  title = '',
  className = '',
  is3d = true,
}) => {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-md transition-transform duration-300 ${
        is3d ? 'shadow-[4px_6px_16px_rgba(0,0,0,0.18)] hover:shadow-[6px_12px_24px_rgba(0,0,0,0.24)]' : ''
      } ${className}`}
      style={{ aspectRatio: '1 / 1.45' }}
    >
      {/* Book spine simulation overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-black/40 via-white/10 to-transparent z-20 pointer-events-none" />
      {/* Subtle page edge crease */}
      <div className="absolute left-[5.5%] top-0 bottom-0 w-[1px] bg-black/20 z-20 pointer-events-none" />
      {/* Page bottom/right white paper slice effect */}
      <div className="absolute right-0 bottom-0 top-0 w-[2px] bg-[#EDE8DF] z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E5DFD3] z-20 pointer-events-none" />

      {coverImage ? (
        <img
          src={coverImage}
          alt={title || type}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center block"
          loading="lazy"
        />
      ) : null}

      {!coverImage && type === 'quijote' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="q-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D26645" />
              <stop offset="60%" stopColor="#C25A39" />
              <stop offset="100%" stopColor="#A84526" />
            </linearGradient>
            <linearGradient id="q-dune" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BF5535" />
              <stop offset="100%" stopColor="#8E351B" />
            </linearGradient>
          </defs>
          {/* Background */}
          <rect width="200" height="290" fill="url(#q-sky)" />
          {/* Dunes */}
          <path d="M0,210 Q60,195 120,225 T200,215 L200,290 L0,290 Z" fill="url(#q-dune)" opacity="0.85" />
          <path d="M0,235 Q70,220 140,250 T200,240 L200,290 L0,290 Z" fill="#88331A" />
          
          {/* Windmill Body */}
          <g transform="translate(45, 120)">
            {/* Tower */}
            <polygon points="25,45 15,115 65,115 55,45" fill="#EAE2D5" stroke="#4A2518" strokeWidth="1.5" />
            {/* Tower Shadow */}
            <polygon points="40,45 40,115 65,115 55,45" fill="#D3C7B5" />
            {/* Door */}
            <rect x="33" y="92" width="14" height="23" rx="2" fill="#58291B" />
            {/* Window */}
            <rect x="35" y="60" width="10" height="10" rx="1" fill="#58291B" />
            {/* Roof */}
            <path d="M18,45 Q40,18 62,45 Z" fill="#B34426" stroke="#4A2518" strokeWidth="1.5" />
            {/* Hub */}
            <circle cx="40" cy="40" r="5" fill="#3D1D13" />

            {/* Sails / Blades */}
            <g transform="translate(40, 40) rotate(28)">
              {/* Vertical Blade Top */}
              <line x1="0" y1="0" x2="0" y2="-65" stroke="#3D1D13" strokeWidth="2.5" />
              <rect x="-11" y="-62" width="10" height="52" fill="none" stroke="#3D1D13" strokeWidth="1.2" />
              <line x1="-11" y1="-50" x2="-1" y2="-50" stroke="#3D1D13" strokeWidth="1" />
              <line x1="-11" y1="-38" x2="-1" y2="-38" stroke="#3D1D13" strokeWidth="1" />
              <line x1="-11" y1="-26" x2="-1" y2="-26" stroke="#3D1D13" strokeWidth="1" />

              {/* Vertical Blade Bottom */}
              <line x1="0" y1="0" x2="0" y2="65" stroke="#3D1D13" strokeWidth="2.5" />
              <rect x="1" y="10" width="10" height="52" fill="none" stroke="#3D1D13" strokeWidth="1.2" />
              <line x1="1" y1="22" x2="11" y2="22" stroke="#3D1D13" strokeWidth="1" />
              <line x1="1" y1="34" x2="11" y2="34" stroke="#3D1D13" strokeWidth="1" />
              <line x1="1" y1="46" x2="11" y2="46" stroke="#3D1D13" strokeWidth="1" />

              {/* Horizontal Blade Left */}
              <line x1="0" y1="0" x2="-65" y2="0" stroke="#3D1D13" strokeWidth="2.5" />
              <rect x="-62" y="1" width="52" height="10" fill="none" stroke="#3D1D13" strokeWidth="1.2" />
              <line x1="-50" y1="1" x2="-50" y2="11" stroke="#3D1D13" strokeWidth="1" />
              <line x1="-38" y1="1" x2="-38" y2="11" stroke="#3D1D13" strokeWidth="1" />
              <line x1="-26" y1="1" x2="-26" y2="11" stroke="#3D1D13" strokeWidth="1" />

              {/* Horizontal Blade Right */}
              <line x1="0" y1="0" x2="65" y2="0" stroke="#3D1D13" strokeWidth="2.5" />
              <rect x="10" y="-11" width="52" height="10" fill="none" stroke="#3D1D13" strokeWidth="1.2" />
              <line x1="22" y1="-11" x2="22" y2="-1" stroke="#3D1D13" strokeWidth="1" />
              <line x1="34" y1="-11" x2="34" y2="-1" stroke="#3D1D13" strokeWidth="1" />
              <line x1="46" y1="-11" x2="46" y2="-1" stroke="#3D1D13" strokeWidth="1" />
            </g>
          </g>

          {/* Sun / Light subtle glow */}
          <circle cx="150" cy="70" r="35" fill="#FFE5CC" opacity="0.15" />
          <path d="M120,240 Q150,225 180,240" stroke="#58291B" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
      )}

      {type === 'tierra' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="map-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DEC7A7" />
              <stop offset="50%" stopColor="#CDAF89" />
              <stop offset="100%" stopColor="#BD9E77" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#map-bg)" />
          {/* Vintage border */}
          <rect x="8" y="8" width="184" height="274" fill="none" stroke="#7A583A" strokeWidth="1.5" strokeDasharray="6 2" />
          <rect x="12" y="12" width="176" height="266" fill="none" stroke="#8D6846" strokeWidth="0.8" />
          
          {/* Grid lines */}
          <g stroke="#9C7752" strokeWidth="0.5" opacity="0.35">
            <line x1="20" y1="60" x2="180" y2="60" />
            <line x1="20" y1="110" x2="180" y2="110" />
            <line x1="20" y1="160" x2="180" y2="160" />
            <line x1="20" y1="210" x2="180" y2="210" />
            <line x1="60" y1="20" x2="60" y2="220" />
            <line x1="100" y1="20" x2="100" y2="220" />
            <line x1="140" y1="20" x2="140" y2="220" />
          </g>

          {/* Continents silhouettes */}
          <g fill="#A88764" stroke="#785B3F" strokeWidth="0.8">
            {/* Americas */}
            <path d="M35,45 Q48,50 42,75 Q38,100 48,125 Q42,145 35,160 Q28,140 32,105 Z" />
            <path d="M45,130 Q60,140 55,170 Q48,195 40,185 Z" />
            {/* Eurasia / Africa */}
            <path d="M85,45 Q125,40 155,55 Q165,80 145,95 Q115,85 100,75 Z" />
            <path d="M95,85 Q125,90 120,135 Q110,165 95,145 Q88,115 95,85 Z" />
            {/* Australia */}
            <path d="M140,145 Q160,140 162,160 Q150,170 138,160 Z" />
          </g>

          {/* Compass rose */}
          <g transform="translate(150, 80) scale(0.65)">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#7A583A" strokeWidth="1" />
            <polygon points="0,-24 4,-6 24,0 6,4 0,24 -4,6 -24,0 -6,-4" fill="#65462D" />
            <polygon points="0,-24 -4,-6 -24,0 -6,-4 0,24 4,-6 24,0 6,4" fill="#9C7752" opacity="0.6" />
            <text x="0" y="-27" textAnchor="middle" fill="#5A3D25" fontSize="8" fontWeight="bold">N</text>
          </g>

          {/* Title Banner Box at bottom */}
          <g transform="translate(24, 215)">
            <rect x="0" y="0" width="152" height="42" fill="#E8D9C4" stroke="#684A30" strokeWidth="1.2" rx="2" />
            <text x="76" y="18" textAnchor="middle" fill="#3D2919" fontSize="10.5" fontWeight="800" letterSpacing="0.5" fontFamily="Cinzel, serif">MÁS ALLÁ DE</text>
            <text x="76" y="32" textAnchor="middle" fill="#3D2919" fontSize="10.5" fontWeight="800" letterSpacing="0.5" fontFamily="Cinzel, serif">LA TIERRA</text>
          </g>
        </svg>
      )}

      {type === 'cantos' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cantos-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A6D7C" />
              <stop offset="50%" stopColor="#3F5F6E" />
              <stop offset="100%" stopColor="#2D4855" />
            </linearGradient>
            <linearGradient id="lyre-wood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C98650" />
              <stop offset="50%" stopColor="#A26233" />
              <stop offset="100%" stopColor="#7E4720" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#cantos-bg)" />

          {/* Floating musical notes */}
          <g fill="#A9CAD6" opacity="0.65">
            <text x="30" y="65" fontSize="24">𝄞</text>
            <text x="155" y="80" fontSize="22">𝄢</text>
            <text x="35" y="140" fontSize="18">𝅘𝅥𝅯</text>
            <text x="160" y="145" fontSize="20">♫</text>
            <text x="50" y="95" fontSize="14">♪</text>
          </g>

          {/* Mountains silhouette background */}
          <path d="M0,190 Q50,150 100,180 T200,165 L200,290 L0,290 Z" fill="#253E4A" />
          <path d="M0,210 Q60,185 120,210 T200,195 L200,290 L0,290 Z" fill="#1C303A" />

          {/* Lyre Harp Artwork */}
          <g transform="translate(55, 90)">
            {/* Lyre base pedestal */}
            <path d="M20,95 L70,95 L65,108 L25,108 Z" fill="url(#lyre-wood)" stroke="#532E14" strokeWidth="1" />
            {/* Lyre arms (curved classical horns) */}
            <path d="M25,95 C10,75 5,40 18,18 C28,0 35,15 25,35 C18,50 25,75 35,95 Z" fill="url(#lyre-wood)" stroke="#532E14" strokeWidth="1" />
            <path d="M65,95 C80,75 85,40 72,18 C62,0 55,15 65,35 C72,50 65,75 55,95 Z" fill="url(#lyre-wood)" stroke="#532E14" strokeWidth="1" />
            {/* Lyre crossbar */}
            <rect x="18" y="22" width="54" height="6" rx="2" fill="#E6C280" stroke="#7A5826" strokeWidth="0.8" />
            {/* Golden Strings */}
            <line x1="30" y1="28" x2="35" y2="95" stroke="#FFE79A" strokeWidth="1.2" />
            <line x1="38" y1="28" x2="41" y2="95" stroke="#FFE79A" strokeWidth="1.2" />
            <line x1="45" y1="28" x2="45" y2="95" stroke="#FFE79A" strokeWidth="1.2" />
            <line x1="52" y1="28" x2="49" y2="95" stroke="#FFE79A" strokeWidth="1.2" />
            <line x1="60" y1="28" x2="55" y2="95" stroke="#FFE79A" strokeWidth="1.2" />
          </g>

          {/* Title banner */}
          <g transform="translate(20, 230)">
            <rect x="0" y="0" width="160" height="32" fill="#182C35" rx="3" />
            <text x="80" y="21" textAnchor="middle" fill="#EAF3F7" fontSize="10.5" fontWeight="800" letterSpacing="0.8" fontFamily="Cinzel, serif">CANTOS DE VIDA</text>
          </g>
        </svg>
      )}

      {type === 'desierto' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="des-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7DAAB9" />
              <stop offset="60%" stopColor="#A8C8D4" />
              <stop offset="100%" stopColor="#D9E7EC" />
            </linearGradient>
            <linearGradient id="sand1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2A66E" />
              <stop offset="100%" stopColor="#BD7C41" />
            </linearGradient>
            <linearGradient id="sand2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CF8E52" />
              <stop offset="100%" stopColor="#9C5B24" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#des-sky)" />

          {/* Sun and distant clouds */}
          <circle cx="155" cy="65" r="28" fill="#FFF7DE" opacity="0.6" />
          <path d="M120,60 Q145,52 170,60 T195,58" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Desert Dunes */}
          <path d="M0,150 Q70,120 135,160 T200,140 L200,290 L0,290 Z" fill="url(#sand1)" />
          <path d="M0,185 Q65,160 120,195 T200,180 L200,290 L0,290 Z" fill="url(#sand2)" />
          <path d="M0,230 Q80,210 160,240 T200,235 L200,290 L0,290 Z" fill="#884C1C" />

          {/* Camel on Dune */}
          <g transform="translate(50, 115) scale(0.95)" fill="#683917">
            {/* Camel silhouette */}
            <path d="M25,48 C20,38 18,25 24,15 C26,10 32,8 35,12 C36,15 32,22 30,30 C35,30 42,22 52,22 C58,22 62,32 68,32 C74,32 78,24 85,24 C92,24 96,35 94,48 C94,62 88,70 82,72 L85,108 L78,108 L76,75 L62,75 L60,108 L54,108 L57,75 L38,75 L36,108 L30,108 L34,70 C28,68 25,58 25,48 Z" />
            {/* Tail */}
            <path d="M92,50 Q96,65 93,75" stroke="#683917" strokeWidth="2" fill="none" />
          </g>

          {/* Footprints in sand */}
          <g fill="#7A4217" opacity="0.4">
            <ellipse cx="40" cy="225" rx="3" ry="1.5" />
            <ellipse cx="65" cy="235" rx="3.5" ry="1.8" />
            <ellipse cx="90" cy="242" rx="4" ry="2" />
          </g>
        </svg>
      )}

      {type === 'laberinto' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lab-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E384D" />
              <stop offset="50%" stopColor="#152838" />
              <stop offset="100%" stopColor="#0E1C28" />
            </linearGradient>
            <linearGradient id="gold-clock" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EBD096" />
              <stop offset="50%" stopColor="#CCA45C" />
              <stop offset="100%" stopColor="#9C7733" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#lab-bg)" />

          {/* Book title at top */}
          <g transform="translate(10, 25)">
            <text x="90" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="800" letterSpacing="1" fontFamily="Cinzel, serif">EL LABERINTO</text>
            <text x="90" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="800" letterSpacing="1" fontFamily="Cinzel, serif">DEL TIEMPO</text>
          </g>

          {/* Labyrinth Concentric Maze with Antique Clock */}
          <g transform="translate(100, 170)">
            {/* Outer Maze Rings */}
            <circle cx="0" cy="0" r="62" fill="none" stroke="#CCA45C" strokeWidth="4.5" />
            <path d="M-62,0 A62,62 0 0,1 0,-62" stroke="#152838" strokeWidth="6" fill="none" />
            
            <circle cx="0" cy="0" r="50" fill="none" stroke="#CCA45C" strokeWidth="4" />
            <path d="M0,50 A50,50 0 0,1 50,0" stroke="#152838" strokeWidth="5.5" fill="none" />

            <circle cx="0" cy="0" r="38" fill="none" stroke="#CCA45C" strokeWidth="3.5" />
            <path d="M-38,0 A38,38 0 0,1 0,-38" stroke="#152838" strokeWidth="5" fill="none" />

            {/* Antique Clock Face in Center */}
            <circle cx="0" cy="0" r="26" fill="#FDF7EA" stroke="#CCA45C" strokeWidth="3" />
            
            {/* Clock ticks */}
            <g stroke="#4A3B20" strokeWidth="1.2">
              <line x1="0" y1="-23" x2="0" y2="-19" />
              <line x1="0" y1="19" x2="0" y2="23" />
              <line x1="-23" y1="0" x2="-19" y2="0" />
              <line x1="19" y1="0" x2="23" y2="0" />
              {/* Diagonals */}
              <line x1="-15" y1="-15" x2="-12" y2="-12" />
              <line x1="12" y1="12" x2="15" y2="15" />
              <line x1="15" y1="-15" x2="12" y2="-12" />
              <line x1="-12" y1="12" x2="-15" y2="15" />
            </g>

            {/* Hands */}
            <line x1="0" y1="0" x2="0" y2="-15" stroke="#221C11" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="0" x2="10" y2="-3" stroke="#221C11" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="2.5" fill="#C59B4B" />

            {/* Pocket watch top loop ring */}
            <circle cx="0" cy="-68" r="7" fill="none" stroke="#CCA45C" strokeWidth="3" />
            <rect x="-3" y="-64" width="6" height="5" fill="#CCA45C" />
          </g>
        </svg>
      )}

      {type === 'camino' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cam-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#89B5C4" />
              <stop offset="50%" stopColor="#AECDD6" />
              <stop offset="100%" stopColor="#DDEBED" />
            </linearGradient>
            <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#417182" />
              <stop offset="100%" stopColor="#274D5C" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#cam-sky)" />

          {/* Title banner at top */}
          <g transform="translate(10, 22)">
            <text x="90" y="16" textAnchor="middle" fill="#1C3844" fontSize="11" fontWeight="800" letterSpacing="0.8" fontFamily="Cinzel, serif">TU PROPIO</text>
            <text x="90" y="32" textAnchor="middle" fill="#1C3844" fontSize="11" fontWeight="800" letterSpacing="0.8" fontFamily="Cinzel, serif">CAMINO</text>
          </g>

          {/* Horizon Sea & Coastline */}
          <path d="M0,120 L200,120 L200,170 L0,170 Z" fill="url(#sea)" />
          <path d="M0,160 Q80,140 200,165 L200,290 L0,290 Z" fill="#5F8B7B" />

          {/* Branching Crossroads Pathway / 3 Arrows */}
          <g transform="translate(100, 185)">
            {/* Forked Arrows (Left, Straight, Right) */}
            <path d="M-8,105 C-8,60 -50,40 -65,20 L-50,20 L-68,0 L-82,18 L-67,18 C-50,38 -12,65 -8,105 Z" fill="#203E48" />
            <path d="M-4,105 L-4,25 L-14,25 L0,2 L14,25 L4,25 L4,105 Z" fill="#203E48" />
            <path d="M8,105 C8,60 50,40 65,20 L50,20 L68,0 L82,18 L67,18 C50,38 12,65 8,105 Z" fill="#203E48" />

            {/* Sandy Winding road base */}
            <path d="M-45,105 Q-10,55 0,35 Q10,55 45,105 Z" fill="#E8D7B8" opacity="0.85" />
          </g>
        </svg>
      )}

      {type === 'sherlock' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="290" fill="#2A303C" />
          <circle cx="100" cy="130" r="60" fill="#3D4556" />
          {/* Magnifying Glass */}
          <g transform="translate(85, 110)">
            <circle cx="0" cy="0" r="28" fill="none" stroke="#D1A75B" strokeWidth="4" />
            <line x1="20" y1="20" x2="45" y2="45" stroke="#D1A75B" strokeWidth="6" strokeLinecap="round" />
            {/* Clue icon inside lens */}
            <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="20">🔍</text>
          </g>
          <g transform="translate(10, 215)">
            <rect x="10" y="0" width="160" height="45" fill="#1C2028" rx="3" />
            <text x="90" y="18" textAnchor="middle" fill="#E5E9F0" fontSize="9" fontWeight="800" fontFamily="Cinzel, serif">SHERLOCK HOLMES</text>
            <text x="90" y="32" textAnchor="middle" fill="#D1A75B" fontSize="8" fontWeight="600">ESTUDIO EN ESCARLATA</text>
          </g>
        </svg>
      )}

      {type === 'alicia' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="290" fill="#426B69" />
          <circle cx="100" cy="120" r="55" fill="#588C89" />
          {/* Key and Pocket watch / Rabbit ear motif */}
          <g transform="translate(100, 115)">
            <circle cx="0" cy="0" r="24" fill="#FFF9E6" stroke="#DCAE58" strokeWidth="3" />
            <path d="M-8,-35 Q-12,-18 -4,0" stroke="#FFF9E6" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M8,-35 Q12,-18 4,0" stroke="#FFF9E6" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="0" y="7" textAnchor="middle" fill="#426B69" fontSize="16">🐇</text>
          </g>
          <g transform="translate(10, 215)">
            <rect x="10" y="0" width="160" height="45" fill="#243C3B" rx="3" />
            <text x="90" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="Cinzel, serif">ALICIA EN EL PAÍS</text>
            <text x="90" y="32" textAnchor="middle" fill="#A7D4D1" fontSize="8" fontWeight="600">DE LAS MARAVILLAS</text>
          </g>
        </svg>
      )}

      {type === 'principito' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B2838" />
              <stop offset="60%" stopColor="#2A4365" />
              <stop offset="100%" stopColor="#4A6572" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#p-sky)" />
          {/* Small Asteroid Planet */}
          <circle cx="100" cy="220" r="70" fill="#E2D9C8" stroke="#8C7A6B" strokeWidth="2" />
          <circle cx="75" cy="180" r="8" fill="#C5B8A5" opacity="0.6" />
          <circle cx="125" cy="195" r="12" fill="#C5B8A5" opacity="0.6" />
          {/* Glowing Stars */}
          <g fill="#FFE699">
            <polygon points="40,40 43,48 51,51 43,54 40,62 37,54 29,51 37,48" />
            <polygon points="160,60 162,66 168,68 162,70 160,76 158,70 152,68 158,66" />
            <circle cx="140" cy="110" r="2" />
            <circle cx="60" cy="100" r="2.5" />
            <circle cx="90" cy="50" r="1.5" />
          </g>
          {/* Rose in Glass Cloche */}
          <g transform="translate(90, 130)">
            <ellipse cx="10" cy="20" rx="14" ry="24" fill="#FFFFFF" fillOpacity="0.15" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M10,24 Q10,12 10,6" stroke="#48BB78" strokeWidth="2" />
            <circle cx="10" cy="5" r="6" fill="#E53E3E" />
          </g>
          <g transform="translate(10, 235)">
            <rect x="10" y="0" width="160" height="38" fill="#111827" rx="3" />
            <text x="90" y="16" textAnchor="middle" fill="#FEF08A" fontSize="9.5" fontWeight="800" fontFamily="Cinzel, serif">THE LITTLE PRINCE</text>
            <text x="90" y="28" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="600">EL PRINCIPITO (DUAL)</text>
          </g>
        </svg>
      )}

      {type === 'dorian' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="290" fill="#18151D" />
          {/* Ornate Gilded Picture Frame */}
          <rect x="25" y="35" width="150" height="195" rx="4" fill="#2D2436" stroke="#D4AF37" strokeWidth="4" />
          <rect x="33" y="43" width="134" height="179" rx="2" fill="#120E17" stroke="#997D25" strokeWidth="1.5" />
          {/* Victorian Silhouette */}
          <g transform="translate(100, 130)" fill="#D4AF37">
            <circle cx="0" cy="-25" r="18" fill="#E8D595" />
            <path d="M-22,15 C-22,-10 22,-10 22,15 Z" fill="#E8D595" />
            <path d="M0,-45 Q-15,-20 0,5" stroke="#997D25" strokeWidth="1" fill="none" />
          </g>
          <g transform="translate(10, 240)">
            <rect x="10" y="0" width="160" height="36" fill="#0A080D" rx="3" />
            <text x="90" y="15" textAnchor="middle" fill="#D4AF37" fontSize="8.5" fontWeight="800" fontFamily="Cinzel, serif">THE PICTURE OF</text>
            <text x="90" y="27" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="Cinzel, serif">DORIAN GRAY</text>
          </g>
        </svg>
      )}

      {type === 'gatsby' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="290" fill="#0B132B" />
          {/* Art Deco Geometric Lines */}
          <g stroke="#E0A96D" strokeWidth="1.5" fill="none">
            <polygon points="100,20 180,90 100,160 20,90" />
            <polygon points="100,30 170,90 100,150 30,90" />
            <line x1="100" y1="20" x2="100" y2="160" />
            <line x1="20" y1="90" x2="180" y2="90" />
          </g>
          {/* Green Dock Light */}
          <circle cx="100" cy="190" r="12" fill="#10B981" opacity="0.9" />
          <circle cx="100" cy="190" r="24" fill="#10B981" opacity="0.25" />
          <g transform="translate(10, 230)">
            <rect x="10" y="0" width="160" height="42" fill="#050811" rx="3" />
            <text x="90" y="18" textAnchor="middle" fill="#E0A96D" fontSize="10.5" fontWeight="800" fontFamily="Cinzel, serif">THE GREAT GATSBY</text>
            <text x="90" y="32" textAnchor="middle" fill="#A5B4FC" fontSize="8" fontWeight="600">EDICIÓN DUAL BILINGÜE</text>
          </g>
        </svg>
      )}

      {type === 'dracula' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="290" fill="#1A0B0E" />
          {/* Crimson Moon */}
          <circle cx="100" cy="90" r="45" fill="#881337" opacity="0.7" />
          <circle cx="100" cy="90" r="40" fill="#E11D48" opacity="0.8" />
          {/* Gothic Castle Silhouette */}
          <path d="M40,190 L40,130 L55,115 L70,130 L70,190 L90,190 L90,105 L100,90 L110,105 L110,190 L130,190 L130,120 L145,110 L160,120 L160,190 Z" fill="#0F0507" />
          {/* Flying bats */}
          <g fill="#0F0507">
            <path d="M60,65 Q70,55 78,65 Q85,55 95,65 Q78,72 60,65 Z" />
            <path d="M125,50 Q132,42 138,50 Q144,42 152,50 Q138,56 125,50 Z" />
          </g>
          <g transform="translate(10, 230)">
            <rect x="10" y="0" width="160" height="42" fill="#0A0304" rx="3" />
            <text x="90" y="18" textAnchor="middle" fill="#FDA4AF" fontSize="11" fontWeight="800" fontFamily="Cinzel, serif">DRACULA</text>
            <text x="90" y="32" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="600">BRAM STOKER (DUAL)</text>
          </g>
        </svg>
      )}

      {type === 'becquer' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bec-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3E4E59" />
              <stop offset="60%" stopColor="#2E3C45" />
              <stop offset="100%" stopColor="#1C272E" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#bec-bg)" />
          {/* Swallows (Golondrinas) flying silhouette */}
          <g fill="#CBD5E1">
            <path d="M50,90 Q65,75 75,88 Q85,75 100,90 Q75,100 50,90 Z" />
            <path d="M110,65 Q122,52 130,62 Q138,52 150,65 Q130,73 110,65 Z" />
            <path d="M30,135 Q40,123 48,133 Q56,123 68,135 Q48,142 30,135 Z" opacity="0.6" />
          </g>
          {/* Balcony silhouette */}
          <rect x="30" y="180" width="140" height="8" fill="#131B20" />
          <g stroke="#131B20" strokeWidth="2.5">
            <line x1="45" y1="188" x2="45" y2="225" />
            <line x1="70" y1="188" x2="70" y2="225" />
            <line x1="100" y1="188" x2="100" y2="225" />
            <line x1="130" y1="188" x2="130" y2="225" />
            <line x1="155" y1="188" x2="155" y2="225" />
          </g>
          <g transform="translate(10, 230)">
            <rect x="10" y="0" width="160" height="42" fill="#0F171B" rx="3" />
            <text x="90" y="18" textAnchor="middle" fill="#F1F5F9" fontSize="9.5" fontWeight="800" fontFamily="Cinzel, serif">RIMAS Y LEYENDAS</text>
            <text x="90" y="32" textAnchor="middle" fill="#94A3B8" fontSize="8" fontWeight="600">G. A. BÉCQUER (DUAL)</text>
          </g>
        </svg>
      )}

      {type === 'isla-tesoro' && (
        <svg viewBox="0 0 200 290" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="isla-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E6274" />
              <stop offset="50%" stopColor="#1E4452" />
              <stop offset="100%" stopColor="#132F3A" />
            </linearGradient>
          </defs>
          <rect width="200" height="290" fill="url(#isla-bg)" />
          {/* Island silhouette & Pirate Galleon */}
          <path d="M0,175 Q60,150 120,180 T200,165 L200,290 L0,290 Z" fill="#D9A74A" opacity="0.6" />
          <path d="M0,200 Q70,175 140,205 T200,195 L200,290 L0,290 Z" fill="#0C1D24" />
          {/* Galleon */}
          <g transform="translate(70, 95)" fill="#FDF8E1">
            <path d="M10,40 L60,40 L50,55 L20,55 Z" fill="#0C1D24" />
            <line x1="35" y1="40" x2="35" y2="10" stroke="#0C1D24" strokeWidth="2" />
            <path d="M35,15 Q48,22 35,30 Q22,22 35,15 Z" fill="#FDF8E1" />
          </g>
          {/* Skull and Crossbones small emblem */}
          <g transform="translate(100, 60)" fill="#FFEBAA">
            <circle cx="0" cy="0" r="10" />
            <line x1="-12" y1="-8" x2="12" y2="8" stroke="#FFEBAA" strokeWidth="2.5" />
            <line x1="12" y1="-8" x2="-12" y2="8" stroke="#FFEBAA" strokeWidth="2.5" />
          </g>
          <g transform="translate(10, 230)">
            <rect x="10" y="0" width="160" height="42" fill="#071217" rx="3" />
            <text x="90" y="18" textAnchor="middle" fill="#FEE685" fontSize="10" fontWeight="800" fontFamily="Cinzel, serif">TREASURE ISLAND</text>
            <text x="90" y="32" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="600">R. L. STEVENSON (DUAL)</text>
          </g>
        </svg>
      )}
    </div>
  );
};
