export default function homeController(router) {



    return {
        /**
         * 
         */
        '/': (req, res, next) => {
            res.render('index', { title: '我的 Express' });
        },
        /**
         * 
         */
        '/master': (req, res, next) => {

        },
        post: {

        }
    }
}