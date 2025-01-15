const { app, BrowserWindow, Menu } = require('electron');

require('database.js'); //Aqui esta la coneccion a la base de datos

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
require('electron-reload')(__dirname);

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


//En este js crearemos funciones para que interactuen con la base de datos, 
// pero debemos exportarla a algun otro JS , que seria el del frontend
//y de ahi llamaremos a las funciones.
module.exports = {

}

