import url from 'url';
import express from 'express';
import uaparser from 'ua-parser-js';

let router = express.Router();
let rmobile = /^\/mobile([\/#?][\S\ ]*)?$/;

function getMobilePageHashParam(req) {
    console(req.originalUrl);
    let hash = req.originalUrl || req.originalUrl != '/' ? '#' + req.originalUrl : '';
    return '/mobile' + hash;
}

router.use((req, res, next) => {
    let isReqMobilePage = rmobile.test(req.originalUrl);
    let ua = uaparser(req.headers['user-agent']);
    let deviceType = ua.device.type;
    if ((deviceType === 'tablet' || deviceType === 'mobile') && !isReqMobilePage) {
        console.log('移动设备的请求');
        let url = getMobilePageHashParam(req);
        res.redirect(url);
    } else if ((deviceType != 'tablet' && deviceType != 'mobile') && isReqMobilePage) {
        res.redirect("/index");
    } else {
        next();
    }
});

router.get('/mobile', (req, res, next) => {
    res.render('mobile', { title: '我的移动页面blog' });
});

router.get(/(\/index)?/, (req, res, next) => {
    res.render('index', { title: '我的blog' });
});

export default router;
