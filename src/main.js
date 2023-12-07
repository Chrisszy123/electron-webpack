
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Desktop App",
    width: 1000,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.webContents.openDevTools();
  const startUrl = url.format({
    pathname: path.join(__dirname, "./renderer/index.html"),
    protocol: "file",
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});
// listen to color submit channel
ipcMain.handle("submit:color", async (event, ...args) => {
  return new Promise(function (resolve, reject) {
    // do stuff
    if (true) {
      resolve(...args);
    } else {
      reject("this didn't work!");
    }
  });
});

// check if we are on a MAC and close the app appropraitely
app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    app.quit();
  }
}); 
