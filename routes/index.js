var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'hello worker' });
});

router.post('/', function(req, res, next) {
    console.log(new Date())
    console.log(req.body)
    res.send({ok:true})
});

module.exports = router;
