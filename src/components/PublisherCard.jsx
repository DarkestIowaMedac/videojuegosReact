import { useNavigate } from "react-router-dom";

const PublisherCard = ({ id, name, image, gamesCount, description }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/publisher/${id}`);
  };

  return (
    <div className="bg-white oscuro rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="oscuroletrasoscuras mb-2">Juegos publicados: {gamesCount}</p>
        {description && <p className="text-sm text-gray-500 line-clamp-2">{description}</p>}
        <button
          onClick={handleDetailsClick}
          className="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-700 transition duration-300 mt-4"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default PublisherCard;