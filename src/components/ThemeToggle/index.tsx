import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={t('dashboard.toggleTheme')}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      )}
    </Button>
  );
};
