import { useEffect } from 'react';
import { isSameDay } from '../utils/date';
import { useLocalStorage } from './useLocalStorage';

export const useDailyReset = (onReset: () => void) => {
  const [lastLoginDate, setLastLoginDate] = useLocalStorage<number>(
    'habittrack:lastLogin',
    Date.now()
  );

  useEffect(() => {
    const today = new Date();
    const lastDate = new Date(lastLoginDate);

    if (!isSameDay(today, lastDate)) {
      onReset();
      setLastLoginDate(Date.now());
    }
  }, [lastLoginDate, setLastLoginDate, onReset]);
};
