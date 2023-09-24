import { useCallback, useRef, useState } from "react";

export function useCountDown() {
  const timer = useRef<NodeJS.Timer>();
  const [value, setValue] = useState(0);

  const start = useCallback((ms: number, interval = 1000) => {
    let currentValue = ms;
    setValue(ms);
    timer.current = setInterval(() => {
      currentValue = currentValue - interval;
      if (currentValue <= 0) {
        setValue(0);
        clearInterval(timer.current);
        return;
      }
      setValue(currentValue);
    }, interval);
  }, []);

  const restart = () => {
    setValue(0);
    clearInterval(timer.current);
    return;
  };

  return {
    startCountdown: start,
    restartCountdown: restart,
    countdownValue: value,
  };
}
