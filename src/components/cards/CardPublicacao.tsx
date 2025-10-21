// src/components/CardPublicacao.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { IPublicacao } from '../../types';


interface CardPublicacaoProps {
  item: IPublicacao;
}

const CardPublicacao: React.FC<CardPublicacaoProps> = ({ item }) => {
  // Conversão de data para exibição:
  // Tenta converter o formato DD/MM/AAAA para um formato que new Date() entenda
  const dataFormatada = item.data 
    ? new Date(item.data.split('/').reverse().join('-')).toLocaleDateString('pt-BR') 
    : 'Data não disponível';
    
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.titulo}</h3>
        
        {/* Metadados */}
        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <p>
            <span className="font-medium text-gray-700">Autores:</span> {item.autores}
          </p>
          <p>
            <span className="font-medium text-gray-700">Data:</span> {dataFormatada}
          </p>
        </div>
        
        {/* Resumo */}
        <p className="text-gray-700 text-sm mb-6 flex-grow line-clamp-3">{item.resumo}</p>
        
        {/* Link de Acesso */}
        <div className="mt-auto"> {/* Garante que o botão fique na parte inferior do card */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-[1.02]"
          >
            Acessar Publicação
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CardPublicacao;