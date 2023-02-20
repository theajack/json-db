/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 15:28:21
 * @Description: Coding something
 */

import {FileManager} from './file-manage';

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

    constructor () {
        this.fileManager = new FileManager();
    }
}