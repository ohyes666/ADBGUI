const {ipcMain, dialog} = require('electron')

// ipcMain.on('open-information-dialog', (event) => {
//   const options = {
//     type: 'info',
//     title: 'Information',
//     message: "This is an information dialog. Isn't it nice?",
//     buttons: ['Yes', 'No']
//   }
//   dialog.showMessageBox(options, (index) => {
//     console.log("-----------")
//     event.sender.send('information-dialog-selection', index)
//   })
// })


// ipcMain.on('open-information-dialog', (event) => {

//     const options = {
//     type: 'info',
//     message: "This is an information dialog. Isn't it nice?",
//     buttons: ['Yes', 'No']
//   }
 
//   dialog.showMessageBox(ipcMain, options).then((index) => {
//   console.log("-----------")
//   event.sender.send('information-dialog-selection', index.response)
// });


// })



ipcMain.on('open-information-dialog', (event) => {
  const options = {
    type: 'info',
    title: 'Information',
    message: "This is an information dialog. Isn't it nice?",
    buttons: ['确定', '取消']
  }
  dialog.showMessageBox(options, (index) => {
    console.log("-----------")
    event.sender.send('information-dialog-selection', index)
  }).then((index) => {
      console.log("-----------")
      event.sender.send('information-dialog-selection', index.response)
    });
})