import express from 'express';
import {getCommentTable} from './db/comment';
import {nowDateTimeStr} from './db/lib/utils/time';
import {parseJSON} from './db/lib/utils/util';
import {IGetOption} from './types/table';
const app = express();
const PORT = 3000;
 
app.get('/', (req, res) => {
    const comment = getCommentTable();
    res.send('Hello!!!!' + JSON.stringify(comment.get({all: true})));
});
app.get('/insert', (req, res) => {
    const comment = getCommentTable();
    comment.insert({content: '11'});
    res.send(comment.get({all: true}));
});
app.get('/update', (req, res) => {
    const comment = getCommentTable();
    comment.update({
        condition: {id: 1},
        value: {content: nowDateTimeStr()},
    });
    res.send(comment.get({all: true}));
});
app.get('/get', (req, res) => {
    const comment = getCommentTable();
    const query = req.query;
    const options: IGetOption = {};
    if (query.all) { options.all = query.all === '1'; }
    else {
        if (query.size) { options.size = parseInt(query.size as string); }
        if (query.index) { options.index = parseInt(query.index as string); }
    }
    if (query.condition) {
        options.condition = parseJSON(query.condition);
    }
    const result = comment.get(options);
    res.send(JSON.stringify(req.query) + typeof req.query.size + '<br>' + JSON.stringify(result));
});
app.get('/get-all', (req, res) => {
    const comment = getCommentTable();
    res.send(comment.get({all: true}));
});

const server = app.listen(PORT, function () {
    const address = server.address();
    if (typeof address === 'object') {
        console.log('Server is listening at http://%s:%s', address?.address, address?.port);
    }
});