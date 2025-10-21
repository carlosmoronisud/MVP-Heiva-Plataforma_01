import React from 'react';
import type { IEntidadeCard } from '../../types';



const CardEntidade: React.FC<{ item: IEntidadeCard }> = ({ item }) => (
  <div className="flex flex-col items-center justify-center p-2">
    {item.logoUrl && <img src={item.logoUrl} alt={item.nome} className="h-12 w-auto object-contain filter  hover:grayscale- transition-all duration-300" />}
  </div>
);

export default CardEntidade;