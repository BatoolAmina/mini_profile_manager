import React, { useState, useEffect } from 'react';
import type { Addresses, Address } from '../types';
import { AddressSection } from './AddressSection';

interface AddressesTabProps {
  addresses: Addresses;
  setAddresses: React.Dispatch<React.SetStateAction<Addresses>>;
}

type OpenSection = 'home' | 'work' | 'other' | null;

export const AddressesTab: React.FC<AddressesTabProps> = ({ addresses, setAddresses }) => {
    const [openSection, setOpenSection] = useState<OpenSection>('home');
    const [useWorkSameAsHome, setUseWorkSameAsHome] = useState(false);
    const [useOtherSameAsHome, setUseOtherSameAsHome] = useState(false);
  
    const handleToggle = (section: OpenSection) => {
      setOpenSection(prev => prev === section ? null : section);
    };
  
    const handleUpdate = (type: keyof Addresses, field: keyof Address, value: string) => {
      setAddresses(prev => ({
        ...prev,
        [type]: { ...(prev[type] || { street: '', city: '', country: '' }), [field]: value },
      }));
    };
  
    useEffect(() => {
      if (useWorkSameAsHome) {
        setAddresses(prev => ({ ...prev, work: prev.home }));
      }
    }, [useWorkSameAsHome, addresses.home]);

    useEffect(() => {
      if (useOtherSameAsHome) {
        setAddresses(prev => ({ ...prev, other: prev.home }));
      } else {
        if (addresses.other && addresses.other === addresses.home) {
            setAddresses(prev => ({ ...prev, other: { street: '', city: '', country: '' } }));
        }
      }
    }, [useOtherSameAsHome, addresses.home]);

  return (
    <div className="space-y-4">
      <AddressSection
        title="Home"
        address={addresses.home}
        isOpen={openSection === 'home'}
        onToggle={() => handleToggle('home')}
        onUpdate={(f, v) => handleUpdate('home', f, v)}
      />
      <AddressSection
        title="Work"
        address={addresses.work}
        isOpen={openSection === 'work'}
        onToggle={() => handleToggle('work')}
        onUpdate={(f, v) => handleUpdate('work', f, v)}
        useHomeAddress={useWorkSameAsHome}
        onCheckboxChange={e => setUseWorkSameAsHome(e.target.checked)}
      />
      <AddressSection
        title="Other"
        address={addresses.other ?? { street: '', city: '', country: '' }}
        isOpen={openSection === 'other'}
        onToggle={() => handleToggle('other')}
        onUpdate={(f, v) => handleUpdate('other', f, v)}
        useHomeAddress={useOtherSameAsHome}
        // THIS LINE IS CORRECTED
        onCheckboxChange={e => setUseOtherSameAsHome(e.target.checked)}
      />
    </div>
  );
};