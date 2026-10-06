import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
