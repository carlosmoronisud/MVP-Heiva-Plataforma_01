import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadSingleObjectData } from '../../services/dataLoader';
import { dataUrls } from '../../config/dataUrls';
import type { IConteudoPrincipal } from '../../types';

// URL da imagem que será usada como plano de fundo


const AboutSection: React.FC = () => {
  // O estado e o useEffect precisam estar dentro do componente
  const [conteudoPrincipal, setConteudoPrincipal] = useState<IConteudoPrincipal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const principalData = await loadSingleObjectData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
        if (principalData) {
          setConteudoPrincipal(principalData);
        }
      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-white">Carregando informações...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  // Renderiza uma mensagem caso os dados não sejam encontrados
  if (!conteudoPrincipal) {
    return <div className="text-center py-8 text-white">Conteúdo sobre o projeto não encontrado.</div>;
  }
  
  return (
    <section 
      id="sobre"
      className="bg-greenbackground relative py-16 md:py-24 rounded-t-xl"
      
    >
       
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {conteudoPrincipal.titulo || 'Sobre o Projeto'}
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Acessa a propriedade 'conteudo' do objeto */}
          {conteudoPrincipal.conteudo}
        </motion.p>
        
        {conteudoPrincipal.localizacaoTexto && conteudoPrincipal.localizacaoUrl && (
          <motion.p 
            className="text-md mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            Localização: {' '}
            <a
              href={conteudoPrincipal.localizacaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition duration-300"
            >
              {conteudoPrincipal.localizacaoTexto}
            </a>
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default AboutSection;