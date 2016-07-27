import express from 'express';
var router = express.Router();
module.exports = () => {
    router.post('/signin', (req, res, next) => {
        res.send('respond with a resource');
    });

    router.post('/signout', (req, res, next) => {
        res.send('respond with a resource');
    });
    return router;
}



// let router = express.Router();

// /* GET users listing. */
// router.post('/signin', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/signout', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/list', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/register', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/info/:id', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/delete/:id', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/update/:id', (req, res, next) => {
//     res.send('respond with a resource');
// });

// router.post('/getProvider', (req, res, next) => {
//     res.send('respond with a resource');
// });