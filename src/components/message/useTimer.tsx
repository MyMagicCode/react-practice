import { useEffect, useRef } from "react";

export interface UseTimerProps {
  duration?: number;
  id: number;
  remove: (id: number) => void;
}

export function useTimer(props: UseTimerProps) {
  const { duration = 2000, id, remove } = props;

  const timer = useRef<number | null>(null);

  const startTimer = () => {
    timer.current = window.setTimeout(() => {
      remove(id);
      // 重置timer的值
      removeTimer();
    }, duration);
  };

  const removeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => removeTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseEnter = () => {
    removeTimer();
  };

  const onMouseLeave = () => {
    startTimer();
  };

  return {
    onMouseEnter,
    onMouseLeave,
  };
}
