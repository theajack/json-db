/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 14:34:19
 * @Description: Coding something
 */

import {Express} from 'express';
import {Comment} from '../db/lib/comment-table';
import {getCommentTable} from '../db/lib/table-pool';


export function initCommentRouter (app: Express, name: string) {
    const comment = getCommentTable(name);
    if (!comment) return;
    insertComment(app, comment);
    getComment(app, comment);
    insertReply(app, comment);

    RouteTest(app);

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
// const framework = new FrameWork();

function RouteTest (app: Express) {
    console.log(app);
    // app.get('/main', async (req, res) => {
    //     returnSuccess(res, {query: 11});
    // });
    // app.get('/test', async (req, res) => {
    //     const query = req.query;

    //     const isWait = query.wait === '1';

    //     const file = framework.fileManager.file('aaa');
    //     await file.asyncOprate(async (data, geneId) => {
    //         const id = geneId();
    //         console.log(`【debug ${isWait}】 asyncRead start`);
    //         if (isWait) {
    //             await delay(5000);
    //         }
    //         console.log(`【debug ${isWait}】 asyncRead end`);
    //         data.push(id);
    //         return data;
    //     }, isWait);
    //     console.log(`【debug ${isWait}】 asyncRead return`);
    //     returnSuccess(res, {query});
    // });
    // app.get('/test2', async (req, res) => {
    //     const file = framework.fileManager.file('aaa');
    //     returnSuccess(res, {data: file.asyncRead()});
        
    // });
}

function getComment (app: Express, comment: Comment) {
    app.get(`/comment/${comment.name}`, (req, res) => {
        const query = req.query;
        comment.httpGet(res, query as any);
    });
}