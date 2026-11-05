const { app, BrowserWindow } = require('electron');

app.commandLine.appendSwitch('ignore-certificate-errors');

// 🚀 核心魔法：强行劫持 DNS 解析，把 workers.dev 指向国内能通的 CF 优选 IP
// 这里我选了目前国内直连相对较快的 CF IP
app.commandLine.appendSwitch('host-resolver-rules', 'MAP fedud.3790392612.workers.dev 104.16.100.100');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "FEDUD 肥嘟嘟",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false // 必须关闭，否则跨域还是会被杀
    }
  });

  // 直接加载远程网址（因为是网页，你可以随时在 Cloudflare 改前端，用户无需更新软件）
  win.loadURL('https://fedud.3790392612.workers.dev/');
  
  win.setMenu(null);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
