import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect

} from 'react-router-dom';

import { useAuth } from '../hooks/auth'; // Autenticação

interface RouteProps extends ReactDOMRouteProps{
  isPrivate?: boolean;
  component: React.ComponentType; /*Quando quero receber o componente na forma {Dashbard} */
}

// true / true = OK
// true / false = Redirecioanr ele para o login
// false/ true = Redirecionar para o Dashboard
// false / false = OK

const Route: React.FC<RouteProps> = ({isPrivate = false, component:Component, ...rest}) => {
  const {user} = useAuth();
  console.log(user, isPrivate)

  return (
    <ReactDOMRoute
    {...rest}
    render={({location}) => {  // Utilizamos o location para armazenar historico
      return isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: isPrivate? '/' : '/Dashboard',
          state: { from: location},

      }} /> // Se não está autenticado manda para o login, caso ao contrario dashboard
      );
    }}
    />

  );
};

export default Route;
