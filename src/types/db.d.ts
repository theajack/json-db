import {Express} from 'express';

export interface ITables {
    [prop: string]: {
        file: string;
        init(app: Express, name: string): void;
    }
}

export interface ITable extends ITime{
    name: string;
    data: IDataItem[]; // 数据集
    count: number; // 数据大小
}

export interface IDataItem extends ITime{
    [prop: string]: any;
}

interface ITime{
    id: number;
    createTime: number;
    lastUpdateTime: number;
}