const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionConfiguration = require('./controller/users/Oauth/session-config');
const passportConfiguration = require('./controller/users/Oauth/passport-config');
const dotenv = require('dotenv');

dotenv.config();
sessionConfiguration(app);
passportConfiguration(app);

const usersRouter = require('./routes/users');
const playlistsRouter = require('./routes/playlists');
const rootRouter = require('./routes/root');
const roomsRouter = require('./routes/rooms');

//cors configuration
const cors = require('cors');
const whitelist = [
  'http://localhost:3000',
  'http://listen-with-me-test.s3-website.ap-northeast-2.amazonaws.com',
  'https://s3.console.aws.amazon.com/s3/buckets/lwm-test/?region=ap-northeast-2',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use('/', rootRouter);
app.use('/user', usersRouter);
app.use('/playlist', playlistsRouter);
app.use('/room', roomsRouter);

module.exports = app;
