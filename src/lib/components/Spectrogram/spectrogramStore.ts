import { writable } from 'svelte/store';

interface SpectrogramState {
  section: number | null;
  sound: string | null;
  iframeSrc: string;
}

export const activeSpectrogram = writable<SpectrogramState>({
  section: null,
  sound: null,
  iframeSrc: ''
});

// Optional: Helper function to reset the store
export function resetSpectrogram() {
  activeSpectrogram.set({
    section: null,
    sound: null,
    iframeSrc: ''
  });
}