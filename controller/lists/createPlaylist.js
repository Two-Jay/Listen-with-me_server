const playlist = require("../../models").PlayList;
const music = require("../../models").Music;
const jwt = require("jsonwebtoken");
module.exports = {
  post: (req, res) => {
    let tokenString = req.get("authorization");
    if (tokenString && tokenString.length > 7) {
      let token = tokenString.substring(7);
      jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "createRoom fail, need signin" });
        } else {
          try {
            let list = await playlist.create({
              title: req.body.list_title,
              owner_id: decoded.userid,
            });
            for (let i in req.body.entries) {
              await music.create({
                playlist_id: list.id,
                title: req.body.entries[i]["title"],
                artist: req.body.entries[i]["artist"],
                musicURL: req.body.entries[i]["musicURL"],
                thumbnails: req.body.entries[i]["thumbnail"],
              });
            }
            res.status(201).send({ playlist_id: list.id });
          } catch (err) {
            console.log(err);
            res.status(500).send({ message: "createRoom fail, server error" });
          }
        }
      });
    } else {
      res.status(403).send({ message: "createRoom fail, invalid token" });
    }
  },
};
