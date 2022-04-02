import {Json} from '../../../types/common';

export function random (a: number, b: number) {
    return (a + Math.round(Math.random() * (b - a)));
};
export function mapArray (value: any[] | any, fn:(v: any)=>void) {
    if (value instanceof Array) {
        value.forEach(v => {
            fn(v);
        });
    } else {
        fn(value);
    }
}
export function mapJson (key: any, value: any, fn:(k: any, v: any)=>void) {
    if (key === null) {return;}
    if (typeof key === 'object') {
        for (const k in key) {
            fn(k, key[k]);
        }
    } else {
        fn(key, value);
    }
}
export function parseJSON (data: any): Json {
    if (typeof data === 'object') {return data;}
    try {
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}