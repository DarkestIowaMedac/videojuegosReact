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

OPCIONAL
-Incorporar Logo (Opcional)
-Hacer paginación en juegos recientes (Opcional)
-Hacer paginación a los publishers (Opcional)



ASPECTOS A MEJORAR EN FUTURO
-metacriticScore podría ser un componente con 2 puntos de arrastre para elegir minimos y maximos
-mejorar a estilos más llamativos
-permitir registro de usuarios y que almacenen sus juegos deseados, adquiridos, etc.
-Filtrado de publishers

*/