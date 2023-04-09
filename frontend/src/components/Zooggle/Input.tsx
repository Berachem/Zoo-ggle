import React from 'react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  options?: string[];
  required?: boolean;
  onChange?: ( event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, options, required = false, onChange, onBlur, onFocus }) => {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  if (type === 'select' && options) {
    return (
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          htmlFor={inputId}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          {label}
        </label>
        <div className="relative">
          <select
            id={inputId}
            name={inputId}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          >
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        htmlFor={inputId}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={inputId}
        name={inputId}
        type={type}
        placeholder={placeholder}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};

export default Input;
