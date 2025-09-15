import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import "./Profile.scss";
import { PlatformInfo } from "../components/PlatformInfo";

type User = {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  joinDate: string;
};

export const Profile = () => {
  const history = useHistory();

  const mockUser: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150",
    phone: "+33 6 12 34 56 78",
    address: "123 Main St, Paris, France",
    joinDate: "January 2020",
  };

  const goBack = () => {
    if (history.length <= 2) {
      history.push("/home");
      return;
    }
    history.goBack();
  };

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar className="profile-toolbar">
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={goBack}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard className="profile-header-card">
          <IonCardContent className="profile-header-content">
            <div className="avatar-container">
              <IonAvatar className="profile-avatar">
                <IonImg src={mockUser.avatar} alt="Profile Avatar" />
              </IonAvatar>
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{mockUser.name}</h2>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contact Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h3>Email</h3>
                  <p>{mockUser.email}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Phone</h3>
                  <p>{mockUser.phone}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Address</h3>
                  <p>{mockUser.address}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Member Since</h3>
                  <p>{mockUser.joinDate}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <PlatformInfo />
      </IonContent>
    </IonPage>
  );
};
