module.exports = (app) => {
    const router = require('express').Router();
    const blogs = require('../controller/db.controller');

    // pages
    router.get('/', blogs.findAll);
    router.get('/about', blogs.aboutPage);
    router.get('/create', blogs.createPage);
    // request routing
    router.post('/blogs', blogs.create);
    router.get('/delete/:id', blogs.deleteOne);
    router.get('/:id', blogs.findOne);

    app.use(router);
}