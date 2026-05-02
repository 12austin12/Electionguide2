import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MapPin, UserCheck, FileText, CheckSquare, Award, ArrowRight } from 'lucide-react';
import './Simulator.css';

const Simulator = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [votedParty, setVotedParty] = useState(null);

  const t = {
    en: {
      title: "Voting Day Simulator",
      step1Title: "1. Arrive at Polling Station",
      step1Desc: "Welcome to your local polling place! Ensure you're at the correct location.",
      step1Tip: "Check your polling location online a few days before Election Day.",
      step1Btn: "Enter Polling Station",
      
      step2Title: "2. Verify Identity",
      step2Desc: "Please present your identification to the poll worker.",
      step2Tip: "Depending on your state, you may need a photo ID, a utility bill, or just your signature.",
      step2Btn: "Show ID & Sign In",

      step3Title: "3. Receive Ballot",
      step3Desc: "The poll worker hands you your official ballot and a privacy sleeve.",
      step3Tip: "Double-check that the ballot is clean and unmarked before you start.",
      step3Btn: "Take Ballot & Go to Booth",

      step4Title: "4. Cast Vote",
      step4Desc: "You are now in the voting booth. Make your selection carefully.",
      step4Tip: "If you make a mistake on a paper ballot, don't cross it out! Ask a poll worker for a new one.",
      step4Opt1: "Candidate A",
      step4Opt2: "Candidate B",
      step4Btn: "Submit Ballot",

      step5Title: "5. Confirmation",
      step5Desc: "Congratulations! You have successfully cast your vote.",
      step5Tip: "Wear your 'I Voted' sticker with pride!",
      step5Btn: "Finish Simulation"
    },
    es: {
      title: "Simulador del Día de Votación",
      step1Title: "1. Llegar al Centro de Votación",
      step1Desc: "¡Bienvenido a su lugar de votación local! Asegúrese de estar en el lugar correcto.",
      step1Tip: "Verifique su lugar de votación en línea unos días antes del Día de las Elecciones.",
      step1Btn: "Entrar al Centro de Votación",
      
      step2Title: "2. Verificar Identidad",
      step2Desc: "Por favor presente su identificación al trabajador electoral.",
      step2Tip: "Dependiendo de su estado, puede necesitar una identificación con foto, una factura de servicios públicos o solo su firma.",
      step2Btn: "Mostrar Identificación y Firmar",

      step3Title: "3. Recibir Boleta",
      step3Desc: "El trabajador electoral le entrega su boleta oficial y una funda de privacidad.",
      step3Tip: "Verifique que la boleta esté limpia y sin marcas antes de comenzar.",
      step3Btn: "Tomar Boleta e Ir a la Cabina",

      step4Title: "4. Emitir Voto",
      step4Desc: "Ahora está en la cabina de votación. Haga su selección cuidadosamente.",
      step4Tip: "Si comete un error en una boleta de papel, ¡no lo tache! Pídale una nueva a un trabajador electoral.",
      step4Opt1: "Candidato A",
      step4Opt2: "Candidato B",
      step4Btn: "Enviar Boleta",

      step5Title: "5. Confirmación",
      step5Desc: "¡Felicidades! Ha emitido su voto con éxito.",
      step5Tip: "¡Lleve su calcomanía de 'Yo Voté' con orgullo!",
      step5Btn: "Finalizar Simulación"
    }
  };

  const content = t[language];

  const handleNext = () => setStep(prev => prev + 1);
  const handleReset = () => {
    setStep(1);
    setVotedParty(null);
  };

  return (
    <div className="simulator-container">
      <h1 className="text-center section-title">{content.title}</h1>
      
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
        </div>
        <div className="step-indicators">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`step-dot ${step >= i ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>

      <div className="simulator-card glass-card">
        {step === 1 && (
          <div className="sim-step animate-in">
            <div className="sim-icon"><MapPin size={48} /></div>
            <h2>{content.step1Title}</h2>
            <p>{content.step1Desc}</p>
            {isFirstTimeVoter && <div className="sim-tip">💡 {content.step1Tip}</div>}
            <button className="btn btn-primary mt-4" onClick={handleNext}>
              {content.step1Btn} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="sim-step animate-in">
            <div className="sim-icon"><UserCheck size={48} /></div>
            <h2>{content.step2Title}</h2>
            <p>{content.step2Desc}</p>
            {isFirstTimeVoter && <div className="sim-tip">💡 {content.step2Tip}</div>}
            <button className="btn btn-primary mt-4" onClick={handleNext}>
              {content.step2Btn} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="sim-step animate-in">
            <div className="sim-icon"><FileText size={48} /></div>
            <h2>{content.step3Title}</h2>
            <p>{content.step3Desc}</p>
            {isFirstTimeVoter && <div className="sim-tip">💡 {content.step3Tip}</div>}
            <button className="btn btn-primary mt-4" onClick={handleNext}>
              {content.step3Btn} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="sim-step animate-in">
            <div className="sim-icon"><CheckSquare size={48} /></div>
            <h2>{content.step4Title}</h2>
            <p>{content.step4Desc}</p>
            
            <div className="ballot-options">
              <label className={`ballot-option ${votedParty === 'A' ? 'selected' : ''}`}>
                <input type="radio" name="vote" onChange={() => setVotedParty('A')} />
                {content.step4Opt1}
              </label>
              <label className={`ballot-option ${votedParty === 'B' ? 'selected' : ''}`}>
                <input type="radio" name="vote" onChange={() => setVotedParty('B')} />
                {content.step4Opt2}
              </label>
            </div>

            {isFirstTimeVoter && <div className="sim-tip">💡 {content.step4Tip}</div>}
            <button className="btn btn-primary mt-4" disabled={!votedParty} onClick={handleNext}>
              {content.step4Btn} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="sim-step animate-in success-step">
            <div className="sim-icon sticker-icon"><Award size={64} /></div>
            <h2>{content.step5Title}</h2>
            <p>{content.step5Desc}</p>
            <div className="sticker">I VOTED</div>
            {isFirstTimeVoter && <div className="sim-tip mt-4">💡 {content.step5Tip}</div>}
            <button className="btn btn-secondary mt-4" onClick={handleReset}>
              {content.step5Btn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;
