// src/components/ui/ReloadButton.tsx

import React from 'react';
import { FaSyncAlt } from 'react-icons/fa'; 

interface ReloadButtonProps {
  onClick: () => void;
  loading: boolean;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center justify-center 
        p-3 
        rounded-full 
        shadow-lg 
        transition-all duration-300 
        focus:outline-none focus:ring-4 focus:ring-green-300
        ${loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-green-500 hover:bg-green-600 text-white'
        }
      `}
      title="Recarregar Notícias"
    >
      <FaSyncAlt 
        className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} 
      />
      {/* Opcionalmente, pode adicionar um texto para acessibilidade */}
      <span className="sr-only">Recarregar Notícias</span>
    </button>
  );
};

export default ReloadButton;

// NOTA: Se você não usa 'react-icons', substitua o ícone FaSyncAlt
// por um SVG simples ou uma outra solução de ícone.