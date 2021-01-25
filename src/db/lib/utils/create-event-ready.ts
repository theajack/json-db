import {IEventReadyReturn} from 'src/types/common';
 
/* 创建一个简单的事件队列
let e = creatEventReady();
e.onEventReady((...args)=>{
    console.log(args);
});
e.eventReady(1,2,3)
*/
export function creatEventReady (): IEventReadyReturn {

    const queue: any[] = [];
    let lastArgs: any = null;

    function onEventReady (fn:(...args: any[])=>void, ...args: any[]) {
        if (!queue.find(item => item.fn === fn)) {
            queue.push({fn, args});
        }
        if (lastArgs !== null) {
            if (args.length === 0 && lastArgs) {
                args = lastArgs;
            }
            fn(...args);
        }
    }
    
    function eventReady (...args: any[]) {
        lastArgs = args;
        queue.forEach(item => {
            item.fn(...((args.length === 0) ? item.args : args));
        });
        // queue = null;
    }

    return {
        onEventReady,
        eventReady
    };
}