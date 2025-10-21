// src/pages/VisualizacoesPage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadArrayData } from '../services/dataLoader'; 
import { dataUrls } from '../config/dataUrls';
import type { IVisualizacao } from '../types';
import CardVisualizacao from '../components/cards/CardVisualizacao';
import LoadingCircle from '../components/ui/LoadingDots'; 
import ReloadButton from '../components/ui/ReloadButton'; 
import BackButton from '../components/ui/BackButton';

const ITEMS_PER_LOAD = 9; 

const VisualizacoesPage: React.FC = () => {
  const [allVisualizacoes, setAllVisualizacoes] = useState<IVisualizacao[]>([]);
  const [visibleVisualizacoes, setVisibleVisualizacoes] = useState<IVisualizacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState<number>(1); 

  // Função centralizada para buscar os dados
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const dataRaw = await loadArrayData<IVisualizacao>(dataUrls.visualizacoes);
      
      if (dataRaw) { 
              
        setAllVisualizacoes(dataRaw); 
        
        // Paginação Inicial
        setVisibleVisualizacoes(dataRaw.slice(0, ITEMS_PER_LOAD));
        setLoadCount(1);
      } else {
        setAllVisualizacoes([]);
        setVisibleVisualizacoes([]);
      }
    } catch (err) {
      console.error('Erro ao carregar visualizações:', err);
      setError('Ocorreu um erro ao carregar as visualizações. Verifique a URL do Apps Script.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para carregar mais itens
  const handleLoadMore = () => {
    const nextLoadCount = loadCount + 1;
    const startIndex = loadCount * ITEMS_PER_LOAD;
    const endIndex = nextLoadCount * ITEMS_PER_LOAD;

    const nextBatch = allVisualizacoes.slice(startIndex, endIndex);
    setVisibleVisualizacoes(prev => [...prev, ...nextBatch]);
    setLoadCount(nextLoadCount);
  };
  
  const hasMore = visibleVisualizacoes.length < allVisualizacoes.length;

  // --- Renderização de Estados ---

  if (loading && allVisualizacoes.length === 0) {
    return <div className="flex justify-center items-center h-screen"><LoadingCircle /></div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
          <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
          <div className="flex justify-center">
              <ReloadButton onClick={fetchData} loading={loading} />
          </div>
      </div>
    );
  }
  
  if (allVisualizacoes.length === 0) {
    return (
        <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Visualizações</h1>
            <p className="text-lg text-gray-500 mb-6">Nenhuma visualização encontrada no momento.</p>
            <div className="flex justify-center">
                <ReloadButton onClick={fetchData} loading={loading} />
            </div>
        </div>
    );
  }

  // --- Conteúdo Principal ---
  return (
    <motion.div
      className="container mx-auto px-4 max-w-6xl py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      
      {/* Cabeçalho e Botão de Recarregar */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center mb-12">
        <BackButton />
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-0 border-b-4 border-green-500 pb-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >            
        Resultados
        </motion.h1>
        
        <div className="absolute md:static top-0 right-0 mt-2 md:mt-0 flex justify-end">
            <ReloadButton onClick={fetchData} loading={loading} />
        </div>
      </div>
      
      <p className="text-lg text-gray-600 mb-10 max-w-4xl">
        Explore nossas visualizações interativas sobre diversos debates e temas relevantes.
      </p>

      {/* Grid de Visualizações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleVisualizacoes.map((viz, index) => (
          <CardVisualizacao key={viz.id || index} visualizacao={viz} />
        ))}
      </div>

      {/* Carregar Mais (Load More) */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <motion.button
            onClick={handleLoadMore}
            disabled={loading}
            className={`
              bg-green-500 text-white font-bold py-3 px-8 
              rounded-full shadow-lg transition duration-300 
              hover:bg-green-600 transform hover:scale-105
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {loading ? 'Carregando...' : `Carregar Mais (${Math.min(ITEMS_PER_LOAD, allVisualizacoes.length - visibleVisualizacoes.length)})`}
          </motion.button>
        </div>
      )}
      
      {/* Loading de Recarga */}
      {loading && allVisualizacoes.length > 0 && (
          <div className="mt-8 text-center">
              <LoadingCircle />
              <p className="text-sm text-gray-500 mt-2">Atualizando dados...</p>
          </div>
      )}

    </motion.div>
  );
};

export default VisualizacoesPage;