// Interface para Visualizações
export interface IVisualizacao {
  id: string; 
  titulo: string; 
  descricao: string; 
  url: string; 
  imagemUrl?: string; 
  
}
// Interface para Publicações
export interface IPublicacao {
  id: string;
  titulo: string;
  autores: string; 
  data: number; 
  resumo: string;
  url: string; 
}
// Interface para o conteúdo da página Sobre o Projeto (geral)
export interface ISobreProjeto {
  length: number;
  titulo: string;
  descricao: string;
  conteudo: string;
}

// Interface para o conteúdo principal da página Sobre (lida da aba 'sobre')
export interface IConteudoPrincipal {
  id: string; 
  titulo: string;
  conteudo: string;
  resultados: string;
  localizacaoTexto: string; 
  localizacaoUrl: string;
  video?: string;
}

// Interface para Membros (Líderes, Atuais, Anteriores) - lida da aba 'Membros'
export interface IPessoaCard {
  id: string; 
  nome: string;
  funcao?: string;
  fotoUrl?: string;
  linkContato1?: string; 
  linkContato2?: string;
  tipo: 'membroatual' | 'membroanterior'; 
}

// Interface para Financiadores - lida da aba 'Financiadores'
export interface IEntidadeCard {
  id: string; 
  nome: string;
  logoUrl?: string;
  compact?: boolean; 
  
}

// Interface principal para o estado da página 'Sobre'
export interface ISobreProjetoPageData {
  conteudoPrincipal: IConteudoPrincipal | null;
  membrosAtuais: IPessoaCard[];
  membrosAnteriores: IPessoaCard[];
  financiadores: IEntidadeCard[];
}
// Interface para Notícias
export interface INoticia {
  id: string;
  titulo: string;
  resumo: string;
  data: number;
  linkUrl: string;
  imagemUrl?: string; 
}

// Interface para Conteúdo dos Eixos
export interface IConteudoEixo {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  acaoUrl: string;
}

