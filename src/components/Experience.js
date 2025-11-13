import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { experienceData } from '../data/experienceData';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Experience = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].experience;

  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>
      </div>
      
      <div className="timeline">
        {experienceData.map((exp, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: index * 0.2 }}
          >
            <span className="timeline-year">
              {exp.year} {exp.yearEnd ? `- ${exp.yearEnd}` : `- ${t.present}`}
            </span>
            <h3 className="timeline-company">{exp.company}</h3>
            <div className="timeline-role">{exp.role[language]}</div>
            <p className="timeline-description">{exp.description[language]}</p>
            <ul className="achievement-list">
              {exp.achievements[language].map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;