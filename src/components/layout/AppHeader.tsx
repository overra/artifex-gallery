import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Search, User as UserIcon, LogIn, LogOut, PlusSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/auth';
import { useArtworksStore } from '@/store/artworks';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UploadSheet } from '@/components/UploadSheet';
export function AppHeader() {
  const isLoggedIn = useAuthStore((state) => !!state.currentUser);
  const username = useAuthStore((state) => state.currentUser?.username);
  const avatarUrl = useAuthStore((state) => state.currentUser?.avatarUrl);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const searchTerm = useArtworksStore((state) => state.searchTerm);
  const setSearchTerm = useArtworksStore((state) => state.setSearchTerm);
  const [isUploadSheetOpen, setUploadSheetOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Palette className="h-8 w-8 text-primary" />
                <span className="font-display text-2xl font-bold">Artifex</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" asChild>
                  <Link to="/">Explore</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/trending">Trending</Link>
                </Button>
                {isLoggedIn && (
                  <Button variant="ghost" asChild>
                    <Link to="/following">Following</Link>
                  </Button>
                )}
              </nav>
            </div>
            <div className="flex-1 mx-4 sm:mx-8 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for art, artists, tags..."
                  className="pl-10 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle className="relative top-0 right-0" />
              {isLoggedIn && username && avatarUrl ? (
                <>
                  <Button
                    variant="outline"
                    className="hidden sm:inline-flex"
                    onClick={() => setUploadSheetOpen(true)}
                  >
                    <PlusSquare className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={avatarUrl} alt={username} />
                          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{username}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            @{username.toLowerCase()}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/profile/${username}`}>
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUploadSheetOpen(true)}>
                        <PlusSquare className="mr-2 h-4 w-4" />
                        <span>Upload</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button onClick={login}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <UploadSheet open={isUploadSheetOpen} onOpenChange={setUploadSheetOpen} />
    </>
  );
}