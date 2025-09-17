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

// URLs das implementações das planilhas Visualizacoes e Publicacoes do Google Apps Script 
const VISUALIZACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0izhDadafEU5bZ-x_aMtS58QsGLbJmyZOj4hAZG19YOT6yaUBXNRqPgz6WlzNP7A6Xw/exec';
const PUBLICACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztOolc0gm0WEw5xM67AvE0GpG2dJjnJc8R2iB5qjVnCsiyO2SX94nFMm8LuhXUToRe3w/exec';
const EIXOS_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbxGKcye13bBJUAmWwPTA7a65WMVFypnRBGhouBM3S02NsCMX2OKMmGcL9sSHZrpkdCEaQ/exec';

// URL base para o Apps Script para a planilha "sobre o projeto"
const SOBRE_PROJETO_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbyL9MN40PTHHWO98jotfp5gcF-5JO2rbgjSIBaJytwMXaBkhl9CJSiVaz-bV1IUVLrH/exec';

// Exportando as URLs como um objeto do tipo DataUrls
// Isso permite que outras partes do aplicativo acessem facilmente as URLs configuradas
export const dataUrls: DataUrls = {
  visualizacoes: VISUALIZACOES_FORM_APPS_SCRIPT_URL,
  publicacoes: PUBLICACOES_FORM_APPS_SCRIPT_URL,
  // URLs para a página "Sobre o Projeto", usando o parâmetro 'sheet'
  sobreProjetoPrincipal: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=sobre`,
  sobreProjetoMembros: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=membros`,
  sobreProjetoFinanciadores: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=financiadores`,
  noticias: 'https://script.google.com/macros/s/AKfycbwtzXeCzE49r3_0sEIrLnvJdA1Hda8UF1UjteI6v1jRy7pRAT9GKKJ5wP6TIPLDMXYL/exec',

  eixos: {
    curadoria: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=curadoria`,
    extracaoLimpeza: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=extracao-limpeza`,
    mineracaoArgumentos: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=mineracao-argumentos`,
    visualizacaoDiscussoes: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=visualizacao-discussoes`,
    aspectosEticosLegais: `${EIXOS_APPS_SCRIPT_BASE_URL}?sheet=aspectos-eticos-legais`
  }
};




