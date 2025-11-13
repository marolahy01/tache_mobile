import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCode, FiAward, FiCheckCircle } from 'react-icons/fi';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const About = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].about;

  return (
    <section id="about" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="section-header">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>
        <motion.div 
          className="stats-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: FiBriefcase, number: "15+", label: t.stat1 },
            { icon: FiCode, number: "3+", label: t.stat2 },
            { icon: FiAward, number: "20+", label: t.stat3 },
            { icon: FiCheckCircle, number: "100%", label: t.stat4 }
          ].map((stat, i) => (
            <motion.div key={i} className="stat-card" variants={fadeInUp}>
              <div className="stat-icon"><stat.icon size={30} /></div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;