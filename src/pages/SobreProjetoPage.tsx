// src/pages/SobreProjetoPage.tsx
import React, { useEffect, useState } from 'react';
// MUDANÇAS AQUI: Importar loadArrayData e loadSingleObjectData
import { loadArrayData, loadSingleObjectData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IConteudoPrincipal, IPessoaCard, IEntidadeCard, ISobreProjetoPageData } from '../types';

const SobreProjetoPage: React.FC = () => {
  const [pageData, setPageData] = useState<ISobreProjetoPageData>({
    conteudoPrincipal: null,
    membrosAtuais: [],
    membrosAnteriores: [],
    financiadores: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSobreProjetoData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Carregar Conteúdo Principal e Localização (da aba 'sobre')
        // MUDANÇA AQUI: Usar loadSingleObjectData
        const principalData = await loadSingleObjectData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
        if (principalData) {
            setPageData(prev => ({ ...prev, conteudoPrincipal: principalData }));
        } else {
            setError('Não foi possível carregar o conteúdo principal do projeto. Planilha vazia ou URL incorreta.');
        }

        // 2. Carregar Membros (da aba 'membros')
        // MUDANÇA AQUI: Usar loadArrayData
        const membrosRaw = await loadArrayData<IPessoaCard>(dataUrls.sobreProjetoMembros);
        if (membrosRaw) {
          // membrosRaw agora é garantido como IPessoaCard[] | null
          // Não precisamos mais do Array.isArray(membrosRaw) ? membrosRaw : [membrosRaw]
          const atuais = membrosRaw.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'novo');
          const anteriores = membrosRaw.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'antigo');
          setPageData(prev => ({ ...prev, membrosAtuais: atuais, membrosAnteriores: anteriores }));
        } else {
          setError(prev => prev ? prev + ' E membros.' : 'Não foi possível carregar os membros do projeto.');
        }

        // 3. Carregar Financiadores (da aba 'financiadores')
        // MUDANÇA AQUI: Usar loadArrayData
        const financiadoresRaw = await loadArrayData<IEntidadeCard>(dataUrls.sobreProjetoFinanciadores);
        if (financiadoresRaw) {
          // financiadoresRaw agora é garantido como IEntidadeCard[] | null
          // Não precisamos mais do Array.isArray(financiadoresRaw) ? financiadoresRaw : [financiadoresRaw]
          setPageData(prev => ({ ...prev, financiadores: financiadoresRaw }));
        } else {
          setError(prev => prev ? prev + ' E financiadores.' : 'Não foi possível carregar os financiadores do projeto.');
        }

      } catch (err) {
        setError('Ocorreu um erro ao carregar os dados da página Sobre: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchSobreProjetoData();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-700">Carregando informações do projeto...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!pageData.conteudoPrincipal) {
    return <div className="text-center py-8 text-gray-500">Conteúdo principal "Sobre o Projeto" não encontrado.</div>;
  }

  // ... (o componente CardInfo e o JSX de retorno permanecem os mesmos) ...

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* ... todo o JSX permanece o mesmo ... */}
    </div>
  );
};

export default SobreProjetoPage;