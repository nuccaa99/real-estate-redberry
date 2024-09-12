import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './config/routes';

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route key={route} path={route.path} element={<route.Component />} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
