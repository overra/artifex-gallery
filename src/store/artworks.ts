import { create } from 'zustand';
import { Artwork, mockArtworks, FlaggedArtwork, mockFlaggedArtworks } from '@/lib/mock-data';
interface ArtworksState {
  artworks: Artwork[];
  flaggedArtworks: FlaggedArtwork[];
  likedArtworks: Set<string>;
  searchTerm: string;
  filterTag: string | null;
  addArtwork: (artwork: Artwork) => void;
  setSearchTerm: (term: string) => void;
  setFilterTag: (tag: string | null) => void;
  approveArtwork: (artworkId: string) => void;
  removeArtwork: (artworkId: string) => void;
  toggleLike: (artworkId: string) => void;
}
export const useArtworksStore = create<ArtworksState>((set) => ({
  artworks: mockArtworks,
  flaggedArtworks: mockFlaggedArtworks,
  likedArtworks: new Set(),
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
  toggleLike: (artworkId) =>
    set((state) => {
      const newLikedArtworks = new Set(state.likedArtworks);
      const artworkIndex = state.artworks.findIndex((art) => art.id === artworkId);
      if (artworkIndex === -1) return {};
      const newArtworks = [...state.artworks];
      const artwork = { ...newArtworks[artworkIndex] };
      if (newLikedArtworks.has(artworkId)) {
        newLikedArtworks.delete(artworkId);
        artwork.likes -= 1;
      } else {
        newLikedArtworks.add(artworkId);
        artwork.likes += 1;
      }
      newArtworks[artworkIndex] = artwork;
      return {
        artworks: newArtworks,
        likedArtworks: newLikedArtworks,
      };
    }),
}));