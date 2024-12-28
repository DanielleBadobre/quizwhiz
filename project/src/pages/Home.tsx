import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import '../index.css';
import gif from '../components/images/Untitled design.mp4';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds, replace with actual loading logic if needed
    setTimeout(() => {
      setIsLoading(false);
    }, 3300); // Adjust time as necessary
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <video
          src={gif}
          autoPlay
          loop
          muted
          alt="Loading..."
          style={{ width: '50%', height: 'auto', objectFit: 'contain', maxWidth: '400px'}}
        />
      </div>
    );
  }
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={sectionVariants}>
        <Hero />
      </motion.div>

      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true }}
        whileInView="visible"
        initial="hidden"
      >
        <Features />
      </motion.div>

      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true }}
        whileInView="visible"
        initial="hidden"
      >
        <HowItWorks />
      </motion.div>
    </motion.main>
  );
}