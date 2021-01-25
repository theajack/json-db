import {TABLE_NAME} from '../lib/tables';
import {Table} from '../lib/table';

let db: Table;

export function getCommentTable () {
    if (db) {
        return db;
    }
    db = new Table(TABLE_NAME.COMMENT);
    return db;
}

