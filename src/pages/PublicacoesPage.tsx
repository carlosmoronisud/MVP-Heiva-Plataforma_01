// src/pages/PublicacoesPage.tsx
import React, { useEffect, useState } from 'react';
import { loadArrayData } from '../services/dataLoader'; // MUDANÇA AQUI: import loadArrayData
import { dataUrls } from '../config/dataUrls';
import type { IPublicacao } from '../types';

const PublicacoesPage: React.FC = () => {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicacoes = async () => {
      setLoading(true);
      setError(null);
      // MUDANÇA AQUI: Use loadArrayData
      const data = await loadArrayData<IPublicacao>(dataUrls.publicacoes);
      if (data) { // 'data' agora é garantido como IPublicacao[] | null
        setPublicacoes(data);
      } else {
        setError('Não foi possível carregar as publicações. Verifique a URL ou o formato dos dados.');
      }
      setLoading(false);
    };

    fetchPublicacoes();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-700">Carregando publicações...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Nossas Publicações</h1>
      <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Artigos, relatórios e outros materiais de pesquisa que complementam nossas visualizações.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publicacoes.map((pub) => (
          <div key={pub.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{pub.titulo}</h3>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Autores:</span> {pub.autores}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              {/* Confirme se esta lógica de data está no seu arquivo */}
              <span className="font-medium">Data:</span> {pub.data ? new Date(pub.data.split('/').reverse().join('-')).toLocaleDateString('pt-BR') : 'Data não disponível'}
            </p>
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{pub.resumo}</p>
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Acessar Publicação
            </a>
          </div>
        ))}
        {publicacoes.length === 0 && !loading && !error && (
            <p className="col-span-full text-center text-gray-500">Nenhuma publicação encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default PublicacoesPage;