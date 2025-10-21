// src/components/ui/CarouselSlider.tsx
import React, { useState, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Número de itens visíveis por vez
const VISIBLE_ITEMS = 3;
const SLIDE_STEP = 1; // Quantos itens avançam por clique

interface CarouselSliderProps<T> {
  data: T[]; // Array completo de dados (Notícia ou Publicação)
  CardComponent: React.FC<{ item: T }>; // Componente de Card para renderizar
  viewMoreLink: string; // URL para a página completa (ex: '/noticias')
  title: string; // Título da seção (ex: 'Notícias')
  cardProps?: object; // Propriedades adicionais para o CardComponent
}

const CarouselSlider = <T extends { id: string } | { id: number }>({
  data,
  CardComponent,
  cardProps = {},
}: CarouselSliderProps<T>) => {
  
  // Exibimos apenas os 6 primeiros itens + o botão 'Ver Mais'
  const itemsToShow = data.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcula o número máximo de slides que o usuário pode avançar
  // O número máximo de slides é ajustado para que o último slide exiba os últimos cards.
  const maxSlideIndex = Math.max(0, itemsToShow.length - VISIBLE_ITEMS);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + SLIDE_STEP, maxSlideIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - SLIDE_STEP, 0));
  };

  // Calcula o deslocamento horizontal do carrossel em porcentagem.
  // Move 1/3 do carrossel (que mostra 3 itens) por clique (se SLIDE_STEP for 1)
  const translateX = useMemo(() => {
    // 100% / 3 itens visíveis = ~33.33% por item
    const itemWidth = 100 / VISIBLE_ITEMS;
    return -currentIndex * itemWidth;
  }, [currentIndex]);
  

  return (
    <div className="relative overflow-hidden">
      
      {/* Container dos Cards */}
      <div className="flex transition-transform duration-500 ease-in-out" 
           style={{ transform: `translateX(${translateX}%)` }}>
        
        {/* Renderiza os Cards */}
        {itemsToShow.map((item, index) => (
          <div key={item.id || index} className="flex-shrink-0 w-full md:w-1/3 p-4">
            <CardComponent item={item} {...cardProps} />
          </div>
        ))}        
      </div>
      
      {/* Botões de Navegação */}
      {itemsToShow.length > VISIBLE_ITEMS && (
        <>
          {/* Botão Anterior */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`
              absolute left-0 top-1/2 transform -translate-y-1/2 
              p-3 rounded-full bg-white shadow-xl z-10 
              transition duration-300 
              ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
            style={{ marginLeft: '-1rem' }} // Desloca para a borda
          >
            <FaArrowLeft />
          </button>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxSlideIndex}
            className={`
              absolute right-0 top-1/2 transform -translate-y-1/2 
              p-3 rounded-full bg-white shadow-xl z-10 
              transition duration-300 
              ${currentIndex >= maxSlideIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
            style={{ marginRight: '-1rem' }} 
          >
            <FaArrowRight />
          </button>
        </>  
      )}
    </div>
  );
};

export default CarouselSlider;