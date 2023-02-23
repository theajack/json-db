/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-22 09:16:23
 * @Description: Coding something
 */
import {Sener} from './sener';
import {Json} from './json';
import {router} from './router';

new Sener({
    port: 3000,
    middlewares: [router, new Json('comment')]
});