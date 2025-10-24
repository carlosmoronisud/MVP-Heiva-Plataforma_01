
import { motion } from 'framer-motion';
import type { IPublicacao } from '../../types'; 

interface CardPublicacaoProps {
  item: IPublicacao;
}

const CardPublicacao: React.FC<CardPublicacaoProps> = ({ item }) => {
  
  let dataFormatada = 'Data não disponível';
  
  // LÓGICA DE TRATAMENTO OBRIGATÓRIA: Trata o NUMBER (timestamp)
  if (typeof item.data === 'number' && item.data > 0) {
    // Cria um objeto Date a partir do timestamp e formata
    dataFormatada = new Date(item.data).toLocaleDateString('pt-BR');
  } 
  // Nota: A lógica de string DD/MM/AAAA foi removida para focar no novo formato

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.titulo}</h3>
        
        {/* Metadados */}
        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <p>
            <span className="font-medium text-gray-700">Autores:</span> {item.autores}
          </p>
          <p>
            <span className="font-medium text-gray-700">Data:</span> {dataFormatada}
          </p>
        </div>
        
        {/* Resumo */}
        <p className="text-gray-700 text-sm mb-6 flex-grow line-clamp-3">{item.resumo}</p>
        
        {/* Link de Acesso */}
        <div className="mt-auto"> {/* Garante que o botão fique na parte inferior do card */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-[1.02]"
          >
            Acessar Publicação
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CardPublicacao;