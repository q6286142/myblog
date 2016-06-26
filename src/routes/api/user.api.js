import express from 'express';
import {} from '../../service/identity/authentication';
import {} from '../../service/identity/authorize';

var router = express.Router();

/* GET users listing. */
router.post('/signin', (req, res) => {
    res.send('respond with a resource');
});

router.post('/signout', (req, res) => {
    res.send('respond with a resource');
});

router.post('/getList', (req, res) => {
    res.send('respond with a resource');
});

router.post('/getInfo/:id', (req, res) => {
    res.send('respond with a resource');
});

router.post('/register', (req, res) => {
    res.send('respond with a resource');
});

router.post('/update/:id', (req, res) => {
    res.send('respond with a resource');
});

router.post('/getProvider', (req, res) => {
    res.send('respond with a resource');
});