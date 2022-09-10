const express = require('express');
const middleware = require('./middleware');
const {
  userController,
  categoryController,
  postController,
} = require('./controllers');

// ...

const app = express();

app.use(express.json());

app.post('/login', userController.login);

app.post('/user', userController.create);

app.get('/user', middleware.authentication, userController.getAll);

app.get('/user/:id', middleware.authentication, userController.findById);

app.delete('/user/:id', middleware.authentication, userController.delete);

app.post('/categories', middleware.authentication, categoryController.create);

app.get('/categories', middleware.authentication, categoryController.getAll);

app.post('/post', middleware.authentication, postController.create);

app.get('/post', middleware.authentication, postController.getAll);

app.get('/post/search', middleware.authentication, postController.search);

app.get('/post/:id', middleware.authentication, postController.findById);

app.put('/post/:id', middleware.authentication, postController.update);

app.delete('/post/:id', middleware.authentication, postController.delete);

// ...

app.use(middleware.error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
