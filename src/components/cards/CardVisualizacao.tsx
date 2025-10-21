import { motion } from 'framer-motion';
import type { IVisualizacao } from '../../types';

interface CardVisualizacaoProps {
  visualizacao: IVisualizacao;
}



const CardVisualizacao: React.FC<CardVisualizacaoProps> = ({ visualizacao }) => {
  return (
    <motion.div
      className="
        bg-white 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        flex flex-col 
        h-full 
        transform transition duration-400 hover:scale-[1.02] hover:shadow-2xl
        border-t-4 border-green-500 /* Borda de destaque padronizada */
      "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Imagem (Uniforme) */}
      {visualizacao.imagemUrl && (
        <div className="w-full h-48 md:h-56">
          <img
            src={visualizacao.imagemUrl}
            alt={visualizacao.titulo}
            className="w-full h-full object-cover" /* object-cover para uniformidade */
          />
        </div>
      )}
      
      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-snug line-clamp-2">
          {visualizacao.titulo}
        </h3>
        
        <p className="text-gray-700 text-base mb-6 flex-grow line-clamp-4">
          {visualizacao.descricao}
        </p>
        
        {/* Botão de Ação (Alinhado à base e cor padronizada) */}
        <div className="mt-auto">
          <a
            href={visualizacao.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block w-full text-center
              bg-green-600 text-white font-bold 
              py-3 px-8 rounded-full shadow-md 
              transition duration-300 hover:bg-green-700
            "
          >
            Acessar Visualização
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CardVisualizacao;