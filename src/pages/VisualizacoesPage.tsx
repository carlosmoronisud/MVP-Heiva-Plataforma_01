// src/pages/VisualizacoesPage.tsx
import React, { useEffect, useState } from 'react';
import { loadData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IVisualizacao } from '../types';
import CardVisualizacao from '../components/CardVisualizacao';

const VisualizacoesPage: React.FC = () => {
  const [visualizacoes, setVisualizacoes] = useState<IVisualizacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisualizacoes = async () => {
      setLoading(true);
      setError(null);
      const data = await loadData<IVisualizacao[]>(dataUrls.visualizacoes);
      if (data) {
        setVisualizacoes(data);
      } else {
        setError('Não foi possível carregar as visualizações. Verifique a URL ou o formato dos dados.');
      }
      setLoading(false);
    };

    fetchVisualizacoes();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-700">Carregando visualizações...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Seja bem vindo a Heiwa-Viz</h1>
      <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore nossas visualizações interativas sobre diversos debates e temas relevantes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visualizacoes.map((viz) => (
          <CardVisualizacao key={viz.id} visualizacao={viz} />
        ))}
        {visualizacoes.length === 0 && !loading && !error && (
            <p className="col-span-full text-center text-gray-500">Nenhuma visualização encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default VisualizacoesPage;