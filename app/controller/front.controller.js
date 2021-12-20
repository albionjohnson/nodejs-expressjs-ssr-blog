const db = require("../config/index");
const { format } = require("date-fns");
const Blog = db.blog;

exports.findAll = (req, res) => {
  Blog.findAll({ order: [["createdAt", "DESC"]] })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};
