import {Table} from './table';
import {Json} from '../../types/common';
import {Comment} from './comment-table';

const db: Json<Table> = {
};

export function getTable (name: string) {
    if (db[name]) {
        return db[name];
    }
    const table = new Table(name);
    db[name] = table;
    return table;
}
const commentDb: Json<Comment> = {
};

export function getCommentTable (name: string) {
    if (commentDb[name]) {
        return commentDb[name];
    }
    const table = getTable(name);
    return new Comment(table);
}