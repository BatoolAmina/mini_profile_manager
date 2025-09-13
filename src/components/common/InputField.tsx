import React from 'react';

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      <input
        id={id}
        className={`mt-1 block w-full px-3 py-2 
          bg-[var(--bg-secondary)] 
          text-[var(--text-primary)] 
          border border-[var(--border-color)] 
          rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)] 
          sm:text-sm
          /* These styles apply when the input is disabled */
          disabled:bg-[var(--bg-disabled)] 
          disabled:text-[var(--text-disabled)] 
          disabled:cursor-not-allowed`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};