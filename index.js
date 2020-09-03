const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const usersRouter = require('./routes/users');

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/user', usersRouter);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
