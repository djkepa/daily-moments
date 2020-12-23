import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import { auth } from '../firebase';

const SettingPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block" onClick={() => auth.signOut()}>
          {' '}
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingPage;
