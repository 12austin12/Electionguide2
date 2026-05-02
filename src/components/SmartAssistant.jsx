import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './SmartAssistant.css';

const SYSTEM_INSTRUCTION = `You are the 'Election Guide AI Assistant', a helpful, neutral, and informative civic education chatbot. Your job is to answer questions related to the voting process, eligibility, election timelines, and democracy in the United States. Provide concise, clear, and non-partisan answers. Do not endorse any political party or candidate. Use simple language.`;

const SmartAssistant = () => {
  const { language } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: language === 'en' ? "Hi! I'm your Election Guide Assistant. How can I help you get ready to vote?" : "¡Hola! Soy su Asistente de Guía Electoral. ¿Cómo puedo ayudarle a prepararse para votar?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Use VITE_GEMINI_API_KEY from env, fallback to localStorage if needed
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('geminiApiKey');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getAssistantResponse = (input) => {
    input = input.toLowerCase();

    if (input.includes("register")) {
      return language === 'en' 
        ? "You must register before the election deadline. Visit your state's election website."
        : "Debe registrarse antes de la fecha límite de las elecciones. Visite el sitio web electoral de su estado.";
    }

    if (input.includes("id") || input.includes("proof") || input.includes("identificación")) {
      return language === 'en'
        ? "Bring a valid government ID such as Aadhaar, Voter ID, or Passport."
        : "Lleve una identificación gubernamental válida, como Aadhaar, identificación de votante o pasaporte.";
    }

    if (input.includes("polling") || input.includes("booth") || input.includes("votar")) {
      return language === 'en'
        ? "You can find your polling booth using your voter ID or official election website."
        : "Puede encontrar su lugar de votación utilizando su identificación de votante o el sitio web oficial de elecciones.";
    }

    if (input.includes("first time") || input.includes("primer")) {
      return language === 'en'
        ? "As a first-time voter, ensure you are registered, carry valid ID, and know your polling location."
        : "Como votante por primera vez, asegúrese de estar registrado, llevar una identificación válida y conocer su lugar de votación.";
    }

    return language === 'en'
      ? "Please check official election guidelines or use the dashboard tools for assistance."
      : "Consulte las pautas electorales oficiales o utilice las herramientas del panel de control para obtener ayuda.";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // Simulate network delay for realistic UX
    setTimeout(() => {
      const response = getAssistantResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
      setIsLoading(false);
    }, 800);
  };

  const createMarkup = (text) => {
    // Basic formatting for fallback text
    return { __html: text };
  };

  return (
    <div className="smart-assistant-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="smart-assistant-window glass-card"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-label="Smart Assistant Chat"
          >
            <div className="assistant-header">
              <div className="assistant-title">
                <Bot size={20} className="text-primary" />
                <h3>{language === 'en' ? 'Election Assistant' : 'Asistente Electoral'}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="close-btn"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="assistant-messages" aria-live="polite">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-bubble ${msg.role === 'model' ? 'bot-msg' : 'user-msg'}`}>
                  <div className="msg-icon">
                    {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div 
                    className="msg-content" 
                    dangerouslySetInnerHTML={createMarkup(msg.content)} 
                  />
                </div>
              ))}
              {isLoading && (
                <div className="message-bubble bot-msg">
                  <div className="msg-icon"><Bot size={16} /></div>
                  <div className="msg-content"><Loader2 size={16} className="spin" /></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="assistant-input-area">
              <label htmlFor="chat-input" className="sr-only">Type your message</label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Ask about voting..." : "Pregunte sobre la votación..."}
                disabled={isLoading}
                autoComplete="off"
              />
              <button 
                type="submit" 
                className="send-btn btn btn-primary"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        className={`assistant-fab ${isOpen ? 'hidden' : ''} btn-primary`}
        onClick={() => setIsOpen(true)}
        aria-label="Open Smart Assistant"
        aria-expanded={isOpen}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default SmartAssistant;
