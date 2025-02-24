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
    <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
      <div className="h-48"> {/* Contenedor fijo para la imagen */}
        <img 
          className="w-full h-full object-cover" 
          src={image || "/placeholder.svg"} 
          alt={title} 
        />
      </div>
      <div className="p-4 h-[134px] flex flex-col justify-between"> {/* Altura fija para el contenido */}
        <h2 className="font-bold text-xl line-clamp-2 mb-2">{title}</h2>
        <button
          onClick={handleDetailsClick}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-auto"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  )
}

export default GameCard