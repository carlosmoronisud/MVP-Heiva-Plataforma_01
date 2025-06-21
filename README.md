# DebateViz: Sua Plataforma de Visualização de Debates (MVP)

<div align="center">
<img src="https://ik.imagekit.io/8h7kfljfc/heiwa/image.png?updatedAt=1750537214936" alt="Banner da Plataforma DebateViz">
<br>
<h3>Transformando dados complexos em visualizações acessíveis.</h3>
</div>

<br>

## 🎯 Sobre o Projeto

A DebateViz é uma plataforma inovadora de visualização de dados, desenvolvida como um Produto Mínimo Viável (MVP) para demonstrar o potencial de tornar debates complexos e informações cruciais mais acessíveis e compreensíveis. Nosso objetivo é fornecer uma interface limpa, intuitiva e responsiva, que permite aos usuários explorar insights de diversas fontes de dados.

Este MVP foca na exibição de "cards de visualização" e "publicações" que apontam para artefatos externos (outras URLs), e uma seção "Sobre o Projeto" dinâmica.

<br>

## 🚀 Acesse a Demonstração (em breve)
    
✨ [Saiba Mais na Página 'Sobre o Projeto'](https://mvp-heiva-plataforma-01.vercel.app/)
    
📚 [Explore o Código (GitHub)](https://github.com/carlosmoronisud/MVP-Heiva-Plataforma_01)

<br>

## 🚧 Status do Projeto: Em Construção

Este é um MVP funcional e está em desenvolvimento contínuo. Novas funcionalidades, melhorias de UI/UX e fontes de dados serão adicionadas em fases futuras. Agradecemos sua compreensão e feedback!

<br>

## 💡 Funcionalidades Atuais do MVP

- **Frontend Estático**: Aplicação de visualização sem backend próprio.
- **Carga de Dados Dinâmica**: Conteúdo (visualizações, publicações, informações do projeto, membros, financiadores) é carregado diretamente de Planilhas Google Sheets publicadas via Google Apps Script.
- **Cards de Visualização e Publicação**: Exibição clara e intuitiva de cards que direcionam para conteúdos externos.
- **Página "Sobre o Projeto" Rica**:
  - Conteúdo principal e localização (com link para Google Maps).
  - Seções dinâmicas para "Membros Atuais", "Membros Anteriores" e "Financiadores", com cards estilizados (foto/logo, nome, função, links de contato).
  - Nomes de links de contato inteligentes (ex: "LinkedIn", "Lattes", "GitHub").
- **Inserção de Dados via Google Forms (Administrativo)**: Ferramentas externas (Google Forms) permitem que administradores cadastrem novas visualizações, publicações e membros, cujos dados são processados e servidos pelos Apps Scripts.
- **Interface Responsiva**: Otimizada para visualização em diferentes tamanhos de tela.

<br>

## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias modernas de desenvolvimento frontend:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.
- **Vite**: Ferramenta de build frontend extremamente rápida, que otimiza o ambiente de desenvolvimento e produção.
- **Tailwind CSS**: Framework CSS de primeira classe para estilização rápida e responsiva, com foco em classes utilitárias.
- **Google Sheets**: Utilizado como fonte de dados "backend" para o MVP.
- **Google Apps Script**: Plataforma de desenvolvimento baseada em JavaScript que estende a funcionalidade do Google Workspace, usada aqui para transformar e servir dados das planilhas como JSON para a aplicação.
- **React Router DOM**: Biblioteca para roteamento declarativo no React.

<br>

## 📂 Estrutura do Projeto
```bash
A estrutura de pastas do projeto foi organizada para manter a modularidade e a clareza, facilitando a navegação e a manutenção:

visualizacao-debates-mvp/
├── public/ # Arquivos estáticos (imagens, etc.) e JSONs de teste (se usados)
│ └── data/ # Para JSONs de teste, se o Apps Script não estiver em uso
├── src/
│ ├── assets/ # Imagens, ícones, fontes locais
│ ├── components/ # Componentes React reutilizáveis (Header, Footer, CardVisualizacao, CardInfo, etc.)
│ ├── config/ # Arquivos de configuração (ex: dataUrls.ts com URLs das APIs/Sheets)
│ ├── pages/ # Componentes de página (VisualizacoesPage, PublicacoesPage, SobreProjetoPage)
│ ├── services/ # Funções para interagir com APIs/dados externos (ex: dataLoader.ts)
│ ├── types/ # Definições de tipos TypeScript (interfaces: IVisualizacao, IPublicacao, IConteudoPrincipal, etc.)
│ ├── App.tsx # Componente principal da aplicação (configuração de rotas)
│ ├── main.tsx # Ponto de entrada da aplicação
│ └── index.css # CSS global (principalmente diretivas Tailwind)
├── .gitignore # Arquivos/pastas a serem ignorados pelo Git
├── index.html # Arquivo HTML principal
├── package.json # Dependências e scripts do projeto
├── postcss.config.js # Configuração do PostCSS (para Tailwind)
├── README.md # Este arquivo!
├── tailwind.config.js # Configuração do Tailwind CSS
├── tsconfig.json # Configuração do TypeScript
├── tsconfig.node.json # Configuração do TypeScript para o ambiente Node.js
└── yarn.lock # Gerenciador de pacotes Yarn

```
<br>

## ⚙️ Como Rodar o Projeto

Para executar este projeto em sua máquina local:

### Pré-requisitos:

- Certifique-se de ter o Node.js (versão LTS recomendada) e o Yarn instalados.

### Clone o Repositório:

```bash
git clone (https://github.com/carlosmoronisud/MVP-Heiva-Plataforma_01)
cd viz
```

Instale as Dependências:
bash
yarn install
Configure o Tailwind CSS (se ainda não o fez):
bash
npx tailwindcss init -p
(Certifique-se de configurar o tailwind.config.js e src/index.css conforme as instruções da Parte 1 da nossa conversa)

Configure as Planilhas Google Sheets e Apps Scripts:
Crie suas planilhas Google Sheets (VisualizacoesDebates, PublicacoesProjeto, SobreProjetoMVP) com as abas e dados conforme as instruções.

Configure e implante os Google Apps Scripts para cada planilha, obtendo as URLs dos Web Apps.

Atualize o arquivo src/config/dataUrls.ts com as URLs geradas pelos seus Apps Scripts.

Inicie o Servidor de Desenvolvimento:
bash
yarn dev
O projeto será aberto em seu navegador, geralmente em http://localhost:5173/.


📦 Build para Produção
Para gerar uma versão otimizada e estática da aplicação para deploy:

bash
yarn build
Isso criará uma pasta dist/ na raiz do projeto, contendo todos os arquivos estáticos prontos para serem servidos por qualquer servidor web (ex: Nginx, Apache, ou serviços de hospedagem estática como Render, Netlify, Vercel).


☁️ Deploy
Este MVP pode ser facilmente hospedado em serviços de hospedagem de sites estáticos. O processo geralmente envolve:

Fazer o build do projeto (yarn build).

Conectar seu repositório Git ao serviço de hospedagem (ex: Render, Netlify, Vercel).

Configurar o comando de build (yarn build ou npm run build) e o diretório de publicação (dist).


✨ Contribuições
Este projeto está em fase de MVP. Sugestões e contribuições para melhorias são sempre bem-vindas!


📄 Licença
Este projeto está licenciado sob a Licença MIT.


<div align="center"> Feito com 👐🏾 de Carlos Moroni Garcia. </div>
