import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Map, Calendar, CheckCircle, PlayCircle, ArrowRight, ShieldCheck, Zap, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);

  const t = {
    en: {
      badge: "Official Civic Platform",
      welcome: "Empower Your Vote",
      subtitle: "The next-generation interactive guide to navigate your democracy with absolute confidence.",
      firstTimeWelcome: "Welcome to Democracy! Your journey as a first-time voter starts right here.",
      getStarted: "Start Exploring",
      features: "Civic Toolkits",
      cards: [
        { title: "Voting Guide", desc: "Master the step-by-step voting process.", path: "/guide", icon: <Map size={40} className="stroke-2" /> },
        { title: "Simulator", desc: "Practice in our 3D virtual polling booth.", path: "/simulator", icon: <PlayCircle size={40} className="stroke-2" /> },
        { title: "Timeline", desc: "Never miss a critical election deadline.", path: "/timeline", icon: <Calendar size={40} className="stroke-2" /> },
        { title: "Eligibility", desc: "Verify your legal voting requirements.", path: "/eligibility", icon: <CheckCircle size={40} className="stroke-2" /> }
      ]
    },
    es: {
      badge: "Plataforma Cívica Oficial",
      welcome: "Empodere su Voto",
      subtitle: "La guía interactiva de próxima generación para navegar su democracia con absoluta confianza.",
      firstTimeWelcome: "¡Bienvenido a la Democracia! Su viaje como votante primerizo comienza aquí.",
      getStarted: "Comenzar a Explorar",
      features: "Kits de Herramientas",
      cards: [
        { title: "Guía de Votación", desc: "Domine el proceso de votación paso a paso.", path: "/guide", icon: <Map size={40} className="stroke-2" /> },
        { title: "Simulador", desc: "Practique en nuestra cabina virtual 3D.", path: "/simulator", icon: <PlayCircle size={40} className="stroke-2" /> },
        { title: "Calendario", desc: "Nunca pierda una fecha límite crítica.", path: "/timeline", icon: <Calendar size={40} className="stroke-2" /> },
        { title: "Elegibilidad", desc: "Verifique sus requisitos legales para votar.", path: "/eligibility", icon: <CheckCircle size={40} className="stroke-2" /> }
      ]
    }
  };

  const content = t[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="home-container">
      {/* Massive Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ShieldCheck size={18} /> <span>{content.badge}</span>
          </motion.div>
          
          <h1 className="hero-title">
            <span className="text-gradient">{content.welcome}</span>
          </h1>
          <p className="hero-subtitle">
            {isFirstTimeVoter ? content.firstTimeWelcome : content.subtitle}
          </p>
          
          <div className="hero-actions">
            <Link to="/guide" className="btn btn-primary btn-massive">
              {content.getStarted} <ArrowRight size={22} />
            </Link>
            <Link to="/simulator" className="btn btn-secondary btn-massive">
              <Zap size={22} className="text-secondary" /> {language === 'en' ? 'Quick Simulator' : 'Simulador Rápido'}
            </Link>
          </div>
        </motion.div>
        
        {/* Background Decorative Elements */}
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">{content.features}</h2>
          <div className="title-underline"></div>
        </div>
        
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {content.cards.map((card, idx) => (
            <motion.div variants={itemVariants} key={idx} className="feature-card-wrapper">
              <Link to={card.path} className="card feature-card glass-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{card.icon}</div>
                  <div className="feature-icon-glow"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-desc">{card.desc}</p>
                </div>
                <div className="feature-arrow">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
