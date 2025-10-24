/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // 1. DIVISÃO DOS ESTADOS DE CARREGAMENTO
    const [conteudoPrincipal, setConteudoPrincipal] = useState<IConteudoPrincipal | null>(null);
    const [noticias, setNoticias] = useState<INoticia[]>([]);
    const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
    
    // Estado principal de bloqueio (apenas para o Hero/Layout)
    const [loadingHero, setLoadingHero] = useState<boolean>(true); 
    // Estado de carregamento dos carrosséis (pode ser true enquanto renderiza o Hero)
    const [loadingCarousels, setLoadingCarousels] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    // --- FASE 1: Carrega Conteúdo Principal (Obrigatório para o Hero) ---
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                // APENAS A REQUISIÇÃO CRÍTICA
                const principalData = await loadSingleObjectData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
                if (principalData) {
                    setConteudoPrincipal(principalData);
                } else {
                    // Se o conteúdo principal falhar, o site não pode continuar
                    throw new Error("Falha ao carregar o conteúdo principal do projeto.");
                }
            } catch (err) {
                setError('Erro ao carregar o Hero: ' + (err instanceof Error ? err.message : String(err)));
            } finally {
                setLoadingHero(false); // Libera o Hero para renderizar
            }
        };

        fetchHeroData();
    }, []);
    
    // --- FASE 2: Carrega Notícias e Publicações (Dispara após o Hero ser liberado) ---
    useEffect(() => {
        if (!conteudoPrincipal) return; // Só roda se o Hero já estiver pronto
        
        const fetchCarouselData = async () => {
            setLoadingCarousels(true);
            
            try {
                const [noticiasRaw, publicacoesRaw] = await Promise.all([
                    loadArrayData<INoticia>(dataUrls.noticias),
                    loadArrayData<IPublicacao>(dataUrls.publicacoes)
                ]);

                // 1. Notícias
                if (noticiasRaw && noticiasRaw.length > 0) {
                    // Assumindo que item.data é um TIMESTAMP (number) agora
                    const noticiasOrdenadas = noticiasRaw.sort((a, b) => (b.data as unknown as number) - (a.data as unknown as number));
                    setNoticias(noticiasOrdenadas);
                }

                // 2. Publicações
                if (publicacoesRaw && publicacoesRaw.length > 0) {
                    const publicacoesOrdenadas = publicacoesRaw.sort((a, b) => (b.data as number) - (a.data as number));
                    setPublicacoes(publicacoesOrdenadas);
                }
                
            } catch (err) {
                // Erros aqui não bloqueiam o Hero, apenas os carrosséis
                console.error("Erro ao carregar carrosséis:", err);
            } finally {
                setLoadingCarousels(false); 
            }
        };

        fetchCarouselData();
    }, [conteudoPrincipal]); // Depende apenas do conteúdo principal


    // --- Renderização de Estados ---

    // 1. BLOQUEIO CRÍTICO: Se o Hero ainda não carregou (Fase 1)
    if (loadingHero) {
        return <LoadingCircle />;
    }

    // 2. Erro de Carregamento Crítico
    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }
    
    // O conteúdo principal é garantido a partir daqui
    
    // --- CONTEÚDO PRINCIPAL (Modularizado) ---
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
    
    // Função utilitária para renderizar carrossel ou loading
    const renderCarouselOrLoading = (dataArray: any[], Card: React.FC<any>, title: string, link: string, bgColor: string) => {
        if (loadingCarousels) {
            // Se os carrosséis estão carregando, mostre um placeholder de loading
            return (
                <div className={`${bgColor} py-12 text-center`}>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
                    <LoadingCircle />
                </div>
            );
        }
        
        // Se a requisição terminou e há dados, renderize o carrossel
        if (dataArray && dataArray.length > 0) {
            return (
                <ContentCarouselSection
                    data={dataArray}
                    title={title}
                    bgColor={bgColor}
                    link={link}
                    CardComponent={Card}
                />
            );
        }
        
        // Se a requisição terminou e não há dados
        return (
            <div className={`py-12 text-center ${bgColor}`}>
                 <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
                 <p className="text-gray-600">Nenhum {title.toLowerCase()} encontrado no momento.</p>
            </div>
        );
    };


    return (
        <div className="container mx-auto px-4 max-w-6xl rounded-b-xl p-2 md:p-0">
            
            {/* 1. Seção HERO (Aparece Imediatamente após a requisição mais rápida) */}
            <HeroSection variants={heroContainerVariants} itemVariants={heroItemVariants} />

            {/* 2. Seção Sobre o Projeto (Também aparece imediatamente) */}
            <AboutWrapper />

            {/* 3. Seção de Publicações em Carrossel (Carregamento Assíncrono) */}
            {renderCarouselOrLoading(
                publicacoes,
                CardPublicacao,
                "Publicações",
                "/publicacoes",
                "bg-green-50"
            )}

            {/* 4. Seção de Notícias em Carrossel (Carregamento Assíncrono) */}
            {renderCarouselOrLoading(
                noticias,
                CardNoticia,
                "Notícias",
                "/noticias",
                "" // Sem cor de fundo ou outra cor
            )}
        </div>
    );
};

export default HomePage;