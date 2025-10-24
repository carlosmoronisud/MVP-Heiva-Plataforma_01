// load_test_all_apis.js

import http from 'k6/http';
import { sleep } from 'k6';

// Lista completa de URLs (colada do Passo 1)
const ALL_ENDPOINTS = [
    'https://script.google.com/macros/s/AKfycbxIM9Af0uEGJB_f5pjfcKcGRdx-DPGnInTn9Jw9wxG8E1x7VkDU1ZR4zjszfy8HVIlG-Q/exec',
    'https://script.google.com/macros/s/AKfycbzLnHIm3yDNC87EhyzvQtm6vDIZk4E5HaaQrehc6gZwswCY_i19thxF3rdh75Rju1Pd/exec',
    'https://script.google.com/macros/s/AKfycbzmPM8Gs8Y6D7wUMgSe18LUOgSwR-370UqGD_me_tpUFdn_hC3vpKRfHMIYXzV8RvaRUw/exec',
    'https://script.google.com/macros/s/AKfycbwSu37mF-TDdiEij6C03E0k5nkCb4mrPF3aZngy4nvJoeSA56PU8SoUYQMAnVxd4olMKQ/exec?sheet=sobre',
    'https://script.google.com/macros/s/AKfycbwSu37mF-TDdiEij6C03E0k5nkCb4mrPF3aZngy4nvJoeSA56PU8SoUYQMAnVxd4olMKQ/exec?sheet=membros',
    'https://script.google.com/macros/s/AKfycbwSu37mF-TDdiEij6C03E0k5nkCb4mrPF3aZngy4nvJoeSA56PU8SoUYQMAnVxd4olMKQ/exec?sheet=financiadores',
    'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec?sheet=curadoria',
    'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec?sheet=extracao-limpeza',
    'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec?sheet=mineracao-argumentos',
    'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec?sheet=visualizacao-discussoes',
    'https://script.google.com/macros/s/AKfycbxP8CIPLope6_qT-Ka1p37KGqRGo-iEKXvhPGBxMRRinp4naYiges_-6Y8Qen-Hmi6uxw/exec?sheet=aspectos-eticos-legais',
];


export const options = {
  // Teste de carga leve: 5 usuários em 35 segundos
  stages: [
    { duration: '10s', target: 5 },
    { duration: '15s', target: 5 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    // 95% das requisições devem ser concluídas em menos de 1000ms (1 segundo)
    http_req_duration: ['p(95)<1000'], 
    // Taxa de erros (falhas de requisição) deve ser inferior a 1%
    http_req_failed: ['rate<0.01'], 
  },
};

export default function () {
  // Escolhe uma URL aleatória da lista a cada iteração
  const randomUrl = ALL_ENDPOINTS[Math.floor(Math.random() * ALL_ENDPOINTS.length)];
  
  // O k6 faz a requisição GET
  const response = http.get(randomUrl);

  // Verifica se a requisição retornou um status de sucesso
  if (response.status !== 200) {
    console.error(`Falha ao carregar ${randomUrl}. Status: ${response.status}`);
  }

  // Pausa o "usuário virtual" por 1 segundo
  sleep(1);
}