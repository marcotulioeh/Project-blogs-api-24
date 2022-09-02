const express = require('express');
const { userControllers } = require('./controllers');
const middlewares = require('./middleware');

// ...

const app = express();

app.use(express.json());

// ...
app.post('/login', userControllers.login);

app.use(middlewares.error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
