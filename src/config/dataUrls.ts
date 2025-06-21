// src/config/dataUrls.ts

// Remova a primeira declaração de interface DataUrls e use apenas esta:
interface DataUrls {
  visualizacoes: string;
  publicacoes: string;
  sobreProjetoPrincipal: string;
  sobreProjetoMembros: string;
  sobreProjetoFinanciadores: string;
}

// Mantenha suas URLs de Visualizacoes e Publicacoes inalteradas aqui
const VISUALIZACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0izhDadafEU5bZ-x_aMtS58QsGLbJmyZOj4hAZG19YOT6yaUBXNRqPgz6WlzNP7A6Xw/exec';
const PUBLICACOES_FORM_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztOolc0gm0WEw5xM67AvE0GpG2dJjnJc8R2iB5qjVnCsiyO2SX94nFMm8LuhXUToRe3w/exec';

// Use a URL BASE do SEU Apps Script para a planilha "sobre o projeto"
const SOBRE_PROJETO_APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbyEBa66JdhS4ZkKKcWYJq1Hx0PbbOyJkvpGYAjSMWmbxaz4Rd8yaqaM3O0bXWu-m87J/exec';

export const dataUrls: DataUrls = {
  visualizacoes: VISUALIZACOES_FORM_APPS_SCRIPT_URL,
  publicacoes: PUBLICACOES_FORM_APPS_SCRIPT_URL,
  // URLs para a página "Sobre o Projeto", usando o parâmetro 'sheet'
  sobreProjetoPrincipal: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=sobre`,
  sobreProjetoMembros: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=membros`,
  sobreProjetoFinanciadores: `${SOBRE_PROJETO_APPS_SCRIPT_BASE_URL}?sheet=financiadores`,
  // Remova a linha 'sobreProjeto: ""' pois ela não é mais necessária e não está na interface final.
};