"use client"

import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearFilters } from "../store/slices/filtersSlice"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGamesClick = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
    navigate("/games")
  }

  const handlePublishersClick = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
    navigate("/publishers")
  }

  const handleEventsClick = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
    navigate("/events")
  }

  const handleProfileClick = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
    navigate("/Profile")
  }

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          <img src={`/logo.png`} className="w-14" alt="Logo" />
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
            <a href="" onClick={handleEventsClick} className="text-white hover:text-gray-300">
              Eventos
            </a>
            <a href="" onClick={handleProfileClick} className="text-white hover:text-gray-300">
              Profile
            </a>
          </nav>
          <button onClick={() => setShowMenu(!showMenu)} className="sm:hidden text-white text-2xl">
            {showMenu ? <GrClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {showMenu && (
        <nav className="sm:hidden flex flex-col items-center mt-4">
          <a href="" onClick={handleGamesClick} className="text-white hover:text-gray-300 mb-2">
            Juegos
          </a>
          <a href="" onClick={handlePublishersClick} className="text-white hover:text-gray-300 mb-2">
            Publishers
          </a>
          <a href="" onClick={handleEventsClick} className="text-white hover:text-gray-300 mb-2">
            Eventos
          </a>
          <a href="" onClick={handleProfileClick} className="text-white hover:text-gray-300 mb-2">
            Profile
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header

