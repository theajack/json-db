export interface Json<T = any>{
    [prop: string]: T;
}

export interface IEventReadyReturn {
    onEventReady(fn:(...args: any[])=>void, ...args: any[]): void;
    eventReady(...args: any[]): void;
}