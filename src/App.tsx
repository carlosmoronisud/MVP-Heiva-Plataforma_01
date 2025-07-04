// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VisualizacoesPage from './pages/VisualizacoesPage';
import PublicacoesPage from './pages/PublicacoesPage';

import HomePage from './pages/HomePage';       
import MembrosPage from './pages/MembrosPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Página inicial */}
            <Route path="/visualizacoes" element={<VisualizacoesPage />} />   {/* Página de Visualizações */}
            <Route path="/publicacoes" element={<PublicacoesPage />} /> {/* Página de Publicações */}
              <Route path="/membros" element={<MembrosPage />} /> {/* Página de Membros */}
              
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;