const server = require('./chatsocket.js');
const port = 4000;
/* Server Activation */
server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
