// src/components/CardNoticia.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { INoticia } from '../types';

interface CardNoticiaProps {
  item: INoticia;
}

const CardNoticia: React.FC<CardNoticiaProps> = ({ item }) => {
  return (
    <motion.a
      href={item.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.titulo}</h3>
      {item.imagemUrl && (
        <img src={item.imagemUrl} alt={item.titulo} className="w-full h-auto mb-4 rounded-md" />
      )}
      <p className="text-gray-600 text-sm mb-4">{item.resumo}</p>
      <div className="text-gray-500 text-xs mt-2">
        <span>{item.data}</span>
      </div>
    </motion.a>
  );
};

export default CardNoticia;