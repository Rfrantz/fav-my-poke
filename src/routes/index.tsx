import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from '../components/Header/Header';

import { PUBLIC_ROUTES } from './public-routes';

const APP_ROUTES = [...PUBLIC_ROUTES];

export const AppRoutes = () => (
  <Routes>
    <Route path={'/'} element={<Navigate to="/home" replace></Navigate>} />
    {/* <Route path={'/login'} element={<Login></Login>} /> */}
    {APP_ROUTES.map(({ component: Component, path, title }) => (
      <Route
        key={path}
        path={path}
        element={
          <>
            <Header page={title}></Header>
            <Component />
          </>
        }
      />
    ))}
  </Routes>
);
