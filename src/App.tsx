// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VisualizacoesPage from './pages/VisualizacoesPage';
import PublicacoesPage from './pages/PublicacoesPage';
import SobreProjetoPage from './pages/SobreProjetoPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<VisualizacoesPage />} />
            <Route path="/publicacoes" element={<PublicacoesPage />} />
            <Route path="/sobre" element={<SobreProjetoPage />} />
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;