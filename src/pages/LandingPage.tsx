import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, CheckCircle2, BarChart3, Moon, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

import { ThemeToggle } from '../components/ThemeToggle';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">HabitTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">{t('common.login')}</Button>
            </Link>
            <Link to="/register">
              <Button>{t('common.createAccount')}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t('landing.heroTitle')}<br />
              <span className="text-blue-600">{t('landing.heroSubtitle')}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              {t('landing.heroDescription')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  {t('landing.startNow')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  {t('landing.alreadyHaveAccount')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-24 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('landing.howItWorks')}
              </h2>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('landing.feature1Title')}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {t('landing.feature1Desc')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('landing.feature2Title')}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {t('landing.feature2Desc')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <Moon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('landing.feature3Title')}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {t('landing.feature3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
