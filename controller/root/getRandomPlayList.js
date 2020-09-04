const playlist = require('../../../models').PlayList;
const liked = require('../../../models').likedList;
const music = require('../../../models').Music;
const users = require('../../../models').User;
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
module.exports = {
  get: (req, res) => {
    let token = req.cookies.authorization;
    jwt.verify(token, JWT_secret, () => {
      playlist
        .findOne({ order: sequelize.random() })
        .then((data) => {
          data.thumbnail = music.findOne({
            where: { playlist_id: data['id'] },
          }).thumbnails;
          data.likeAmount = liked.count({
            where: { likedList_id: data['id'] },
          });
          data.nickname = users.findOne({
            where: { id: data['owner_id'] },
          }).nickname;
        })
        .then((data) => {
          let payload = {
            id: data.id,
            thumbnails: data.thumbnail,
            title: data.title,
            nickname: data.nickname,
            likeAmount: data.likeAmount,
          };
          res.status(200).send(payload);
        })
        .catch(() =>
          res.status(500).send({ message: 'random loading fail, server error' })
        );
    });
  },
};
