import { Search, Award, User, LogOut, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import type { Page, User as UserType } from '../App';

interface NavbarProps {
  user: UserType;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
}

export function Navbar({ user, onNavigate, onLogout, currentPage }: NavbarProps) {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard' },
    { id: 'certifications' as Page, label: 'Certifications' },
    { id: 'reports' as Page, label: 'Reports' },
    { id: 'team' as Page, label: 'Team' },
    { id: 'settings' as Page, label: 'Settings' },
    { id: 'help' as Page, label: 'Help' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#007BFF]">CertTrack Pro</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search certifications..." 
                className="pl-10 bg-gray-50"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  text-sm transition-colors
                  ${currentPage === item.id 
                    ? 'text-[#007BFF]' 
                    : 'text-gray-600 hover:text-[#007BFF]'
                  }
                `}
              >
                {item.label}
              </button>
            ))}

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D9E1FF] flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <User className="w-4 h-4 text-[#007BFF]" />
                    )}
                  </div>
                  <span className="text-sm">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
