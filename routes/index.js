var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

var db = new AWS.DynamoDB();
var users_table =  process.env.USERS_TABLE;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'hello worker' });
});

router.post('/', function(req, res, next) {
    console.log(new Date())
    console.log(req.body)
    res.send({ok:true})

    db.putItem({
        'TableName': users_table,
        'Item': {
            'username': {'S': req.body.username},
            "created": {"S": new Date().toISOString()},
        },
        'Expected': { username: { Exists: false } }
    }, function(er, data){
        if (er) return console.log(new Date(), 'DB Error:', er)
        console.log(new Date(), "DB data", data)
    });
});

module.exports = router;
