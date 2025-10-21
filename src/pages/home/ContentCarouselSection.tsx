/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/home/ContentCarouselSection.tsx (Ajustado para usar ViewMoreButton)

import React from 'react';
import { motion } from 'framer-motion';

import type { INoticia, IPublicacao } from '../../types';

import CarouselSlider from '../../components/ui/CarouselSlider';
import ViewMoreButton from '../../components/ui/ViewMoreButton';

interface ContentCarouselSectionProps<T> {
    data: T[]; // Lista COMPLETA de notícias/publicações
    title: string; // Ex: 'Publicações Recentes'
    bgColor: string;
    link: string; // Ex: '/publicacoes'
    CardComponent: React.FC<{ item: T }>;
}

const ITEMS_LIMIT = 6; // O limite de itens no carrossel

const ContentCarouselSection = <T extends INoticia | IPublicacao>({
    data,
    title,
    bgColor,
    link,
    CardComponent,
}: ContentCarouselSectionProps<T>) => {

    // Apenas os primeiros 6 itens para o carrossel
    const dataLimitada = data.slice(0, ITEMS_LIMIT);

    if (dataLimitada.length === 0) {
        return null;
    }

    // Verifica se a lista COMPLETA tem mais itens do que o limite do carrossel
    const showViewMoreButton = data.length > ITEMS_LIMIT;

    return (
        <section className={`py-16 p-4 md:p-16 ${bgColor} rounded-xl mb-16`}>
            <motion.h2 
                className="text-4xl font-bold text-center text-gray-800 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {title}
            </motion.h2>
            
            {/* Carrossel */}
            <CarouselSlider 
                data={dataLimitada}
                CardComponent={CardComponent as React.FC<{ item: any; }>} viewMoreLink={''} title={''}            />

            {/* Botão de Ver Mais (Renderizado abaixo) */}
            {showViewMoreButton && (
                <ViewMoreButton 
                    viewMoreLink={link} 
                    title={title.replace(' Recentes', '')} // Remove ' Recentes' do texto do botão
                />
            )}
        </section>
    );
};

export default ContentCarouselSection;