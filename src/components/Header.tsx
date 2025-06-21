// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">
          <img src="https://ik.imagekit.io/8h7kfljfc/heiwa/heiwa-3.png?updatedAt=1750436285620" alt="Logo" className="h-8 inline-block mr-2" />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400 transition duration-300">
                Visualizações
              </Link>
            </li>
            <li>
              <Link to="/publicacoes" className="hover:text-blue-400 transition duration-300">
                Publicações
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-blue-400 transition duration-300">
                Sobre o Projeto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;