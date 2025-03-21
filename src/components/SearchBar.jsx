"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearch } from "../store/slices/filtersSlice"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    const pagina = localStorage.getItem("search")

    if (pagina === "publishers") {
      navigate(`/publishers/${query}`)
    } else {
      dispatch(setSearch(query))
      navigate(`/games/${query}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={localStorage.getItem("search") === "publishers" ? "Buscar publishers..." : "Buscar videojuegos..."}
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-r-md hover:bg-blue-700 transition duration-300"
      >
        Buscar
      </button>
    </form>
  )
}

export default SearchBar

