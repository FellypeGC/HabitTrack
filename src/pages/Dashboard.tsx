import React, { useState } from 'react';
import {
  Plus,
  Check,
  Trash2,
  LayoutGrid,
  LogOut,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useHabits } from '../context/HabitContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { isSameDay, formatDate } from '../utils/date';
import { cn } from '../utils/cn';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { habits, addHabit, toggleHabit, deleteHabit, getWeeklyProgress } = useHabits();
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState('');

  const localeMap: Record<string, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
  };

  const currentLocale = localeMap[language] || 'pt-BR';

  const weeklyData = getWeeklyProgress(currentLocale);
  const today = new Date();

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitTitle.trim()) {
      addHabit(newHabitTitle.trim());
      setNewHabitTitle('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</span>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={onLogout} title={t('dashboard.logout')}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Habits List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('dashboard.myHabits')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {formatDate(today, currentLocale)}
                </p>
              </div>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {t('dashboard.newHabit')}
              </Button>
            </div>

            <div className="grid gap-4">
              {habits.length === 0 ? (
                <Card className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                    <LayoutGrid className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    {t('dashboard.noHabitsTitle')}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {t('dashboard.noHabitsDesc')}
                  </p>
                  <Button className="mt-6" onClick={() => setIsModalOpen(true)}>
                    {t('dashboard.createHabit')}
                  </Button>
                </Card>
              ) : (
                habits.map((habit) => {
                  const isCompleted = habit.completedDates.some((d) =>
                    isSameDay(new Date(d), today)
                  );

                  return (
                    <Card key={habit.id} className="flex items-center justify-between p-4 transition-all hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border-2 transition-all",
                            isCompleted
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-gray-300 hover:border-blue-500 dark:border-gray-600"
                          )}
                        >
                          {isCompleted && <Check className="h-5 w-5" />}
                        </button>
                        <span className={cn(
                          "text-lg font-medium transition-all",
                          isCompleted
                            ? "text-gray-400 line-through dark:text-gray-500"
                            : "text-gray-900 dark:text-white"
                        )}>
                          {habit.title}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHabit(habit.id)}
                        className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </Card>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Stats */}
          <div className="space-y-6">
            <Card>
              <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                {t('dashboard.weeklyProgress')}
              </h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme === 'dark' ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: theme === 'dark' ? '#1f2937' : '#f3f4f6' }}
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                        borderRadius: '0.5rem',
                        color: theme === 'dark' ? '#ffffff' : '#000000'
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {weeklyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.day === new Intl.DateTimeFormat(currentLocale, { weekday: 'short' }).format(today) ? '#3b82f6' : '#93c5fd'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('modal.newHabitTitle')}
      >
        <form onSubmit={handleAddHabit} className="space-y-4">
          <Input
            placeholder={t('modal.placeholder')}
            value={newHabitTitle}
            onChange={(e) => setNewHabitTitle(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={!newHabitTitle.trim()}>
              {t('modal.create')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
