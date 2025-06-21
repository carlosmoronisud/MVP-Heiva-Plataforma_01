// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-12 text-center text-sm">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Plataforma de Visualização de Debates. Todos os direitos reservados.</p>
        <p className="mt-2 text-gray-400">Desenvolvido com React, Vite, TypeScript e Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;