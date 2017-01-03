var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

AWS.config.update({region:'us-east-1'});
var USERS_TABLE = process.env.USERS_TABLE; // set in .ebextensions/options.config in production
var QUEUE_URL = process.env.QUEUE_URL; // TODO. set in options.config
var db = new AWS.DynamoDB();
var sqs = new AWS.SQS();

router.get('/', function(req, res, next) {
    res.send({ok:true})
    sqs.sendMessage({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify({
            username: req.query.username
        })
    }, function(er, data){
        if (er) return console.log(new Date(), "sqs er", er)
        console.log(new Date(), "sqs data", data);
    });
});

router.post('/', function(req, res, next) {
    res.send({ok:true})
    // can't use Expected Exists false if username and created are
    // hash and sort keys. username should be the only primary key, no
    // composite key.
    db.putItem({
        TableName: USERS_TABLE,
        Item: {
            username: {S: req.body.username},
            created: {S: new Date().toISOString()},
            title: {S: "boss"},
            role: {S: "admin"},
        },
        // Expected: { username: { Exists: false } },
        ReturnValues: "ALL_OLD"
    }, function(er, data){
        if (er) return console.log(new Date(), 'DB Error:', er)
        console.log(new Date(), "DB data", data)
    });
});

module.exports = router;
