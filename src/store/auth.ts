import { create } from 'zustand';
import { mockUsers, User, Collection } from '@/lib/mock-data';
interface AuthState {
  currentUser: User | null;
  login: () => void;
  logout: () => void;
  createCollection: (collectionName: string) => string | null;
  addArtworkToCollection: (collectionId: string, artworkId: string) => void;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  login: () => set({ currentUser: mockUsers[0] }), // Log in the first mock user
  logout: () => set({ currentUser: null }),
  createCollection: (collectionName) => {
    const { currentUser } = get();
    if (!currentUser) return null;
    const newCollection: Collection = {
      id: `col-${Date.now()}`,
      name: collectionName,
      artworkIds: [],
    };
    set({
      currentUser: {
        ...currentUser,
        collections: [...currentUser.collections, newCollection],
      },
    });
    // Also update the mockUsers array to persist across logins (for mock purposes)
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex].collections.push(newCollection);
    }
    return newCollection.id;
  },
  addArtworkToCollection: (collectionId, artworkId) => {
    const { currentUser } = get();
    if (!currentUser) return;
    const updatedCollections = currentUser.collections.map(col => {
      if (col.id === collectionId) {
        if (col.artworkIds.includes(artworkId)) {
          return col; // Already exists, do nothing
        }
        return { ...col, artworkIds: [...col.artworkIds, artworkId] };
      }
      return col;
    });
    set({
      currentUser: {
        ...currentUser,
        collections: updatedCollections,
      },
    });
    // Also update the mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex].collections = updatedCollections;
    }
  },
}));