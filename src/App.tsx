import { useState, useEffect } from 'react';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { Dashboard } from './components/pages/Dashboard';
import { CertificationsPage } from './components/pages/CertificationsPage';
import { TeamManagementPage } from './components/pages/TeamManagementPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage';
import { HelpPage } from './components/pages/HelpPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export type Page = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'certifications' 
  | 'team' 
  | 'reports' 
  | 'settings' 
  | 'profile' 
  | 'forgot-password' 
  | 'help';

export type User = {
  name: string;
  email: string;
  role: string;
  avatar?: string;
} | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User>(null);

  const isAuthenticated = user !== null;

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      name: 'Alex Johnson',
      email: email,
      role: 'Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    });
    setCurrentPage('dashboard');
  };

  const handleRegister = (data: any) => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {isAuthenticated && currentPage !== 'landing' && (
        <Navbar 
          user={user} 
          onNavigate={navigateTo} 
          onLogout={handleLogout}
          currentPage={currentPage}
        />
      )}
      
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={navigateTo} />
        )}
        {currentPage === 'login' && (
          <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />
        )}
        {currentPage === 'register' && (
          <RegisterPage onRegister={handleRegister} onNavigate={navigateTo} />
        )}
        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage onNavigate={navigateTo} />
        )}
        {currentPage === 'dashboard' && isAuthenticated && (
          <Dashboard user={user} onNavigate={navigateTo} />
        )}
        {currentPage === 'certifications' && isAuthenticated && (
          <CertificationsPage onNavigate={navigateTo} />
        )}
        {currentPage === 'team' && isAuthenticated && (
          <TeamManagementPage onNavigate={navigateTo} />
        )}
        {currentPage === 'reports' && isAuthenticated && (
          <ReportsPage onNavigate={navigateTo} />
        )}
        {currentPage === 'settings' && isAuthenticated && (
          <SettingsPage user={user} onNavigate={navigateTo} />
        )}
        {currentPage === 'profile' && isAuthenticated && (
          <ProfilePage user={user} onNavigate={navigateTo} />
        )}
        {currentPage === 'help' && isAuthenticated && (
          <HelpPage onNavigate={navigateTo} />
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}