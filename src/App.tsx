import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { IonReactRouter } from '@ionic/react-router';

import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/react';

import { AuthContext, useAuthInit } from './auth';

// Pages
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';

// Styles
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const css = require('./global.css');

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Redirect exact path="/" to="/my/entries" />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
