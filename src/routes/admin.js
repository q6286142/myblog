import express from 'express';
let router = express.Router(); 

router.all("*", function(req, res, next){
    console.log("requset admin info");
    next();
});

router.get('/',function(req, res, next){
    res.render("admin/index");
});

router.get('/login',function(req, res){
    
    res.render('admin/login');
});

router.get('/home',function(req, res){
    res.send("this is admin home");
});

router.get('/blog',function(req, res){
    res.send("this is admin blog");
});

router.get('/edit',function(req, res){
    res.send("this is admin edit");
});

//module.exports = router;

export default router;

