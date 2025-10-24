// src/components/Seo.tsx
import { Helmet } from 'react-helmet-async';
import React from 'react';

interface SeoProps {
  title: string;
  description: string;
  // url?: string; // Caso queira usar Canonical Link futuramente
}

const Seo: React.FC<SeoProps> = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    
    {/* Opcional, mas recomendado para redes sociais (Open Graph) */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    
    {/* Outras tags Open Graph/Twitter podem ser adicionadas */}
  </Helmet>
);

export default Seo;