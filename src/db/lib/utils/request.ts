import {Json} from 'src/types/common';

export function checkAttr (data: Json, attrs: Json<'number' | 'string' | 'boolean' | 'object'>) {
    const res: string[] = [];
    for (const attr in attrs) {
        if (typeof data[attr] !== attrs[attr]) {
            res.push(attr);
        }
    }
    return res;
}


export function buildRep ({
    mes = '',
    code = 0,
    data = null
}: {
    mes?: string,
    code?: number,
    data?: any
}) {
    return {
        mes,
        code,
        data
    };
}

export function returnError (res: any, mes: string, code = -1) {
    res.send(buildRep({
        mes,
        code
    }));
}

export function returnSuccess (res: any, data: any = null, mes = '') {
    res.send(buildRep({data, mes}));
}


export function handleParamCheck (res: any, data: any, template: any) {
    const checkRes = checkAttr(data, template);
    if (checkRes.length > 0) {
        res.send(buildRep({
            mes: checkRes.join(',') + ' 参数类型错误',
            code: -1
        }));
        return false;
    }
    return true;
}