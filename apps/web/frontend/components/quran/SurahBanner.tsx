'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SurahBannerProps {
  surahId: number;
  surahNameAr: string;
  surahNameEn: string;
  versesCount: number;
  revelation: 'Meccan' | 'Medinan';
  showBismillah?: boolean; // false for Surah 9 (At-Tawbah)
  bismillahIsVerse1?: boolean; // true for Surah 1 (Al-Fatihah)
  className?: string;
}

// Bismillah text (DO NOT MODIFY)
const BISMILLAH = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ';

export function SurahBanner({
  surahId,
  surahNameAr,
  surahNameEn,
  versesCount,
  revelation,
  showBismillah = true,
  bismillahIsVerse1 = false,
  className,
}: SurahBannerProps) {
  return (
    <div className={cn('my-4 select-none', className)}>
      {/* Ornamental banner */}
      <div
        className="relative mx-auto max-w-full rounded-sm border border-[#C9A24B] bg-[#EAF5E6] px-4 py-3 text-center"
        style={{ borderWidth: '1px 2px' }}
        role="banner"
        aria-label={`Surah ${surahNameEn}`}
      >
        {/* Gold corner ornaments */}
        <div className="pointer-events-none absolute inset-0">
          <svg width="100%" height="100%" className="absolute inset-0 opacity-30" aria-hidden="true">
            <defs>
              <pattern id={`corner-${surahId}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,0 L10,0 L0,10 Z" fill="#C9A24B" opacity="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>

        {/* Surah number badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-[#C9A24B] bg-white text-xs font-bold text-[#A8832F]">
          {surahId}
        </div>

        {/* Arabic name */}
        <p
          className="font-arabic text-2xl font-bold text-[#1B4D33] leading-loose tracking-wide"
          dir="rtl"
          lang="ar"
          aria-label={`Surah name in Arabic: ${surahNameAr}`}
        >
          {surahNameAr}
        </p>

        {/* English name + meta */}
        <div className="mt-1 flex items-center justify-center gap-3 text-xs text-[#4A5D52]">
          <span className="font-medium">{surahNameEn}</span>
          <span className="h-3 w-px bg-[#C9A24B]/40" aria-hidden="true" />
          <span>{versesCount} Ayahs</span>
          <span className="h-3 w-px bg-[#C9A24B]/40" aria-hidden="true" />
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-semibold',
              revelation === 'Meccan'
                ? 'bg-[#EAF5E6] text-[#2F7D4F]'
                : 'bg-[#E8D5A1]/50 text-[#A8832F]'
            )}
          >
            {revelation}
          </span>
        </div>

        {/* Gold divider line */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/60 to-transparent" />
          <span className="text-[#C9A24B] text-xs" aria-hidden="true">❧</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/60 to-transparent" />
        </div>
      </div>

      {/* Bismillah line */}
      {showBismillah && !bismillahIsVerse1 && (
        <div
          className="mt-3 text-center"
          aria-label="Bismillah"
          role="text"
        >
          <p
            className="font-arabic text-xl text-[#1B2B22] leading-loose"
            dir="rtl"
            lang="ar"
          >
            {BISMILLAH}
          </p>
        </div>
      )}
    </div>
  );
}
