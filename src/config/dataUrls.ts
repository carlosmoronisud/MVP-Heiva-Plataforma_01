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
const PUBLICACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLnHIm3yDNC87EhyzvQtm6vDIZk4E5HaaQrehc6gZwswCY_i19thxF3rdh75Rju1Pd/exec';
const EIXOS_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec';
const SOBRE_PROJETO_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbwSu37mF-TDdiEij6C03E0k5nkCb4mrPF3aZngy4nvJoeSA56PU8SoUYQMAnVxd4olMKQ/exec';
const NOTICIAS_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzmPM8Gs8Y6D7wUMgSe18LUOgSwR-370UqGD_me_tpUFdn_hC3vpKRfHMIYXzV8RvaRUw/exec';

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




