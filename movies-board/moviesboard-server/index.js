const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('moviesdb.json');
const middlewares = jsonServer.defaults();

const movieValidation = require('./movieValidation');

server.use(middlewares);
server.use('/movies', movieValidation);
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
