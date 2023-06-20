const express = require('express');

const routes = express.Router();

const user = require('../../controller/User/Usercontroller');

const Comment = require('../../models/Comment')

routes.get('/', user.loginpage);

routes.get('/SingalBlog/:id' , user.SingalBlog);

routes.post('/setComments',Comment.uploadedAvatar, user.setComments);

routes.get('/gallery',user.gallerypage);

module.exports = routes;