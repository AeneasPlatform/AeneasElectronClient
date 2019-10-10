'use strict';

import { app, BrowserWindow, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


let mainWindow;

const isdev = process.env.NODE_ENV === 'development' 
const winURL = isdev
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function runApp () {
  let child = require('child_process').execFile;

  let os = process.platform;
  let executablePath = ''

  if (os === 'linux') {
    executablePath = "./run.sh"
  } else if (os === 'win32') {
    executablePath = './run.ps1'
  }

  child(executablePath, function(err, data) {
    if(err){
       console.error(err);
       return;
    }
 
    console.log(data.toString());


  });


}

function stopApp () {
  let child = require('child_process').execFile;

  let os = process.platform;
  let executablePath = ''

  if (os === 'linux') {
    executablePath = "./stop.sh"
  }
  // else if (os === 'win32') {
  //   executablePath = './stop.ps1'
  // }
  child(executablePath, function(err, data) {
    if(err){
       console.error(err);
       return;
    }
 
    console.log(data.toString());

  });


}

function createWindow () {
  /**
   * Initial window options
   */
  let template = [{
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  });


  var os = require('os');
  console.log('YOUR OS = ' + process.platform);
  console.log('YOUR OS = ' + os.platform());

  mainWindow.loadURL(winURL);
  if (!isdev) runApp()
  mainWindow.on('closed', () => {
    if (!isdev) stopApp()
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
