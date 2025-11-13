import React, { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  const flags = {
    fr: "🇫🇷",
    en: "🇬🇧",
    mg: "🇲🇬"
  };

  return (
    <div className="lang-selector">
      {Object.keys(flags).map(lang => (
        <button
          key={lang}
          className={`lang-btn ${language === lang ? 'active' : ''}`}
          onClick={() => setLanguage(lang)}
        >
          <span className="flag">{flags[lang]}</span>
          <span>{lang.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;