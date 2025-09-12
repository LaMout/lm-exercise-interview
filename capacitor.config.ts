import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "fr.some",
  appName: "Interview",
  webDir: "dist-libmanuels",
  server: {
    hostname: "www.some.fr",
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Ionic,
      resizeOnFullScreen: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
