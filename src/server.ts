import express from 'express';
import {TABLE_NAME} from './db/lib/tables';
import {initCommentRouter} from './routers/comment';
import bodyParser from 'body-parser';// 用于req.body获取值的
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3000;

initCommentRouter(app, TABLE_NAME.CNCHAR);

const server = app.listen(PORT, function () {
    const address = server.address();
    if (typeof address === 'object') {
        console.log('Server is listening at http://%s:%s', address?.address, address?.port);
    }
});