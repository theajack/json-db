import {initTable} from './db';
import Lowdb from 'lowdb';
import {IDataItem, ITable} from 'src/types/db';
import {Json} from 'src/types/common';
import {nowDateTime} from './utils/time';
import {CollectionChain, ObjectChain} from 'lodash';
import {IGetOption} from 'src/types/table';

export class Table {
    private db: Lowdb.LowdbSync<ITable>;
    private id: number;
    constructor (name: string) {
        this.db = initTable(name);
        this.initIndex();
    }

    private initIndex () {
        this.id = this.db.get('id').value() as number;
    }

    private getDateChain () {
        return this.db.get('data');
    }
    private toCollChain (objChain: ObjectChain<IDataItem>) {
        return objChain as unknown as CollectionChain<IDataItem>;
    }

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
            .get('data').push(item)
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
        size = 2,
        index = 1,
        all = false
    }: IGetOption) {
        let chain = this.getDateChain();
        if (typeof condition === 'object') {
            chain = this.toCollChain(chain.find(condition));
        }
        if (all) {
            return chain.value();
        }
        const total = size * index;
        chain = chain.takeRight(total);
        const count = chain.size().value();
        const pageNum = size - (total - count);
        if (pageNum > 0) {
            return chain.slice(0, pageNum);
        } else {
            return [];
        }
    }

    getTable () {
        return this.db.getState();
    }
}