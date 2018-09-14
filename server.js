var history = require('connect-history-api-fallback');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;

var admin = require('./node-functions/admin')


//get user login from database
app.get('/login', admin.login)

//add seo content in database
app.get('/addseocontent', admin.addseocontent)

//get all seo content in database
app.get('/getallseocontent', admin.getallseocontent)

//get all seo content by page name in database
app.get('/getseocontentbyname', admin.getseocontentbyname)

//update seo content in database
app.get('/updateseocontent', admin.updateseocontent)






app.listen(port);
console.log('server started at' + port);
