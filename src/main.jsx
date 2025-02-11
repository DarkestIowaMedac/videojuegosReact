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

-Separación de las llamadas a la API en otra página??
-Hacer cambio de página en lista de juegos
-Hacer página de detalle de videojuego
-Plantear funcionalidad barra de busqueda
-Rematar el enlazado de páginas
-Mejorar estilos en la página de lista de juegos (opcional)
*/