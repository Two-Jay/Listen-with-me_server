const playlist = require("../../models").PlayList;
const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  post: (req, res) => {
    let token = req.get("authorization").substring(7);
    let listId;
    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "createRoom fail, need signin" });
      } else {
        playlist
          .create({ title: req.body.list_title, owner_id: decoded.userid })
          .then((list) => {
            listId = list.id;
            for (let i in req.body.entries) {
              music.create({
                playlist_id: list.id,
                title: req.body.entries[i]["title"],
                artist: req.body.entries[i]["artist"],
                musicURL: req.body.entries[i]["musicURL"],
                thumbnails: req.body.entries[i]["thumbnail"],
              });
            }
          })
          .then(() => res.status(201).send({ playlist_id: listId }))
          .catch(() =>
            res.status(500).send({ message: "createRoom fail, server error" })
          );
      }
    });
  },
};
