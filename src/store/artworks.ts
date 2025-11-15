import { create } from 'zustand';
import { Artwork, mockArtworks } from '@/lib/mock-data';
interface ArtworksState {
  artworks: Artwork[];
  addArtwork: (artwork: Artwork) => void;
}
export const useArtworksStore = create<ArtworksState>((set) => ({
  artworks: mockArtworks,
  addArtwork: (artwork) =>
    set((state) => ({ artworks: [artwork, ...state.artworks] })),
}));