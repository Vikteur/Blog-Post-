import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { RouteAnnouncer } from './components/RouteAnnouncer';

export function AppRouter() {
  return <BrowserRouter>
      <RouteAnnouncer />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blogs" element={<App page="blogs" />} />
        <Route path="/post/:postId" element={<App page="post" />} />
        <Route path="/portfolio" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>;
}