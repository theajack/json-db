/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-18 16:58:15
 * @Description: Coding something
 */
import {File, IFileTemplate} from './file';

export class AsyncFile extends File {

    template: IFileTemplate|null;

    opratingCount = 0;

    isReading = false;

    asyncRead (): IFileTemplate {
        
        if (this.template) return this.template;
        this.isReading = true;
        const template = this.read();
        this.template = template;
        this.isReading = false;
        return template;
    }

    asyncWrite (template?: IFileTemplate, isWait?: boolean): boolean {
        const data = template || this.template;
        if (!data) return false;
        const result = this.write(data);
        if (result) {
            if (!template && this.opratingCount <= 0) {
                console.log(`【debug ${isWait}】 this.template = null ${this.opratingCount}`);
                this.template = null;
            } // 释放内存
            return true;
        }
        return false;
    }
    
    async asyncOprate (
        handleData: (data: any[], geneId: () => number) => Promise<any[]>,
        isWait: boolean
    ): Promise<boolean> {
        try {
            this.opratingCount ++;
            const template = this.asyncRead();
            console.log(`【debug ${isWait}】 asyncRead ${!!template}`);
            const data = await handleData(template.data, () => this.generateId(template));
            if (data instanceof Array) template.data = data;
            this.opratingCount --;
            console.log(`【debug ${isWait}】 opratingCount-- ${this.opratingCount}`);

            if (this.opratingCount > 0) return true;
            return this.asyncWrite(undefined, isWait);
        } catch (e) {
            this.opratingCount --;
            return false;
        }
    }
}