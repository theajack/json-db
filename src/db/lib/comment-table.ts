/*
 * @Author: tackchen
 * @Date: 2022-04-01 11:28:41
 * @LastEditors: tackchen
 * @LastEditTime: 2022-04-01 12:03:51
 * @FilePath: /json-db/src/db/lib/comment-table.ts
 * @Description: Coding something
 */

import {IGetOption} from 'src/types/table';
import {Table} from './table';
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

    get (query: {
        all: string,
        size: string,
        index: string,
        condition: string,
    }) {
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
}