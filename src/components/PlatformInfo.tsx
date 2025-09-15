import { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { Device } from "@capacitor/device";
import "./PlatformInfo.scss";
import {
  AppPlatform,
  AppOperatingSystem,
  getPlatform,
  getOperatingSystem,
  isMobile,
  isDesktop,
  isElectron,
} from "../utils/platform";
import {
  globeOutline,
  logoApple,
  logoAndroid,
  logoWindows,
} from "ionicons/icons";

interface DeviceInfo {
  platform: AppPlatform;
  operatingSystem: AppOperatingSystem;
  name: string;
  model: string;
  webViewVersion: string;
}

export const PlatformInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const [platform, operatingSystem, info] = await Promise.all([
          getPlatform(),
          getOperatingSystem(),
          Device.getInfo(),
        ]);

        setDeviceInfo({
          platform,
          operatingSystem,
          name: info.name || "Unknown Device",
          model: info.model || "Unknown Model",
          webViewVersion: info.webViewVersion || "N/A",
        });
      } catch (error) {
        console.error("Error fetching device info:", error);
      }
    };

    fetchDeviceInfo();
  }, []);

  const getOSIcon = () => {
    if (!deviceInfo) return globeOutline;

    switch (deviceInfo.operatingSystem) {
      case "ios":
        return logoApple;
      case "android":
        return logoAndroid;
      case "windows":
        return logoWindows;
      case "mac":
        return logoApple;
      default:
        return globeOutline;
    }
  };

  const getPlatformSpecificContent = () => {
    if (!deviceInfo) return null;

    if (isMobile()) {
      return (
        <div className="platform-content">
          <p className="content-description">Interaction: Tap to interact</p>
          <p className="content-description">Navigation: Use swipe gestures</p>
        </div>
      );
    }

    if (isElectron() || isDesktop()) {
      return (
        <div className="platform-content">
          <p className="content-description">Interaction: Click to interact</p>
          <p className="content-description">
            Shortcuts: Ctrl+R to refresh, Ctrl+Q to quit
          </p>
        </div>
      );
    }

    // Web browser
    return (
      <div className="platform-content">
        <p className="content-description">
          Interaction: Click or touch to interact
        </p>
        <p className="content-description">Navigation: Use browser controls</p>
      </div>
    );
  };

  if (!deviceInfo) {
    return null;
  }

  return (
    <IonCard className="platform-info">
      <IonCardHeader>
        <IonCardTitle className="platform-header">
          Platform Information
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="device-info">
          <p className="info-item">Platform: {deviceInfo.platform}</p>
          <p>
            Operating System: <IonIcon icon={getOSIcon()} />{" "}
            {deviceInfo.operatingSystem}
          </p>
          <p>Device: {deviceInfo.name}</p>
          {deviceInfo.model && <p>Model: {deviceInfo.model}</p>}
          {deviceInfo.webViewVersion && (
            <p>WebView: {deviceInfo.webViewVersion}</p>
          )}
        </div>
        {getPlatformSpecificContent()}
      </IonCardContent>
    </IonCard>
  );
};
