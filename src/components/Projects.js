import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { projectsData } from '../data/projectsData';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const Projects = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].projects;

  // Fonction pour générer une image de placeholder avec gradient
  const getProjectPlaceholder = (index) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="projects" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <motion.div 
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              variants={fadeInUp}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
            >
              {project.featured && (
                <motion.div 
                  className="project-badge"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <FiStar size={16} /> {t.featured}
                </motion.div>
              )}
              
              <motion.div 
                className="project-image" 
                style={{ 
                  background: getProjectPlaceholder(index),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: '800'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                {project.title[language].charAt(0)}
              </motion.div>

              <div className="project-content">
                <motion.h3 
                  className="project-title"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title[language]}
                </motion.h3>
                <motion.p 
                  className="project-description"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.description[language]}
                </motion.p>

                <motion.div 
                  className="project-tags"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.tags.map((tag, i) => (
                    <motion.span 
                      key={i} 
                      className="tag"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="project-links"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href="#" 
                    className="project-link project-link-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={18} /> {t.viewProject}
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="project-link project-link-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub size={18} /> {t.viewCode}
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;