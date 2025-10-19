import React from 'react';
import type { Page } from '../App';

interface BottomNavProps {
  activePage: Page;
  navigate: (page: Page) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: string;
  page: Page;
  isActive: boolean;
  onClick: (page: Page) => void;
}> = ({ label, icon, page, isActive, onClick }) => (
  <button
    onClick={() => onClick(page)}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-gray-500'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const AddButton: React.FC<{ onClick: (page: Page) => void }> = ({ onClick }) => (
  <button
    onClick={() => onClick('add')}
    className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 bg-accent rounded-full text-white shadow-lg hover:bg-secondary transition-transform transform hover:scale-110"
    aria-label="Add Transaction"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </button>
);


const BottomNav: React.FC<BottomNavProps> = ({ activePage, navigate }) => {
  const navItems = [
    { label: 'Home', icon: '🏠', page: 'dashboard' as Page },
    { label: 'Activity', icon: '📊', page: 'transactions' as Page },
    { label: 'Insights', icon: '💡', page: 'nudges' as Page },
    { label: 'Profile', icon: '👤', page: 'settings' as Page },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-base-200 shadow-up">
      <div className="flex justify-around items-center h-16 relative">
        <NavItem {...navItems[0]} isActive={activePage === navItems[0].page} onClick={navigate} />
        <NavItem {...navItems[1]} isActive={activePage === navItems[1].page} onClick={navigate} />
        <div className="w-1/5 relative">
          <AddButton onClick={navigate} />
        </div>
        <NavItem {...navItems[2]} isActive={activePage === navItems[2].page} onClick={navigate} />
        <NavItem {...navItems[3]} isActive={activePage === navItems[3].page} onClick={navigate} />
      </div>
    </nav>
  );
};

export default BottomNav;
