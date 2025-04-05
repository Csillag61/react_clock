import React, { useState, useEffect } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [clockName, setClockName] = useState<string>('Clock-0');
  const [time, setTime] = useState(new Date().toUTCString().slice(-12, -4));
  const [hasClock, setHasClock] = useState<boolean>(true);

  useEffect(() => {
    // Start a timer to update the clock name every 3300ms
    const nameTimerId = window.setInterval(() => {
      setClockName(prevName => {
        const newName = getRandomName();
        // eslint-disable-next-line no-console
        console.warn(`Renamed from ${prevName} to ${newName}`);

        return newName;
      });
    }, 3300);

    // Start a timer to update the time every second

    const timeTimerId = window.setInterval(() => {
      setTime(new Date().toUTCString().slice(-12, -4));
      // eslint-disable-next-line no-console
      console.log(`Time updated to ${new Date().toUTCString().slice(-12, -4)}`);
    }, 1000);

    // Clear the timers when the component unmounts

    return () => {
      window.clearInterval(nameTimerId);
      window.clearInterval(timeTimerId);
    };
  }, []);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setHasClock(false); // Hide the clock on right-click
    };

    const handleClick = () => {
      setHasClock(true); // Show the clock on left-click
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>
          {' time is '}
          <span className="Clock__time">{time}</span>
        </div>
      )}
    </div>
  );
};
