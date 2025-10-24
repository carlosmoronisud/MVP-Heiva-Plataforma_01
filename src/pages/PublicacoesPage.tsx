// src/pages/PublicacoesPage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// loadArrayData AGORA ACEITA forceRefresh como segundo parâmetro
import { loadArrayData } from '../services/dataLoader'; 
import { dataUrls } from '../config/dataUrls';
import type { IPublicacao } from '../types';
import LoadingCircle from '../components/ui/LoadingDots';
import ReloadButton from '../components/ui/ReloadButton'; 
import CardPublicacao from '../components/cards/CardPublicacao';
import Seo from '../components/Seo';



// Define o número de itens a carregar por vez
const ITEMS_PER_LOAD = 9;

const PublicacoesPage: React.FC = () => {
    // VARIÁVEIS DE ESTADO LOCAIS
    const [allPublicacoes, setAllPublicacoes] = useState<IPublicacao[]>([]); 
    const [visiblePublicacoes, setVisiblePublicacoes] = useState<IPublicacao[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadCount, setLoadCount] = useState<number>(1); 

    // Função para carregar os dados (AGORA ACEITA forceRefresh)
    const fetchData = useCallback(async (forceRefresh: boolean = false) => { // <-- Aceita o argumento
        setLoading(true);
        setError(null);
        
        try {
            // PASSA O ARGUMENTO para o serviço (ignora o Local Storage se true)
            const publicacoesRaw = await loadArrayData<IPublicacao>(dataUrls.publicacoes, forceRefresh);
            
            if (publicacoesRaw && publicacoesRaw.length > 0) {
                // ORDENAÇÃO: Assumindo que item.data é um TIMESTAMP (number)
                const publicacoesOrdenadas = publicacoesRaw.sort((a, b) => {
                    // Ordena do mais novo (maior timestamp) para o mais antigo
                    return (b.data as number) - (a.data as number); 
                });
                
                setAllPublicacoes(publicacoesOrdenadas);
                
                // INICIALIZAÇÃO
                setVisiblePublicacoes(publicacoesOrdenadas.slice(0, ITEMS_PER_LOAD));
                setLoadCount(1);
            } else {
                setAllPublicacoes([]);
                setVisiblePublicacoes([]);
            }
        } catch (err) {
            console.error('Erro ao carregar publicações:', err);
            setError('Ocorreu um erro ao carregar as publicações. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Efeito inicial de carregamento (Chama sem argumentos, usa cache por padrão)
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handler para o Botão (NOVO)
    const handleReload = () => {
        // CHAMA O FETCH PASSANDO TRUE (ignora o cache local)
        fetchData(true); 
    };


    // Função para carregar mais 9 publicações (mantida)
    const handleLoadMore = () => {
        const nextLoadCount = loadCount + 1;
        const startIndex = loadCount * ITEMS_PER_LOAD;
        const endIndex = nextLoadCount * ITEMS_PER_LOAD;

        const nextBatch = allPublicacoes.slice(startIndex, endIndex);
        setVisiblePublicacoes(prev => [...prev, ...nextBatch]);
        setLoadCount(nextLoadCount);
    };

    const hasMore = visiblePublicacoes.length < allPublicacoes.length;

    // --- Renderização do Loading e Erro (Corrigida para usar handleReload) ---
    if (loading && allPublicacoes.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingCircle />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
                <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
                <div className="flex justify-center">
                    <ReloadButton onClick={handleReload} loading={loading} />
                </div>
            </div>
        );
    }

    if (allPublicacoes.length === 0) {
        return (
            <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossas Publicações</h2>
                <p className="text-lg text-gray-600">Nenhuma publicação encontrada no momento.</p>
                <div className="flex justify-end mt-4">
                    <ReloadButton onClick={handleReload} loading={loading} />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="container mx-auto px-4 max-w-6xl py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative flex flex-col md:flex-row md:justify-between md:items-center mb-12">
                <Seo
                    title="Publicações do Projeto | Hub de Pesquisa Científica"
                    description="Conheça as publicações do projeto de pesquisa."
                />
                <motion.h1
                    className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-0 border-b-4 border-green-500 pb-3"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Nossas Publicações
                </motion.h1>
                {/* Botão de recarregar no canto superior direito */}
                <div className="absolute md:static top-0 right-0 mt-2 md:mt-0">
                    <ReloadButton onClick={handleReload} loading={loading} />
                </div>
            </div>
            
            {/* Grid de Publicações (mantido) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePublicacoes.map((pub, index) => (
                    <CardPublicacao key={pub.id || index} item={pub} />
                ))}
            </div>

            {/* Carregar Mais (Load More) (mantido) */}
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
                        {loading ? 'Carregando...' : `Carregar Mais (${Math.min(ITEMS_PER_LOAD, allPublicacoes.length - visiblePublicacoes.length)})`}
                    </motion.button>
                </div>
            )}
            
            {/* Exibe o indicador de loading enquanto recarrega */}
            {loading && allPublicacoes.length > 0 && (
                <div className="mt-8 text-center">
                    <LoadingCircle />
                    <p className="text-sm text-gray-500 mt-2">Atualizando dados...</p>
                </div>
            )}

        </motion.div>
    );
};

export default PublicacoesPage;