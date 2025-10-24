# DebateViz: Sua Plataforma de Visualização de Debates (MVP)

<div align="center">
<img src="https://ik.imagekit.io/8h7kfljfc/heiwa/image.png?updatedAt=1750537214936" alt="Banner da Plataforma DebateViz">
<br>
<h3>Arquitetura Híbrida e Resiliente: Transformando dados complexos em visualizações acessíveis com latência mínima.</h3>
</div>

<br>

## 🎯 Sobre o Projeto

A DebateViz - Heiwa é uma plataforma de visualização de dados desenvolvida como um MVP (Produto Mínimo Viável) e TCC, com o objetivo de resolver o desafio de **latência de dados** em arquiteturas de baixo custo.

O sistema utiliza o Google Sheets como um CMS *Headless* e implementa uma arquitetura de cache de três camadas (Apps Script Cache, Local Storage e Configuração de Roteamento) para garantir a melhor performance e resiliência possível antes da migração para um backend dedicado (ex: Raspberry Pi ou Cloud Run).

<br>

## 🚀 Acesso e Deploy (Mackenzie)

Este projeto está configurado para ser implantado no subdiretório do servidor Ciberdem.

* **URL de Produção:** `https://ciberdem.mack.com.br/apps/Plataforma_Heiwa/`
* **Repositório:** [Explore o Código (GitHub)](https://github.com/carlosmoronisud/MVP-Heiva-Plataforma_01)

<br>

## 💡 Funcionalidades Chave do MVP

### Otimização e Performance (Diferencial Técnico)

* **Cache Híbrido Avançado:** Implementação de caching de 30 minutos via **Google Apps Script CacheService** e caching de cliente via **Local Storage** no React.
* **Rastreamento de Interação:** Configuração de base para **Google Analytics (GA4)** e **Google Search Console (GSC)** via tags no `index.html`.
* **Carregamento Assíncrono (UX):** Carrega o conteúdo principal (Hero) instantaneamente e só depois carrega os carrosséis em *background*, melhorando a percepção de velocidade.
* **Recarga Funcional:** Botões de `Reload` que **ignoram o cache local** (`loadArrayData(true)`) para buscar dados frescos do Apps Script.
* **Tipagem para Velocidade:** Conversão de datas para **Timestamp (number)** nos Apps Scripts para eliminar o gargalo de formatação lenta e otimizar a ordenação no React.

### Conteúdo e UI

* **CMS Headless:** Conteúdo gerido 100% via Planilhas Google (Notícias, Publicações, Membros, Financiadores).
* **SEO Dinâmico:** Uso do `react-helmet-async` para definir **títulos e meta descrições únicos** para cada rota (Ex: `/eixos/curadoria`), essencial para indexação do Google.
* **Roteamento em Subdiretório:** Configuração pronta para o deploy no caminho `/apps/Plataforma_Heiwa/`.

<br>

## 💻 Tecnologias Utilizadas

-   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion.
-   **Backend:** Google Sheets (CMS), Google Apps Script (API JSON com CacheService).
-   **Análise:** Google Analytics (GA4), Google Search Console (GSC), Apache JMeter/k6 (Teste de Carga).

<br>

## ⚙️ INSTRUÇÕES DE DEPLOY (Para Equipe de Infraestrutura)

### 1. Configuração do Ambiente

O roteamento e os *assets* do projeto foram configurados para rodar no subdiretório `/apps/Plataforma_Heiwa/`.

* **Variável de Ambiente:** O arquivo `.env` deve conter: `VITE_BASE_PATH = /apps/Plataforma_Heiwa/`
* **Configuração do Vite:** O `vite.config.ts` usa esta variável para definir o `base` do *build*.
* **React Router DOM:** O `BrowserRouter` usa `basename={import.meta.env.BASE_URL}`.

### 2. Comandos de Build e Implantação

Para gerar a versão otimizada:

```bash
# 1. Instala as dependências (se necessário)
yarn install

# 2. Gera o build de produção
yarn build

# 3. O resultado estará na pasta 'dist/'. 
# Copie TODO o conteúdo da pasta 'dist/' para a URI final:
# [https://ciberdem.mack.com.br/apps/Plataforma_Heiwa/](https://ciberdem.mack.com.br/apps/Plataforma_Heiwa/)
```
## 3. Arquivos Essenciais de SEO (Deploy)
Os seguintes arquivos devem estar na raiz do subdiretório implantado (/apps/Plataforma_Heiwa/):

index.html (Contém as tags GA4 e GSC).

sitemap.xml

robots.txt

## 4. Ações Pós-Deploy (Obrigatório)
Após o deploy, as seguintes URLs devem ser verificadas e configuradas:

GSC Verification: Acesse o Google Search Console e verifique a propriedade https://ciberdem.mack.com.br/apps/Plataforma_Heiwa/ usando a Tag HTML que está no index.html.

Submeter Sitemap: Submeta o sitemap.xml no painel do GSC (caminho: /apps/Plataforma_Heiwa/sitemap.xml).

# ⚠️ Relatório de Risco e Próximo Passo
O teste de carga (k6) provou que o sistema é estável, mas a latência de pico é de 4.61 segundos.

Risco Atual: O sistema falha no requisito de velocidade pura devido à limitação do Google Apps Script.

Novas implementações futuras mitigarão esse risco, por agora ficamos com essa implementação que está estável

<div align="center"> Feito com 👐🏾 de Carlos Moroni Garcia. </div>
