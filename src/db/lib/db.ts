import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {ITable} from 'src/types/db';
import {tables} from './tables';
import {nowDateTime} from './utils/time';


export function initTable (name: string) {
    if (!tables[name]) {throw new Error(`不存在的表：${name}`);}
    const table = tables[name];
    const adapter = new FileSync<ITable>(table.file);
    const db = low(adapter);
    db.defaults(writeDefaultJson(name))
        .write();
    return db;
}

export function writeDefaultJson (name: string): ITable {
    const time = nowDateTime();
    return {
        name,
        'data': [], // 数据集
        'id': 0, // 索引
        'count': 0, // 数据大小
        'lastUpdateTime': time, // 上次更新时间
        'createTime': time
    };
}