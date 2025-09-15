import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();

  const goToProfile = () => {
    history.push("/profile");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Accueil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton onClick={goToProfile}>
          <IonIcon slot="start" icon={person} />
          Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
