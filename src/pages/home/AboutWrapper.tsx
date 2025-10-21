// src/components/home/AboutWrapper.tsx
import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '../../components/sobre/About';

const AboutWrapper: React.FC = () => (
    <motion.div 
        className="py-16 bg-gray-100 rounded-xl mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <AboutSection />
    </motion.div>
);

export default AboutWrapper;