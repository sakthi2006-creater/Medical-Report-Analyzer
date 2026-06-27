import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, ClipboardList, Activity, Apple, UtensilsCrossed, ShieldCheck } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/entry', label: 'Health Entry', icon: ClipboardList },
  { path: '/results', label: 'Results', icon: Heart },
  { path: '/fitness', label: 'Fitness', icon: Activity },
  { path: '/diet-chart', label: 'Diet Chart', icon: UtensilsCrossed },
  { path: '/food-guide', label: 'Food Guide', icon: Apple },
  { path: '/disclaimer', label: 'Disclaimer', icon: ShieldCheck },
];

export default function AppNavbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">HealthWise</span>
          </Link>
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
