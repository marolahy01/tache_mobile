import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiArrowRight, FiPhone, FiGithub, FiLinkedin, FiFacebook, FiExternalLink, FiFileText } from 'react-icons/fi';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { userData } from '../data/userData';
import '../styles/Hero.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Hero = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].hero;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLocation = () => {
    const [lat, lng] = userData.address.coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const openWhatsApp = () => {
    const phone = userData.phone.replace(/\s/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const openEmail = () => {
    window.open(`mailto:${userData.email}`, '_blank');
  };

  const openCV = () => {
    window.open(userData.cv, '_blank');
  };

  return (
    <section id="home" className="hero">
      {/* Animated background elements */}
      <motion.div 
        className="hero-bg-shape hero-bg-shape-1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="hero-bg-shape hero-bg-shape-2"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-text" variants={fadeInUp}>
          <motion.p 
            className="greeting"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.greeting}
          </motion.p>
          
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {userData.name}
          </motion.h1>
          
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.title}
          </motion.p>
          
          <motion.p 
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t.description}
          </motion.p>
          
          <motion.div 
            className="hero-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div 
              className="hero-info-item clickable"
              onClick={openLocation}
              whileHover={{ x: 5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FiMapPin size={18} />
              <span>{userData.location}</span>
              <FiExternalLink size={14} className="external-icon" />
            </motion.div>
            
            <motion.div 
              className="hero-info-item clickable"
              onClick={openEmail}
              whileHover={{ x: 5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FiMail size={18} />
              <span>{userData.email}</span>
              <FiExternalLink size={14} className="external-icon" />
            </motion.div>
            
            <motion.div 
              className="hero-info-item clickable"
              onClick={openWhatsApp}
              whileHover={{ x: 5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FiPhone size={18} />
              <span>{userData.phone}</span>
              <FiExternalLink size={14} className="external-icon" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button 
              className="btn btn-primary" 
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(6, 182, 212, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t.cta1} <FiArrowRight />
            </motion.button>
            
            <motion.button 
              className="btn btn-cv" 
              onClick={openCV}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFileText /> {t.cta3 || 'Voir mon CV'}
            </motion.button>
            
            <motion.button 
              className="btn btn-secondary" 
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail /> {t.cta2}
            </motion.button>
          </motion.div>

          <motion.div 
            className="social-links-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a
              href={userData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-hero"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiGithub size={20} />
              <span className="social-tooltip">GitHub</span>
            </motion.a>
            
            <motion.a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-hero"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiLinkedin size={20} />
              <span className="social-tooltip">LinkedIn</span>
            </motion.a>
            
            <motion.a
              href={userData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-hero"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiFacebook size={20} />
              <span className="social-tooltip">Facebook</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image-wrapper" variants={fadeInUp}>
          <motion.div 
            className="profile-image-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div animate={floatingAnimation}>
              <motion.img 
                src={userData.profileImage}
                alt={userData.name}
                className="profile-image"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 3,
                  transition: { duration: 0.4 }
                }}
                onError={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  e.target.alt = 'Profile';
                }}
              />
            </motion.div>

            {/* Decorative rings */}
            <motion.div 
              className="profile-ring profile-ring-1"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="profile-ring profile-ring-2"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;