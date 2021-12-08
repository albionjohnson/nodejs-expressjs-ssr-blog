const db = require("../config/index");
const { format } = require("date-fns");
const Blog = db.blog;

exports.aboutPage = (req, res) => {
  console.log("GET", req.url);
  res.status(200).render("about", { title: "About" });
};

exports.createPage = (req, res) => {
  console.log("GET", req.url);
  res.status(200).render("create", { title: "Create" });
};

exports.create = (req, res) => {
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
  if (req.url.includes("update")) {
    Blog.update(
      {
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        thumbnail: file,
        thumbnailUrl: filePath,
        thumbnailName: fileOriginalName,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((response) => {
        res.redirect("/");
      })
      .catch((error) => {
        res.send({ error: "There some error while creating", error });
      });
  } else {
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
  }
};

exports.findAll = (req, res) => {
  let blogs = null;
  let pages = null;
  Blog.findAndCountAll({
    order: [["createdAt", "DESC"]],
    offset: 0,
    limit: 4,
  }).then((count) => {
    blogs = count.rows;
    pages = Math.ceil(count.count / 4);
    res.status(200).render("home", {
      title: "Primer Blog",
      blogs,
      format,
      pages,
      currentPage: 0,
    });
  });
};

exports.findOne = (req, res, next) => {
  console.log("Find One: ", req.url);
  if (req.url.includes("getpost")) {
    Blog.findOne({ where: { id: req.params.id } })
      .then((blog) => {
        // console.log(blog.thumbnailUrl)
        res.status(200).render("update", {
          title: blog.title,
          blog,
          createdAt: format(new Date(blog.createdAt), "PPp"),
          updatedAt: format(new Date(blog.updatedAt), "PPp"),
        });
      })
      .catch((error) => {
        next();
      });
  } else {
    Blog.findOne({ where: { id: req.params.id } })
      .then((blog) => {
        res.status(200).render("details", {
          title: blog.title,
          blog,
          createdAt: format(new Date(blog.createdAt), "PPp"),
          updatedAt: format(new Date(blog.updatedAt), "PPp"),
        });
      })
      .catch((error) => {
        next();
      });
  }
};

exports.deleteOne = (req, res) => {
  console.log("Delete Req ", req.params.id);
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
    where: { id: req.params.id },
  })
    .then((response) => {
      res.send({ message: response.thumbnail });
    })
    .catch((error) => {
      res.send({ message: "Error on getting thumbnail, ", error });
    });
};

exports.pagination = (req, res) => {
  if (req.params.page == 0) {
    res.redirect("/");
  } else {
    let page = req.params.page;
    let offset = page * 4;
    let blogs = null;
    let pages = null;
    Blog.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: 4,
    }).then((count) => {
      blogs = count.rows;
      pages = Math.ceil(count.count / 4);
      res.status(200).render("home", {
        title: "Primer Blog",
        blogs,
        format,
        pages,
        currentPage: req.params.page,
      });
    });
  }
};
