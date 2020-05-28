import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getList: (param) => { //面试列表
        return POST("/videointerview/getListstu", param);
    }
};

export default services;