const {
  ipcRenderer
} = require('electron')

const settings = require('electron-settings')
const {shell} = require('electron')

const exec = require('child_process').exec

const informationBtn = document.getElementById('device-list')
const screenshotBtn = document.getElementById('screenshot')
const pullSSBtn = document.getElementById('pull-screenshot')
const clearSSBn = document.getElementById('clear-screenshot')
const picNameInput = document.getElementById('input_pic_name')
const chooseDirBtn = document.getElementById('choose-dir')
const openDirBtn = document.getElementById('open-dir')

savePath = settings.get('save_path', '');


document.getElementById('local_path_tv').innerHTML = savePath


informationBtn.addEventListener('click', (event) => {
  let cmd = 'adb devices'
  workerProcess = exec(cmd)
  workerProcess.stdout.on('data', function (data) {
    showMessage(data)
  })
})



screenshotBtn.addEventListener('click', (event) => {
  let cmd = 'adb shell screencap -p /sdcard/Pictures/Screenshots/' + picNameInput.value + '.png'
  workerProcess = exec(cmd)

  //执行错误 很可能是没有文件
  workerProcess.stderr.on('data', function (data) {
    showMessage(data + "若目录不存在 可点击确定尝试创建，若反复错误 请手动创建文件夹", 100)
  })

  showMessage('完成')
})

//选择文件夹
chooseDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('choose-dir-dialog')
})

pullSSBtn.addEventListener('click', (event) => {
  if (savePath) {
    let cmd = 'adb pull /sdcard/Pictures/Screenshots/ ' + savePath
    workerProcess = exec(cmd)
    workerProcess.stdout.on('data', function (data) {
      showMessage(data)
    })

    workerProcess.stderr.on('data', function (data) {
      showMessage(data)
    })
  }

})

clearSSBn.addEventListener('click', (event) => {
 showMessage('慎重！确定要删除手机内的所有截图吗？',200)
})

openDirBtn.addEventListener('click', (event) => {
  if (savePath) {
    shell.showItemInFolder(savePath)
  }
 })


ipcRenderer.on('adb-dialog-selection', (event, index, action) => {
  okBtn = index === 0
  if (okBtn) {
    console.log("ok click")
  } else {
    console.log("cencel click")
  }
  console.log("acion = " + action)
  if (100 === action) {
    //创建文件夹
    runCmd('adb shell mkdir /sdcard/Pictures/Screenshots/')
  }else if(200 == action){
    //清空手机截图
    if (okBtn) {
      let cmd = 'adb shell rm /sdcard/Pictures/Screenshots/*.png'
      runCmd(cmd)
    }  
  }
})

//选择文件夹
ipcRenderer.on('selected_directory', (event, path) => {
  document.getElementById('local_path_tv').innerHTML = path
  settings.set('save_path', path)
  savePath = path
})


function showMessage(message) {
  showMessage(message, 100)
}

function showMessage(message, action) {
  ipcRenderer.send('open-adb-dialog', message, action)
}


function runCmd(cmd) {
  workerProcess = exec(cmd)
  workerProcess.stdout.on('data', function (data) {
    showMessage(data)
  })

  workerProcess.stderr.on('data', function (data) {
    showMessage(data)
  })
}