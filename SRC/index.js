const { app, BrowserWindow, Menu } = require('electron');

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
    electron: Path2D.join(__dirname, '../node_modules', '.bin', 'electron')
  });
};

//Para crear la ventana de la app
app.on('ready', () => {
  createWindow();
  
  //Parte de crear nuestro menu
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  //Para que se abra una nueva ventana cuando se haga click en el icono de la app en mac 
  // (en mac no se cierra la app aunque esten todas las ventanas cerradas)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
});

//El menu de nuestra app a nuestra medida como objetos en JavaScript
const templateMenu = [
  {
    label: 'Archivo',
    submenu: [
      {
      
      }
    ]
  }
];

//Funcion para que cuando todas las ventanas esten cerradas en windows y linux se cierre la aplicación
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

