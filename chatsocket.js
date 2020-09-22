const http = require('http');
const SocketIO = require('socket.io');
const app = require('./app.js');
const server = http.createServer(app);
const io = SocketIO(server);

const dayjs = require('dayjs');
const { disconnect } = require('process');
const botname = 'Bot';

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ playlist_id, user_nickname }) => {
    socket.join(playlist_id);
    console.log(`emitted joinRoom event : ${user_nickname} to ${playlist_id}`);
    socket.emit(
      'chatMessage',
      formatMessage(botname, `어서오세요 ${user_nickname}님! :)`)
    );

    // 방에 있는 모든 사람들에 대한 대상메세지
    io.to(playlist_id).emit(
      'chatMessage',
      formatMessage(user_nickname, `이제 저도 같이 듣고 있어요. :D`)
    );
  });

  socket.on('joinChatRoom', ({ playlist_id, user_nickname }) => {
    socket.join(playlist_id);
    console.log(
      `emitted joinChatRoom event : ${user_nickname} to ${playlist_id}`
    );
  });

  // Host가 나갈 때, 호스트만 보내는 이벤트
  socket.on('closeRoom', ({ playlist_id }) => {
    console.log(`emitted clossRoom event in ${playlist_id}`);
    socket.broadcast.to(playlist_id).emit('closeRoom', { playlist_id });
  });

  socket.on('changeMusic', ({ playlist_id, music_info }) => {
    console.log(
      `emitted changeMusic event in ${playlist_id} with music data : ${{
        music_info,
      }}`
    );
    socket.broadcast
      .to(playlist_id)
      .emit('changeMusic', { playlist_id, music_info });
  });

  socket.on('chatMessage', ({ playlist_id, user_nickname, message }) => {
    console.log(
      `emitted chatMessage event : ${user_nickname} says ${message} in ${playlist_id}`
    );
    io.to(playlist_id).emit(
      'chatMessage',
      formatMessage(user_nickname, message)
    );
  });

  socket.on('leaveRoom', ({ playlist_id, user_nickname }) => {
    console.log(
      `emitted disconnect event : ${user_nickname} in ${playlist_id}`
    );
    io.to(playlist_id).emit(
      'chatMessage',
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
    time: dayjs().add(9, 'hour').format('HH:mm a'),
  };
}

module.exports = server;
