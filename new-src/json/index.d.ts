import { MiddleWare } from 'sener-types';

interface IFileTemplate {
    key: string;
    data: any[];
    id: number;
    count: number;
    lastUpdateTime: number;
    createTime: number;
}
declare class SyncFile {
    path: string;
    dir: string;
    key: string;
    isDirExist: boolean;
    isFileExist: boolean;
    constructor(key: string, path: string);
    readPure(): IFileTemplate;
    generateId(data: IFileTemplate): number;
    generateDefaultData(data?: any[]): IFileTemplate;
    private updateInfo;
    writePure(data: IFileTemplate): boolean;
    oprateSync(handleData: (data: any[], geneId: (data: IFileTemplate) => number) => any[]): boolean;
}

interface IOprateReturn {
    data: any[];
    save: () => void;
    error: () => void;
    id: () => number;
}
declare class File extends SyncFile {
    template: IFileTemplate | null;
    opratingCount: number;
    isReading: boolean;
    read(): IFileTemplate;
    write(template?: IFileTemplate): boolean;
    oprate(handleData: (data: any[], geneId: () => number) => Promise<any[]> | any[]): Promise<boolean>;
    oprateCustom(): IOprateReturn;
}

declare class JsonManager {
    private files;
    json: (key: string) => IOprateReturn;
    file: (key: string) => File;
    baseDir: string;
    constructor(dir?: string);
    extractKey(path: string): string;
    keyToPath(key: string): string;
}

declare function now(): number;
declare const IS_DEV: boolean;
declare const BASE_DIR: string;
declare function makedir(dirPath: string): void;

declare class Json extends MiddleWare {
    json: JsonManager;
    constructor(dir?: string);
    helper(): {
        file: (key: string) => File;
        json: (key: string) => IOprateReturn;
    };
}

/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-21 22:08:31
 * @Description: Coding something
 */


interface IJsonHelper {
  file: (key: string) => File;
  json: (key: string) => IOprateReturn
}

declare module 'sener-types-extend' {
  interface ISenerHelper extends IJsonHelper {

  }
}

declare const _default: {
    Json: typeof Json;
    JsonManager: typeof JsonManager;
    makedir: typeof makedir;
    SyncFile: typeof SyncFile;
    File: typeof File;
};

export { BASE_DIR, File, IFileTemplate, IOprateReturn, IS_DEV, Json, JsonManager, SyncFile, _default as default, makedir, now };
