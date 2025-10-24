// src/pages/EixoContentPage.tsx

import Seo from '../../components/Seo';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { IConteudoEixo } from '../../types';
import { dataUrls } from '../../config/dataUrls';
// loadArrayData AGORA DEVE ACEITAR forceRefresh
import { loadArrayData } from '../../services/dataLoader';
import LoadingCircle from '../../components/ui/LoadingDots';
import ReloadButton from '../../components/ui/ReloadButton'; 
import BackButton from '../../components/ui/BackButton';
import { EixoCard } from '../../components/cards/EixoCard';
// NOTA: useSync FOI REMOVIDO PARA EVITAR CONFLITOS DE CACHE


const ITEMS_PER_LOAD = 9; // Paginação em lotes de 9

// Mapeamento dos nomes dos eixos da URL para os títulos da página
const pageTitles: { [key: string]: string } = {
  curadoria: 'Curadoria',
  extracaoLimpeza: 'Extração e Limpeza',
  mineracaoArgumentos: 'Mineração de Argumentos',
  visualizacaoDiscussoes: 'Visualização de Discussões',
  aspectosEticosLegais: 'Aspectos Éticos e Legais',
};
const descriptionBase = "Confira publicações, notícias e ferramentas relacionadas ao eixo de pesquisa ";

const EixoContentPage: React.FC = () => {
  const { eixoName } = useParams<{ eixoName: string }>();
  // 1. VARIÁVEIS LOCAIS (sem Hooks de Contexto)
  // const { syncKey, forceSync } = useSync(); // <-- REMOVIDO!
  
  const [allConteudo, setAllConteudo] = useState<IConteudoEixo[]>([]);
  const [visibleConteudo, setVisibleConteudo] = useState<IConteudoEixo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState<number>(1); 

  // Função centralizada para buscar e processar os dados
  const fetchData = useCallback(async (forceRefresh: boolean = false) => { // <-- AGORA ACEITA forceRefresh
    setLoading(true);
    setError(null);

    const eixoUrl = dataUrls.eixos[eixoName as keyof typeof dataUrls.eixos];
    
    if (!eixoUrl) {
      setError(`URL para o eixo "${eixoName}" não encontrada.`);
      setLoading(false);
      return;
    }

    try {
      // 2. PASSA O ARGUMENTO para o serviço (ignora o Local Storage se true)
      const dataRaw = await loadArrayData<IConteudoEixo>(eixoUrl, forceRefresh); 
      
      if (dataRaw) {
        setAllConteudo(dataRaw); 
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

  // 3. Efeito inicial e re-fetch quando o eixoName muda (Sem syncKey!)
  useEffect(() => {
    fetchData(); // Chamada padrão (forceRefresh=false)
  }, [fetchData]);

  // 4. Handler para o Botão
  const handleReload = () => {
    // CHAMA O FETCH PASSANDO TRUE (ignora o cache local e faz a requisição de rede)
    fetchData(true); 
  }
  
  // Função para carregar mais itens (mantida)
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
                {/* BOTÃO CORRIGIDO: Usa handleReload */}
                <ReloadButton onClick={handleReload} loading={loading} />
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
                {/* BOTÃO CORRIGIDO: Usa handleReload */}
                <ReloadButton onClick={handleReload} loading={loading} />
            </div>
        </div>
    );
  }

  // --- Conteúdo Principal ---
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      
      {/* Cabeçalho e Botões de Ação */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center mb-12">
      <Seo 
        title={`${tituloDaPagina} | Hub de Pesquisa`} 
        description={`${descriptionBase} ${tituloDaPagina}.`} 
      />
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
        <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex justify-end">
            {/* BOTÃO CORRIGIDO: Usa handleReload */}
            <ReloadButton onClick={handleReload} loading={loading} />
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