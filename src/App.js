import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LocationMap from './components/LocationMap';
import './styles/globals.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Appliquer le mode sombre/clair au chargement
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  return (
    <LanguageProvider>
      <div className={`portfolio-wrapper ${darkMode ? 'dark' : 'light'}`}>
        <Navbar 
          activeSection={activeSection} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <LocationMap />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;