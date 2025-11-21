import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';
import { cn } from '../../utils/cn';
import { type Language } from '../../utils/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const getLabel = () => {
    if (language === 'pt') return 'PT';
    if (language === 'en') return 'EN';
    return 'ES';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        title="Alternar idioma / Switch language / Cambiar idioma"
        className="flex items-center gap-2"
      >
        <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-5">
          {getLabel()}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm text-left",
                  "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  "dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                  language === lang.code && "bg-gray-50 dark:bg-gray-700/50 font-medium text-blue-600 dark:text-blue-400"
                )}
              >
                <span>{lang.label}</span>
                {language === lang.code && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
