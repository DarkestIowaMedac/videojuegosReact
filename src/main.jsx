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

-Plantear funcionalidad barra de busqueda
-Incorporar Logo
-Separación de las llamadas a la API en api.js
-Hacer cambio de página en juegos recientes
-Mejorar estilos en la página de lista de juegos (opcional)
-Hacer filtros
*/