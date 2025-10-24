// src/pages/NoticiasPage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// loadArrayData AGORA ACEITA forceRefresh como segundo parâmetro
import { loadArrayData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { INoticia } from '../types';
import CardNoticia from '../components/cards/CardNoticia';
import LoadingCircle from '../components/ui/LoadingDots';
import ReloadButton from '../components/ui/ReloadButton'; 
import Seo from '../components/Seo';


// Define o número de itens a carregar por vez
const ITEMS_PER_LOAD = 9;

const NoticiasPage: React.FC = () => {
    // Variáveis de estado locais
    const [allNoticias, setAllNoticias] = useState<INoticia[]>([]); 
    const [visibleNoticias, setVisibleNoticias] = useState<INoticia[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadCount, setLoadCount] = useState<number>(1); 

    // Função para carregar os dados (AGORA ACEITA forceRefresh)
    const fetchData = useCallback(async (forceRefresh: boolean = false) => { // <-- Aceita o argumento
        setLoading(true);
        setError(null);
        
        try {
            // PASSA O ARGUMENTO para o serviço (ignora o Local Storage se true)
            const noticiasRaw = await loadArrayData<INoticia>(dataUrls.noticias, forceRefresh);
            
            if (noticiasRaw && noticiasRaw.length > 0) {
                // ORDENAÇÃO: Assumindo que item.data é um TIMESTAMP (number) agora
                const noticiasOrdenadas = noticiasRaw.sort((a, b) => 
                    (b.data as unknown as number) - (a.data as unknown as number)
                );
                
                setAllNoticias(noticiasOrdenadas);
                
                // INICIALIZAÇÃO: Define o array visível e reseta o contador
                setVisibleNoticias(noticiasOrdenadas.slice(0, ITEMS_PER_LOAD));
                setLoadCount(1); 
            } else {
                setAllNoticias([]);
                setVisibleNoticias([]);
            }
        } catch (err) {
            console.error('Erro ao carregar notícias:', err);
            setError('Ocorreu um erro ao carregar as notícias. Verifique a conexão ou a URL do Apps Script.');
        } finally {
            setLoading(false);
        }
    }, []); // Array de dependências normal


    // Efeito inicial de carregamento (Chama sem argumentos, usa cache normalmente)
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 3. Handler para o Botão (NOVO)
    const handleReload = () => {
        // CHAMA O FETCH PASSANDO TRUE (ignora o cache local)
        fetchData(true); 
    };

    // Função para carregar mais 9 notícias (mantida)
    const handleLoadMore = () => {
        const nextLoadCount = loadCount + 1;
        const startIndex = loadCount * ITEMS_PER_LOAD;
        const endIndex = nextLoadCount * ITEMS_PER_LOAD;

        const nextBatch = allNoticias.slice(startIndex, endIndex);
        setVisibleNoticias(prev => [...prev, ...nextBatch]);
        setLoadCount(nextLoadCount);
    };
    
    // Verifica se há mais notícias para carregar
    const hasMore = visibleNoticias.length < allNoticias.length;

    // --- Renderização de Estados ---
    if (loading && allNoticias.length === 0) { // Mostra o loading apenas na primeira carga
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
                {/* BOTÃO CORRIGIDO: Usa handleReload */}
                <ReloadButton onClick={handleReload} loading={loading} />
            </div>
        );
    }

    if (allNoticias.length === 0) {
        return (
            <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Notícias</h2>
                <p className="text-lg text-gray-600">Nenhuma notícia encontrada no momento.</p>
                <div className="flex justify-end mt-4">
                    {/* BOTÃO CORRIGIDO: Usa handleReload */}
                    <ReloadButton onClick={handleReload} loading={loading} />
                </div>
            </div>
        );
    }

    // Conteúdo principal
    return (
        <motion.div
            className="container mx-auto px-4 max-w-6xl py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative flex justify-between items-center mb-12">
                <Seo
                    title="Notícias do Projeto | Hub de Pesquisa Científica"
                    description="Conheça as notícias do projeto."
                />
                <motion.h1
                    className="text-5xl font-extrabold text-gray-800 border-b-4 border-green-500 pb-3"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Todas as Notícias
                </motion.h1>
                {/* Botão de recarregar no canto superior direito */}
                {/* BOTÃO CORRIGIDO: Usa handleReload para forçar a sincronização */}
                <ReloadButton onClick={handleReload} loading={loading} />
            </div>

            {/* Grid de Notícias (mantido) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleNoticias.map((noticia, index) => (
                    <CardNoticia key={noticia.id || index} item={noticia} />
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
                        {loading ? 'Carregando...' : `Carregar Mais (${Math.min(ITEMS_PER_LOAD, allNoticias.length - visibleNoticias.length)})`}
                    </motion.button>
                </div>
            )}
            
            {/* Exibe o indicador de loading enquanto recarrega */}
            {loading && allNoticias.length > 0 && (
                <div className="mt-8 text-center">
                    <LoadingCircle />
                    <p className="text-sm text-gray-500 mt-2">Atualizando dados...</p>
                </div>
            )}
        </motion.div>
    );
};

export default NoticiasPage;