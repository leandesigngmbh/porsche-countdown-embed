"use client";

import { useEffect, useState } from "react";
import { AnimateNumber } from "motion-plus/react";

type CountdownProps = {
  targetTime: Date;
};

function Countdown({ targetTime }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +targetTime - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [targetTime]);

  return (
    <div className="flex gap-6 sm:gap-8 lg:gap-12 text-3xl sm:text-7xl lg:text-9xl font-bold">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <div key={unit} className="flex flex-col items-center">
          <AnimateNumber format={{ minimumIntegerDigits: 2 }}>
            {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
          </AnimateNumber>

          <span className="text-xs uppercase tracking-widest -mt-4">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
export default Countdown;
