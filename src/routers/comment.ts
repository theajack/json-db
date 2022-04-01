
import {getTable} from '../db/lib/table-pool';
// import {nowDateTimeStr} from '../db/lib/utils/time';
import {Express} from 'express';
import {TABLE_TYPE_NAME} from '../db/lib/tables';
import {buildRep, checkAttr} from '../db/lib/utils/request';
import {Comment} from '../db/lib/comment-table';

// axios({

//     method: 'post',
    
//     url: '/api/comment/cnchar/insert',
//     responseType: 'json',
//     data: {
//         name: 'string',
//         contact: 'string',
//         content: 'string'
//     }}).then(
//     res => {console.log(res);}
// );

export function initCommentRouter (app: Express, name: string) {

    const table = getTable(TABLE_TYPE_NAME.COMMENT, name);

    if (table === null) {
        return;
    }
    const comment = new Comment(table);

    insertComment(app, comment);
    getComment(app, comment);
    insertReply(app, comment);
}

function insertComment (app: Express, comment: Comment) {
    
    // app.get(`/comment/insert/${name}`, (req, res) => {
    //     table.insert({
    //         name: 'test',
    //         contact: req.query.content,
    //         content: 'test'
    //     });
    //     res.send(buildRep({}));
    // });
    app.post(`/comment/${comment.name}`, (req, res) => {
        const data = req.body;
        const checkRes = checkAttr(data, {
            name: 'string',
            contact: 'string',
            content: 'string'
        });
        if (checkRes.length > 0) {
            res.send(buildRep({
                mes: checkRes.join(',') + ' 参数类型错误',
                code: -1
            }));
            return;
        }
        comment.add(data);
        res.send(buildRep({}));
    });
}

function insertReply (app: Express, comment: Comment) {
    // app.get(`/reply/${comment.name}`, (req, res) => {
    //     const data = {
    //         name: 'xx',
    //         content: 'xxx',
    //         contact: 'xxxx',
    //         commentId: 2,
    //     };

    //     if (!handleParamCheck(res, data, {
    //         name: 'string',
    //         contact: 'string',
    //         content: 'string',
    //         commentId: 'number',
    //     })) {
    //         return;
    //     }

    //     const result = comment.addReply(data);
    //     res.send(buildRep(result ? {} : {code: -1}));
    // });
    app.post(`/reply/${comment.name}`, (req, res) => {
        const data = req.body;
        if (!handleParamCheck(res, data, {
            name: 'string',
            contact: 'string',
            content: 'string',
            commentId: 'number',
        })) {
            return;
        }

        const result = comment.addReply(data);
        res.send(buildRep(result ? {} : {code: -1}));
    });
}


function getComment (app: Express, comment: Comment) {

    // app.get(`/comment/${name}/update`, (req, res) => {
    //     table.update({
    //         condition: {id: 1},
    //         value: {content: nowDateTimeStr()},
    //     });
    //     res.send(table.get({all: true}));
    // });
    app.get(`/comment/${comment.name}`, (req, res) => {
        const query = req.query;
        const data = comment.get(query as any);
        res.send(buildRep({data}));
    });
}

function handleParamCheck (res: any, data: any, template: any) {
    const checkRes = checkAttr(data, template);
    if (checkRes.length > 0) {
        res.send(buildRep({
            mes: checkRes.join(',') + ' 参数类型错误',
            code: -1
        }));
        return false;
    }
    return true;
}