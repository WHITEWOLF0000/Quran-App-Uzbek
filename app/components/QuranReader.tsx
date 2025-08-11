
'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import SettingsPanel from './SettingsPanel';
import SurahList from './SurahList';
import QuranText from './QuranText';

export interface Settings {
  isDark: boolean;
  fontSize: number;
  arabicFontSize: number;
  arabicFont: string;
  font: string;
  textColor: string;
  backgroundColor: string;
  showTranscription: boolean;
  showTranslation: boolean;
  primaryColor: string;
  buttonColor: string;
  scriptType: 'latin' | 'cyrillic';
}

const defaultSettings: Settings = {
  isDark: false,
  fontSize: 16,
  arabicFontSize: 24,
  arabicFont: 'indopak',
  font: 'Inter',
  textColor: '#000000',
  backgroundColor: '#ffffff',
  showTranscription: true,
  showTranslation: true,
  primaryColor: '#3B82F6',
  buttonColor: '#3B82F6',
  scriptType: 'latin',
};

export default function QuranReader() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [scriptType, setScriptType] = useState<'latin' | 'cyrillic'>('latin');
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([]);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const savedSettings = localStorage.getItem('quranSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Sozlamalarni yuklashda xatolik:', error);
        setSettings(defaultSettings);
      }
    }

    const savedScriptType = localStorage.getItem('scriptType');
    if (savedScriptType && (savedScriptType === 'latin' || savedScriptType === 'cyrillic')) {
      setScriptType(savedScriptType);
    }

    const savedSelectedSurah = localStorage.getItem('selectedSurah');
    if (savedSelectedSurah) {
      const surahNumber = parseInt(savedSelectedSurah);
      if (surahNumber >= 1 && surahNumber <= 114) {
        setSelectedSurah(surahNumber);
        setCurrentSurah(surahNumber);
      }
    }

    const savedBookmarks = localStorage.getItem('bookmarkedSurahs');
    if (savedBookmarks) {
      try {
        setBookmarkedSurahs(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Saqlangan suralarni yuklashda xatolik:', error);
        setBookmarkedSurahs([]);
      }
    }

    // Listen for script type changes
    const handleScriptTypeChange = (event: CustomEvent) => {
      setScriptType(event.detail);
    };

    window.addEventListener('scriptTypeChanged', handleScriptTypeChange as EventListener);

    return () => {
      window.removeEventListener('scriptTypeChanged', handleScriptTypeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('quranSettings', JSON.stringify(settings));
    }
  }, [settings, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('scriptType', scriptType);
    }
  }, [scriptType, mounted]);

  useEffect(() => {
    if (mounted && selectedSurah !== null) {
      localStorage.setItem('selectedSurah', selectedSurah.toString());
    } else if (mounted && selectedSurah === null) {
      localStorage.removeItem('selectedSurah');
    }
  }, [selectedSurah, mounted]);

  const toggleBookmark = (surahNumber: number) => {
    const updated = bookmarkedSurahs.includes(surahNumber)
      ? bookmarkedSurahs.filter(s => s !== surahNumber)
      : [...bookmarkedSurahs, surahNumber];

    setBookmarkedSurahs(updated);
    localStorage.setItem('bookmarkedSurahs', JSON.stringify(updated));
  };

  const handleSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const handleScriptTypeChange = (type: 'latin' | 'cyrillic') => {
    setScriptType(type);
  };

  const handlePrevious = () => {
    if (currentSurah && currentSurah > 1) {
      setCurrentSurah(currentSurah - 1);
    }
  };

  const handleNext = () => {
    if (currentSurah && currentSurah < 114) {
      setCurrentSurah(currentSurah + 1);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Quran App yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${settings.isDark ? 'bg-gray-900' : 'bg-gray-50'}`} style={{ backgroundColor: settings.backgroundColor, fontFamily: settings.font }}>

      {/* Header */}
      <Header
        settings={settings}
        onSettingsClick={() => setShowSettings(true)}
        onBackClick={selectedSurah ? () => setSelectedSurah(null) : undefined}
        currentSurah={selectedSurah}
        scriptType={scriptType}
      />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Content */}
      <div className="pt-20 pb-4">
        {selectedSurah ? (
          <QuranText
            surahNumber={selectedSurah}
            settings={settings}
            onSurahChange={setSelectedSurah}
            scriptType={scriptType}
            bookmarkedSurahs={bookmarkedSurahs}
            onToggleBookmark={toggleBookmark}
            onScriptTypeChange={handleScriptTypeChange}
          />
        ) : (
          <SurahList
            settings={settings}
            onSurahSelect={setSelectedSurah}
            scriptType={scriptType}
            onScriptTypeChange={handleScriptTypeChange}
            bookmarkedSurahs={bookmarkedSurahs}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </div>
    </div>
  );
}
