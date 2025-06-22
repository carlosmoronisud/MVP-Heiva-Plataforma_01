// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">
          DebateViz
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400 transition duration-300">
                Início {/* MUDANÇA: Link para a nova HomePage */}
              </Link>
            </li>
            <li>
              <Link to="/visualizacoes" className="hover:text-blue-400 transition duration-300">
                Visualizações {/* MUDANÇA: Se a rota foi alterada */}
              </Link>
            </li>
            <li>
              <Link to="/publicacoes" className="hover:text-blue-400 transition duration-300">
                Publicações
              </Link>
            </li>
            <li>
              <Link to="/membros" className="hover:text-blue-400 transition duration-300">
                Equipe {/* MUDANÇA: Novo link para MembrosPage */}
              </Link>
            </li>
            {/* Se você tinha links de cadastro, eles podem ficar aqui ou em outro lugar */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;