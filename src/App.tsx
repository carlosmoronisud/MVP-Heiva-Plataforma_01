// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VisualizacoesPage from './pages/VisualizacoesPage';
import PublicacoesPage from './pages/PublicacoesPage';
// REMOVA: import SobreProjetoPage from './pages/SobreProjetoPage';
import HomePage from './pages/HomePage';       // NOVA IMPORTAÇÃO
import MembrosPage from './pages/MembrosPage'; // NOVA IMPORTAÇÃO (antiga SobreProjetoPage)

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* MUDANÇA: Home agora é a raiz */}
            <Route path="/visualizacoes" element={<VisualizacoesPage />} /> {/* Nova rota para visualizações */}
            <Route path="/publicacoes" element={<PublicacoesPage />} />
            <Route path="/membros" element={<MembrosPage />} /> {/* NOVA ROTA para Membros */}
            {/* Opcional: Remover a rota /sobre se não for mais usada */}
            {/* <Route path="/sobre" element={<SobreProjetoPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;