const express = require("express");

const usersRouter = require("./routes/users");
// 임시로 유저 스프린트 2에서 필요한 users.js 라우트만 설정
// 이후 진행하면서 추가하기로 함

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(morgan("dev"));
app.use("/user", usersRouter);

app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
