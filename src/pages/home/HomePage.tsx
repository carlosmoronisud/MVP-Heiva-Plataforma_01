// src/components/HomePage.tsx

import React, { useEffect, useState } from 'react';
import CardNoticia from '../../components/cards/CardNoticia';
import CardPublicacao from '../../components/cards/CardPublicacao';
import LoadingCircle from '../../components/ui/LoadingDots';
import { dataUrls } from '../../config/dataUrls';
import { loadSingleObjectData, loadArrayData } from '../../services/dataLoader';
import AboutWrapper from './AboutWrapper';
import ContentCarouselSection from './ContentCarouselSection';
import HeroSection from './HeroSection';
import type { IConteudoPrincipal, INoticia, IPublicacao } from '../../types';

const HomePage: React.FC = () => {
    const [conteudoPrincipal, setConteudoPrincipal] = useState<IConteudoPrincipal | null>(null);
    const [noticias, setNoticias] = useState<INoticia[]>([]);
    const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // --- Lógica de Fetch e Ordenação (Permanece igual) ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const principalData = await loadSingleObjectData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
                if (principalData) {
                    setConteudoPrincipal(principalData);
                }
                
                const noticiasRaw = await loadArrayData<INoticia>(dataUrls.noticias);
                if (noticiasRaw) {
                    const noticiasOrdenadas = noticiasRaw.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
                    setNoticias(noticiasOrdenadas);
                }

                const publicacoesRaw = await loadArrayData<IPublicacao>(dataUrls.publicacoes);
                if (publicacoesRaw) {
                    const publicacoesOrdenadas = publicacoesRaw.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
                    setPublicacoes(publicacoesOrdenadas);
                }
            } catch (err) {
                setError('Ocorreu um erro ao carregar os dados: ' + (err instanceof Error ? err.message : String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- Renderização de Estados ---
    if (loading) {
        return <LoadingCircle />;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }
    
    if (!conteudoPrincipal) {
        return <div className="text-center py-8 text-gray-500">Conteúdo principal do projeto não encontrado.</div>;
    }

    // --- Variantes para Framer Motion ---
    const heroContainerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.2 },
        },
    };

    const heroItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    // --- CONTEÚDO PRINCIPAL (Modularizado) ---
    return (
        <div className="container mx-auto px-4 max-w-6xl rounded-b-xl p-2 md:p-0">
            
            {/* 1. Seção HERO */}
            <HeroSection variants={heroContainerVariants} itemVariants={heroItemVariants} />

            {/* 2. Seção Sobre o Projeto */}
            <AboutWrapper />

            {/* 3. Seção de Publicações em Carrossel */}
            <ContentCarouselSection
                data={publicacoes}
                title="Publicações Recentes"
                bgColor="bg-green-50"
                link="/publicacoes"
                CardComponent={CardPublicacao}
                dataType='publicacoes'
            />

            {/* 4. Seção de Notícias em Carrossel */}
            <ContentCarouselSection
                data={noticias}
                title="Últimas Notícias"
                bgColor="" 
                link="/noticias"
                CardComponent={CardNoticia}
                dataType='noticias'
            />
        </div>
    );
};

export default HomePage;