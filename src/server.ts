/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 14:34:19
 * @Description: Coding something
 */
import {FrameWork} from './frameworks/framework';
import {IRouter} from './frameworks/type';

const routers: IRouter = {
    'get:/aa': ({file}) => {
        const data = file('aa').read();
        return {data: data};
    },
    'get:/setaa': async ({query, file}) => {
        const success = await file('aa').oprate((data) => {
            data.push(query.text);
            return data;
        });
        if (success) {
            return {data: query.text};
        }
        return {data: 'error'};
    },
    'post:/setaa': ({body, oprate}) => {
        // const success = await file('aa').oprate((data, geneId) => {
        //     body.data.id = geneId();
        //     data.push(body.data);
        //     return data;
        // });
        // return {success, data: body.data};
        const {data, save, id} = oprate('aa');
        id();
        body.data.id = id();
        data.push(body.data);
        save();
        return {data: body.data};
    },
};

new FrameWork({
    port: 3000,
    routers
});