import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from '../components/Header/Header';

import { PUBLIC_ROUTES } from './public-routes';

const APP_ROUTES = [...PUBLIC_ROUTES];

// Functional component 'AppRoutes'
export const AppRoutes = () => (
  <Routes>
    {/* Define a default root route that navigates to "/home" using <Navigate> component with "replace" prop */}
    <Route path={'/'} element={<Navigate to="/home" replace></Navigate>} />

    {/* Iterate over each route object in the APP_ROUTES array,
      and create a <Route> component for each route */}
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
