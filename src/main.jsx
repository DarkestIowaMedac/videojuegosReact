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
-Registrarse en la api
-Mejorar código para obtener juegos random de la api y mejorar carrousel
-Mejorar página principal
-Plantilla y mejorar el resto de páginas (incluyendo barra de busqueda) (redefinir tareas)
-Enlazar páginas
-Dar funcionalidad deseada a buscador de tareas
*/