import { useState, useEffect } from 'react';

interface WorldClockProps {
  name: string;
  offset: number;
  onRemove: () => void;
}

export function WorldClock({ name, offset, onRemove }: WorldClockProps) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Очистка таймера — обязательное требование задания!
    return () => clearInterval(timer);
  }, []);

  // Вычисляем время с учетом смещения
  const utc = time.getTime() + time.getTimezoneOffset() * 60000;
  const cityTime = new Date(utc + offset * 3600000);

  // Вычисляем углы для стрелок
  const seconds = cityTime.getSeconds();
  const minutes = cityTime.getMinutes();
  const hours = cityTime.getHours();

  const secondDeg = seconds * 6; // 360 градусов / 60 секунд
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
      <h3>{name}</h3>
      
      {/* Сам циферблат */}
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '2px solid black',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Часовая стрелка */}
        <div style={{
          position: 'absolute', width: '3px', height: '30px', backgroundColor: 'black',
          transformOrigin: 'bottom center', transform: `rotate(${hourDeg}deg)`, bottom: '50%'
        }} />
        {/* Минутная стрелка */}
        <div style={{
          position: 'absolute', width: '2px', height: '40px', backgroundColor: 'gray',
          transformOrigin: 'bottom center', transform: `rotate(${minuteDeg}deg)`, bottom: '50%'
        }} />
        {/* Секундная стрелка */}
        <div style={{
          position: 'absolute', width: '1px', height: '45px', backgroundColor: 'red',
          transformOrigin: 'bottom center', transform: `rotate(${secondDeg}deg)`, bottom: '50%'
        }} />
        {/* Центральная точка */}
        <div style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: 'black', borderRadius: '50%' }} />
      </div>
      
      <button onClick={onRemove} style={{ marginTop: '10px', color: 'red' }}>Удалить</button>
    </div>
  );
}