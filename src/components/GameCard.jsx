import { useNavigate } from "react-router-dom"

const GameCard = ({ id, title, image, description }) => {
  const navigate = useNavigate()

  const handleDetailsClick = () => {
    navigate(`/game/${id}`)
    // console.log("All props:", { id, title, image, description })
    // console.log("title:", title)
    // console.log("id:", id)
    // console.log("image:", image)
    // console.log("description:", description)
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={image || "/placeholder.svg"} alt={title} />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base mb-4 line-clamp-3">{description}</p>
        <button
          onClick={handleDetailsClick}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  )
}

export default GameCard