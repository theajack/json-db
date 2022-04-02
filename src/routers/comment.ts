
import {Express} from 'express';
import {Comment} from '../db/lib/comment-table';
import {getCommentTable} from '../db/lib/table-pool';

export function initCommentRouter (app: Express, name: string) {
    const comment = getCommentTable(name);
    if (!comment) return;
    insertComment(app, comment);
    getComment(app, comment);
    insertReply(app, comment);

    // initDebugRouter(app, comment);
}
// function initDebugRouter (app: Express, comment: Comment) {
//     // debug;
//     app.get(`/comment/insert/${comment.name}`, (req, res) => {
//         comment.httpInsert(res, {
//             name: 'test',
//             contact: req.query.content as string,
//             content: 'test'
//         });
//     });
//     app.get(`/reply/${comment.name}`, (req, res) => {
//         const data = {
//             name: 'xx',
//             content: 'xxx',
//             contact: 'xxxx',
//             commentId: 2,
//         };
//         comment.httpInsertReply(res, data);
//     });
// }

function insertComment (app: Express, comment: Comment) {
    app.post(`/comment/${comment.name}`, (req, res) => {
        const data = req.body;
        comment.httpInsert(res, data);
    });
}

function insertReply (app: Express, comment: Comment) {
    app.post(`/reply/${comment.name}`, (req, res) => {
        const data = req.body;
        comment.httpInsertReply(res, data);
    });
}


function getComment (app: Express, comment: Comment) {
    app.get(`/comment/${comment.name}`, (req, res) => {
        const query = req.query;
        comment.httpGet(res, query as any);
    });
}