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
-Incorporar Logo (Opcional)
-Hacer paginación en juegos recientes (Opcional)
-Hacer paginación a los publishers (Opcional)

-Hacer que cada tag/género sea clickable y lleve a allgamesDetail con el filtro en ceustión aplicado
-Hacer AllPublisherPage con su respectivo enlace
-Hacer PublisherDetailPage. Además los publishers en los juegos deben llevar ahí y debe haber en el nav un enlace

Aspectos a mejorar.
-metacriticScore podría ser un componente con 2 puntos de arrastre para elegir minimos y maximos
-mejorar a estilos más llamativos
-permitir registro de usuarios y que almacenen sus juegos deseados, adquiridos, etc.

*/