// src/pages/SobreProjetoPage.tsx
import React, { useEffect, useState } from 'react';
import { loadData } from '../services/dataLoader';
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
        // 1. Carregar Conteúdo Principal e Localização (da aba 'sobre1')
        // loadData retorna T[] | null. Para 'sobre1', o script deve retornar um ÚNICO OBJETO,
        // então precisamos que loadData seja capaz de retornar T | null para este caso específico.
        // Ou, se loadData SEMPRE retorna T[], então esperamos um array com 1 elemento.
        // Vamos ajustar loadData para o caso geral de array, e pegar o [0] aqui.
        const principalDataArray = await loadData<IConteudoPrincipal>(dataUrls.sobreProjetoPrincipal);
        if (Array.isArray(principalDataArray) && principalDataArray.length > 0) {
            setPageData(prev => ({ ...prev, conteudoPrincipal: principalDataArray[0] }));
        } else {
            setError('Não foi possível carregar o conteúdo principal do projeto. Planilha vazia ou URL incorreta.');
        }


        // 2. Carregar Membros (da aba 'Membros')
        // Membros rawDataArray será IPessoaCard[] | null
        const membrosRaw = await loadData<IPessoaCard>(dataUrls.sobreProjetoMembros);
        if (membrosRaw) { // Verifica se membrosRaw NÃO é null
          const membrosArray = Array.isArray(membrosRaw) ? membrosRaw : [membrosRaw];
          const atuais = membrosArray.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'membroatual'); // Tipagem explícita para 'm'
          const anteriores = membrosArray.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'membroanterior'); // Tipagem explícita para 'm'
          setPageData(prev => ({ ...prev, membrosAtuais: atuais, membrosAnteriores: anteriores }));
        } else {
          setError(prev => prev ? prev + ' E membros.' : 'Não foi possível carregar os membros do projeto.');
        }

        // 3. Carregar Financiadores (da aba 'Financiadores')
        // financiadoresRaw será IEntidadeCard[] | null
        const financiadoresRaw = await loadData<IEntidadeCard>(dataUrls.sobreProjetoFinanciadores);
        if (financiadoresRaw) { // Verifica se financiadoresRaw NÃO é null
          const financiadoresArray = Array.isArray(financiadoresRaw) ? financiadoresRaw : [financiadoresRaw];
          setPageData(prev => ({ ...prev, financiadores: financiadoresArray }));
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

  // --- Componente de Card Reutilizável ---
  const CardInfo: React.FC<{ item: IPessoaCard | IEntidadeCard }> = ({ item }) => {
    const isPessoa = Object.prototype.hasOwnProperty.call(item, 'funcao');
    const isEntidade = Object.prototype.hasOwnProperty.call(item, 'logoUrl');

    // Função auxiliar para determinar o texto do link com base na URL
    const getLinkText = (url: string): string => {
      if (!url) return '';
      url = url.toLowerCase(); // Converte para minúsculas para facilitar a comparação

      if (url.includes('linkedin.com')) {
        return 'LinkedIn';
      }
      if (url.includes('lattes.cnpq.br')) {
        return 'Lattes';
      }
      if (url.includes('github.com')) {
        return 'GitHub';
      }
      if (url.includes('twitter.com') || url.includes('x.com')) {
        return 'Twitter/X';
      }
      // Adicione mais verificações para outras plataformas se necessário
      return 'Website'; // Padrão se não for reconhecido
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
        {/* Imagem/Logo */}
        {isPessoa && (item as IPessoaCard).fotoUrl ? (
          <img
            src={(item as IPessoaCard).fotoUrl}
            alt={(item as IPessoaCard).nome}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-500"
          />
        ) : isEntidade && (item as IEntidadeCard).logoUrl ? (
          <img
            src={(item as IEntidadeCard).logoUrl}
            alt={(item as IEntidadeCard).nome}
            className="w-32 h-auto mx-auto mb-4"
          />
        ) : null}

        {/* Nome */}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.nome}</h3>

        {/* Função (apenas para pessoas) */}
        {isPessoa && (item as IPessoaCard).funcao && (
          <p className="text-gray-600 text-sm">{ (item as IPessoaCard).funcao }</p>
        )}

        {/* Links de Contato (apenas para pessoas) */}
        {isPessoa && ((item as IPessoaCard).linkContato1 || (item as IPessoaCard).linkContato2) && (
          <div className="flex justify-center space-x-4 mt-3">
            {(item as IPessoaCard).linkContato1 && (
              <a
                href={(item as IPessoaCard).linkContato1}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm"
              >
                {/* >>>>>>>>> MUDANÇA AQUI <<<<<<<<< */}
                {getLinkText((item as IPessoaCard).linkContato1 as string)}
              </a>
            )}
            {(item as IPessoaCard).linkContato2 && (
              <a
                href={(item as IPessoaCard).linkContato2}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm"
              >
                {/* >>>>>>>>> MUDANÇA AQUI <<<<<<<<< */}
                {getLinkText((item as IPessoaCard).linkContato2 as string)}
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Seção de Conteúdo Principal (Título, Descrição e Localização) */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{pageData.conteudoPrincipal.titulo || 'Sobre o Projeto'}</h1>
      <p className="text-lg text-center text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
        {pageData.conteudoPrincipal.conteudo}
      </p>
      {pageData.conteudoPrincipal.localizacaoTexto && pageData.conteudoPrincipal.localizacaoUrl && (
        <p className="text-md text-center text-gray-700 mb-12">
          Localização: {' '}
          <a
            href={pageData.conteudoPrincipal.localizacaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition duration-300"
          >
            {pageData.conteudoPrincipal.localizacaoTexto}
          </a>
        </p>
      )}

      {/* Seção de Membros Atuais */}
      {pageData.membrosAtuais.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Membros Atuais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.membrosAtuais.map(membro => (
              <CardInfo key={membro.id} item={membro} />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Membros Anteriores */}
      {pageData.membrosAnteriores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Membros Anteriores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.membrosAnteriores.map(membro => (
              <CardInfo key={membro.id} item={membro} />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Financiadores */}
      {pageData.financiadores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Financiadores e Parceiros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.financiadores.map(financiador => (
              <CardInfo key={financiador.id} item={financiador} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SobreProjetoPage;