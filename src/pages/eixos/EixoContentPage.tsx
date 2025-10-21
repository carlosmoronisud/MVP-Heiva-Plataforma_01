// src/pages/EixoContentPage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { IConteudoEixo } from '../../types';
import { dataUrls } from '../../config/dataUrls';
import { loadArrayData } from '../../services/dataLoader';
import LoadingCircle from '../../components/ui/LoadingDots';
// Importando os novos/ajustados componentes
import ReloadButton from '../../components/ui/ReloadButton'; 
import BackButton from '../../components/ui/BackButton';
import { EixoCard } from '../../components/cards/EixoCard';


const ITEMS_PER_LOAD = 9; // Paginação em lotes de 9

// Mapeamento dos nomes dos eixos da URL para os títulos da página
const pageTitles: { [key: string]: string } = {
  curadoria: 'Curadoria',
  extracaoLimpeza: 'Extração e Limpeza',
  mineracaoArgumentos: 'Mineração de Argumentos',
  visualizacaoDiscussoes: 'Visualização de Discussões',
  aspectosEticosLegais: 'Aspectos Éticos e Legais',
};

const EixoContentPage: React.FC = () => {
  const { eixoName } = useParams<{ eixoName: string }>();
  
  const [allConteudo, setAllConteudo] = useState<IConteudoEixo[]>([]);
  const [visibleConteudo, setVisibleConteudo] = useState<IConteudoEixo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState<number>(1); 

  // Função centralizada para buscar e processar os dados
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const eixoUrl = dataUrls.eixos[eixoName as keyof typeof dataUrls.eixos];
    
    if (!eixoUrl) {
      setError(`URL para o eixo "${eixoName}" não encontrada.`);
      setLoading(false);
      return;
    }

    try {
      const dataRaw = await loadArrayData<IConteudoEixo>(eixoUrl);
      
      if (dataRaw) {
        // NOTA: Não foi especificado um campo de data/ordenação para IConteudoEixo,
        // então mantemos a ordem que veio da planilha, mas armazenamos no estado.
        setAllConteudo(dataRaw); 
        
        // 1. Paginação Inicial
        setVisibleConteudo(dataRaw.slice(0, ITEMS_PER_LOAD));
        setLoadCount(1);
      } else {
        setAllConteudo([]);
        setVisibleConteudo([]);
      }
    } catch (err) {
      setError('Ocorreu um erro ao carregar os dados: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }, [eixoName]); // Depende do eixoName para buscar os dados corretos

  // Efeito inicial e re-fetch quando o eixoName muda
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para carregar mais itens
  const handleLoadMore = () => {
    const nextLoadCount = loadCount + 1;
    const startIndex = loadCount * ITEMS_PER_LOAD;
    const endIndex = nextLoadCount * ITEMS_PER_LOAD;

    const nextBatch = allConteudo.slice(startIndex, endIndex);
    setVisibleConteudo(prev => [...prev, ...nextBatch]);
    setLoadCount(nextLoadCount);
  };
  
  const hasMore = visibleConteudo.length < allConteudo.length;
  const tituloDaPagina = pageTitles[eixoName as keyof typeof pageTitles] || 'Eixo do Projeto';

  // --- Renderização de Estados (Loading, Erro, Vazio) ---

  if (loading && allConteudo.length === 0) {
    return <div className="flex justify-center items-center h-screen"><LoadingCircle /></div>;
  }

  if (error) {
    return (
        <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
            <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
            <div className="flex justify-center space-x-4">
                <BackButton />
                <ReloadButton onClick={fetchData} loading={loading} />
            </div>
        </div>
    );
  }
  
  if (allConteudo.length === 0) {
    return (
        <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{tituloDaPagina}</h1>
            <p className="text-lg text-gray-500 mb-6">Nenhum conteúdo para este eixo encontrado.</p>
            <div className="flex justify-center space-x-4">
                <BackButton />
                <ReloadButton onClick={fetchData} loading={loading} />
            </div>
        </div>
    );
  }

  // --- Conteúdo Principal ---
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      
      {/* Cabeçalho e Botões de Ação */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center mb-12">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <BackButton />
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold text-gray-800 border-b-4 border-green-500 pb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {tituloDaPagina}
            </motion.h1>
        </div>
        
        {/* Botão de Recarregar no canto direito */}
        <div className="md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 flex justify-end">
            <ReloadButton onClick={fetchData} loading={loading} />
        </div>
      </div>
      
      {/* Grid de Cards Paginação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleConteudo.map(item => (
          <EixoCard key={item.id} item={item} />
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
            {loading ? 'Carregando...' : `Carregar Mais (${Math.min(ITEMS_PER_LOAD, allConteudo.length - visibleConteudo.length)})`}
          </motion.button>
        </div>
      )}

      {/* Loading de Recarga */}
      {loading && allConteudo.length > 0 && (
          <div className="mt-8 text-center">
              <LoadingCircle />
              <p className="text-sm text-gray-500 mt-2">Atualizando dados...</p>
          </div>
      )}
    </div>
  );
};

export default EixoContentPage;