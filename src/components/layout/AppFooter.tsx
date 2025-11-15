import { Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl font-bold">Artifex</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A community-driven AI art gallery for discovering, sharing, and collecting AI-generated masterpieces.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Discover</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary">Explore</Link></li>
              <li><Link to="/trending" className="text-base text-muted-foreground hover:text-primary">Trending</Link></li>
              <li><Link to="/following" className="text-base text-muted-foreground hover:text-primary">Following</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary">Artists</Link></li>
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary">Guidelines</Link></li>
              <li><Link to="/admin" className="text-base text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/" className="text-base text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Disclaimer: AI capabilities in this application are for demonstration purposes. There is a limit on the number of requests that can be made to the AI servers across all user apps in a given time period.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Artifex Gallery. Built with ���️ at Cloudflare.
          </p>
        </div>
      </div>
    </footer>
  );
}