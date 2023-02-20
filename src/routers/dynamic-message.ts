/*
 * @Author: tackchen
 * @Date: 2022-04-02 16:58:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-18 15:11:26
 * @FilePath: /json-db/src/routers/dynamic-message.ts
 * @Description: Coding something
 */

import {Express} from 'express';
import {returnError} from '../db/lib/utils/request';
import {getCommentTable} from '../db/lib/table-pool';
import {Json} from '../types/common';
import {IS_DEV} from '../db/lib/utils/util';

function buildComment (res: any, data: Json) {
    const app = data.app;
    if (!app) {
        returnError(res, '缺少 app参数');
        return null;
    }
    return getCommentTable(app);
}

export function initDynamicMessageRouter (app: Express) {
    insertMessage(app);
    getMessage(app);
    insertReply(app);

    console.log(process.env.NODE_ENV);
    if (IS_DEV) {
        initDebugRouter(app);
    }
}

function initDebugRouter (app: Express) {
    const appName = 'test2/test3/test4/aaa';
    const comment = getCommentTable(appName);
    app.get(`/message/insert`, (req, res) => {
        comment.httpInsert(res, {
            name: 'test',
            contact: 'test',
            content: 'test'
        });
    });
    app.get(`/message/reply`, (req, res) => {
        comment.httpInsertReply(res, {
            name: 'test',
            contact: 'test',
            content: 'test',
            commentId: 1,
        });
    });
}

function insertMessage (app: Express) {
    app.post(`/message`, (req, res) => {
        const data = req.body;
        
        const comment = buildComment(res, data);
        if (comment) {
            delete data.app; // ! 去除app字段 减少冗余
            comment.httpInsert(res, data);
        }
    });
}

function insertReply (app: Express) {
    app.post(`/message/reply`, (req, res) => {
        const data = req.body;
        
        const comment = buildComment(res, data);
        if (comment) {
            delete data.app; // ! 去除app字段 减少冗余
            comment.httpInsertReply(res, data);
        }
    });
}


function getMessage (app: Express) {
    app.get(`/message`, (req, res) => {
        const query = req.query;
        const comment = buildComment(res, query);
        if (comment) {
            comment.httpGet(res, query as any);
        }
    });
}