const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const usersRouter = require('./routes/users');
const playlistRouter = require('./routes/playlists');
const rootRouter = require('./routes/root');
const roomRouter = require('./routes/rooms');

const port = 4000;

// DB sync check
const models = require('./models/index.js');
models.sequelize
  .sync()
  .then(() => {
    console.log('DB connection success');
  })
  .catch((err) => {
    console.log('**DB connection fail**');
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/', rootRouter);
app.use('/user', usersRouter);
app.use('/playlist', playlistRouter);
app.use('/room', roomRouter);

app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
