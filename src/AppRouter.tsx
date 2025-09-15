import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { BlogPostDetail } from './pages/BlogPostDetail';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portfolio" element={<App page="portfolio" />} />
        <Route path="/post/:postId" element={<BlogPostDetail />} />
      </Routes>
    </BrowserRouter>;
}