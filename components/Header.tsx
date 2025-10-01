import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
        <img src="/components/icons/restartlogo.png" alt="Restart Logo" className="w-12 h-auto" />
        </div>
        <p className="text-sm text-slate-500 hidden sm:block">
          SA Marketing Strategy Generator
        </p>
      </nav>
    </header>
  );
};

export default Header;