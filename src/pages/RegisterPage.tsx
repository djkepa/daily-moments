import React, { useState } from 'react';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const initialStatus = {
  loading: false,
  error: false,
};

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState(initialStatus);

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      console.dir('credential', credential);
    } catch (error) {
      setStatus({ loading: false, error: true });
      setErrorMessage(error.message);
    }
  };
  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="ion-padding-bottom">
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              color="primary"
              type="email"
              value={email}
              required
              onIonChange={(event) => setEmail(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              color="primary"
              min="5"
              type="password"
              value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            ></IonInput>
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">{errorMessage}</IonText>}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
