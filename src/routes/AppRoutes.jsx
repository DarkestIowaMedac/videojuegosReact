import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AllGamesPage from '../pages/AllGamesPage';
import GameDetailPage from '../pages/GameDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import AllPublishersPage from '../pages/AllPublishersPage';
import PublisherDetailPage from '../pages/PublisherDetailPage';
import EventsPage from '../pages/EventsPage';
import ProfilePage from '../pages/ProfilePage';
import EventsjoinPage from '../pages/EventsjoinPage';
const AppRoutes = () => {
    return (
      
        <Routes>

          <Route path="/games/:query" element={<AllGamesPage />}/>

          <Route path="/games" element={<AllGamesPage />}/>

          <Route path="/game/:id" element={<GameDetailPage />} />

          <Route path="/publishers/:query" element={<AllPublishersPage />}/>

          <Route path="/publishers" element={<AllPublishersPage />} />

          <Route path="/publisher/:id" element={<PublisherDetailPage />} />

          <Route path="/events" element={<EventsPage />} />

          <Route path="/Profile" element={<ProfilePage />} />

          <Route path="/event-join" element={<EventsjoinPage />} />

          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      
    );
  };
  
  export default AppRoutes;

  //Nota, en element puedes indicar otro router para agrupar rutas.
  //Nota, se puede anidar route dentro de route para rutas anidadas, similar a nodos.