import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { categoriesData } from '../data/skillsData';
import '../styles/Skills.css';

const Skills = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].skills;
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredElement, setHoveredElement] = useState(null);

  const toggleCategory = (categoryKey) => {
    setSelectedCategories(prev => 
      prev.includes(categoryKey)
        ? prev.filter(k => k !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let filtered = {};

    Object.entries(categoriesData).forEach(([key, category]) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(key)) {
        return;
      }

      const filteredElements = category.elements.filter(element =>
        element.name.toLowerCase().includes(query)
      );

      const categoryMatches = category.name.toLowerCase().includes(query);
      
      if (categoryMatches || filteredElements.length > 0 || query === '') {
        filtered[key] = {
          ...category,
          elements: query === '' || categoryMatches ? category.elements : filteredElements
        };
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories]);

  const getBubbleSize = (elementCount) => {
    if (elementCount <= 3) return 180;
    if (elementCount <= 4) return 190;
    if (elementCount <= 6) return 200;
    if (elementCount <= 9) return 210;
    return 220;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategories.length > 0;

  const getOptimalOrbitPositions = (totalElements, bubbleSize) => {
    const positions = [];
    const baseRadius = bubbleSize * 0.75;
    
    let orbitLevels = [];
    
    if (totalElements <= 4) {
      orbitLevels = [
        { radius: baseRadius, capacity: 4 }
      ];
    } else if (totalElements <= 8) {
      orbitLevels = [
        { radius: baseRadius, capacity: 8 }
      ];
    } else if (totalElements <= 12) {
      orbitLevels = [
        { radius: baseRadius * 0.85, capacity: 6 },
        { radius: baseRadius + 50, capacity: 6 }
      ];
    } else {
      orbitLevels = [
        { radius: baseRadius * 0.8, capacity: 6 },
        { radius: baseRadius + 45, capacity: 8 },
        { radius: baseRadius + 95, capacity: Math.max(totalElements - 14, 0) }
      ];
    }
    
    let elementIndex = 0;
    
    orbitLevels.forEach((level, levelIndex) => {
      const remainingElements = totalElements - elementIndex;
      if (remainingElements <= 0) return;
      
      const elementsInThisLevel = Math.min(level.capacity, remainingElements);
      const angleStep = 360 / elementsInThisLevel;
      const angleOffset = levelIndex * 15;
      
      for (let i = 0; i < elementsInThisLevel && elementIndex < totalElements; i++) {
        const angle = (i * angleStep) + angleOffset;
        // Vitesse de rotation extrêmement lente (120-180 secondes = 2-3 minutes)
        const rotationSpeed = 120 + (levelIndex * 30);
        
        positions.push({
          angle,
          radius: level.radius,
          rotationSpeed,
          level: levelIndex
        });
        
        elementIndex++;
      }
    });
    
    return positions;
  };

  const getElementSize = (totalElements) => {
    if (totalElements <= 4) return 72;
    if (totalElements <= 7) return 68;
    if (totalElements <= 10) return 64;
    return 60;
  };

  return (
    <section id="skills" className="skills-bubble-section">
      <div className="section-header">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          {t.title || "Mes Compétences"}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {t.subtitle || "Technologies et compétences que je maîtrise"}
        </motion.p>
      </div>

      {/* Barre de recherche */}
      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={language === 'fr' ? "Rechercher une compétence ou catégorie..." : language === 'mg' ? "Hitady fahaiza-manao na sokajy..." : "Search for a skill or category..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <motion.button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              whileHover={{ scale: 1.03, rotate: 90 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              <FiX />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filtres de catégories */}
      <motion.div 
        className="category-filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {Object.entries(categoriesData).map(([key, category]) => {
          const Icon = category.icon;
          const isSelected = selectedCategories.includes(key);
          
          return (
            <motion.button
              key={key}
              className={`category-filter-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleCategory(key)}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.4 }}
              style={{
                '--category-color': category.color
              }}
            >
              <span className="filter-icon-wrapper">
                <Icon size={18} />
              </span>
              <span className="filter-text">{category.name}</span>
              {isSelected && (
                <motion.span 
                  className="filter-check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 30 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Bouton clear filters */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            className="clear-filters-container"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="clear-filters-btn"
              onClick={clearFilters}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.4 }}
            >
              <FiX size={16} />
              <span>{language === 'fr' ? 'Réinitialiser les filtres' : language === 'mg' ? 'Fafao ny sivana' : 'Clear filters'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Résultats */}
      <div className="bubbles-container">
        <AnimatePresence mode="wait">
          {Object.keys(filteredData).length > 0 ? (
            <motion.div
              key="results"
              className="categories-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {Object.entries(filteredData).map(([categoryKey, category], catIndex) => {
                const CategoryIcon = category.icon;
                const elementCount = category.elements.length;
                const bubbleSize = getBubbleSize(elementCount);
                const elementSize = getElementSize(elementCount);
                const orbitPositions = getOptimalOrbitPositions(elementCount, bubbleSize);

                return (
                  <motion.div
                    key={categoryKey}
                    className="category-wrapper"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ 
                      duration: 1, 
                      delay: catIndex * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <div className="orbit-system" style={{ 
                      '--bubble-size': `${bubbleSize}px`,
                      '--element-size': `${elementSize}px`
                    }}>
                      <div className="cosmic-glow" style={{ '--glow-color': category.color }} />
                      
                      {/* Bulle principale avec animation extrêmement lente */}
                      <motion.div
                        className="category-bubble"
                        style={{
                          background: category.gradient,
                          width: bubbleSize,
                          height: bubbleSize,
                          '--bubble-color': category.color
                        }}
                        animate={{
                          y: [0, -4, 0]
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="category-bubble-content">
                          <motion.div 
                            className="category-icon"
                            animate={{ 
                              rotate: [0, 2, -2, 0],
                              scale: [1, 1.02, 1]
                            }}
                            transition={{ 
                              duration: 15, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <CategoryIcon size={bubbleSize * 0.28} />
                          </motion.div>
                          <h3 className="category-title">{category.name}</h3>
                          <div className="category-count">
                            {category.elements.length} {language === 'fr' ? 'outils' : language === 'mg' ? 'fitaovana' : 'tools'}
                          </div>
                        </div>

                        <div className="bubble-shine" />
                        
                        {/* Particules très ralenties */}
                        <div className="bubble-particles">
                          {[...Array(2)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="particle"
                              style={{ 
                                background: category.color,
                                boxShadow: `0 0 6px ${category.color}`
                              }}
                              initial={{ 
                                bottom: '-5%',
                                left: `${35 + i * 30}%`,
                                opacity: 0 
                              }}
                              animate={{
                                bottom: '105%',
                                opacity: [0, 0.4, 0]
                              }}
                              transition={{
                                duration: 8 + i * 1,
                                delay: i * 1.5,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>

                      {/* Éléments orbitaux avec rotation extrêmement lente */}
                      {category.elements.map((element, elemIndex) => {
                        const ElementIcon = element.icon;
                        const elementId = `${categoryKey}-${elemIndex}`;
                        const position = orbitPositions[elemIndex];

                        return (
                          <motion.div
                            key={elementId}
                            className="orbital-element"
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              width: elementSize,
                              height: elementSize,
                              marginLeft: -elementSize / 2,
                              marginTop: -elementSize / 2
                            }}
                            initial={{
                              rotate: position.angle,
                            }}
                            animate={{
                              rotate: position.angle + 360,
                            }}
                            transition={{
                              duration: position.rotationSpeed,
                              repeat: Infinity,
                              ease: "linear",
                              delay: elemIndex * 0.2
                            }}
                          >
                            <motion.div
                              className="element-bubble"
                              style={{
                                x: position.radius,
                                width: elementSize,
                                height: elementSize
                              }}
                              animate={{
                                rotate: -(position.angle + 360),
                              }}
                              transition={{
                                duration: position.rotationSpeed,
                                repeat: Infinity,
                                ease: "linear",
                                delay: elemIndex * 0.2
                              }}
                              whileHover={{ 
                                scale: 1.3,
                                zIndex: 3000,
                                transition: { duration: 0.6 }
                              }}
                              onMouseEnter={() => setHoveredElement(elementId)}
                              onMouseLeave={() => setHoveredElement(null)}
                            >
                              <div
                                className="element-glass"
                                style={{
                                  '--element-color': element.color
                                }}
                              >
                                <motion.div
                                  className="rotating-ring"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                />

                                <div className="element-content">
                                  <ElementIcon size={elementSize * 0.5} style={{ color: element.color }} />
                                  {element.flag && (
                                    <span className="element-flag">{element.flag}</span>
                                  )}
                                </div>

                                <div className="glass-shine" />
                              </div>

                              <AnimatePresence>
                                {hoveredElement === elementId && (
                                  <motion.div
                                    className="element-tooltip"
                                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.92 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                      '--tooltip-color': element.color
                                    }}
                                  >
                                    <div className="tooltip-name">
                                      <ElementIcon size={16} />
                                      {element.name}
                                    </div>
                                    <div className="tooltip-category">{category.name}</div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              className="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <div className="no-results-icon">🔍</div>
              <h3>{language === 'fr' ? 'Aucun résultat' : language === 'mg' ? 'Tsy misy valiny' : 'No results'}</h3>
              <p>
                {language === 'fr' 
                  ? 'Essayez une autre recherche ou réinitialisez les filtres'
                  : language === 'mg'
                  ? 'Andramo fikarohana hafa na fafao ny sivana'
                  : 'Try another search or clear the filters'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;