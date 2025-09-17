import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Dados dos eixos do projeto com imagens e links de placeholder
const eixosData = [
  {
    id: 1,
    title: 'Curadoria',
    subtitle: 'Identificação, seleção e organização de datasets de conteúdos de redes sociais.',
    imageUrl: 'https://ik.imagekit.io/8h7kfljfc/heiwa/%C3%8Dcone_de_Rede_Minimalista_Verde-removebg-preview.png?updatedAt=1756776632494',
    linkTo: '/eixos/curadoria'
  },
  {
    id: 2,
    title: 'Extração e Limpeza',
    subtitle: 'Ferramentas de extração e tratamento de dados de redes sociais.',
    imageUrl: 'https://ik.imagekit.io/8h7kfljfc/heiwa/Grade_de_Grade_Neon_Verde-removebg-preview.png?updatedAt=1756776632445',
    linkTo: '/eixos/extracaoLimpeza'
  },
  {
    id: 3,
    title: 'Mineração de Argumentos',
    subtitle: 'Modelos e ferramentas de mineração de argumentos em conteúdos de redes sociais.',
    imageUrl: 'https://ik.imagekit.io/8h7kfljfc/heiwa/Martelo%20e%20machado%20cruzados.png?updatedAt=1756776448938',
    linkTo: '/eixos/mineracaoArgumentos'
  },
  {
    id: 4,
    title: 'Visualização de Discussões',
    subtitle: 'Ferramentas de visualização de discussões em redes sociais.',
    imageUrl: 'https://ik.imagekit.io/8h7kfljfc/heiwa/ChatGPT%20Image%20Sep%201,%202025,%2010_26_51%20PM.png?updatedAt=1756776448920',
    linkTo: '/eixos/visualizacaoDiscussoes'
  },
  {
    id: 5,
    title: 'Aspectos Éticos e Legais',
    subtitle: 'Estudos de aspectos éticos e legais do uso de dados em redes sociais em pesquisas.',
    imageUrl: 'https://ik.imagekit.io/8h7kfljfc/heiwa/ChatGPT_Image_Sep_3__2025__05_27_33_PM-removebg-preview.png?updatedAt=1756931355047',
    linkTo: '/eixos/aspectosEticosLegais'
  },
];

const EixosPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Título da Página */}
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Eixos do Projeto
        </motion.h1>

        {/* Mapeamento dos Eixos com layout de grid */}
        {eixosData.map((eixo, index) => (
          <motion.div
            key={eixo.id}
            className="grid grid-cols-[1fr_min-content_1fr] gap-4 mb-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Bloco do Texto */}
            <div 
              className={`col-span-1 p-4
                
                  : 'col-start-3 text-left justify-self-start'
                }`}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {eixo.title}
              </h2>
              <p className="text-gray-600">
                {eixo.subtitle}
              </p>
            </div>
            
            {/* Ícone no Centro */}
            <Link to={eixo.linkTo} className="col-start-2">
              <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                <img
                  src={eixo.imageUrl}
                  alt={eixo.title}
                  className="w-full h-full object-cover bg-white p-1 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </Link>
          </motion.div>
        ))}

        {/* CTA "Resultados" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Link
            to="/resultados"
            className="inline-block bg-primarygreen text-white font-bold py-4 px-24 text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Resultados
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default EixosPage;