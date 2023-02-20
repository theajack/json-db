/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-19 01:28:49
 * @Description: Coding something
 */
import http from 'http';
import {File} from './file';

export interface IJson<T=any> {
    [prop: string]: T;
}

export interface IServerHelper {
    file: (name: string) => File;
    oprate: (name: string) => IOprateReturn;
}

export type TRouterHandler = (
    // data: IJson,
    data: IHttpInfo,
) => Promise<IRouterHandlerReturn> | IRouterHandlerReturn;

export interface IRouterHandlerReturn {
    data: any,
    statusCode?: number,
    headers?: IJson<string>
}

export interface IServerSendData extends IRouterHandlerReturn {
    response: TResponse,
}


export type TMethod = 'get'|'post'|'delete'|'put';

export type TServeMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type IRouter = IJson<TRouterHandler>;

export interface IFrameWorkOptions {
    port?: number;
    routers: IRouter;
}
export interface IServerOptions extends IFrameWorkOptions {
    helper: IServerHelper;
}

export type TResponse = http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
}

export interface IHttpInfo extends IServerHelper {
    headers: http.IncomingHttpHeaders;
    url: string;
    method: TServeMethod;
    query: IJson<string>;
    body: IJson<any>;
    request: http.IncomingMessage;
    response: TResponse;
}

export type IHttpInfoPartial = Pick<IHttpInfo, 'headers'|'method'|'query'|'body'|'url'>

export interface IOprateReturn {
    data: any[]
    save: () => void,
    error: () => void,
    id: () => number,
}