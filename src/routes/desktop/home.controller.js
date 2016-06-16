export default function homeController(router) {



    return {
        /**
         * 
         */
        'get:/': (req, res, next) => {
            res.render('index', { title: '我的 Express' });
        },
        /**
         * 
         */
        'get:/master': (req, res, next) => {

        },
        '': ()=>{
            
        }
    }
}