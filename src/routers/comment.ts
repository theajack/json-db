
import {getTable} from '../db/lib/table-pool';
import {nowDateTimeStr} from '../db/lib/utils/time';
import {parseJSON} from '../db/lib/utils/util';
import {IGetOption} from '../types/table';
import {Express} from 'express';
import {TABLE_NAME, TABLE_TYPE_NAME} from '../db/lib/tables';

export function initCommentRouter (app: Express) {
    const table = getTable(TABLE_TYPE_NAME.COMMENT, TABLE_NAME.CNCHAR);
    if (table === null) {return;}

    app.get('/', (req, res) => {
        res.send('Hello!!!!' + JSON.stringify(table.get({all: true})));
    });
    app.get('/insert', (req, res) => {
        table.insert({content: '11'});
        res.send(table.get({all: true}));
    });
    app.get('/update', (req, res) => {
        table.update({
            condition: {id: 1},
            value: {content: nowDateTimeStr()},
        });
        res.send(table.get({all: true}));
    });
    app.get('/get', (req, res) => {
        const query = req.query;
        const options: IGetOption = {};
        if (query.all) { options.all = query.all === '1'; }
        else {
            if (query.size) { options.size = parseInt(query.size as string); }
            if (query.index) { options.index = parseInt(query.index as string); }
        }
        if (query.condition) {
            options.condition = parseJSON(query.condition);
        }
        const result = table.get(options);
        res.send(JSON.stringify(req.query) + typeof req.query.size + '<br>' + JSON.stringify(result));
    });
    app.get('/get-all', (req, res) => {
        res.send(table.get({all: true}));
    });

    // app.get('/:id/aa', (req, res) => {
    //     res.send('Hello!!!!' + req.params.id);
    // });
}
