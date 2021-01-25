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