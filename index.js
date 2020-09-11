const server = require('./chatsocket.js');
const port = 4500;
/* Server Activation */
server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
