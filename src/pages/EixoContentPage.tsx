// src/pages/EixoContentPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';


import type { IConteudoEixo } from '../types';
import { dataUrls } from '../config/dataUrls';
import { loadArrayData } from '../services/dataLoader';
import LoadingCircle from '../components/ui/LoadingDots';

// Mapeamento dos nomes dos eixos da URL para os títulos da página
const pageTitles: { [key: string]: string } = {
  curadoria: 'Curadoria',
  extracaoLimpeza: 'Extração e Limpeza',
  mineracaoArgumentos: 'Mineração de Argumentos',
  visualizacaoDiscussoes: 'Visualização de Discussões',
  aspectosEticosLegais: 'Aspectos Éticos e Legais',
};

// Um componente para o card do conteúdo de cada eixo
const EixoCard: React.FC<{ item: IConteudoEixo }> = ({ item }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      // Removendo a transição para usar a padrão do Framer Motion
    >
      <div className="w-full h-48 flex items-center justify-center mb-4">
        <img src={item.imagemUrl} alt={item.titulo} className="max-h-full object-contain" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.titulo}</h3>
      <p className="text-gray-600 mb-4">{item.descricao}</p>
      <a href={item.acaoUrl} className="bg-primary-green text-white font-bold py-2 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
        Abrir
      </a>
    </motion.div>
  );
};

const EixoContentPage: React.FC = () => {
  const { eixoName } = useParams<{ eixoName: string }>();
  const [conteudo, setConteudo] = useState<IConteudoEixo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const eixoUrl = dataUrls.eixos[eixoName as keyof typeof dataUrls.eixos];
      
      if (!eixoUrl) {
        setError(`URL para o eixo "${eixoName}" não encontrada.`);
        setLoading(false);
        return;
      }

      try {
        const data = await loadArrayData<IConteudoEixo>(eixoUrl);
        setConteudo(data);
      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [eixoName]);

  if (loading) {
    return <LoadingCircle />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }
  
  if (conteudo.length === 0) {
    return <div className="text-center py-8 text-gray-500">Conteúdo para este eixo não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {pageTitles[eixoName as keyof typeof pageTitles] || 'Eixo não encontrado'}
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {conteudo.map(item => (
          <EixoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default EixoContentPage;