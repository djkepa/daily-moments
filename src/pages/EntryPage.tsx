import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { useHistory, useRouteMatch } from 'react-router';
import { Entry, toEntry } from '../models';
import { useAuth } from '../auth';
import { trashOutline } from 'ionicons/icons';
import { formatDate } from '../date';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { userId } = useAuth();
  const history = useHistory();
  const match = useRouteMatch<RouteParams>();
  const { id } = match.params;

  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [id, userId]);

  const handleDelete = async () => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    await entryRef.delete();
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowAlert(true)}>
              <IonIcon slot="icon-only" icon={trashOutline} color="danger" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass="my-custom-class"
          header={'Confirm enrty!'}
          message={'Do you want to remove this?'}
          buttons={[
            {
              text: 'Remove',
              cssClass: 'alertDanger',
              handler: () => {
                handleDelete();
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
