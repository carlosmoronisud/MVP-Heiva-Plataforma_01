
import React, { useEffect, useState } from 'react';
import { loadArrayData } from '../services/dataLoader'; 
import { dataUrls } from '../config/dataUrls';
import type { IPessoaCard } from '../types'; 
import LoadingCircle from '../components/ui/LoadingDots';


const MembrosPage: React.FC = () => {
  // O estado foca apenas nos membros
  const [membrosAtuais, setMembrosAtuais] = useState<IPessoaCard[]>([]);
  const [membrosAnteriores, setMembrosAnteriores] = useState<IPessoaCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembrosData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Carregar Membros (da aba 'membros')
        const membrosRaw = await loadArrayData<IPessoaCard>(dataUrls.sobreProjetoMembros);
        if (membrosRaw) {
          const atuais = membrosRaw.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'novo');
          const anteriores = membrosRaw.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'antigo');
          setMembrosAtuais(atuais);
          setMembrosAnteriores(anteriores);
        } else {
          setError('Não foi possível carregar os membros da equipe.');
        }

      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados dos membros: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchMembrosData();
  }, []);

  if (loading) {
    return <LoadingCircle />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  // --- Componente de Card Reutilizável para Pessoas ---
  
  const CardInfo: React.FC<{ item: IPessoaCard }> = ({ item }) => { // Tipo é apenas IPessoaCard
    const getLinkText = (url: string): string => {
      if (!url) return '';
      url = url.toLowerCase();

      if (url.includes('linkedin.com')) { return 'LinkedIn'; }
      if (url.includes('lattes.cnpq.br')) { return 'Lattes'; }
      if (url.includes('github.com')) { return 'GitHub'; }
      if (url.includes('twitter.com') || url.includes('x.com')) { return 'Twitter/X'; }
      return 'Website';
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
        {item.fotoUrl && (
          <img
            src={item.fotoUrl}
            alt={item.nome}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-500"
          />
        )}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.nome}</h3>
        {item.funcao && (
          <p className="text-gray-600 text-sm">{ item.funcao }</p>
        )}
        {(item.linkContato1 || item.linkContato2) && (
          <div className="flex justify-center space-x-4 mt-3">
            {item.linkContato1 && (
              <a
                href={item.linkContato1}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm"
              >
                {getLinkText(item.linkContato1)}
              </a>
            )}
            {item.linkContato2 && (
              <a
                href={item.linkContato2}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm"
              >
                {getLinkText(item.linkContato2)}
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Seção de Membros Atuais */}
      {membrosAtuais.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Membros Atuais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {membrosAtuais.map(membro => (
              <CardInfo key={membro.id} item={membro} />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Membros Anteriores */}
      {membrosAnteriores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Membros Anteriores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {membrosAnteriores.map(membro => (
              <CardInfo key={membro.id} item={membro} />
            ))}
          </div>
        </section>
      )}

      {membrosAtuais.length === 0 && membrosAnteriores.length === 0 && !loading && !error && (
        <p className="col-span-full text-center text-gray-500">Nenhum membro encontrado.</p>
      )}
    </div>
  );
};

export default MembrosPage;