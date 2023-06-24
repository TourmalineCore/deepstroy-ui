import clsx from 'clsx';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputType extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

function Input({
  label,
  id,
  className,
  ...props
}: InputType) {
  return (
    <div className={clsx(`input`, className)}>
      {label && (
        <label
          htmlFor={id}
          className="input__label"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(`input__control`)}
        {...props}
      />
    </div>
  );
}

export default Input;
