
import React, { useEffect, useState } from 'react';
import { loadSingleObjectData, loadArrayData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IConteudoPrincipal, IEntidadeCard } from '../types';


const HomePage: React.FC = () => {
  const [conteudoPrincipal, setConteudoPrincipal] = useState<IConteudoPrincipal | null>(null);
  const [financiadores, setFinanciadores] = useState<IEntidadeCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Carregar Conteúdo Principal e Localização (da aba 'sobre')
        const principalData = await loadSingleObjectData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
        if (principalData) {
          setConteudoPrincipal(principalData);
        } else {
          setError('Não foi possível carregar o conteúdo principal do projeto.');
        }

        // Carregar Financiadores (da aba 'financiadores')
        const financiadoresRaw = await loadArrayData<IEntidadeCard>(dataUrls.sobreProjetoFinanciadores);
        if (financiadoresRaw) {
          setFinanciadores(financiadoresRaw);
        } else {
          setError(prev => prev ? prev + ' E financiadores.' : 'Não foi possível carregar os financiadores do projeto.');
        }

      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados da página inicial: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-700">Carregando informações...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  // Se não houver dados principais, mostra uma mensagem de "não encontrado"
  if (!conteudoPrincipal) {
    return <div className="text-center py-8 text-gray-500">Conteúdo principal do projeto não encontrado.</div>;
  }

  // --- Componente de Card Reutilizável para Entidades (Financiadores) ---
  // Cria um CardEntidade simples aqui que pode ser copiado ou reutilizar o CardInfo
  const CardEntidade: React.FC<{ item: IEntidadeCard }> = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
      {item.logoUrl && (
        <img
          src={item.logoUrl}
          alt={item.nome}
          className="w-32 h-auto mx-auto mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.nome}</h3>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Seção de Conteúdo Principal (Título, Descrição e Localização) */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{conteudoPrincipal.titulo || 'Sobre o Projeto'}</h1>
      <p className="text-lg text-center text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
        {conteudoPrincipal.conteudo}
      </p>
      {conteudoPrincipal.localizacaoTexto && conteudoPrincipal.localizacaoUrl && (
        <p className="text-md text-center text-gray-700 mb-12">
          Localização: {' '}
          <a
            href={conteudoPrincipal.localizacaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition duration-300"
          >
            {conteudoPrincipal.localizacaoTexto}
          </a>
        </p>
      )}

      {/* Seção de Financiadores */}
      {financiadores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Financiadores e Parceiros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {financiadores.map(financiador => (
              <CardEntidade key={financiador.id} item={financiador} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;