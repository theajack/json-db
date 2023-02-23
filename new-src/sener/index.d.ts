import { IMiddleWare, IMiddleWareEnterData, IMiddleWareRequestData, IMiddleWareResponseData, IMiddleWareResponseReturn, IServerOptions, ISenerOptions, IJson, IPromiseMayBe, ICommonReturn, MiddleWare } from 'sener-types';
export * from 'sener-types';
import http from 'http';
import { ISenerHelper } from 'sener-types-extend';

declare class MiddleWareManager {
    middlewares: IMiddleWare[];
    use(middleware: IMiddleWare): void;
    remove(middleware: IMiddleWare): void;
    applyEnter(req: IMiddleWareEnterData): Promise<boolean>;
    applyRequest(req: IMiddleWareRequestData): Promise<IMiddleWareRequestData | null>;
    applyResponse(res: IMiddleWareResponseData): Promise<IMiddleWareResponseReturn | null>;
}

declare class Server {
    server: http.Server;
    middleware: MiddleWareManager;
    helper: ISenerHelper;
    static DEFAULT_PORT: number;
    constructor({ port, }: IServerOptions);
    injectMiddleWare(middleware: IMiddleWare): void;
    private parseHttpInfo;
    private initServer;
    private sendHtml;
    private send404;
    private sendText;
    private sendData;
}

declare class Sener {
    server: Server;
    constructor({ port, middlewares, }?: ISenerOptions);
    use(...middlewares: IMiddleWare[]): void;
    remove(middleware: IMiddleWare): void;
}

type IRouter = IJson<IRouterHandler>;
type IRouterHandler = (data: IMiddleWareRequestData) => IPromiseMayBe<IMiddleWareResponseReturn | ICommonReturn>;
declare class Router extends MiddleWare {
    routers: IJson<IRouterHandler>;
    constructor(routers: IJson<IRouterHandler>);
    request({ url, method, send404 }: IMiddleWareRequestData): IPromiseMayBe<IMiddleWareRequestData | ICommonReturn>;
    response(res: Parameters<MiddleWare['response']>[0]): ReturnType<MiddleWare['response']>;
    private getRouterHandler;
}

export { IRouter, IRouterHandler, Router, Sener };
