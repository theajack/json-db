import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {ITable} from '../../types/db';
import {nowDateTime} from './utils/time';
import makedir from 'make-dir';


export function initTable (name: string) {
    const filePath = `src/db/files/${name}.json`;
    const dir = filePath.substring(0, filePath.lastIndexOf('/')+1);
    console.log(dir);
    makedir.sync(dir);

    const adapter = new FileSync<ITable>(filePath);
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