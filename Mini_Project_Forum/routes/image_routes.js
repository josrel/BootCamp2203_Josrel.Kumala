const express = require('express');
const pool = require("../db")
const controller =  require('../controllers/upload.js');
module.exports = function(app) {
 
//route to upload single image  
   app.post('/upload/upload-single-image',
controller.upload.single('gambar'),controller.uploadSingleImage);
};