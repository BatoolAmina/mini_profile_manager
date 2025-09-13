import React from 'react';
import type { Address } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { InputField } from './common/InputField';

interface AddressSectionProps {
    title: 'Home' | 'Work' | 'Other';
    address: Address;
    isOpen: boolean;
    onToggle: () => void;
    onUpdate: (field: keyof Address, value: string) => void;
    useHomeAddress?: boolean;
    onCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  title, address, isOpen, onToggle, onUpdate, useHomeAddress, onCheckboxChange
}) => {
  const isCheckable = title !== 'Home';
  const isDisabled = isCheckable && useHomeAddress;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.name as keyof Address, e.target.value);
  };
  
  return (
    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 bg-[var(--bg-tertiary)] hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`address-content-${title.toLowerCase()}`}
      >
        <span className="font-medium text-[var(--text-primary)]">{title} Address</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="text-[var(--text-secondary)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
            id={`address-content-${title.toLowerCase()}`}
          >
            <div className="p-4 space-y-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
              {isCheckable && (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-[var(--border-color)] text-[var(--primary-accent)] focus:ring-[var(--primary-accent)]" checked={useHomeAddress} onChange={onCheckboxChange} />
                  <span className="text-sm text-[var(--text-secondary)]">Use same as Home</span>
                </label>
              )}
              <InputField label="Street" id={`street-${title}`} name="street" value={address.street} onChange={handleChange} disabled={isDisabled} />
              <InputField label="City" id={`city-${title}`} name="city" value={address.city} onChange={handleChange} disabled={isDisabled} />
              <InputField label="Country" id={`country-${title}`} name="country" value={address.country} onChange={handleChange} disabled={isDisabled} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};