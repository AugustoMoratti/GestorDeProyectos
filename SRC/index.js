const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    /*webPreferences: {
      nodeIntegration: true
    }*/ //Por ahora no hace falta, verlo despues
  });
  win.loadFile('index.html');
};

//AUTO REFRESH EN DESARROLLO
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
  
  });
};

//Para que en macOS no se cierre la aplicación al cerrar la ventana y cuando inicie la aplicación se cree una nueva ventana
app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

//Funcion para que cuando todas las ventanas esten cerradas en windows y linux se cierre la aplicación
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

