import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

interface InputType extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  invalid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputType>((props: InputType, ref) => {
  const {
    label, id, className, invalid, ...otherProps
  } = props;

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
        ref={ref}
        id={id}
        className={clsx(`input__control`, {
          'input__control--invalid': invalid,
        })}
        {...otherProps}
      />
    </div>
  );
});

export default Input;
