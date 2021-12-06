const db = require("../config/index");
const { format } = require("date-fns");
const Blog = db.blog;
const fs = require('fs');


exports.aboutPage = (req, res) => {
  console.log("GET", req.url);
  res.status(200).render("about", { title: "About" });
};

exports.createPage = (req, res) => {
  console.log("GET", req.url);
  res.status(200).render("create", { title: "Create" });
};

exports.create = (req, res) => {
  console.log("Inside create function");
  console.log('Upload: ', req.body);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let file = null;
  let filePath = null;
  let fileOriginalName = null;
  if (req.file) {
    file = req.file;
    filePath = req.file.path;
    fileOriginalName = req.file.originalname;
  }

  Blog.create({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    thumbnail: file,
    thumbnailUrl: filePath,
    thumbnailName: fileOriginalName,
  })
    .then((response) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.send({ error: "There some error while creating", error });
    });
};

exports.findAll = (req, res) => {
  Blog.findAll({ order: [["createdAt", "DESC"]] }).then((blogs) => {
    res.status(200).render("home", { title: "Primer Blog", blogs, format });
  });
};

exports.findOne = (req, res, next) => {
  console.log("Find One: ", req.url);
  Blog.findOne({ where: { id: req.params.id } })
    .then((blog) => {
      res.status(200).render("details", {
        title: blog.title,
        blog,
        createdAt: format(new Date(blog.createdAt), "PPp"),
      });
    })
    .catch((error) => {
      next();
    });
};

exports.deleteOne = (req, res) => {
    console.log('Delete Req ', req.params.id)
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send({ error: "Error while deleting ", err });
    });
};


exports.findThumbnail = (req, res) => {
  console.log(req.params.id);
  Blog.findOne({
    where: {id: req.params.id }
  })
  .then(response => {
    res.send({ message: response.thumbnail })
  })
  .catch(error => {
    res.send({ message: "Error on getting thumbnail, ", error})
  })
}