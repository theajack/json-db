import {Json} from 'src/types/common';
import {getCommentTable} from './comment';
import {Table} from './lib/table';

const tables: Json<Table> = {};

export function initTables () {
    tables.comment = getCommentTable();
}