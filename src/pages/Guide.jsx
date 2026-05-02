import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, CheckSquare, Shield, Clock, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Guide.css';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <motion.div 
          className="accordion-content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const Guide = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const content = {
    en: {
      title: "The Ultimate Voting Guide",
      subtitle: "Everything you need to know about participating in democracy.",
      sec1: "1. Introduction to Elections",
      sec1Intro: "Elections are the foundation of democracy. They empower you to choose the leaders and policies that shape your community, state, and nation.",
      sec1Why: "Why voting matters: Every single vote counts towards shaping healthcare, education, infrastructure, and your civil rights.",
      sec2: "2. Step-by-Step Voting Process",
      steps: [
        { title: "Register to Vote", desc: "Check your state's deadline and register online or via mail." },
        { title: "Verify Eligibility", desc: "Ensure you meet age, citizenship, and residency requirements." },
        { title: "Find Polling Station", desc: "Know where your designated local polling place is." },
        { title: "Carry Valid ID", desc: "Bring the accepted form of identification for your state." },
        { title: "Cast Your Vote", desc: "Fill out the ballot clearly and accurately in the voting booth." },
        { title: "Confirmation", desc: "Submit your ballot and get your 'I Voted' sticker!" }
      ],
      sec3: "3. First-Time Voter Tips",
      tips: [
        "Go during off-peak hours (mid-morning or early afternoon) to avoid long lines.",
        "You have the right to ask poll workers for help if you don't understand the ballot.",
        "If you make a mistake on a paper ballot, don't cross it out! Ask for a new one.",
        "If you are in line when polls close, STAY IN LINE. You have the right to vote."
      ],
      sec4: "4. Types of Elections",
      types: [
        { type: "Local Elections", desc: "Mayors, city councils, school boards. These have the most direct impact on your daily life." },
        { type: "State Elections", desc: "Governors, state legislators, and state-wide propositions." },
        { type: "National/Federal", desc: "President, Senate, and House of Representatives." }
      ],
      sec5: "5. Interactive Learning",
      faqs: [
        { q: "Can I take time off work to vote?", a: "Many states require employers to give workers paid or unpaid time off to vote." },
        { q: "What if my name isn't on the voter list?", a: "Ask for a 'provisional ballot'. It will be counted once your eligibility is verified." },
        { q: "Can I vote by mail?", a: "Yes, in most states you can request an absentee ballot. Make sure to follow the mailing instructions carefully." }
      ],
      simPromo: "Ready to practice?",
      simBtn: "Try Voting Simulator",
      timelineBtn: "View Election Timeline",
      sec6: "Your Vote Shapes the Future",
      conclusion: "Democracy is not a spectator sport. Your participation is what drives progress. Be informed, be prepared, and let your voice be heard!"
    },
    es: {
      title: "La Guía Definitiva de Votación",
      subtitle: "Todo lo que necesita saber sobre cómo participar en la democracia.",
      sec1: "1. Introducción a las Elecciones",
      sec1Intro: "Las elecciones son la base de la democracia. Le otorgan el poder de elegir a los líderes y las políticas que dan forma a su comunidad, estado y nación.",
      sec1Why: "Por qué es importante votar: Cada voto cuenta para dar forma a la atención médica, la educación, la infraestructura y sus derechos civiles.",
      sec2: "2. Proceso de Votación Paso a Paso",
      steps: [
        { title: "Regístrese para Votar", desc: "Verifique la fecha límite de su estado y regístrese en línea o por correo." },
        { title: "Verifique Elegibilidad", desc: "Asegúrese de cumplir con los requisitos de edad, ciudadanía y residencia." },
        { title: "Encuentre su Centro", desc: "Sepa dónde está su lugar de votación local designado." },
        { title: "Lleve Identificación", desc: "Traiga la forma de identificación aceptada para su estado." },
        { title: "Emita su Voto", desc: "Complete la boleta de manera clara y precisa en la cabina de votación." },
        { title: "Confirmación", desc: "¡Envíe su boleta y obtenga su calcomanía de 'Yo Voté'!" }
      ],
      sec3: "3. Consejos para Votantes Primerizos",
      tips: [
        "Vaya durante las horas de menor actividad (a media mañana o temprano en la tarde) para evitar largas filas.",
        "Tiene derecho a pedir ayuda a los trabajadores electorales si no entiende la boleta.",
        "Si comete un error en una boleta de papel, ¡no lo tache! Pida una nueva.",
        "Si está en la fila cuando cierran las urnas, QUÉDESE EN LA FILA. Tiene derecho a votar."
      ],
      sec4: "4. Tipos de Elecciones",
      types: [
        { type: "Elecciones Locales", desc: "Alcaldes, ayuntamientos, juntas escolares. Tienen el impacto más directo en su vida diaria." },
        { type: "Elecciones Estatales", desc: "Gobernadores, legisladores estatales y propuestas a nivel estatal." },
        { type: "Nacional/Federal", desc: "Presidente, Senado y Cámara de Representantes." }
      ],
      sec5: "5. Aprendizaje Interactivo",
      faqs: [
        { q: "¿Puedo tomar tiempo libre del trabajo para votar?", a: "Muchos estados requieren que los empleadores den a los trabajadores tiempo libre pagado o no pagado para votar." },
        { q: "¿Qué pasa si mi nombre no está en la lista?", a: "Pida una 'boleta provisional'. Se contará una vez que se verifique su elegibilidad." },
        { q: "¿Puedo votar por correo?", a: "Sí, en la mayoría de los estados puede solicitar una boleta en ausencia." }
      ],
      simPromo: "¿Listo para practicar?",
      simBtn: "Probar Simulador",
      timelineBtn: "Ver Calendario",
      sec6: "Su Voto Da Forma al Futuro",
      conclusion: "La democracia no es un deporte para espectadores. Su participación es lo que impulsa el progreso. ¡Infórmese, prepárese y deje que se escuche su voz!"
    }
  };

  const t = content[language];

  return (
    <>
      <motion.div className="progress-bar-fixed" style={{ scaleX }} />
      <div className="guide-container">
        
        {/* Header */}
        <header className="guide-header text-center">
          <h1 className="hero-title">{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
        </header>

        {/* Section 1: Intro */}
        <section className="guide-section">
          <h2>{t.sec1}</h2>
          <div className="glass-card p-6">
            <p className="text-lg mb-4">{t.sec1Intro}</p>
            <div className="highlight-box">
              <ShieldCheck size={24} className="text-primary" />
              <p><strong>{t.sec1Why}</strong></p>
            </div>
          </div>
        </section>

        {/* Section 2: Steps */}
        <section className="guide-section">
          <h2>{t.sec2}</h2>
          <div className="steps-grid">
            {t.steps.map((step, idx) => (
              <div key={idx} className="step-card glass-card">
                <div className="step-number">{idx + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Tips */}
        <section className="guide-section">
          <h2>{t.sec3}</h2>
          <div className="tips-list glass-card">
            <ul>
              {t.tips.map((tip, idx) => (
                <li key={idx}>
                  <CheckSquare size={20} className="text-success" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 4: Types */}
        <section className="guide-section">
          <h2>{t.sec4}</h2>
          <div className="types-grid">
            {t.types.map((type, idx) => (
              <div key={idx} className="type-card glass-card">
                <BookOpen size={32} className="text-secondary mb-4" />
                <h3>{type.type}</h3>
                <p>{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Interactive Learning & FAQ */}
        <section className="guide-section">
          <h2>{t.sec5}</h2>
          <div className="interactive-wrapper">
            <div className="faq-section">
              {t.faqs.map((faq, idx) => (
                <Accordion key={idx} title={faq.q}>
                  <p>{faq.a}</p>
                </Accordion>
              ))}
            </div>
            
            <div className="cta-cards">
              <div className="glass-card cta-card text-center p-6">
                <h3>{t.simPromo}</h3>
                <Link to="/simulator" className="btn btn-primary mt-4">
                  {t.simBtn} <ExternalLink size={16} />
                </Link>
              </div>
              <div className="glass-card cta-card text-center p-6">
                <h3>{language === 'en' ? 'Track Deadlines' : 'Seguimiento de Plazos'}</h3>
                <Link to="/timeline" className="btn btn-secondary mt-4">
                  {t.timelineBtn} <Clock size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Motivational */}
        <section className="motivational-section">
          <div className="motivational-content">
            <h2>{t.sec6}</h2>
            <p>{t.conclusion}</p>
          </div>
        </section>
        
      </div>
    </>
  );
};

export default Guide;
