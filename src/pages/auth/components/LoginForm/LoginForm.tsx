import { FormEventHandler, ReactNode } from 'react';

import { ReactComponent as BgLeft } from '../../../../assets/auth-bg-left.svg';
import { ReactComponent as BgRight } from '../../../../assets/auth-bg-right.svg';

function LoginForm({
  children,
  errorMessages = [],
  onSubmit = () => {},
}: {
  children: ReactNode;
  errorMessages?: string[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <div className="auth-form">
      <BgLeft className="auth-form__bg-image auth-form__bg-image--left" />
      <BgRight className="auth-form__bg-image auth-form__bg-image--right" />

      <form
        className="auth-form__form"
        onSubmit={onSubmit}
      >
        <div className="auth-form__messages-box">
          {errorMessages.map((errorMessage) => (
            <div className="auth-form__message">
              {errorMessage}
            </div>
          ))}
        </div>

        {children}
      </form>
    </div>
  );
}

export default LoginForm;
