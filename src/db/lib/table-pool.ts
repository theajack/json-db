import {tables} from './tables';
import {Table} from './table';
import {Json} from 'src/types/common';

const db: Json<Json<Table>> = {
};

export function getTable (type: string, name: string) {
    if (db[type] && db[type][name]) {
        return db[type][name];
    }
    if (!tables[type] || !tables[type][name]) {
        return null;
    }
    if (!db[type]) {
        db[type] = {};
    }
    const table = new Table(type, name);
    if (!table.getDB()) {
        return null;
    }
    db[type][name] = table;
    return table;
}

