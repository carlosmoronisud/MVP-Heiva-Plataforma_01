/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/home/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
    variants: { [key: string]: any };
    itemVariants: { [key: string]: any };
}

const HeroSection: React.FC<HeroSectionProps> = ({ variants, itemVariants }) => (
    <motion.section
        className="rounded-xl relative h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center mb-16"
        variants={variants}
        initial="hidden"
        animate="visible"
    >
        <div className="absolute mt-6 inset-0 bg-black opacity-90 rounded-xl">
            <img src="https://ik.imagekit.io/8h7kfljfc/heiwa/hero.png?updatedAt=1756774057153" alt="Hero Background" className="w-full h-full object-cover opacity-50 rounded-xl" />
        </div>
        
        <div className="relative z-10 p-6 sm:p-12 rounded-xl">
            <motion.h1 
                className="text-4xl sm:text-6xl font-extrabold mb-4" 
                variants={itemVariants}
            >
                Visualize argumentos, compreenda discussões.
            </motion.h1>
            <motion.p 
                className="text-lg sm:text-2xl font-light mb-8" 
                variants={itemVariants}
            >
                Uma plataforma para mineração e visualização de argumentos em discussões em redes sociais.
            </motion.p>
            <motion.div
                className="flex justify-center items-center"
                variants={itemVariants}
            >
                <a href="/eixos" className="bg-gray-100 border-4 border-green-500 hover:bg-green-500 hover:text-white text-gray-800 font-bold py-4 px-16 text-2xl rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Eixos do Projeto
                </a>
            </motion.div>
        </div>
    </motion.section>
);

export default HeroSection;