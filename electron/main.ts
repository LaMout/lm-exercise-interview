import { app, BrowserWindow } from "electron";
import { join } from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (!app.isPackaged) mainWindow.loadURL("http://localhost:5173");
  else
    mainWindow.loadFile(join(app.getAppPath(), "dist-libmanuels/index.html"));
});
