import React, { useEffect, useState } from 'react';

// Хук для получения текущего времени с автообновлением
const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Обновляем время каждую минуту
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000); // 60 секунд

    return () => clearInterval(intervalId);
  }, []);

  return time;
};

// Компонент для отображения индикатора текущего времени (линия)
export const TimeIndicator: React.FC<{ isFirst?: boolean }> = ({ isFirst }) => {
  const currentTime = useCurrentTime();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  return (
    <div className="time-indicator">
      {isFirst && <div className="time-label">{timeString}</div>}
    </div>
  );
};

// Компонент для отображения индикатора времени в оси времени
export const TimeAxisIndicator: React.FC = () => {
  const currentTime = useCurrentTime();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  return <div className="time-axis-label">{timeString}</div>;
};

// Компонент для отображения меток времени в сетке
export const TimeSlotLabel: React.FC<{ time: Date }> = ({ time }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  // Отображаем часы только для нулевых минут
  const hourContent = minutes === 0 ? hours.toString().padStart(2, '0') : '';
  const minuteContent = minutes.toString().padStart(2, '0');

  return (
    <div className="fc-slot-label">
      <div className="fc-slot-hour-col">{hourContent}</div>
      <div className="fc-slot-minute-col">{minuteContent}</div>
    </div>
  );
};
