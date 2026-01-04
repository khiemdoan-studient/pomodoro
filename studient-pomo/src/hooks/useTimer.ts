import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

/**
 * Custom timer hook with drift prevention using Date.now() delta logic.
 * This ensures the timer doesn't drift when the app is minimized or backgrounded.
 */
export function useTimer(initialTime: number, onComplete?: () => void): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef(initialTime);
  const animationFrameRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    if (startTimeRef.current === null) return;

    const elapsed = Date.now() - startTimeRef.current;
    const newTimeLeft = Math.max(0, remainingTimeRef.current - Math.floor(elapsed / 1000));

    setTimeLeft(newTimeLeft);

    if (newTimeLeft <= 0) {
      setIsRunning(false);
      startTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      onComplete?.();
    } else {
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [onComplete]);

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
      remainingTimeRef.current = timeLeft;
      setIsRunning(true);
    }
  }, [isRunning, timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null;
    remainingTimeRef.current = timeLeft;
  }, [timeLeft]);

  const reset = useCallback(() => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null;
    setTimeLeft(initialTime);
    remainingTimeRef.current = initialTime;
  }, [initialTime]);

  useEffect(() => {
    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, tick]);

  // Update when initialTime changes (e.g., mode switch)
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialTime);
      remainingTimeRef.current = initialTime;
    }
  }, [initialTime, isRunning]);

  return { timeLeft, isRunning, start, pause, reset };
}
