/*
 * @Author: tackchen
 * @Date: 2022-04-01 11:28:41
 * @LastEditors: tackchen
 * @LastEditTime: 2022-04-02 17:53:43
 * @FilePath: /json-db/src/db/lib/comment-table.ts
 * @Description: Coding something
 */

import {IGetOption} from '../../types/table';
import {Table} from './table';
import {handleParamCheck, returnError, returnSuccess} from './utils/request';
import {nowDateTime} from './utils/time';
import {parseJSON} from './utils/util';

interface IComment {
    name: string;
    contact: string;
    content: string;
}
interface IReply extends IComment {
    commentId: number;
}

interface IQueryOptions {
    all: string,
    size: string,
    index: string,
    condition: string,
}

export class Comment {
    table: Table;
    name: string;
    constructor (table: Table) {
        this.table = table;
        this.name = table.name;
    }

    add (data: IComment) {
        this.table.insert(data);
        return true;
    }

    addReply (data: IReply) {

        const commentId = data.commentId;

        const comment = (this.table.get({condition: {id: commentId}}) as any)[0];

        if (!comment) {
            return false;
        }
        if (!comment.reply) comment.reply = [];
        const nowTime = nowDateTime();

        comment.reply.unshift({
            name: data.name,
            contact: data.contact,
            content: data.content,
            createTime: nowTime,
            lastUpdateTime: nowTime
        });

        this.table.update({
            condition: {id: commentId},
            value: comment
        });
        return true;
    }

    get (query: IQueryOptions) {
        const options: IGetOption = {};
        if (query.all === 'true') {
            options.all = true;
        } else {
            if (query.size) { options.size = parseInt(query.size as string); }
            if (query.index) { options.index = parseInt(query.index as string); }
        }
        if (query.condition) {
            options.condition = parseJSON(query.condition);
        }
        return this.table.get(options);
    }

    httpInsert (res: any, data: IComment) {
        if (!handleParamCheck(res, data, {
            name: 'string',
            contact: 'string',
            content: 'string',
        })) {
            return;
        }
        this.add(data);
        returnSuccess(res);
    }

    httpGet (res: any, query: IQueryOptions) {
        const data = this.get(query);
        returnSuccess(res, data);
    }

    httpInsertReply (res: any, data: IReply) {

        if (!handleParamCheck(res, data, {
            name: 'string',
            contact: 'string',
            content: 'string',
            commentId: 'number',
        })) {
            return;
        }
        
        const result = this.addReply(data);
        console.log(result);
        result ? returnSuccess(res) : returnError(res, '评论不存在');
    }
}