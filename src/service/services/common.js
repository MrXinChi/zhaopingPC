import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getCategory: (param) => { // 文章列表
        return POST("/phone/category", param);
    }
};

export default services;