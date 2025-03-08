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

OBLIGATORIO:

-Mejorar estilos generales 
-Redux

OPCIONAL / ASPECTOS A MEJORAR EN FUTURO
-Hacer paginación en juegos recientes 
-metacriticScore podría ser un componente con 2 puntos de arrastre para elegir minimos y maximos
-Filtrado de publishers


*/