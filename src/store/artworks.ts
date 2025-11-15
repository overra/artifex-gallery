import { create } from 'zustand';
import { Artwork, mockArtworks, FlaggedArtwork, mockFlaggedArtworks } from '@/lib/mock-data';
interface ArtworksState {
  artworks: Artwork[];
  flaggedArtworks: FlaggedArtwork[];
  searchTerm: string;
  filterTag: string | null;
  addArtwork: (artwork: Artwork) => void;
  setSearchTerm: (term: string) => void;
  setFilterTag: (tag: string | null) => void;
  approveArtwork: (artworkId: string) => void;
  removeArtwork: (artworkId: string) => void;
}
export const useArtworksStore = create<ArtworksState>((set) => ({
  artworks: mockArtworks,
  flaggedArtworks: mockFlaggedArtworks,
  searchTerm: '',
  filterTag: null,
  addArtwork: (artwork) =>
    set((state) => ({ artworks: [artwork, ...state.artworks] })),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterTag: (tag) => set({ filterTag: tag }),
  approveArtwork: (artworkId) =>
    set((state) => ({
      flaggedArtworks: state.flaggedArtworks.filter(
        (item) => item.artworkId !== artworkId
      ),
    })),
  removeArtwork: (artworkId) =>
    set((state) => ({
      artworks: state.artworks.filter((art) => art.id !== artworkId),
      flaggedArtworks: state.flaggedArtworks.filter(
        (item) => item.artworkId !== artworkId
      ),
    })),
}));