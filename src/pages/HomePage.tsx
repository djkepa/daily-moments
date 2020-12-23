import React, { useEffect, useState } from 'react';
import {
  IonFabButton,
  IonContent,
  IonFab,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonThumbnail,
  IonImg,
} from '@ionic/react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { add as addIcon } from 'ionicons/icons';
import { formatDate } from '../date';
const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    // entriesRef.get().then(({ docs }) => setEntries(docs.map(toEntry)));
    return entriesRef
      .orderBy('date', 'desc')
      .limit(7)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Daily Moments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) => (
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}
            >
              <IonThumbnail slot="end">
                <IonImg src={entry.pictureUrl} />
              </IonThumbnail>
              <IonLabel>
                <h2>{entry.title}</h2>
                <h4 style={{ color: 'grey' }}>{formatDate(entry.date)}</h4>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
