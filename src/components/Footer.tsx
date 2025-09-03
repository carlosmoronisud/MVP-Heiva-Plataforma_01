import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import type { IEntidadeCard } from '../types';
import { loadArrayData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls'; 
import CardEntidade from './CardEntidade'; 

const Footer: React.FC = () => {
  const [financiadores, setFinanciadores] = useState<IEntidadeCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const financiadoresRaw = await loadArrayData<IEntidadeCard>(dataUrls.sobreProjetoFinanciadores);
        if (financiadoresRaw) {
          setFinanciadores(financiadoresRaw);
        }
      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados dos parceiros.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-verdeFechado text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Coluna da Marca e Contato */}
          <div className="flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://ik.imagekit.io/8h7kfljfc/heiwa/CIBERDEM%201.png?updatedAt=1756774054692" 
                alt="Logo do Projeto Heiwa" 
                className="w-24 h-auto object-contain" 
              />
              <img 
                src="https://ik.imagekit.io/8h7kfljfc/heiwa/width_550.png?updatedAt=1755655163585" 
                alt="Logo do Projeto Heiwa" 
                className="w-56 h-auto object-contain" 
              />
            </Link>
            <p className="mt-4 text-sm max-w-xs">
              Uma plataforma para mineração e visualização de argumentos em discussões em redes sociais.
            </p>
            <div className="mt-4 flex flex-col space-y-2 text-sm">
              <a href="mailto:contato@heiwa.com" className="hover:text-white transition-colors duration-300 flex items-center">
                <FaEnvelope className="mr-2" size={14} /> contato@heiwa.com
              </a>
              <a href="https://github.com/seu-perfil-github" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center">
                <FaGithub className="mr-2" size={14} /> GitHub
              </a>
              <a href="https://ciberdem.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center">
                <FaGlobe className="mr-2" size={14} /> CIBERDEM
              </a>
            </div>
          </div>
          
          {/* Coluna de Navegação (Menu) */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-300">Notícias</Link>
              </li>
              <li>
                <Link to="/publicacoes" className="hover:text-white transition-colors duration-300">Publicações</Link>
              </li>
              <li>
                <Link to="/membros" className="hover:text-white transition-colors duration-300">Membros</Link>
              </li>
              <li>
                <Link to="/debates" className="hover:text-white transition-colors duration-300">Eixos</Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors duration-300">Sobre</Link>
              </li>
            </ul>
          </div>

          {/* Coluna "Onde Estamos" */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-4">Onde Estamos</h3>
            <p className="text-sm">
              Universidade Presbiteriana Mackenzie
            </p>
            <a 
              href="https://www.google.com/maps/place/Universidade+Presbiteriana+Mackenzie" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-verdeClaro hover:underline flex items-center mt-1"
            >
              <FaMapMarkerAlt className="mr-1" size={12} /> Ver no mapa
            </a>

            {/* Seção de Apoiadores */}
            <div className="mt-6">
              <h3 className="text-white font-semibold text-lg mb-4">Apoio e Parceiros</h3>
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : error ? (
                <p className="text-red-300 text-xs">{error}</p>
              ) : financiadores.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {financiadores.map((financiador) => (
                    <div key={financiador.id} className="bg-verdeMedio/20 rounded p-2 flex items-center justify-center hover:bg-verdeMedio/30 transition-colors duration-300">
                      <CardEntidade item={financiador} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-xs">Nenhum parceiro encontrado.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Direitos Autorais e Rodapé Inferior */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-xs">
          © {new Date().getFullYear()} Projeto Heiwa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;