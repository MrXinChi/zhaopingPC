import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getlist: (param) => { // 文章列表
        return POST("/Article/getlist", param);
    }, 
    detail: (param) => { // 文章详情
        return POST("/Article/detail", param);
    }, 
    wenjuanDetail: (param) => { // 问卷详情
        return POST("/wenjuan/detail", param);
    },
    wenjuanCheckanswer: (param) => { // 用户是否回答
        return POST("/wenjuan/checkanswer", param);
    }, 
    wenjuanAnswer: (param) => { // 回答问卷
        return POST("/wenjuan/answer", param);
    }, 
};

export default services;