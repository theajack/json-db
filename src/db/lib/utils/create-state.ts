
/* 简易的状态管理

// 目前仅支持简单json，即值都是值类型
let state = createState({
    a: 1,
    b: 'b',
})
state.onChange('a', (newValue, oldValue)=>{
    console.log(newValue, oldValue);
})
state.get('a');
state.set('a', 2);
state.trigger('a'); // 主动触发一次 属性 change
*/
import {IEventReadyReturn, Json} from 'src/types/common';
import {creatEventReady} from './create-event-ready';
import {mapArray, mapJson} from './util';

export function createState (state: Json) {
    if (typeof state !== 'object') return;
    const calls: Json<IEventReadyReturn> = {};
    for (const k in state) {
        calls[k] = creatEventReady();
    }
    function checkNecessary (name: string) {
        if (typeof state[name] === 'undefined') {
            console.warn(`不存在的属性:${name}`);
            return false;
        };
        return true;
    }
    function get (name: string) {
        return state[name];
    }
    function set (name: Json | string, value?: any) {
        mapJson(name, value, (name, value) => {
            if (!checkNecessary(name) || value === state[name]) {return;}
            calls[name].eventReady(value, state[name]);
            state[name] = value;
        });
    }
    function onChange (name: Json<()=>void> | string, fn?:()=>void) {
        mapJson(name, fn, (name, fn) => {
            if (!checkNecessary(name)) {return;}
            calls[name].onEventReady(fn);
        });
    }

    function trigger (...name: string[]) {
        mapArray(name, (name) => {
            if (!checkNecessary(name)) {return;}
            calls[name].eventReady(state[name], state[name]);
        });
    }

    return {get, set, onChange, trigger};
}