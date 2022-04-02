import express from 'express';
import bodyParser from 'body-parser';// 用于req.body获取值的
import {initCommentRouter} from './routers/comment';
import {initDynamicMessageRouter} from './routers/dynamic-message';

const NAMES = [
    'cnchar'
];

function startServer () {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    
    const PORT = 3000;
    
    NAMES.forEach(name => {
        initCommentRouter(app, name);
    });

    initDynamicMessageRouter(app);
    
    const server = app.listen(PORT, function () {
        const address = server.address();
        if (typeof address === 'object') {
            console.log('Server is listening at http://%s:%s', address?.address, address?.port);
        }
    });
}

startServer();