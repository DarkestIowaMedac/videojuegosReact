"use client"

import { useState } from "react"

const EventCard = ({ id, title, date, location, image, description, isRegistered, onToggleRegistration }) => {
  const [showQR, setShowQR] = useState(false)

  const generateShareUrl = () => {
    const baseUrl = window.location.origin + "/event-join"
    const eventData = {
      id,
      title,
      date,
      location,
      image,
      description,
    }

    const params = new URLSearchParams()
    params.append("eventData", JSON.stringify(eventData))

    return `${baseUrl}?${params.toString()}`
  }

  const handleShareClick = () => {
    setShowQR(true)

    setTimeout(() => {
      const qrContainer = document.getElementById(`qrcode-${id}`)
      if (qrContainer && qrContainer.innerHTML === "") {
        new window.QRCode(qrContainer, {
          text: generateShareUrl(),
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.H,
        })
      }
    }, 100)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative group">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 oscuro">
        <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
        <div className="flex items-center oscuroletrasoscuras mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{date}</span>
        </div>
        <div className="flex items-center oscuroletrasoscuras mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        <p className="oscuroletrasoscuras mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onToggleRegistration(id)}
            className={`w-full font-bold py-2 px-4 rounded transition duration-300 ${
              isRegistered ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isRegistered ? "Anularse" : "Apuntarse"}
          </button>

          <button
            onClick={handleShareClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Compartir con QR
          </button>
        </div>

        {/* Modal para mostrar el código QR */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4 text-center">Comparte este evento</h3>
              <div className="flex justify-center mb-4">
                <div id={`qrcode-${id}`} className="qrcode"></div>
              </div>
              <p className="text-sm text-gray-600 text-center mb-4">
                Escanea este código QR para unirte al evento "{title}"
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventCard
