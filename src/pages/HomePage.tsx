// src/components/HomePage.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadSingleObjectData, loadArrayData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IConteudoPrincipal,  INoticia,  IPublicacao } from '../types';
import LoadingCircle from '../components/ui/LoadingDots';
import AboutSection from '../components/sobre/About';
import CardNoticia from '../components/CardNoticia';



const sobreImageUrl = 'https://ik.imagekit.io/8h7kfljfc/heiwa/c25ac816-83d8-45e8-a7ef-f30c7563d9f9.png?updatedAt=1755710018334';

const HomePage: React.FC = () => {
  const [conteudoPrincipal, setConteudoPrincipal] = useState<IConteudoPrincipal | null>(null);
  const [noticias, setNoticias] = useState<INoticia[]>([]);
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
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
        const noticiasRaw = await loadArrayData<INoticia>(dataUrls.noticias);
        if (noticiasRaw) {
          const noticiasOrdenadas = noticiasRaw.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
          setNoticias(noticiasOrdenadas);
        }
        const publicacoesRaw = await loadArrayData<IPublicacao>(dataUrls.publicacoes);
        if (publicacoesRaw) {
          const publicacoesOrdenadas = publicacoesRaw.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
          setPublicacoes(publicacoesOrdenadas);
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
    return <LoadingCircle />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }
  
  if (!conteudoPrincipal) {
    return <div className="text-center py-8 text-gray-500">Conteúdo principal do projeto não encontrado.</div>;
  }
  
 
  const CardPublicacao: React.FC<{ item: IPublicacao }> = ({ item }) => (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.titulo}</h3>
      <p className="text-gray-600 text-sm mb-4">{item.resumo}</p>
      <div className="text-gray-500 text-xs mt-2">
        <span>{item.autores}</span> • <span>{item.data}</span>
      </div>
    </a>
  );
  
  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl rounded-b-xl">
      <motion.section
        className="rounded-b-xl relative h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url('/path-to-your-hero-image.jpg')` }}
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black opacity-80 rounded-b-xl">
          <img src="https://ik.imagekit.io/8h7kfljfc/heiwa/ChatGPT%20Image%20Aug%2020,%202025,%2009_28_54%20AM.png?updatedAt=1755692991313" alt="Hero Background" className="w-full h-full object-cover opacity-50 rounded-b-xl" />
        </div>
        <div className="relative z-10 p-6 sm:p-12 rounded-xl">
          <motion.h1 
            className="text-4xl sm:text-6xl font-extrabold mb-4" 
            variants={heroItemVariants}
          >
            Visualize argumentos, compreenda discussões.
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-2xl font-light mb-8" 
            variants={heroItemVariants}
          >
            Uma plataforma para mineração e visualização de argumentos em discussões em redes sociais.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            variants={heroItemVariants}
          >
                     
            <a href="/visualizacoes" className="bg-green-800 text-white border-2 border-white hover:bg-primarygreen   font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
             Resultados
            </a>
            <a href="/resultados" className="bg-gray-100  border-2 border-green-500 hover:bg-primarygreen hover:text-white text-greenbackground font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
             Eixos
            </a>             
             <a href="/publicacoes" className="bg-green-800 text-white border-2 border-white hover:bg-primarygreen   font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
             Publicações
            </a>
            <a href="/membros" className="bg-white  border-2 border-green-500 hover:bg-primarygreen hover:text-primarygreen text-greenbackground font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Membros
            </a> 
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Seção Sobre o Projeto */}
      <motion.div 
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center text-gray-800 mb-12 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
        </motion.h2>
        <AboutSection />
        <img src={sobreImageUrl} alt="Sobre o Projeto HEIWA" className="h-50 w-auto object-contain mx-auto mb-8  rounded-b-xl"></img>
         </motion.div>
      

      {/* 3. Seção de Publicações */}
      {publicacoes.length > 0 && (
        <section className="py-16 p-16 bg-green-50 rounded-xl">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Publicações Recentes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicacoes.map(publicacao => (
              <CardPublicacao key={publicacao.id} item={publicacao} />
            ))}
          </div>
        </section>
      )}
      {/* 4. Seção de Notícias */}
      {noticias.length > 0 && (
        <section className="py-16  ">
          <motion.h2 
            className=" text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Últimas Notícias
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map(noticia => (
              <CardNoticia key={noticia.id} item={noticia} />
            ))}
          </div>
        </section>
      )}    
    </div>
  );
};

export default HomePage;