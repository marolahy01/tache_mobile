import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ activeSection, darkMode, setDarkMode }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-content">
        <div className="logo-container" onClick={() => scrollToSection('home')}>
          <img 
            src="/images/Logos.jpg" 
            alt="Logo MJR" 
            className="logo-image"
          />
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {Object.entries(t).map(([key, value]) => (
            <li key={key}>
              <button
                onClick={() => scrollToSection(key)} 
                className={activeSection === key ? 'active' : ''}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: 'inherit',
                  font: 'inherit',
                  padding: 0
                }}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <LanguageSelector />
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;