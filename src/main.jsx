import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppRoutes from "./routes/AppRoutes";
import './index.css'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


/*
TAREAS POR HACER:
-mejorar a estilos más llamativos y los de los tags añadido nuevo
-GameDetails Tags y estiloso
-permitir registro de usuarios
-Página de perfil donde mostrar favoritos y eventos
-Página de eventos
-Opción de marcar juegos como favoritos y eventos como "apuntado" luego esto será mostrado en el perfil
-Favoritos y eventos guardar en localStorage y que se quede dado como favorito en futuras recargas.
(CUIDADO CON LA LIMPIEZA DE LOCALSTORAGE ACTUAL, LIMPIAR SOLO LA VARIABLE NECESARIA)
-Funcional el QR
-Redux

OPCIONAL / ASPECTOS A MEJORAR EN FUTURO
-Hacer paginación en juegos recientes 
-metacriticScore podría ser un componente con 2 puntos de arrastre para elegir minimos y maximos
-Filtrado de publishers
-Filtros de ordenación en la página de juegos



*/