import { Link } from "react-router-dom"

const PublisherCard = ({ id, name, image, gamesCount, description }) => {
  return (
    <Link to={`/publishers/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-600 mb-2">Juegos publicados: {gamesCount}</p>
          {description && <p className="text-sm text-gray-500 line-clamp-2">{description}</p>}
        </div>
      </div>
    </Link>
  )
}

export default PublisherCard