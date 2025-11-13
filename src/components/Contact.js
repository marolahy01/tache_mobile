import React, { useState, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiFacebook } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import LanguageContext from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { userData } from '../data/userData';
import '../styles/Contact.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]?.contact || {};
  const formRef = useRef();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const result = await emailjs.sendForm(
        userData.emailjs.serviceId,     
        userData.emailjs.templateId,     
        formRef.current,
        userData.emailjs.publicKey       
      );

      console.log('✅ Email envoyé avec succès:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="contact-container"
      >
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.title || 'Contactez-moi'}
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.subtitle || 'N\'hésitez pas à me contacter pour discuter de vos projets'}
          </motion.p>
        </div>

        <div className="contact-content">
          <motion.div 
            className="contact-info-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="contact-info-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div 
                className="contact-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiMail size={28} />
              </motion.div>
              <h3>Email</h3>
              <a href={`mailto:${userData.email}`} className="contact-link">
                {userData.email}
              </a>
            </motion.div>

            <motion.div 
              className="contact-info-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div 
                className="contact-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiPhone size={28} />
              </motion.div>
              <h3>Téléphone</h3>
              <a href={`tel:${userData.phone}`} className="contact-link">
                {userData.phone}
              </a>
            </motion.div>

            <motion.div 
              className="contact-info-card"
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div 
                className="contact-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiMapPin size={28} />
              </motion.div>
              <h3>Localisation</h3>
              <p className="contact-location">{userData.location}</p>
            </motion.div>
          </motion.div>

          <motion.form 
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <label className="form-label">{t.name || 'Nom complet'}</label>
              <motion.input
                type="text"
                name="name"
                className="form-input"
                placeholder={t.namePlaceholder || 'Votre nom complet'}
                value={formData.name}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.email || 'Email'}</label>
              <motion.input
                type="email"
                name="email"
                className="form-input"
                placeholder={t.emailPlaceholder || 'Entrer Votre adresse email ...'}
                value={formData.email}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.message || 'Message'}</label>
              <motion.textarea
                name="message"
                className="form-textarea"
                placeholder={t.messagePlaceholder || 'Décrivez votre projet ou votre besoin...'}
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <motion.button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiSend size={20} />
                  </motion.div>
                  <span>{t.sending || 'Envoi en cours...'}</span>
                </>
              ) : (
                <>
                  <FiSend size={20} />
                  <span>{t.send || 'Envoyer le message'}</span>
                </>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div
                className="status-message success"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="status-icon">✓</span>
                <div className="status-text">
                  <strong>Message envoyé avec succès !</strong>
                  <p>Je vous répondrai dans les plus brefs délais.</p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="status-message error"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="status-icon">✕</span>
                <div className="status-text">
                  <strong>Erreur d'envoi</strong>
                  <p>Veuillez réessayer ou me contacter directement par email.</p>
                </div>
              </motion.div>
            )}
          </motion.form>

          <motion.div 
            className="social-links-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="social-title">
              <span className="social-title-icon">🌐</span>
              Retrouvez-moi sur les réseaux
            </h3>
            <div className="social-links">
              <motion.a
                href={userData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                whileHover={{ y: -10, scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <FiGithub size={28} />
                <span className="social-tooltip">GitHub</span>
              </motion.a>
              
              <motion.a
                href={userData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                whileHover={{ y: -10, scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <FiLinkedin size={28} />
                <span className="social-tooltip">LinkedIn</span>
              </motion.a>
              
              <motion.a
                href={userData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
                whileHover={{ y: -10, scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <FiFacebook size={28} />
                <span className="social-tooltip">Facebook</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;