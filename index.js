const express = require("express");
const app = express();

const port = 4500;

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionConfiguration = require('./controller/users/Oauth/session-config');
const passportConfiguration = require('./controller/users/Oauth/passport-config');
const dotenv = require('dotenv');
const io = require('socket.io')();

dotenv.config();
sessionConfiguration(app);
passportConfiguration(app);

const usersRouter = require('./routes/users');
const playlistsRouter = require('./routes/playlists');
const rootRouter = require('./routes/root');
const roomsRouter = require('./routes/rooms');
const roomsocketRouter = require('./routes/roomsocket.js')(app.io);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/', rootRouter);
app.use('/user', usersRouter);
app.use('/playlist', playlistsRouter);
app.use('/room', roomsRouter);
app.use('/roomsocket', roomsocketRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
