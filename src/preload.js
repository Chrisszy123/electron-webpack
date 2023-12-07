// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('colorAPI', {
  invoke: (channel, data) => {
      if (channel === "submit:color") {
          // ipcRenderer.invoke accesses ipcMain.handle channels like 'submit:color'
          return ipcRenderer.invoke(channel, data); 
      }else{
        console.log("cannot acess api, wrong channel")
      }
  },
});
