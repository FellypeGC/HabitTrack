import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDailyReset } from '../hooks/useDailyReset';
import { isSameDay } from '../utils/date';

export interface Habit {
  id: string;
  title: string;
  completedDates: number[]; // timestamps of completion
  createdAt: number;
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (title: string) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  getWeeklyProgress: () => { day: string; count: number }[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habittrack:habits', []);

  // Reset logic: actually we don't need to "reset" the state if we store completedDates.
  // We just check if today is in completedDates.
  // But the requirement says "Reset diário automático do status".
  // If we store completedDates, the UI will naturally show unchecked for a new day.
  // However, if we want to explicitly clear something or handle streaks, we might need logic.
  // The prompt says "Reset diário automático do status (use lógica de data)".
  // Storing completedDates is the best way to handle this + history/charts.
  // So "reset" is implicit: today is not in the list yet.
  // But I'll use useDailyReset to maybe log something or handle streak logic if I were to add it.
  // For now, I'll keep it simple and just rely on the data structure.

  useDailyReset(() => {
    console.log('New day! Habits status reset visually.');
  });

  const addHabit = (title: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      completedDates: [],
      createdAt: Date.now(),
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const today = new Date();
          const isCompletedToday = habit.completedDates.some((date) =>
            isSameDay(new Date(date), today)
          );

          let newCompletedDates;
          if (isCompletedToday) {
            newCompletedDates = habit.completedDates.filter(
              (date) => !isSameDay(new Date(date), today)
            );
          } else {
            newCompletedDates = [...habit.completedDates, Date.now()];
          }

          return { ...habit, completedDates: newCompletedDates };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const getWeeklyProgress = () => {
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      last7Days.push(d);
    }

    return last7Days.map((date) => {
      const count = habits.reduce((acc, habit) => {
        const completed = habit.completedDates.some((d) => isSameDay(new Date(d), date));
        return acc + (completed ? 1 : 0);
      }, 0);

      return {
        day: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date),
        count,
      };
    });
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit, getWeeklyProgress }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
