import React, { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { userData } from '../data/userData';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].footer;

  return (
    <footer className="footer">
      <p className="footer-text">© 2025 {userData.name}. {t.rights}</p>
      <p className="footer-love">{t.madeWith} <span className="heart">❤️</span> {t.by} {userData.name}</p>
    </footer>
  );
};

export default Footer;