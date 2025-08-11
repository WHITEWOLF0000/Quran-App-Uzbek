
'use client';
import { Settings } from './QuranReader';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onClose: () => void;
}

export default function SettingsPanel({ settings, onSettingsChange, onClose }: SettingsPanelProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: settings.isDark ? '#1f2937' : '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold" style={{ color: settings.textColor }}>
            Sozlamalar
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
            style={{ color: settings.textColor }}
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: settings.textColor }}>Tun rejimi</span>
            <button
              onClick={() => onSettingsChange({
                ...settings,
                isDark: !settings.isDark,
                backgroundColor: !settings.isDark ? '#1f2937' : '#ffffff',
                textColor: !settings.isDark ? '#ffffff' : '#000000'
              })}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.isDark ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                settings.isDark ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="mb-6">
          <label className="block mb-3" style={{ color: settings.textColor }}>
            Shrift o'lchami: {settings.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={settings.fontSize}
            onChange={(e) => onSettingsChange({
              ...settings,
              fontSize: parseInt(e.target.value)
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Display Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span style={{ color: settings.textColor }}>Transkripsiyani ko'rsatish</span>
            <button
              onClick={() => onSettingsChange({
                ...settings,
                showTranscription: !settings.showTranscription
              })}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.showTranscription ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                settings.showTranscription ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span style={{ color: settings.textColor }}>Tarjimani ko'rsatish</span>
            <button
              onClick={() => onSettingsChange({
                ...settings,
                showTranslation: !settings.showTranslation
              })}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.showTranslation ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                settings.showTranslation ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
