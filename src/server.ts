import express from 'express';
import {initCommentRouter} from './routers/comment';
const app = express();
const PORT = 3000;

initCommentRouter(app);

const server = app.listen(PORT, function () {
    const address = server.address();
    if (typeof address === 'object') {
        console.log('Server is listening at http://%s:%s', address?.address, address?.port);
    }
});