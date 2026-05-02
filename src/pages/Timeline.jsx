import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Timeline.css';

const Timeline = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);

  const events = [
    {
      date: { en: 'Oct 7, 2024', es: '7 de Oct, 2024' },
      title: { en: 'Voter Registration Deadline', es: 'Fecha límite de registro de votantes' },
      desc: { en: 'Last day to register to vote for the general election.', es: 'Último día para registrarse para votar en las elecciones generales.' },
      extra: { en: 'Check your state rules, some states allow same-day registration!', es: '¡Verifique las reglas de su estado, algunos estados permiten el registro el mismo día!' }
    },
    {
      date: { en: 'Oct 21, 2024', es: '21 de Oct, 2024' },
      title: { en: 'Early Voting Begins', es: 'Comienza la Votación Anticipada' },
      desc: { en: 'Polling places open for early in-person voting.', es: 'Los lugares de votación abren para votación anticipada en persona.' },
      extra: { en: 'Lines are usually shorter during early voting. Highly recommended for first-timers.', es: 'Las filas suelen ser más cortas durante la votación anticipada. Muy recomendado.' }
    },
    {
      date: { en: 'Oct 29, 2024', es: '29 de Oct, 2024' },
      title: { en: 'Mail-in Ballot Request Deadline', es: 'Fecha Límite para Solicitar Boleta por Correo' },
      desc: { en: 'Last day to request an absentee or mail-in ballot.', es: 'Último día para solicitar una boleta ausente o por correo.' },
      extra: { en: 'Make sure to follow the instructions carefully so your ballot is not rejected.', es: 'Asegúrese de seguir las instrucciones cuidadosamente para que su boleta no sea rechazada.' }
    },
    {
      date: { en: 'Nov 5, 2024', es: '5 de Nov, 2024' },
      title: { en: 'Election Day', es: 'Día de las Elecciones' },
      desc: { en: 'Final day to cast your vote. Polls usually close at 8 PM.', es: 'Último día para emitir su voto. Las urnas generalmente cierran a las 8 PM.' },
      extra: { en: 'If you are in line when polls close, STAY IN LINE. You have the right to vote.', es: 'Si está en la fila cuando cierran las urnas, QUÉDESE EN LA FILA. Tiene derecho a votar.' }
    }
  ];

  return (
    <div className="timeline-container">
      <h1 className="text-center section-title">{language === 'en' ? 'Election Timeline' : 'Calendario Electoral'}</h1>
      
      <div className="timeline">
        {events.map((event, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-dot"></div>
            <div className="timeline-content glass-card">
              <div className="timeline-date">{event.date[language]}</div>
              <h3 className="timeline-title">{event.title[language]}</h3>
              <p className="timeline-desc">{event.desc[language]}</p>
              {isFirstTimeVoter && (
                <div className="first-time-tip">
                  <strong>💡 Tip: </strong> {event.extra[language]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
