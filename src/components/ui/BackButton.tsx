// src/components/ui/BackButton.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Assumindo react-icons

interface BackButtonProps {
  to?: string; // Caminho opcional, padrão é '/eixos'
}

const BackButton: React.FC<BackButtonProps> = ({ to = '/eixos' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex items-center 
        px-4 py-2 
        bg-gray-200 
        text-gray-700 
        rounded-full 
        shadow-md 
        transition-all duration-300 
        hover:bg-gray-300 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-gray-400
      "
      title="Voltar para a página de Eixos"
    >
      <FaArrowLeft className="w-4 h-4 mr-2" />
      Voltar
    </button>
  );
};

export default BackButton;

// NOTA: Certifique-se de que a página onde este botão será usado (EixoContentPage)
// esteja dentro de um RouterProvider/BrowserRouter para que o 'useNavigate' funcione.