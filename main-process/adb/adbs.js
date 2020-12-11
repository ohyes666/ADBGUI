const {ipcMain, dialog} = require('electron')

ipcMain.on('open-adb-dialog', (event,message,action) => {
  const options = {
    type: 'info',
    title: 'Information',
    message: message,
    buttons: ['确定', '取消']
  }
  dialog.showMessageBox(options, (index) => {
    
  }).then((index) => {
    
      event.sender.send('adb-dialog-selection', index.response,action)
    });
})


//选目录
ipcMain.on('choose-dir-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, (files) => {
    
  }).then((files) => {
    if (files) {
      event.sender.send('selected_directory', files.filePaths[0])
    }
  });
})