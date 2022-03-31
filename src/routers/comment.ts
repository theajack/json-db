
import {getTable} from '../db/lib/table-pool';
// import {nowDateTimeStr} from '../db/lib/utils/time';
import {parseJSON} from '../db/lib/utils/util';
import {IGetOption} from '../types/table';
import {Express} from 'express';
import {TABLE_TYPE_NAME} from '../db/lib/tables';
import {buildRep, checkAttr} from '../db/lib/utils/request';

// axios({

//     method: 'post',
    
//     url: '/api/comment/cnchar/insert',
//     responseType: 'json',
//     data: {
//         name: 'string',
//         contact: 'string',
//         content: 'string'
//     }}).then(
//     res => {console.log(res);}
// );

export function initCommentRouter (app: Express, name: string) {
    const table = getTable(TABLE_TYPE_NAME.COMMENT, name);
    if (table === null) {
        return;
    }
    // app.get(`/comment/insert/${name}`, (req, res) => {
    //     table.insert({
    //         name: 'test',
    //         contact: req.query.content,
    //         content: 'test'
    //     });
    //     res.send(buildRep({}));
    // });
    app.post(`/comment/${name}`, (req, res) => {
        const data = req.body;
        const checkRes = checkAttr(data, {
            name: 'string',
            contact: 'string',
            content: 'string'
        });
        if (checkRes.length > 0) {
            res.send(buildRep({
                mes: checkRes.join(',') + ' 参数类型错误',
                code: -1
            }));
            return;
        }
        table.insert(data);
        res.send(buildRep({}));
    });
    // app.get(`/comment/${name}/update`, (req, res) => {
    //     table.update({
    //         condition: {id: 1},
    //         value: {content: nowDateTimeStr()},
    //     });
    //     res.send(table.get({all: true}));
    // });
    app.get(`/comment/${name}`, (req, res) => {
        const query = req.query;
        // console.log(query);
        const options: IGetOption = {};
        if (query.all === 'true') {
            options.all = true;
        } else {
            if (query.size) { options.size = parseInt(query.size as string); }
            if (query.index) { options.index = parseInt(query.index as string); }
        }
        if (query.condition) {
            options.condition = parseJSON(query.condition);
        }
        const data = table.get(options);
        res.send(buildRep({data}));
    });
}
