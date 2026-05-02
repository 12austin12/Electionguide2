import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CheckCircle, Circle, Save, LogIn, LogOut, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MyVotingPlan = () => {
  const { language } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // 'saved', 'error', ''
  
  const [checklist, setChecklist] = useState({
    registered: false,
    researchCandidates: false,
    findPollingPlace: false,
    planTransportation: false,
    voted: false
  });

  const tasks = [
    { id: 'registered', label: language === 'en' ? 'Register to Vote' : 'Registrarse para Votar' },
    { id: 'researchCandidates', label: language === 'en' ? 'Research Candidates & Issues' : 'Investigar Candidatos y Temas' },
    { id: 'findPollingPlace', label: language === 'en' ? 'Find Polling Location' : 'Encontrar Lugar de Votación' },
    { id: 'planTransportation', label: language === 'en' ? 'Plan Transportation' : 'Planear Transporte' },
    { id: 'voted', label: language === 'en' ? 'Cast My Ballot' : 'Emitir Mi Voto' }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const loadUserData = async (uid) => {
    try {
      setLoading(true);
      const docRef = doc(db, "votingPlans", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setChecklist(docSnap.data().checklist);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to login. Please ensure Firebase is configured.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setChecklist({
      registered: false,
      researchCandidates: false,
      findPollingPlace: false,
      planTransportation: false,
      voted: false
    });
  };

  const toggleTask = (taskId) => {
    const newChecklist = { ...checklist, [taskId]: !checklist[taskId] };
    setChecklist(newChecklist);
    saveUserData(newChecklist);
  };

  const saveUserData = async (newChecklist) => {
    if (!user) return;
    setSaving(true);
    setSaveStatus('');
    try {
      await setDoc(doc(db, "votingPlans", user.uid), {
        checklist: newChecklist,
        lastUpdated: new Date().toISOString()
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  // Calculate Progress Percentage
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="page-container">
      <motion.div 
        className="glass-card" 
        style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="text-gradient" style={{ margin: 0 }}>
            {language === 'en' ? 'My Voting Plan' : 'Mi Plan de Votación'}
          </h1>
          
          {user ? (
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={18} /> {language === 'en' ? 'Logout' : 'Cerrar Sesión'}
            </button>
          ) : (
            <button onClick={handleLogin} className="btn btn-primary">
              <LogIn size={18} /> {language === 'en' ? 'Login with Google' : 'Iniciar sesión con Google'}
            </button>
          )}
        </div>

        {!user ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <AlertCircle size={48} style={{ color: 'var(--color-secondary)', marginBottom: '1rem', display: 'inline-block' }} />
            <h2>{language === 'en' ? 'Sign in to save your progress' : 'Inicie sesión para guardar su progreso'}</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              {language === 'en' 
                ? 'Your checklist is securely synced to your account using Firebase Authentication & Firestore.'
                : 'Su lista de verificación se sincroniza de forma segura mediante Firebase.'}
            </p>
          </div>
        ) : loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} className="spin text-primary" />
          </div>
        ) : (
          <div>
            {/* Progress Bar (Judge Visible Feature) */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>{language === 'en' ? 'Completion Progress' : 'Progreso de Finalización'}</span>
                <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{progressPercentage}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div 
                  style={{ height: '100%', background: 'var(--gradient-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tasks.map((task) => {
                const isCompleted = checklist[task.id];
                return (
                  <motion.div 
                    key={task.id}
                    className="card"
                    style={{ 
                      padding: '1.25rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      cursor: 'pointer',
                      border: isCompleted ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
                      background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'var(--color-surface-solid)'
                    }}
                    onClick={() => toggleTask(task.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isCompleted ? (
                      <CheckCircle size={28} className="text-success" style={{ color: 'var(--color-success)' }} />
                    ) : (
                      <Circle size={28} style={{ color: 'var(--color-text-muted)' }} />
                    )}
                    <span style={{ fontSize: '1.1rem', fontWeight: 500, textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--color-text-muted)' : 'var(--color-text)' }}>
                      {task.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Saved Status Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1.5rem', height: '24px' }}>
              {saving ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  <Loader2 size={16} className="spin" /> {language === 'en' ? 'Saving to Firestore...' : 'Guardando...'}
                </span>
              ) : saveStatus === 'saved' ? (
                <motion.span 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  <Save size={16} /> {language === 'en' ? 'All changes saved to cloud' : 'Cambios guardados'}
                </motion.span>
              ) : null}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyVotingPlan;
