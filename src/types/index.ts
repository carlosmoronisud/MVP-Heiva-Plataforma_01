
export interface IVisualizacao {
  id: string; // Exemplo: Coluna 'ID' na planilha
  titulo: string; // Coluna 'Titulo'
  descricao: string; // Coluna 'Descricao'
  url: string; // Coluna 'URL' (link para a visualização externa)
  imagemUrl?: string; // Coluna 'ImagemURL' (opcional, para um ícone/imagem do card)
  // Outras propriedades relevantes para suas visualizações
}

export interface IPublicacao {
  id: string;
  titulo: string;
  autores: string; // Ex: 'Autor 1, Autor 2'
  data: string; // Ex: 'AAAA-MM-DD'
  resumo: string;
  url: string; // Link para a publicação externa
  // Outras propriedades relevantes para suas publicações
}

export interface ISobreProjeto {
  length: number;
  titulo: string;
  conteudo: string; // Pode ser um texto longo com Markdown ou HTML
  // Exemplo: para cards de membros/fases, você pode ter um array aqui
  // membros?: IMembro[];
}

// Nova interface para o conteúdo principal da página Sobre (lida da aba 'sobre')
export interface IConteudoPrincipal {
  id: string; // ID gerado pelo script para essa única entrada
  titulo: string;
  conteudo: string;
  localizacaoTexto: string; // Ex: "Campinas, SP - Brasil"
  localizacaoUrl: string;   // Ex: link do Google Maps
}

// Interface para Membros (Líderes, Atuais, Anteriores) - lida da aba 'Membros'
export interface IPessoaCard {
  id: string; // Gerado pelo script
  nome: string;
  funcao?: string;
  fotoUrl?: string;
  linkContato1?: string; // Link para LinkedIn, por exemplo
  linkContato2?: string; // Link para Lattes/GitHub, por exemplo
  tipo: 'membroatual' | 'membroanterior'; // Tipos padronizados em minúsculas
}

// Interface para Financiadores - lida da aba 'Financiadores'
export interface IEntidadeCard {
  id: string; // Gerado pelo script
  nome: string;
  logoUrl?: string;
  compact?: boolean; 
  // Não tem 'tipo' aqui porque já sabemos que é financiador pela aba de origem
}

// Interface principal para o estado da página 'Sobre'
export interface ISobreProjetoPageData {
  conteudoPrincipal: IConteudoPrincipal | null;
  membrosAtuais: IPessoaCard[];
  membrosAnteriores: IPessoaCard[];
  financiadores: IEntidadeCard[];
}

export interface INoticia {
  id: string;
  titulo: string;
  resumo: string;
  data: string;
  linkUrl: string;
  imagemUrl?: string; 
}


export interface IConteudoEixo {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  acaoUrl: string;
}

// Exemplo se você tiver cards de membros
// export interface IMembro {
//   nome: string;
//   funcao: string;
//   fotoUrl?: string;
// }