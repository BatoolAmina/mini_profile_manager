import React, { useState, useEffect } from 'react';
import type { UserInfo, Theme, Addresses, ProfilePayload } from '../types';
import { InfoTab } from './InfoTab';
import { ThemesTab } from './ThemesTab';
import { AddressesTab } from './AddressesTab';
import { isEmailValid, isPhoneValid } from '../utils/validators';

import { FiUser, FiMapPin, FiLoader } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: 'info', label: 'Info', icon: <FiUser /> },
  { id: 'themes', label: 'Themes', icon: <FaPalette /> },
  { id: 'addresses', label: 'Addresses', icon: <FiMapPin /> },
];

export const ProfileCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [isDynamicLoading, setIsDynamicLoading] = useState(false);
  
  const [userInfo, setUserInfo] = useState<UserInfo>({ firstName: 'John', lastName: 'Doe', email: 'john@doe.com', phone: '+919876543210' });
  const [selectedTheme, setSelectedTheme] = useState<Theme>('blue');
  const [addresses, setAddresses] = useState<Addresses>({ home: { street: '123 Home St', city: 'Homeville', country: 'Homeland' }, work: { street: '', city: '', country: '' }, other: null });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payload, setPayload] = useState<string>('');

  useEffect(() => {
    const root = document.documentElement;
    if (selectedTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (selectedTheme !== 'dynamic') {
      root.style.removeProperty('--primary-accent');
      root.style.removeProperty('--primary-accent-hover');
    }
    if (selectedTheme === 'dynamic') {
      setIsDynamicLoading(true);
      setTimeout(() => {
        root.style.setProperty('--primary-accent', '#db2777');
        root.style.setProperty('--primary-accent-hover', '#c026d3');
        setIsDynamicLoading(false);
      }, 1000);
    }
  }, [selectedTheme]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!userInfo.firstName) newErrors.firstName = "First name can't be empty.";
    if (!isEmailValid(userInfo.email)) newErrors.email = 'Please enter a valid email.';
    if (!isPhoneValid(userInfo.phone)) newErrors.phone = 'Please enter a valid phone number.';
    setErrors(newErrors);
    return Object.keys(newErrors).every(key => !newErrors[key]);
  };

  const handleSave = () => {
    if (!validateForm()) {
        alert('Please fix the errors before saving.');
        setActiveTab('info');
        return;
    }
    const finalPayload: ProfilePayload = {
      info: userInfo, theme: selectedTheme,
      addresses: {
        home: addresses.home,
        work: addresses.work.street ? addresses.work : null,
        other: addresses.other?.street ? addresses.other : null,
      },
    };
    const payloadString = JSON.stringify(finalPayload, null, 2);
    
    console.log("Generated Payload:", payloadString);
    setPayload(payloadString);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-0 sm:my-8 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
      <div className="p-4 sm:p-6">
        <div className="border-b border-[var(--border-color)]">
          <nav className="-mb-px flex space-x-2 sm:space-x-6" aria-label="Tabs">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`${activeTab === tab.id ? 'border-[var(--primary-accent)] text-[var(--primary-accent)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-gray-300'} 
                  flex items-center whitespace-nowrap py-3 px-2 sm:py-4 sm:px-4 border-b-2 font-medium text-[var(--font-size-base)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-accent)] rounded-t-sm`}
              >
                {isDynamicLoading && tab.id === 'themes' ? <FiLoader className="animate-spin mr-2" /> : <span className="mr-2">{tab.icon}</span>}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'info' && <InfoTab userInfo={userInfo} setUserInfo={setUserInfo} errors={errors} setErrors={setErrors} />}
              {activeTab === 'themes' && <ThemesTab selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />}
              {activeTab === 'addresses' && <AddressesTab addresses={addresses} setAddresses={setAddresses} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="px-4 sm:px-6 py-4 bg-[var(--bg-tertiary)] flex justify-end border-t border-[var(--border-color)] transition-colors duration-300">
        <button onClick={handleSave} className="w-full sm:w-auto px-6 py-2 bg-[var(--primary-accent)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--primary-accent-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-accent)] transition-transform transform hover:scale-105 text-[var(--font-size-base)]">
          Save Profile
        </button>
      </div>

      <AnimatePresence>
        {payload && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <div className="p-6 border-t border-[var(--border-color)]">
                    <h3 className="text-[var(--font-size-lg)] font-medium text-[var(--text-primary)] mb-2">
                      Saved Payload
                    </h3>
                    <pre className="p-4 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg text-[var(--font-size-base)] overflow-x-auto">
                      <code>{payload}</code>
                    </pre>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};