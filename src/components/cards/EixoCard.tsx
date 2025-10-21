
import { motion } from 'framer-motion';
import type { IConteudoEixo } from '../../types';


export const EixoCard: React.FC<{ item: IConteudoEixo }> = ({ item }) => {
  return (
    <motion.div
      className="
        bg-white 
        rounded-xl 
        shadow-lg 
        overflow-hidden /* Garante que a imagem arredondada fique dentro do card */
        flex flex-col 
        h-full 
        transform transition duration-400 hover:scale-[1.02] hover:shadow-2xl
        border-t-4 border-green-500 /* Borda de destaque */
      "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* 1. Imagem no Topo (Mínimo e Máximo ajustado) */}
      <div className="w-full h-48 md:h-56">
        <img 
          src={item.imagemUrl} 
          alt={item.titulo} 
          className="
            w-full 
            h-full 
            object-cover /* Preenche o espaço, corta se necessário (uniformidade) */
          " 
        />
      </div>

      {/* 2. Conteúdo e Botão */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-snug line-clamp-2">
          {item.titulo}
        </h3>
        
        {/* 3. Descrição (Permite que o card cresça para acomodar o texto) */}
        <p className="text-gray-700 text-base mb-6 flex-grow line-clamp-4">
          {item.descricao}
        </p>
        
        {/* 4. Botão de Ação (Alinhado à base) */}
        <div className="mt-auto">
            <a 
                href={item.acaoUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="
                    inline-block w-full text-center
                    bg-green-600 text-white font-bold 
                    py-3 px-8 rounded-full shadow-md 
                    transition duration-300 hover:bg-green-700
                "
            >
                {/* Aqui você pode usar um texto mais dinâmico se tiver nos dados, mas 'Abrir' funciona */}
                Abrir
            </a>
        </div>
      </div>
    </motion.div>
  );
};