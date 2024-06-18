// Placeholder to host a component
import { useState, useEffect } from 'react';

const Hours = () => {
    const [time, setTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        setTime(now);
        const openStatus = checkIfOpen(now);
        setIsOpen(openStatus);
        setTimeLeft(calculateTimeLeft(now, openStatus));
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const checkIfOpen = (currentTime) => {
      const day = currentTime.getDay();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
  
      if (day >= 1 && day <= 5) {
        return (hours >= 10) && (hours < 16 || (hours === 16 && minutes === 0));
      } else {
        return (hours >= 9) && (hours < 20 || (hours === 20 && minutes === 0));
      }
    };
  
    const calculateTimeLeft = (currentTime, openStatus) => {
      const day = currentTime.getDay();
      let closingHour, closingMinute = 0;
  
      if (day >= 1 && day <= 5) {
        closingHour = 16;
      } else {
        closingHour = 20;
      }
  
      if (!openStatus) {
        return "Cerrado";
      }
  
      const closingTime = new Date(currentTime);
      closingTime.setHours(closingHour, closingMinute, 0);
  
      const timeDifference = closingTime - currentTime;
  
      const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    };
  
    return (
      <div>
        <h2>Hora actual:</h2>
        <p>{time.toLocaleTimeString()}</p>
        <h3>
          {isOpen ? "Estamos abiertos" : "Estamos cerrados"}
        </h3>
        {isOpen && (
          <p>Tiempo restante hasta cerrar: {timeLeft}</p>
        )}
      </div>
    );
}

export default Hours;