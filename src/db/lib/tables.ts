import {ITables} from 'src/types/db';

export const TABLE_TYPE_NAME = {
    COMMENT: 'comment'
};
export const TABLE_NAME = {
    CNCHAR: 'cnchar'
};

export const tables: ITables = {
    comment: {
        cnchar: {
            file: 'src/db/comment/cnchar.json'
        }
    }
};


