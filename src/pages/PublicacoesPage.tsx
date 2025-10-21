// src/pages/PublicacoesPage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadArrayData } from '../services/dataLoader'; 
import { dataUrls } from '../config/dataUrls';
import type { IPublicacao } from '../types';
import LoadingCircle from '../components/ui/LoadingDots';
import ReloadButton from '../components/ui/ReloadButton'; // Reutilizando o botão
import CardPublicacao from '../components/cards/CardPublicacao';


// Define o número de itens a carregar por vez
const ITEMS_PER_LOAD = 9;

const PublicacoesPage: React.FC = () => {
    const [allPublicacoes, setAllPublicacoes] = useState<IPublicacao[]>([]); // Array completo (ordenado)
    const [visiblePublicacoes, setVisiblePublicacoes] = useState<IPublicacao[]>([]); // Array visível
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadCount, setLoadCount] = useState<number>(1); 

    // Função para carregar os dados
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const publicacoesRaw = await loadArrayData<IPublicacao>(dataUrls.publicacoes);
            
            if (publicacoesRaw) {
                // 1. ORDENAÇÃO: Garante que as mais recentes fiquem no topo
                // O formato de data 'DD/MM/AAAA' exige a inversão para ser comparável
                const publicacoesOrdenadas = publicacoesRaw.sort((a, b) => {
                    const dateA = new Date(b.data.split('/').reverse().join('-')).getTime();
                    const dateB = new Date(a.data.split('/').reverse().join('-')).getTime();
                    return dateA - dateB;
                });
                
                setAllPublicacoes(publicacoesOrdenadas);
                
                // 2. INICIALIZAÇÃO: Define o array visível com o primeiro lote (9)
                setVisiblePublicacoes(publicacoesOrdenadas.slice(0, ITEMS_PER_LOAD));
                setLoadCount(1); // Reseta o contador
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

    // Efeito inicial de carregamento
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Função para carregar mais 9 publicações
    const handleLoadMore = () => {
        const nextLoadCount = loadCount + 1;
        const startIndex = loadCount * ITEMS_PER_LOAD;
        const endIndex = nextLoadCount * ITEMS_PER_LOAD;

        const nextBatch = allPublicacoes.slice(startIndex, endIndex);
        setVisiblePublicacoes(prev => [...prev, ...nextBatch]);
        setLoadCount(nextLoadCount);
    };

    const hasMore = visiblePublicacoes.length < allPublicacoes.length;

    // --- Renderização ---
    
    // Renderização do Loading inicial
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
                    <ReloadButton onClick={fetchData} loading={loading} />
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
                    <ReloadButton onClick={fetchData} loading={loading} />
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
                <motion.h1
                    className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-0 border-b-4 border-green-500 pb-3"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Nossas Publicações
                </motion.h1>
                <div className="absolute md:static top-0 right-0 mt-2 md:mt-0">
                    {/* Botão de recarregar no canto superior direito */}
                    <ReloadButton onClick={fetchData} loading={loading} />
                </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-10 max-w-4xl">
                Artigos, relatórios e outros materiais de pesquisa que complementam nossas visualizações.
            </p>

            {/* Grid de Publicações */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePublicacoes.map((pub, index) => (
                    // Renderiza o novo componente CardPublicacao
                    <CardPublicacao key={pub.id || index} item={pub} />
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
                        {loading ? 'Carregando...' : `Carregar Mais (${Math.min(ITEMS_PER_LOAD, allPublicacoes.length - visiblePublicacoes.length)})`}
                    </motion.button>
                </div>
            )}
            
            {/* Exibe o indicador de loading enquanto recarrega, mas os dados antigos ficam na tela */}
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