import React, { useState, useEffect } from 'react';
import './Adventskalender.css';
import './Card.css';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Bilder importieren
import meme1 from './bilder/meme1.jpg';
import meme2 from './bilder/bild2.png';
import meme3 from './bilder/meme2.jpg';
import meme4 from './bilder/gedicht1.png'
import bild44 from './bilder/bild44.jpg'


// Weitere Bilder importieren, falls vorhanden...

const Card = ({ day, content, isActive, onEnable }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const openedCards = JSON.parse(localStorage.getItem('openedCards')) || [];
    if (openedCards.includes(day)) {
      setIsEnabled(true);
    }
  }, [day]);

  const handleClick = () => {
    setIsEnabled(true);
    onEnable(day);

    const openedCards = JSON.parse(localStorage.getItem('openedCards')) || [];
    if (!openedCards.includes(day)) {
      const updatedOpenedCards = [...openedCards, day];
      localStorage.setItem('openedCards', JSON.stringify(updatedOpenedCards));
    }
  };

  const cardClass = isActive ? 'card' : 'card card-disabled';

  return (
    <div className={cardClass}>
      <div className="card-header">
        {day}.Dezember
      </div>
      <div className="card-content">
        {isEnabled ? (
          typeof content === 'string' ? (
            content.endsWith('.jpg') || content.endsWith('.png') ? (
              <img src={content} alt={`Tag ${day}`} className="day-image" />
            ) : content.endsWith('.mov')|| content.endsWith('.MOV') ? (
              <video controls className="day-video">
                <source src={content} type="video/quicktime" />
                Dein Browser unterstützt das Videoformat nicht.
              </video>
            ) : (
              content
            )
          ) : (
            content
          )
        ) : (
          <button className={`card-button ${isActive ? 'active' : ''}`} onClick={handleClick} disabled={!isActive}>
            {isActive ? <LockOpenOutlinedIcon className="unlocked-icon" /> : <LockOutlinedIcon className="locked-icon" />}
            {isActive ? 'Öffnen' : ''}
          </button>
        )}
      </div>
    </div>
  );
  
};

const Adventskalender = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Aktuelles Tagesdatum

  const [enabledDays, setEnabledDays] = useState([]);

  const adventData = [
    'Das isch min Adventskalender für dich, 100% selfmade und min ganz viel liebi!!!! ich liebe dich yasmin!!!',
    'Lies hüt Jeremia 31,3',
    meme1, // Bild als importierte Ressource verwenden
    meme2,
    meme3,
    meme4, 
    'Du bisch s beste, was mir je passiert isch, und ich bin so dankbar, dich ih mim lebe zha.',
    bild44,

    // ... und so weiter für jeden Tag bis 24
  ];

  // Erzeugen von Daten für 24 Tage
  for (let i = 3; i < 24; i++) {
    adventData.push(`Inhalt Tag ${i + 1}`);
  }

  const handleEnableDay = (day) => {
    setEnabledDays([...enabledDays, day]);
  };

  return (
    <div className="adventskalender">
      {adventData.map((item, index) => {
        const isActive = index + 1 <= currentDay || enabledDays.includes(index + 1);
        return (
          <Card
            className="card"
            key={index + 1}
            day={index + 1}
            content={item}
            isActive={isActive}
            onEnable={handleEnableDay}
          />
        );
      })}
    </div>
  );
};

export default Adventskalender;
