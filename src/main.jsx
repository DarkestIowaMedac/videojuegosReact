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
-Estilos Claroscuros Mejores
-Mejorar estilos generales 
----
-botón fav en juegos
-Cambiar los clears para que solo limpien una variable
-Favoritos y eventos guardar en localStorage y que se quede dado como favorito en futuras recargas.
-Página de perfil
-permitir registro de usuarios
-Mostrar en perfil los favs y eventos
(CUIDADO CON LA LIMPIEZA DE LOCALSTORAGE ACTUAL, LIMPIAR SOLO LA VARIABLE NECESARIA)
-Funcional el QR
-Redux

OPCIONAL / ASPECTOS A MEJORAR EN FUTURO
-Hacer paginación en juegos recientes 
-metacriticScore podría ser un componente con 2 puntos de arrastre para elegir minimos y maximos
-Filtrado de publishers
-Filtros de ordenación en la página de juegos



*/