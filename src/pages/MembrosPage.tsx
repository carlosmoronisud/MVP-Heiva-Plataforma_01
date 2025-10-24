// src/pages/MembrosPage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { loadArrayData } from '../services/dataLoader'; 
import { dataUrls } from '../config/dataUrls';
import type { IPessoaCard } from '../types'; 
import LoadingCircle from '../components/ui/LoadingDots';
import Seo from '../components/Seo';
// Importamos o ReloadButton
import ReloadButton from '../components/ui/ReloadButton'; 
// Assumindo que você usa o mesmo componente CardInfo ou o extrai para um arquivo
// import CardInfo from '../components/cards/CardInfo'; 


const MembrosPage: React.FC = () => {
    // O estado foca apenas nos membros
    const [membrosAtuais, setMembrosAtuais] = useState<IPessoaCard[]>([]);
    const [membrosAnteriores, setMembrosAnteriores] = useState<IPessoaCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Função centralizada de busca (AGORA ACEITA forceRefresh)
    const fetchMembrosData = useCallback(async (forceRefresh: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            // PASSA O PARÂMETRO 'forceRefresh' para o serviço
            const membrosRaw = await loadArrayData<IPessoaCard>(dataUrls.sobreProjetoMembros, forceRefresh);
            
            if (membrosRaw && membrosRaw.length > 0) {
                // CORREÇÃO: Usar os tipos literais da interface IPessoaCard
                // Se sua planilha usa 'novo' e 'antigo', use-os.
                // Se usa 'membroatual' e 'membroanterior', ajuste aqui.
                const atuais = membrosRaw.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'novo');
                const anteriores = membrosRaw.filter((m: IPessoaCard) => m.tipo?.toLowerCase() === 'antigo');
                
                setMembrosAtuais(atuais);
                setMembrosAnteriores(anteriores);
            } else {
                setMembrosAtuais([]);
                setMembrosAnteriores([]);
            }

        } catch (err) {
            setError('Ocorreu um erro ao carregar os dados dos membros: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setLoading(false);
        }
    }, [/* Nenhuma dependência externa, garantindo a estabilidade do useCallback */]);

    // 2. Efeito inicial: Chama sem argumentos (usa cache por padrão)
    useEffect(() => {
        fetchMembrosData();
    }, [fetchMembrosData]);

    // 3. Handler para o Botão
    const handleReload = () => {
        // QUANDO CLICADO, CHAMA O FETCH PASSANDO TRUE para ignorar o cache local
        fetchMembrosData(true); 
    };


    // --- Componente de Card Reutilizável para Pessoas (Mantido como subcomponente) ---
    const CardInfo: React.FC<{ item: IPessoaCard }> = ({ item }) => {
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
                {/* NOTA: Remova o <Seo> daqui, ele estava incorreto em um Card */}
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


    // --- Renderização Principal ---
    if (loading) {
        return <LoadingCircle />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 max-w-6xl py-8 text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Erro de Carregamento</h1>
                <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
                {/* Botão no estado de erro */}
                <ReloadButton onClick={handleReload} loading={loading} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* 4. SEO no Componente Raiz */}
            <Seo
                title="Membros do Projeto | Hub de Pesquisa Científica"
                description="Conheça os membros atuais e anteriores do projeto de pesquisa, suas funções e links de contato."
            />

            {/* Cabeçalho com Botão de Recarga */}
            <header className="flex justify-between items-center mb-12 border-b pb-4">
                <h1 className="text-4xl font-extrabold text-gray-900">Nossa Equipe</h1>
                {/* Botão no cabeçalho principal */}
                <ReloadButton onClick={handleReload} loading={loading} />
            </header>

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