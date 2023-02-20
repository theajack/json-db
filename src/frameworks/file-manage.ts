/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 17:19:03
 * @Description: Coding something
 */
import fs from 'fs';
import {BASE_DIR} from './utils';
import {extractKey} from './sync-file';
import {File} from './file';

export class FileManager {
    private files: Record<string, File> = {};

    constructor () {

        if (!fs.existsSync(BASE_DIR)) {
            fs.mkdirSync(BASE_DIR);
        }

        traverse(BASE_DIR, path => {
            const key = extractKey(path);
            this.files[key] = new File(key);
        });
    }

    file (key: string) {
        console.log(!!this.files[key]);
        if (!this.files[key]) {
            this.files[key] = new File(key);
        }
        return this.files[key];
    }
}

function traverse (
    dir: string,
    onSingleFile: (path: string) => void
) {
    const list = fs.readdirSync(dir);
    
    for (const name of list) {
        if (name.endsWith('.json')) {
            onSingleFile(`${dir}${name}`);
        } else {
            traverse(`${dir}${name}/`, onSingleFile);
        }
    }
}