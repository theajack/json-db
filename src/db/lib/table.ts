/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 14:34:19
 * @Description: Coding something
 */
import {buildFilePath, initTable} from './db';
import Lowdb from 'lowdb';
import {IDataItem, ITable} from '../../types/db';
import {Json} from '../../types/common';
import {nowDateTime} from './utils/time';
import {IGetOption} from '../../types/table';
import fs from 'fs';

export class Table {
    private _db: Lowdb.LowdbSync<ITable>;
    private id: number = 0;
    name: string;
    constructor ( name: string) {
        this.name = name;
    }

    private initDB () {
        const result = initTable(this.name);
        this._db = result;
        this.initIndex();
    }

    get db () {
        if (!this._db) {
            this.initDB();
        }
        return this._db;
    }

    private initIndex () {
        // console.log('initIndex');
        this.id = this.db.get('id').value() as number;
    }

    private getDateChain () {
        // console.trace('getDateChain');
        return this.db.get('data');
    }
    // private toCollChain (objChain: ObjectChain<IDataItem>) {
    //     return objChain as unknown as CollectionChain<IDataItem>;
    // }

    insert (data: Json) {
        this.id ++;
        const nowTime = nowDateTime();
        const item: IDataItem = {
            ...data,
            id: this.id,
            createTime: nowTime,
            lastUpdateTime: nowTime
        };
        // console.trace('insert');
        return this.db.set('id', this.id)
            .get('data').unshift(item)
            .write();
    }

    update ({
        condition,
        value
    }: {
        condition: Json,
        value: Json
    }) {
        return this.getDateChain()
            .find(condition)
            .assign(value)
            .write();
    }

    get ({
        condition,
        size = 10,
        index = 1,
        all = false
    }: IGetOption) {
        if (!this.fileNotExist()) {
            return [];
        }
        const chain = this.getDateChain();
        if (typeof condition === 'object') {
            return chain.filter(condition).value();
        }
        if (all) {
            return chain.value();
        }
        const count = chain.size().value();
        const start = size * (index - 1);
        if (start >= count) {
            return [];
        }
        return chain.slice(start, Math.min(start + size, count));
    }
    fileNotExist () {
        return fs.existsSync(buildFilePath(this.name));
    }
}