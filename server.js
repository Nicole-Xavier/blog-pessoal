const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors()); // Habilita o CORS
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/posts', router); // Define a rota base

server.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000/posts');
});
