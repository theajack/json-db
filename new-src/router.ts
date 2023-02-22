/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-21 22:55:55
 * @Description: Coding something
 */
import {Router} from 'sener';

export const router = new Router({
    '/aa': ({file}) => {
        const data = file('aa').read();
        return {data: data};
    },

    'get:/setaa': async ({query, json}) => {
        const {data, save, id} = json('aa');
        // console.log('body.data', query.text);
        data.push({
            ...query,
            id: id(),
        });
        save();
        return {data: data};

    },
});