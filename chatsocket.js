const http = require('http');
const SocketIO = require('socket.io');
const app = require('./app.js');

const server = http.createServer(app);
const io = SocketIO(server);

const moment = require('moment');
const botname = 'Bot';

io.on('connetionn', (socket) => {
  socket.on('joinRoom', ({ playlist_id, user_nickname }) => {
    socket.join(playlist_id);
    socket.emit(
      'message',
      formatMessage(botname, `어서오세요 ${user_nickname}님! :)`)
    );

    // 방에 있는 모든 사람들에 대한 대상메세지
    socket.broadcast
      .to(playlist_id)
      .emit(
        'message',
        formatMessage(user_nickname, `이제 저도 같이 듣고 있어요. :D`)
      );
  });

  socket.on('chatMessage', ({ playlist_id, user_nickname, message }) => {
    io.to(playlist_id).emit('message', formatMessage(user_nickname, message));
  });

  socket.on('disconnect', ({ playlist_id, user_nickname }) => {
    io.to(playlist_id).emit(
      'message',
      formatMessage(
        user_nickname,
        '이제 나가볼게요. 다음에 만날 때까지 안녕! :)'
      )
    );
  });
});

function formatMessage(user_nickname, message) {
  return {
    user_nickname,
    message,
    time: moment().format('h:mm a'),
  };
}

module.exports = server;
