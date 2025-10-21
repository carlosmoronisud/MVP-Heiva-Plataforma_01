// src/components/ui/ViewMoreButton.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

interface ViewMoreButtonProps {
    viewMoreLink: string;
    title: string;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ viewMoreLink, title }) => (
    <div className="flex justify-center mt-12">
        <motion.a
            href={viewMoreLink}
            className="
                flex items-center justify-center 
                bg-green-600 text-white font-bold 
                py-3 px-8 
                rounded-full shadow-lg 
                transition duration-300 
                hover:bg-green-700 transform hover:scale-105
                w-full max-w-xs md:w-auto
            "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            Ver Mais {title}
            <FaArrowRight className="ml-2 w-4 h-4" />
        </motion.a>
    </div >
);

export default ViewMoreButton;