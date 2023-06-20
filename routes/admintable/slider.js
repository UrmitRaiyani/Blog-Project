const express = require('express');

const routes = express.Router();

const slider = require('../../controller/amincontroller/slider');

const Slider = require('../../models/Usermodel')

routes.get('/' , slider.sliderpage);

routes.post('/sliderinsert', Slider.uploadedAvatar , slider.sliderinsert);

module.exports = routes