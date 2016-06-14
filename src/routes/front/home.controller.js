export default function homeController(router) {

    router.get('/', function (req, res, next) {
        res.render('index', { title: '我的 Express' });
    });
    
}