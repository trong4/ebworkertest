var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'hello worker' });
});

router.post('/', function(req, res, next) {
    console.log("receiving job on root path /")
    console.log("query", req.query)
    console.log("body", req.body)
    console.log("name", req.body.name)
    console.log("title", req.body.title)
    res.send({ok:true})
    // res.render('index', { title: 'hello worker' });
});

module.exports = router;
