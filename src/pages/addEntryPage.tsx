import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonDatetime,
  isPlatform,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { camera } from 'ionicons/icons';

const { Camera } = Plugins;

interface RouteParams {
  id: string;
}

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved picture:', url);
  return url;
}

const AddEntryPage: React.FC = () => {
  const [date, setDate] = useState('');
  const history = useHistory();
  const { userId } = useAuth();
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(
    () => () => {
      if (pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl],
  );

  const handleSave = async () => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    const entryData = { date, title, pictureUrl, description };
    if (!pictureUrl.startsWith('/assets')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved:', entryRef.id);
    history.goBack();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureURL = URL.createObjectURL(file);
      setPictureUrl(pictureURL);
    }
  };
  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      fileInputRef.current.click();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date: </IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title: </IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture </IonLabel> <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
            <img
              src={pictureUrl}
              alt="placeholder"
              onClick={handlePictureClick}
              style={{ cursor: 'pointer' }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description: </IonLabel>
            <IonInput
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
