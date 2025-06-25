
import React from 'react';
import type { IVisualizacao } from '../types';

interface CardVisualizacaoProps {
  visualizacao: IVisualizacao;
}

const CardVisualizacao: React.FC<CardVisualizacaoProps> = ({ visualizacao }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
      {visualizacao.imagemUrl && (
        <img
          src={visualizacao.imagemUrl}
          alt={visualizacao.titulo}
          className="w-full h-48 object-contain"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{visualizacao.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{visualizacao.descricao}</p>
        <a
          href={visualizacao.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Acessar Visualização
        </a>
      </div>
    </div>
  );
};

export default CardVisualizacao;