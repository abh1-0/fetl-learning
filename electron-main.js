import path from "path";
import { app, BrowserWindow } from "electron";

const isDev = process.env.NODE_ENV !== "production";
const serverUrl = "http://localhost:3000";

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    await mainWindow.loadURL(serverUrl);
  } else {
    await mainWindow.loadFile(path.join(process.cwd(), "dist", "index.html"));
  }

  mainWindow.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
