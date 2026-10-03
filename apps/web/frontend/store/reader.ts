'use client';

/**
 * Reader settings store using Zustand
 * Persisted to localStorage; reads back on mount.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ReaderSettings, ReadingPosition, AudioPlayerState } from '@/lib/quran/types';

// ── Reader Settings ───────────────────────────────────────────────────────────

interface ReaderSettingsStore {
  settings: ReaderSettings;
  updateSettings: (patch: Partial<ReaderSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: ReaderSettings = {
  readingMode: 'mushaf',
  fontSize: 'md',
  translationLanguage: 'en',
  translationEdition: '131', // Saheeh International
  showTransliteration: false,
  showTranslation: false,
  tajweedMode: false,
  reciterId: '7', // Mishary Rashid Al-Afasy
  showPageBorders: true,
  lineHighlight: true,
  autoScrollOnAudio: true,
};

export const useReaderSettings = create<ReaderSettingsStore>()(
  persist(
    (set: any) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (patch: Partial<ReaderSettings>) =>
        set((s: ReaderSettingsStore) => ({ settings: { ...s.settings, ...patch } })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    { name: 'tilawa-reader-settings' }
  )
);

// ── Reading Position ──────────────────────────────────────────────────────────

interface ReadingPositionStore {
  position: ReadingPosition;
  setPosition: (pos: ReadingPosition) => void;
}

export const useReadingPosition = create<ReadingPositionStore>()(
  persist(
    (set: any) => ({
      position: { page: 1, surahId: 1, ayahNumber: 1 },
      setPosition: (position: ReadingPosition) => set({ position }),
    }),
    { name: 'tilawa-reading-position' }
  )
);

// ── Audio Player ──────────────────────────────────────────────────────────────

interface AudioPlayerStore {
  state: AudioPlayerState;
  setPlaying: (playing: boolean) => void;
  setCurrentVerse: (verseKey: string | null) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setSpeed: (speed: number) => void;
  setRepeatMode: (mode: AudioPlayerState['repeatMode']) => void;
  setReciter: (reciterId: string) => void;
}

const DEFAULT_AUDIO: AudioPlayerState = {
  isPlaying: false,
  currentVerseKey: null,
  reciterId: '7',
  speed: 1,
  repeatMode: 'none',
  progress: 0,
  duration: 0,
};

export const useAudioPlayer = create<AudioPlayerStore>()(
  persist(
    (set: any) => ({
      state: DEFAULT_AUDIO,
      setPlaying: (isPlaying: boolean) => set((s: AudioPlayerStore) => ({ state: { ...s.state, isPlaying } })),
      setCurrentVerse: (currentVerseKey: string | null) => set((s: AudioPlayerStore) => ({ state: { ...s.state, currentVerseKey } })),
      setProgress: (progress: number) => set((s: AudioPlayerStore) => ({ state: { ...s.state, progress } })),
      setDuration: (duration: number) => set((s: AudioPlayerStore) => ({ state: { ...s.state, duration } })),
      setSpeed: (speed: number) => set((s: AudioPlayerStore) => ({ state: { ...s.state, speed } })),
      setRepeatMode: (repeatMode: AudioPlayerState['repeatMode']) => set((s: AudioPlayerStore) => ({ state: { ...s.state, repeatMode } })),
      setReciter: (reciterId: string) => set((s: AudioPlayerStore) => ({ state: { ...s.state, reciterId, currentVerseKey: null, isPlaying: false } })),
    }),
    {
      name: 'tilawa-audio-player',
      partialize: (s: AudioPlayerStore) => ({ state: { reciterId: s.state.reciterId, speed: s.state.speed, repeatMode: s.state.repeatMode } }),
    }
  )
);

// ── Bookmarks ─────────────────────────────────────────────────────────────────

interface Bookmark {
  verseKey: string;
  timestamp: number;
  note?: string;
}

interface BookmarksStore {
  bookmarks: Record<string, Bookmark>;
  addBookmark: (verseKey: string, note?: string) => void;
  removeBookmark: (verseKey: string) => void;
  isBookmarked: (verseKey: string) => boolean;
}

export const useBookmarks = create<BookmarksStore>()(
  persist(
    (set: any, get: any) => ({
      bookmarks: {},
      addBookmark: (verseKey: string, note?: string) =>
        set((s: BookmarksStore) => ({
          bookmarks: { ...s.bookmarks, [verseKey]: { verseKey, timestamp: Date.now(), note } },
        })),
      removeBookmark: (verseKey: string) =>
        set((s: BookmarksStore) => {
          const { [verseKey]: _, ...rest } = s.bookmarks;
          return { bookmarks: rest };
        }),
      isBookmarked: (verseKey: string) => !!get().bookmarks[verseKey],
    }),
    { name: 'tilawa-bookmarks' }
  )
);

// ── Selected Ayah (for action bar) ───────────────────────────────────────────

interface SelectedAyahStore {
  selectedVerseKey: string | null;
  selectVerse: (verseKey: string | null) => void;
}

export const useSelectedAyah = create<SelectedAyahStore>()((set: any) => ({
  selectedVerseKey: null,
  selectVerse: (selectedVerseKey: string | null) => set({ selectedVerseKey }),
}));
