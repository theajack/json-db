/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-21 22:55:55
 * @Description: Coding something
 */
import {Router} from 'sener';

function createTimeInfo () {
    const now = Date.now();
    return {
        'createTime': now,
        'lastUpdateTime': now
    };
}

function getComment ({query, read}: any) {
    const {index, size, all, app} = query;
    if (!app) return {data: {code: -1, data: [], mes: `app不能为空`}};
    const data = read(app);
    if (all === 'true') {
        // console.log('all', app, data);
        return {data: {data, code: 0}};
    }
    const i = parseInt(index);
    const s = parseInt(size);
    
    if (Number.isNaN(i) || Number.isNaN(s)) {
        return {data: {code: -1, data: [], mes: `参数类型错误index=${index}, size=${size}`}};
    }
    const start = (i - 1) * s;
    return {data: {data: data.slice(start, start + s), code: 0}};
}

function addComment ({body, write}: any) {
    const {app, contact, content, name} = body;
    // console.log(body, app);
    if (!app) return {data: {code: -1, data: [], mes: `app不能为空`}};
    const {data, save, id} = write(app);
    data.unshift({
        contact,
        content,
        name,
        id: id(),
        reply: [],
        ...createTimeInfo(),
    });
    save();
    return {data: {code: 0}};
}

function addReply ({body, write}: any) {
    const {app, commentId, contact, content, name} = body;
    if (!app) return {data: {code: -1, data: [], mes: `app不能为空`}};
    const {data, save} = write(app);
    const comment = data.find((item: any) => item.id === commentId);
    if (!comment) {
        return {data: {code: -1, mes: `错误的commentId: ${commentId}`}};
    }
    comment.reply.unshift({
        contact,
        content,
        name,
        ...createTimeInfo(),
    });
    save();
    return {data: {code: 0}};
}

export const router = new Router({
    '/message': ({query, read}) => getComment({query, read}),
    'post:/message': async ({body, write}) => addComment({body, write}),
    'post:/reply': ({body, write}) => addReply({body, write}),

    '/comment/cnchar': ({query, read}) => {
        query.app = 'cnchar';
        return getComment({query, read});
    },
    'post:/comment/cnchar': ({body, write}) => {
        body.app = 'cnchar';
        return addComment({body, write});
    },
    'post:/reply/cnchar': ({body, write}) => {
        body.app = 'cnchar';
        return addReply({body, write});
    }
});