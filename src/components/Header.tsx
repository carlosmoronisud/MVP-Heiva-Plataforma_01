
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-verdeFechado text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">
          <img src="https://ik.imagekit.io/8h7kfljfc/heiwa/width_550.png?updatedAt=1755655163585" alt="Logo" className="object-cover w-36 h-8 inline-block mr-2" />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400 transition duration-300">
                Notícias
              </Link>
            </li>
            <li>
              <Link to="/publicacoes" className="hover:text-blue-400 transition duration-300">
                Publicações
              </Link>
              
            </li>            
            <li>
              <Link to="/membros" className="hover:text-blue-400 transition duration-300">
                Membros {/* MembersPage */}
              </Link>
            </li>
            <li>
              <Link to="/debates" className="hover:text-blue-400 transition duration-300">
                Eixos
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-blue-400 transition duration-300">
                Sobre
              </Link>            
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;