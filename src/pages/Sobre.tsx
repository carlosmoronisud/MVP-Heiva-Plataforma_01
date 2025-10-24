/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/SobrePage.tsx (AJUSTADO PARA INCLUIR O BOTÃO DE RECARGA)

import React, { useEffect, useState, useCallback } from 'react'; // Adicionado useCallback
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { loadSingleObjectData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IConteudoPrincipal } from '../types';
import Seo from '../components/Seo';

// Componentes Reutilizados

import ParceirosSection from '../components/sobre/ParceirosSection'; 
import LoadingCircle from '../components/ui/LoadingDots';
import ReloadButton from '../components/ui/ReloadButton'; // Importa o ReloadButton


const SobrePage: React.FC = () => {
    // Estado para armazenar todos os dados da planilha principal
    const [conteudoPrincipal, setConteudoPrincipal] = useState<IConteudoPrincipal | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Dados de localização (mantidos)
    const localizacao = {
        nome: "Universidade Presbiteriana Mackenzie",
        endereco: "Rua da Consolação, 930 - Consolação, São Paulo - SP",
        urlMapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.947936647264!2d-46.65709972589508!3d-23.535261378822396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a72dfb9f71%3A0x89e27c1a823e449c!2sUniversidade%20Presbiteriana%20Mackenzie!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr",
        linkUrl: "https://www.mackenzie.br/localizacao/campus-sao-paulo"
    };

    // --- Lógica de Fetch Centralizada (Agora com useCallback) ---
    const fetchData = useCallback(async () => {
        // Não reseta o 'loading' para true se já estiver carregando (para evitar trepidação)
        setLoading(true); 
        setError(null);
        try {
            const principalData = await loadSingleObjectData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
            setConteudoPrincipal(principalData);
        } catch (err) {
            setError('Ocorreu um erro ao carregar o conteúdo principal.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- Renderização de Estados ---
    if (loading && !conteudoPrincipal) { // Mostra loading apenas na primeira carga
        return <div className="flex justify-center items-center h-screen"><LoadingCircle /></div>;
    }

    if (error && !conteudoPrincipal) { // Mostra erro se não houver conteúdo
        return (
            <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
                <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
                <div className="flex justify-center">
                    <ReloadButton onClick={fetchData} loading={loading} />
                </div>
            </div>
        );
    }
    
    const aboutData = conteudoPrincipal;

    // Conteúdo principal
    return (
        <motion.div
            className="container mx-auto px-4 max-w-6xl py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* NOVO CONTAINER FLEXÍVEL PARA TÍTULO E BOTÃO */}
            <div className="relative flex justify-between items-center mb-12">
                <Seo
      title="Sobre o Projeto HEIWA | Hub de Pesquisa Científica"
      description="Conhecendo o Projeto HEIWA."
    />
                <motion.h1
                    className="text-5xl font-extrabold text-left text-gray-800 border-b-4 border-green-500 pb-3 pr-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Sobre o Projeto HEIWA
                </motion.h1>
                {/* Botão de Recarregar */}
                <div className="flex-shrink-0">
                    <ReloadButton onClick={fetchData} loading={loading} />
                </div>
            </div>
            {/* FIM DO CONTAINER FLEXÍVEL */}

            {/* 1. Seção Sobre (Texto principal) */}
            <motion.section 
                className="py-16 bg-gray-100 rounded-xl shadow-inner mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                     {aboutData?.titulo || 'Sobre o Projeto'}
                </h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed px-4">
                    {aboutData?.conteudo || 'Descrição do projeto não encontrada.'}
                </p>
            </motion.section>

            {/* 2. SEÇÃO RESULTADOS E VÍDEO */}
            {(aboutData?.resultados || aboutData?.video) && (
                <motion.section 
                    className="py-16 bg-white rounded-xl shadow-lg mb-16 border-t-4 border-green-500"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Resultados</h2>
                        
                        {/* Texto de Resultados */}
                        {aboutData?.resultados && (
                            <div className="mb-10">
                                <p className="text-gray-700 whitespace-pre-wrap">{aboutData.resultados}</p>
                            </div>
                        )}

                        {/* Vídeo */}
                        {aboutData?.video && (
                            <div className="relative pt-[56.25%] bg-gray-200 rounded-lg shadow-xl overflow-hidden">                                
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={aboutData.video}
                                    title="Vídeo do Projeto"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>                                
                            </div>                            
                        )}
                        <div className="text-center"><p className="text-sm text-gray-600 mt-2">Palestra: Grupo de Pesquisa e Inovação em Ciberdemocracia e Projeto Heiwa-Mineração e Visualização de Discussões em Redes Sociais
Workshop de Tendências Tecnológicas WTT 2023 - Universidade Presbiteriana Mackenzie - 04/04/2023. Profa. Renata Araujo, coordenadora do CIBERDEM</p></div>
                    </div>
                </motion.section>
            )}

            {/* 3. SEÇÃO LOCALIZAÇÃO */}
            <motion.section 
                className="py-16 bg-white rounded-xl shadow-lg border-t-4 border-green-500 mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Onde Estamos</h2>
                
                <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
                    
                    {/* Mapa Interativo (Iframe) */}
                    <div className="lg:w-1/2 rounded-lg overflow-hidden shadow-xl h-80">
                        <iframe
                            src={localizacao.urlMapa}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização da Universidade Presbiteriana Mackenzie"
                        ></iframe>
                    </div>

                    {/* Detalhes de Localização */}
                    <div className="lg:w-1/2 p-4 flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{localizacao.nome}</h3>
                        <p className="text-gray-700 text-lg mb-4">
                            <FaMapMarkerAlt className="inline mr-2 text-green-600" size={18} />
                            {localizacao.endereco}
                        </p>
                        <a 
                            href={localizacao.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block self-start mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
                        >
                            Saiba Mais sobre a Instituição
                        </a>
                    </div>
                </div>
            </motion.section>

            {/* 4. Seção de Parceiros */}
            <div className="mt-16">
                <ParceirosSection />
            </div>

            {/* Loading de Recarga para quando os dados são atualizados */}
            {loading && conteudoPrincipal && (
                 <div className="mt-8 text-center">
                    <LoadingCircle />
                    <p className="text-sm text-gray-500 mt-2">Atualizando dados...</p>
                 </div>
            )}
        </motion.div>
    );
};

export default SobrePage;