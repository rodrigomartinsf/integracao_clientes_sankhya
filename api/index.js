const AppController = require('./controllers/AppController')

setInterval(() => {
  app = new AppController()
}, 8000);


