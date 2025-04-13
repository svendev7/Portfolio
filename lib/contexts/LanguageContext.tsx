"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from '../translations/en';
import { nl } from '../translations/nl';

type Language = 'en' | 'nl';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get browser language
    const browserLang = navigator.language.split('-')[0];
    // Set language to Dutch if browser language is Dutch, otherwise English
    setLanguage(browserLang === 'nl' ? 'nl' : 'en');
  }, []);

  const translations = {
    en,
    nl,
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 