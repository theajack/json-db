/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-19 08:11:43
 * @Description: Coding something
 */
import http from 'http';
import {IHttpInfo, IHttpInfoPartial, IJson, IServerHelper, IServerOptions, IServerSendData, TResponse, TRouterHandler, TServeMethod} from '../type';


export class Server {
    server: http.Server;

    routers: IJson<TRouterHandler>;

    helper: IServerHelper;

    constructor ({
        port,
        routers,
        helper,
    }: IServerOptions) {
        this.routers = routers;
        this.helper = helper;
        this.initServer(port);
    }

    private praseUrl (originUrl = '') {
        const {url, search} = this.parseUrlSearch(originUrl);
        return {
            url: url,
            query: this.parseParam(search),
        };

    }

    private parseUrlSearch (url = '') {
        url = decodeURIComponent(url);
        const index = url.indexOf('?');
        if (index === -1) {
            return {url, search: ''};
        }
        return {
            url: url.substring(0, index),
            search: url.substring(index + 1),
        };
    }

    private parseParam (str: string) {
        const query: IJson<string> = {};
        if (!str) return query;
        const result = str.matchAll(/(.*?)=(.*?)(&|$)/g);
        // @ts-ignore
        for (const item of result) {
            query[item[1]] = item[2];
        }
        return query;
    }

    private getRouterHandler (request: http.IncomingMessage) {
        const {url} = this.parseUrlSearch(request.url);
        const method = request.method || 'get';

        const name = `${method.toLocaleLowerCase()}:${url}`;

        let handler = this.routers[name];
        if (!handler && method === 'get') {
            handler = this.routers[url];
        }
        return handler || null;
    }

    private parseHttpInfo (request: http.IncomingMessage) {
        return new Promise<IHttpInfoPartial>((resolve) => {
            const {headers, method} = request;
            const {url, query} = this.praseUrl(request.url);
            const chunks: any[] = [];
            request.on('error', (err) => {
                console.error(err);
            }).on('data', (chunk) => {
                chunks.push(chunk);
            }).on('end', () => {
                const bodyStr = Buffer.concat(chunks).toString();
                let body: IJson<string>;
                // todo 根据 header 判断
                try {
                    body = JSON.parse(bodyStr);
                } catch (e) {
                    body = this.parseParam(bodyStr);
                }
                resolve({
                    headers,
                    method: method as TServeMethod,
                    url,
                    query,
                    body,
                });
            });
        });
    }

    private initServer (port = 3000) {
        console.log('initServer', port);
        this.server = http.createServer(async (request, response) => {
            const handler = this.getRouterHandler(request); ;
            if (!handler) {
                this.send404(response);
                return;
            }
            const httpInfo: IHttpInfo = {
                ...(await this.parseHttpInfo(request)),
                ...this.helper,
                request,
                response,
            };
            let data = handler(httpInfo);
            if (data instanceof Promise) {
                data = await data;
            }
            this.sendData({
                response,
                ...data,
            });
        }).listen(port);
    }

    private send404 (response: TResponse) {
        this.sendText(response, 'Page not found', 404);
    }

    private sendText (response: TResponse, str: string, statusCode = 200) {
        this.sendData({
            response,
            data: str,
            statusCode,
            headers: {'Content-Type': 'text/plain; charset=utf-8'}
            // text/html; charset=utf-8
            // application/x-www-form-urlencoded
            // multipart/form-data
        });
    }
    private sendData ({
        response,
        data,
        statusCode = 200,
        headers = {'Content-Type': 'application/json;charset=UTF-8'},
    }: IServerSendData) {
        console.log(headers);
        for (const k in headers) {
            response.setHeader(k, headers[k]);
        }
        if (typeof data !== 'string') {
            try {
                data = JSON.stringify(data);
            } catch (e) {
                response.statusCode = 200;
                response.write(JSON.stringify({
                    error: e.message,
                    success: false,
                })); // todo 同意处理错误逻辑
                response.end();
                return;
            }
        }
        response.statusCode = statusCode;
        response.write(data);
        response.end();
    }

}