import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CarProvider } from './context/CarContext';
import { Toaster } from 'sonner@2.0.3';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ModelsPage from './pages/ModelsPage';
import CarDetailPage from './pages/CarDetailPage';
import ShowroomPage from './pages/ShowroomPage';
import BookTestDrivePage from './pages/BookTestDrivePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <ThemeProvider>
      <CarProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/models" element={<ModelsPage />} />
              <Route path="/car/:id" element={<CarDetailPage />} />
              <Route path="/showroom" element={<ShowroomPage />} />
              <Route path="/book-test-drive" element={<BookTestDrivePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <Footer />
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </CarProvider>
    </ThemeProvider>
  );
}