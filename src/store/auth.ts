import { create } from 'zustand';
import { mockUsers, User, Collection } from '@/lib/mock-data';
interface CurrentUser extends User {
  followingIds: string[];
}
interface AuthState {
  currentUser: CurrentUser | null;
  login: () => void;
  logout: () => void;
  createCollection: (collectionName: string) => string | null;
  addArtworkToCollection: (collectionId: string, artworkId: string) => void;
  toggleFollow: (userId: string) => void;
}
// Add followingIds to mock user for demo purposes
if (mockUsers[0] && !('followingIds' in mockUsers[0])) {
  (mockUsers[0] as CurrentUser).followingIds = ['user-2']; // Pre-follow one user
}
export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  login: () => {
    const userToLogin = { ...mockUsers[0] };
    if (!('followingIds' in userToLogin)) {
      (userToLogin as CurrentUser).followingIds = [];
    }
    set({ currentUser: userToLogin as CurrentUser });
  },
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
  toggleFollow: (userId: string) => {
    const { currentUser } = get();
    if (!currentUser) return;
    const newFollowingIds = new Set(currentUser.followingIds);
    if (newFollowingIds.has(userId)) {
      newFollowingIds.delete(userId);
    } else {
      newFollowingIds.add(userId);
    }
    const updatedUser = {
      ...currentUser,
      followingIds: Array.from(newFollowingIds),
    };
    set({ currentUser: updatedUser });
    // Also update the mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      (mockUsers[userIndex] as CurrentUser).followingIds = updatedUser.followingIds;
    }
  },
}));