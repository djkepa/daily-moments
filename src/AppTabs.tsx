import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { home as homeIcon, settings as settingIcon } from 'ionicons/icons';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';

// Pages
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingsPage';
import EntryPage from './pages/EntryPage';
import { useAuth } from './auth';
import AddEntryPage from './pages/addEntryPage';

interface Props {
  loggedIn: boolean;
}

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/my/entries" exact>
          <HomePage />
        </Route>
        <Route path="/my/entries/view/:id" exact>
          <EntryPage />
        </Route>
        <Route path="/my/entries/add" exact>
          <AddEntryPage />
        </Route>
        <Route path="/my/settings" exact>
          <SettingPage />
        </Route>
        {/* <Redirect exact path="/" to="/my/entries" /> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
