import { create } from 'zustand';
import { Artwork, mockArtworks } from '@/lib/mock-data';
interface ArtworksState {
  artworks: Artwork[];
  searchTerm: string;
  filterTag: string | null;
  addArtwork: (artwork: Artwork) => void;
  setSearchTerm: (term: string) => void;
  setFilterTag: (tag: string | null) => void;
}
export const useArtworksStore = create<ArtworksState>((set) => ({
  artworks: mockArtworks,
  searchTerm: '',
  filterTag: null,
  addArtwork: (artwork) =>
    set((state) => ({ artworks: [artwork, ...state.artworks] })),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterTag: (tag) => set({ filterTag: tag }),
}));