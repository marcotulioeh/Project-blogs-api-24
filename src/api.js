const express = require('express');
const { userController } = require('./controllers');
const middleware = require('./middleware');

// ...

const app = express();

app.use(express.json());

app.post('/login', userController.login);

app.post('/user', userController.create);

app.get('/user', middleware.authentication, userController.getAll);

app.get('/user/:id', middleware.authentication, userController.findById);

// ...

app.use(middleware.error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
