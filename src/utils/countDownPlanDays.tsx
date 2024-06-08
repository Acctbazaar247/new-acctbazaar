import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  additionalDays: number;
}

const CountDownPlanDays: React.FC<CountdownProps> = ({ targetDate, additionalDays }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    const targetDateIntoDate = new Date(targetDate)
    // Calculate the target date by adding the additional days
    const targetTime = targetDateIntoDate.getTime() + additionalDays * 24 * 60 * 60 * 1000;

    const updateClock = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Update the clock every second
    const interval = setInterval(updateClock, 1000);

    // Run the initial update to display the time immediately
    updateClock();

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate, additionalDays]);

  return (
    <span className='inline-flex text-sm font-bold items-center flex-wrap'>
      {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes, {timeLeft.seconds} Seconds
    </span>
  );
};

export default CountDownPlanDays