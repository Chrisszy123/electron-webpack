/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './styles/index.scss';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const color = document.getElementById("color");
      const result = document.getElementById("result");
      const submitBtn = document.getElementById("submitbtn");

      submitBtn.onclick = function submitColor() {
        const ipcRenderer = window.colorAPI;
        result.innerText = color.value.toUpperCase();
        // validate the value of color sent to the main process
        if (color.value !== "" || null) {
          ipcRenderer
            .invoke("submit:color", color.value)
            .then(function (res) {
              // set the background color based on the data from the main process
              document.body.style.background = res;
            })
            .catch(function (err) {
              console.error(err); // will print "This didn't work!" to the browser console.
            });
        } else {
          console.log("color value not supported");
        }
      };