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
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),
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
    (set) => ({
      position: { page: 1, surahId: 1, ayahNumber: 1 },
      setPosition: (position) => set({ position }),
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
    (set) => ({
      state: DEFAULT_AUDIO,
      setPlaying: (isPlaying) => set((s) => ({ state: { ...s.state, isPlaying } })),
      setCurrentVerse: (currentVerseKey) => set((s) => ({ state: { ...s.state, currentVerseKey } })),
      setProgress: (progress) => set((s) => ({ state: { ...s.state, progress } })),
      setDuration: (duration) => set((s) => ({ state: { ...s.state, duration } })),
      setSpeed: (speed) => set((s) => ({ state: { ...s.state, speed } })),
      setRepeatMode: (repeatMode) => set((s) => ({ state: { ...s.state, repeatMode } })),
      setReciter: (reciterId) => set((s) => ({ state: { ...s.state, reciterId, currentVerseKey: null, isPlaying: false } })),
    }),
    {
      name: 'tilawa-audio-player',
      partialize: (s) => ({ state: { reciterId: s.state.reciterId, speed: s.state.speed, repeatMode: s.state.repeatMode } }),
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
    (set, get) => ({
      bookmarks: {},
      addBookmark: (verseKey, note) =>
        set((s) => ({
          bookmarks: { ...s.bookmarks, [verseKey]: { verseKey, timestamp: Date.now(), note } },
        })),
      removeBookmark: (verseKey) =>
        set((s) => {
          const { [verseKey]: _, ...rest } = s.bookmarks;
          return { bookmarks: rest };
        }),
      isBookmarked: (verseKey) => !!get().bookmarks[verseKey],
    }),
    { name: 'tilawa-bookmarks' }
  )
);

// ── Selected Ayah (for action bar) ───────────────────────────────────────────

interface SelectedAyahStore {
  selectedVerseKey: string | null;
  selectVerse: (verseKey: string | null) => void;
}

export const useSelectedAyah = create<SelectedAyahStore>()((set) => ({
  selectedVerseKey: null,
  selectVerse: (selectedVerseKey) => set({ selectedVerseKey }),
}));
