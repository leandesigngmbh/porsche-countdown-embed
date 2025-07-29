"use client";

import { useEffect, useState } from "react";

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

  // Animation: fade in and scale up on change
  return (
    <div className="flex gap-6 sm:gap-8 lg:gap-12 text-3xl sm:text-7xl lg:text-9xl font-bold">
      {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
        <div key={unit} className="flex flex-col items-center">
          <span
            className="transition-all duration-300 ease-out transform animate-pulse"
            style={{
              animation:
                timeLeft[unit as keyof typeof timeLeft] !== 0
                  ? "countdown-pop 0.3s"
                  : undefined,
            }}
          >
            {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
          </span>

          <span className="text-xs uppercase tracking-widest">{unit}</span>
          {/* {idx < 3 && (
            <span className="mx-2 text-blue-400 text-4xl font-light">:</span>
          )} */}
        </div>
      ))}
      <style jsx>{`
        @keyframes countdown-pop {
          0% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
export default Countdown;
