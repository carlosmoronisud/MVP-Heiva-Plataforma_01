// src/components/Header.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu sanduíche

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Função para fechar o menu após o clique em um link
  const closeMenu = () => setIsOpen(false);

  // Array de links para facilitar a renderização
  const navLinks = [
    { to: "/noticias", label: "Notícias" },
    { to: "/publicacoes", label: "Publicações" },
    { to: "/membros", label: "Membros" },
    { to: "/eixos", label: "Eixos" },
    { to: "/sobre", label: "Sobre" },
  ];

  return (
    <header className="bg-verdeFechado text-white p-4 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <img 
            src="https://ik.imagekit.io/8h7kfljfc/heiwa/CIBERDEM%201.png?updatedAt=1756774054692" 
            alt="Logo CIBERDEM" 
            className="object-contain h-10 sm:h-12 inline-block" 
          />
          <img 
            src="https://ik.imagekit.io/8h7kfljfc/heiwa/width_550.png?updatedAt=1755655163585" 
            alt="Logo Heiwa" 
            className="object-cover w-36 sm:w-44 h-10 inline-block" 
          />
        </Link>

        {/* 1. Menu Desktop (Visível a partir de 'lg') */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to} 
                  className="text-white font-medium hover:text-blue-400 transition duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 2. Botão do Menu Sanduíche (Visível até 'lg') */}
        <button 
          onClick={toggleMenu} 
          className="text-white lg:hidden p-2 focus:outline-none"
          aria-label="Abrir Menu Principal"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 3. Menu Mobile (Drawer lateral) */}
      <nav 
        className={`
          fixed top-0 right-0 h-full w-64 bg-verdeFechado 
          shadow-2xl transform transition-transform duration-300 ease-in-out
          lg:hidden z-50 p-6 pt-20
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <ul className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className="text-white text-xl font-semibold hover:text-blue-400 transition duration-300 block border-b border-gray-700 pb-2"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botão de Fechar no topo do Drawer */}
        <button 
          onClick={toggleMenu} 
          className="absolute top-4 right-4 text-white p-2 focus:outline-none"
          aria-label="Fechar Menu"
        >
          <FaTimes size={24} />
        </button>
      </nav>

      {/* Overlay Escuro quando o menu está aberto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" 
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;