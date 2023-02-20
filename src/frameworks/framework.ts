/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 15:28:21
 * @Description: Coding something
 */

import {FileManager} from './file-manage';
import {Server} from './server/server';
import {IFrameWorkOptions} from './type';

// const framework = new FrameWork({
//     'get:/aa/bb': (data, tables) => {
//         const table = framework.table('');
//         table.add();
//         return;
//     },
//     'post:/aa/bb': async (data, tables) => {
//         const table = framework.table('');
//         table.add();
//         return {};
//     }
// });

export class FrameWork {
    
    fileManager: FileManager;

    server: Server;

    constructor ({
        port,
        routers,
    }: IFrameWorkOptions) {
        this.fileManager = new FileManager();
        this.server = new Server({
            port,
            routers,
            helper: {
                file: (name: string) => this.fileManager.file(name),
                oprate: (name: string) => {
                    return this.fileManager.file(name).oprateCustom();
                }
            }
        });
    }
}