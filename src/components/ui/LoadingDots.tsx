import React from 'react';
import { motion } from 'framer-motion';

const LoadingCircle: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-green-500"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingCircle