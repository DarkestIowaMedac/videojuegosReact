import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">Logo</a>
        
        <nav className="hidden sm:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </nav>

        <button 
          onClick={() => setShowMenu(!showMenu)} 
          className="sm:hidden text-white text-2xl"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {showMenu && (
        <nav className="sm:hidden flex flex-col items-center mt-4">
          <a href="#" className="text-white hover:text-gray-300 mb-2">Home</a>
          <a href="#" className="text-white hover:text-gray-300 mb-2">About</a>
          <a href="#" className="text-white hover:text-gray-300 mb-2">Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Header;