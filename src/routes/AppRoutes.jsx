import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AllGamesPage from '../pages/AllGamesPage';
import GameDetailPage from '../pages/GameDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
    return (
      
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/games" element={<AllGamesPage />}/>

          <Route path="/games/:query" element={<AllGamesPage />}/>

          <Route path="/game/:id" element={<GameDetailPage />} />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      
    );
  };
  
  export default AppRoutes;

  //Nota, en element puedes indicar otro router para agrupar rutas.
  //Nota, se puede anidar route dentro de route para rutas anidadas, similar a nodos.