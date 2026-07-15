import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Inventory from './pages/Inventory/Inventory';
import CarDetails from './pages/CarDetails/CarDetails';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import About from './pages/About/About';
import Contact from './pages/contact/Contact';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/about" element={<About />} />         {/* <-- NEW */}
              <Route path="/contact" element={<Contact />} />     {/* <-- NEW */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CarProvider>
    </AuthProvider>
  );
}

export default App;