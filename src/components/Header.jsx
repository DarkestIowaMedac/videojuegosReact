"use client"

import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate();
  const handleGamesClick = () => {
    localStorage.clear(); // O localStorage.removeItem('filters') si solo quieres eliminar un item específico
    navigate("/games"); // Redirige a la página de juegos
  };
  const handlePublishersClick = () => {
    localStorage.clear(); // O localStorage.removeItem('filters') si solo quieres eliminar un item específico
    navigate("/publishers"); // Redirige a la página de juegos
  };
  // const handleSearch = () => {
  //   //console.log('Buscar:', query);
  //   //
  // };
  
  
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          Logo
        </a>
        <div className="flex items-center space-x-12">
          <SearchBar className="h-10" />
          <nav className="hidden sm:flex space-x-4 items-center">
            <a href="" onClick={handleGamesClick} className="text-white hover:text-gray-300">
              Juegos
            </a>
            <a href="" onClick={handlePublishersClick} className="text-white hover:text-gray-300">
              Publishers
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Sobre Nosotros
            </a>
          </nav>
          <button onClick={() => setShowMenu(!showMenu)} className="sm:hidden text-white text-2xl">
            {showMenu ? <GrClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {showMenu && (
        <nav className="sm:hidden flex flex-col items-center mt-4">
          <a href="/games" className="text-white hover:text-gray-300 mb-2">
            Juegos
          </a>
          <a href="#" className="text-white hover:text-gray-300 mb-2">
            Sobre nosotros
          </a>
          <a href="#" className="text-white hover:text-gray-300 mb-2">
            Contacto
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header

