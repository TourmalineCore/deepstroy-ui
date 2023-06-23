import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Template from './template/Template';
import LoginPage from './pages/auth/LoginPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Navigate to="/pages" />}
        />
        <Route
          path="/pages"
          element={<LoginPage />}
        />
        <Route
          path="/*"
          element={<Template />}
        />
      </Routes>
    </BrowserRouter>
  );
}
