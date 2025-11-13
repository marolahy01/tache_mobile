import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiMapPin, FiNavigation, FiGlobe } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { userData } from '../data/userData';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Icône personnalisée
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// Composant pour animer le zoom de la carte
const MapAnimator = ({ position, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    // Animation de zoom progressif
    let currentZoom = 4;
    const targetZoom = zoom;
    const steps = 20;
    const zoomIncrement = (targetZoom - currentZoom) / steps;
    
    map.setView(position, currentZoom, { animate: false });
    
    const interval = setInterval(() => {
      currentZoom += zoomIncrement;
      if (currentZoom >= targetZoom) {
        map.setView(position, targetZoom, { animate: true });
        clearInterval(interval);
      } else {
        map.setView(position, currentZoom, { animate: true });
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [map, position, zoom]);
  
  return null;
};

const LocationMap = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].location;
  const mapRef = useRef(null);

  // Coordonnées exactes de Fianarantsoa
  const position = userData.address.coordinates;

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`;
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="section location-section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {t?.title || "Ma Localisation"}
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t?.subtitle || userData.location}
          </motion.p>
        </div>

        <motion.div 
          className="map-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="map-info-cards">
            <motion.div 
              className="map-info-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="map-info-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiMapPin size={30} />
              </motion.div>
              <div className="map-info-content">
                <h3>{userData.address.street}</h3>
                <p>{userData.address.city}</p>
                <p className="country">{userData.address.country}</p>
              </div>
            </motion.div>

            <motion.div 
              className="map-info-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="map-info-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiGlobe size={30} />
              </motion.div>
              <div className="map-info-content">
                <h3>Coordonnées GPS</h3>
                <p className="coordinates">{position[0]}° S</p>
                <p className="coordinates">{position[1]}° E</p>
              </div>
            </motion.div>

            <motion.div 
              className="map-info-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="map-info-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiNavigation size={30} />
              </motion.div>
              <div className="map-info-content">
                <h3>Navigation</h3>
                <motion.button 
                  className="navigate-btn"
                  onClick={handleNavigate}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ouvrir dans Maps
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="leaflet-map-wrapper"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <MapContainer 
              ref={mapRef}
              center={position} 
              zoom={15} 
              scrollWheelZoom={true}
              zoomControl={true}
              style={{ height: '600px', width: '100%', borderRadius: '24px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapAnimator position={position} zoom={15} />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  <div style={{ padding: '10px', minWidth: '200px' }}>
                    <strong style={{ fontSize: '16px', color: '#06b6d4' }}>
                      {userData.address.street}
                    </strong>
                    <br />
                    <span style={{ fontSize: '14px' }}>
                      {userData.address.city}, {userData.address.country}
                    </span>
                    <br />
                    <small style={{ color: '#64748b' }}>
                      📍 {position[0]}°S, {position[1]}°E
                    </small>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .location-section {
          background: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary));
        }

        .map-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .map-info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .map-info-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px var(--shadow);
        }

        .map-info-card:hover {
          border-color: var(--accent);
          box-shadow: 0 12px 40px var(--shadow);
        }

        .map-info-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--accent), var(--accent-hover));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .map-info-content {
          flex: 1;
        }

        .map-info-content h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .map-info-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0.2rem 0;
        }

        .coordinates {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: var(--accent);
        }

        .country {
          font-weight: 600;
          color: var(--accent-gold);
        }

        .navigate-btn {
          margin-top: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: var(--gradient-primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .navigate-btn:hover {
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4);
        }

        .leaflet-map-wrapper {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px var(--shadow);
          border: 2px solid var(--border);
        }

        .leaflet-map-wrapper:hover {
          border-color: var(--accent);
        }

        @media (max-width: 768px) {
          .map-info-cards {
            grid-template-columns: 1fr;
          }

          .leaflet-map-wrapper {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LocationMap;