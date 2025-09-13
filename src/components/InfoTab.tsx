import React from 'react';
import type { UserInfo } from '../types';
import { isEmailValid, isPhoneValid } from '../utils/validators';
import { InputField } from './common/InputField';

interface InfoTabProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const InfoTab: React.FC<InfoTabProps> = ({ userInfo, setUserInfo, errors, setErrors }) => {
  
  const validateField = (name: keyof UserInfo, value: string) => {
    let errorMsg = '';
    if (name === 'email' && value && !isEmailValid(value)) {
      errorMsg = 'Please enter a valid email address.';
    }
    if (name === 'phone' && value && !isPhoneValid(value)) {
      errorMsg = 'Please enter a valid phone number (e.g., +1234567890).';
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof UserInfo; value: string };
    setUserInfo(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <InputField
        label="First Name" id="firstName" name="firstName" type="text"
        value={userInfo.firstName} onChange={handleChange}
      />
      <InputField
        label="Last Name" id="lastName" name="lastName" type="text"
        value={userInfo.lastName} onChange={handleChange}
      />
      <div className="md:col-span-2">
        <InputField
          label="Email" id="email" name="email" type="email"
          value={userInfo.email} onChange={handleChange} error={errors.email}
        />
      </div>
      <div className="md:col-span-2">
        <InputField
          label="Phone" id="phone" name="phone" type="tel"
          value={userInfo.phone} onChange={handleChange} error={errors.phone}
        />
      </div>
    </div>
  );
};