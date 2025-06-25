
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
                Início {/* HomePage */}
              </Link>
            </li>
            <li>
              <Link to="/visualizacoes" className="hover:text-blue-400 transition duration-300">
                Visualizações {/* VisualizationsPage */}
              </Link>
            </li>
            <li>
              <Link to="/publicacoes" className="hover:text-blue-400 transition duration-300">
                Publicações
              </Link>
            </li>
            <li>
              <Link to="/membros" className="hover:text-blue-400 transition duration-300">
                Equipe {/* MembersPage */}
              </Link>
            </li>
            {/* Futuras implementações */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;