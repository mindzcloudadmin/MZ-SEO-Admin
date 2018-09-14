var MongoClient = require('mongodb').MongoClient;
var configVariables = require('../src/variables/config')
var uri = configVariables.DatabaseConfig.uri
var db = configVariables.DatabaseConfig.db
var ObjectId = require('mongodb').ObjectID;

exports.login = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    MongoClient.connect(uri, function(err, client) {
        client.db(db).collection('seoAdmin').find({ email:req.query.email,password:req.query.password }).toArray().then(docs => {

            client.close();
            res.send(docs)
        });
    });
}

exports.addseocontent = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    MongoClient.connect(uri, function(err, client) {
        client.db(db).collection('seoContent').insertOne({ pageName:req.query.pageName,pageTitle:req.query.pageTitle,metaTag:req.query.metaTag,metaKeywords:req.query.metaKeywords,metaDescription:req.query.metaDescription }).then(docs => {

            client.close();
            res.send(docs)
        });
    });
}

exports.updateseocontent = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    MongoClient.connect(uri, function(err, client) {
        client.db(db).collection('seoContent').updateOne({ "_id": new ObjectId(req.query.id) }, {
                $set:{pageName:req.query.pageName,pageTitle:req.query.pageTitle,metaTag:req.query.metaTag,metaKeywords:req.query.metaKeywords,metaDescription:req.query.metaDescription}
            }).then(docs => {

            client.close();
            res.send(docs)
        });
    });
}

exports.getallseocontent = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    MongoClient.connect(uri, function(err, client) {
        client.db(db).collection('seoContent').find().toArray().then(docs => {

            client.close();
            res.send(docs)
        });
    });
}

exports.getseocontentbyname = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    MongoClient.connect(uri, function(err, client) {
        client.db(db).collection('seoContent').findOne({_id:new ObjectId(req.query.pageName)}).then(docs => {
            client.close();
            res.send(docs)
        });
    });
}
