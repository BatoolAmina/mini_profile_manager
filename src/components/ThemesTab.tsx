import React from 'react';
import type { Theme } from '../types';
import { FiSun, FiMoon, FiZap } from 'react-icons/fi';
interface ThemesTabProps {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}
const themeOptions = [
  { value: 'blue' as Theme, label: 'Blue', icon: <FiSun className="text-blue-500" /> },
  { value: 'dark' as Theme, label: 'Dark', icon: <FiMoon className="text-purple-500" /> },
  { value: 'dynamic' as Theme, label: 'Dynamic', icon: <FiZap className="text-yellow-500" /> },
];
export const ThemesTab: React.FC<ThemesTabProps> = ({ selectedTheme, setSelectedTheme }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-[var(--text-primary)]">Select a Theme</h3>
      {themeOptions.map(({ value, label, icon }) => (
        <label key={value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${ 
          selectedTheme === value
              ? 'border-[var(--primary-accent)] ring-2 ring-[var(--primary-accent)]'
              : 'border-[var(--border-color)] hover:border-gray-500'
          }`}
        >
          <input type="radio" name="theme" value={value} checked={selectedTheme === value} onChange={() => setSelectedTheme(value)} className="sr-only"
          />
          <div className="mr-4 text-xl">{icon}</div>
          <span className="font-medium text-[var(--text-primary)]">{label}</span>

        </label>
      ))}
    </div>
  );
};