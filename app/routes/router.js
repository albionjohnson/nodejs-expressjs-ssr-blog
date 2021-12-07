module.exports = (app) => {
    const router = require('express').Router();
    const blogs = require('../controller/db.controller');
    const multer = require('multer');
    const upload = multer({dest: 'public/thumbnails/'});
    // pages
    router.get('/', blogs.findAll);
    router.get('/about', blogs.aboutPage);
    router.get('/create', blogs.createPage);
    // request routing
    router.post('/blogs', upload.single('image') , blogs.create);
    router.get('/delete/:id', blogs.deleteOne);
    router.get('/page/:page', blogs.pagination);
    router.get('/post/:id', blogs.findOne);
    router.get('/thumbnail/:id', blogs.findThumbnail);

    app.use(router);
}