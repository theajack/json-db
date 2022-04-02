import {initTable} from './db';
import Lowdb from 'lowdb';
import {IDataItem, ITable} from '../../types/db';
import {Json} from '../../types/common';
import {nowDateTime} from './utils/time';
import {IGetOption} from '../../types/table';

export class Table {
    private db: Lowdb.LowdbSync<ITable>;
    private id: number;
    name: string;
    constructor ( name: string) {
        this.name = name;
        const result = initTable(name);
        this.db = result;
        this.initIndex();
    }

    private initIndex () {
        this.id = this.db.get('id').value() as number;
    }

    private getDateChain () {
        return this.db.get('data');
    }
    // private toCollChain (objChain: ObjectChain<IDataItem>) {
    //     return objChain as unknown as CollectionChain<IDataItem>;
    // }

    getDB () {
        return this.db;
    }

    insert (data: Json) {
        this.id ++;
        const nowTime = nowDateTime();
        const item: IDataItem = {
            ...data,
            id: this.id,
            createTime: nowTime,
            lastUpdateTime: nowTime
        };
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

    getTable () {
        return this.db.getState();
    }
}