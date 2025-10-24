//Interface models
interface DataUrls {
  visualizacoes: string;
  publicacoes: string;
  sobreProjetoPrincipal: string; 
  sobreProjetoMembros: string;   
  sobreProjetoFinanciadores: string;
  noticias: string ;
  eixos: {
    curadoria: string;
    extracaoLimpeza: string;
    mineracaoArgumentos: string;
    visualizacaoDiscussoes: string;
    aspectosEticosLegais: string;
  }
}

// URLs das implementações das planilhas Visualizacoes, Noticias, SobreProjeto, Eixos e Publicacoes do Google Apps Script 
const VISUALIZACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxIM9Af0uEGJB_f5pjfcKcGRdx-DPGnInTn9Jw9wxG8E1x7VkDU1ZR4zjszfy8HVIlG-Q/exec';
const PUBLICACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzFNSByf02weXPlaHM1BVFUUEaPIef_6O-FVs37AoDy-ZPZZlR_4FBnqiLXliJ9cx-j/exec';
const EIXOS_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec';
const SOBRE_PROJETO_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbxZmTnFcFqgThBGwDpykGCuldEl7L4ltTdxtmyU9Ibcu1YPaDHF2jq4b3f5PoszZErlAQ/exec';
const NOTICIAS_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQedeLvrqAymrOnORWQjAqpONM5350FefGqoGPEkUu6_T6c37kCn4rSj7BEeoUnZ5qWw/exec';

// Exportando as URLs como um objeto do tipo DataUrls
export const dataUrls: DataUrls = {
  visualizacoes: VISUALIZACOES_FORM_APPS_SCRIPT_URL,
  publicacoes: PUBLICACOES_FORM_APPS_SCRIPT_URL,
  noticias: `${NOTICIAS_FORM_APPS_SCRIPT_URL}`,
  // URLs para a página "Sobre o Projeto", usando o parâmetro 'sheet'
  sobreProjetoPrincipal: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=sobre`,
  sobreProjetoMembros: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=membros`,
  sobreProjetoFinanciadores: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=financiadores`,
  
  // URLs para os eixos, usando o parâmetro 'sheet'
  eixos: {
    curadoria: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=curadoria`,
    extracaoLimpeza: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=extracao-limpeza`,
    mineracaoArgumentos: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=mineracao-argumentos`,
    visualizacaoDiscussoes: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=visualizacao-discussoes`,
    aspectosEticosLegais: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=aspectos-eticos-legais`
  }
};




