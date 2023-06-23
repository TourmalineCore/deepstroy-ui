import { Link } from 'react-router-dom';
import { faTruckFast, faStore, faTruckLoading } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from './components/LoginForm/LoginForm';

const pages = [
  {
    path: `/kpp`,
    name: `КПП`,
    Icon: () => (
      <FontAwesomeIcon
        icon={faTruckFast}
        fixedWidth
        className="sidebar-item__icon-mini"
      />
    ),
  },
  {
    path: `/storekeeper`,
    name: `Кладовщик`,
    Icon: () => (
      <FontAwesomeIcon
        icon={faStore}
        fixedWidth
        className="sidebar-item__icon-mini"
      />
    ),
  },
];

function LoginPage() {
  return (
    <div className="auth-page">
      <LoginForm>

        <h2 className="auth-page__title">Кем хотите быть?</h2>

        {pages.map(({ name, path, Icon }) => (
          <Link
            key={name}
            to={path}
            className="auth-page__link"
          >

            <span className="auth-page__icon">
              <Icon />
            </span>
            {name}
          </Link>
        ))}
      </LoginForm>
    </div>
  );
}

export default LoginPage;
