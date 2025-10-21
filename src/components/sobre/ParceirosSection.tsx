// src/components/sobre/ParceirosSection.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { IEntidadeCard } from '../../types';
import { loadArrayData } from '../../services/dataLoader';
import { dataUrls } from '../../config/dataUrls'; 
import CardEntidade from '../cards/CardEntidade'; 
import LoadingCircle from '../ui/LoadingDots';

const ParceirosSection: React.FC = () => {
    const [financiadores, setFinanciadores] = useState<IEntidadeCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Reutiliza a URL de financiadores do Footer
                const financiadoresRaw = await loadArrayData<IEntidadeCard>(dataUrls.sobreProjetoFinanciadores);
                if (financiadoresRaw) {
                    setFinanciadores(financiadoresRaw);
                }
            } catch (err) {
                setError('Ocorreu um erro ao carregar os dados dos parceiros.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
    };

    if (loading) {
        return <div className="text-center py-8"><LoadingCircle /></div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    if (financiadores.length === 0) {
        return <p className="text-center text-gray-500 py-8">Nenhum parceiro ou financiador encontrado no momento.</p>;
    }

    return (
        <motion.section 
            className="py-16 bg-gray-50 rounded-xl shadow-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Apoio e Parceiros</h2>
            
            <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto px-4"
                variants={containerVariants}
            >
                {financiadores.map((financiador) => (
                    <motion.div 
                        key={financiador.id} 
                        className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center h-full hover:shadow-xl transition-shadow"
                        variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                    >
                        {/* Assumindo que CardEntidade renderiza o logo/imagem */}
                        <CardEntidade item={financiador} /> 
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default ParceirosSection;