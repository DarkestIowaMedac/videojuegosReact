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


-Incorporar Logo
-Hacer paginación en juegos recientes (Opcional)
-Mejorar estilos en la página de detalle de juego (Opcional)
-Mejorar estilos en la página de lista de juegos (Opcional)
-Hacer filtros
-Hacer favoritos
En la página de detalles de un videojuego deben mostrarse como mínimo:
○ Tags
○ Publisher
○ Plataformas
● Cada tag/género debe ser clickable y debe llevar a una nueva página que muestre
los juegos de un tag/género
● Cada publisher será un enlace que llevará una página con información sobre el
publisher y sus videojuegos
● Añade paginación a la página de lista de videojuegos. (HECHO)
● Crea una nueva página similar a la principal de videojuegos, pero donde se
buscarán Publishers


  Errores corrección:
  El texto del buscador, dropdowns es blanco, no se puede leer... (modo oscuro)
*/