import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getlist: (param) => { // 宣讲列表
        return POST("/preach/getlist", param);
    },
    detail: (param) => { // 宣讲详情
        return POST("/preach/detail", param);
    },
    signUp: (param) => { // 在线报名
        return POST("/preach/enroll", param);
    },
    cancelApplication: (param) => { // 取消报名
        return POST("/preach/cancel", param);
    },
    calendar: (param) => { // 日历插件
        return POST("/preach/dategetlist", param);
    },
    setCollection: (param) => { // 收藏宣讲会
        return POST("/usercollection/preach", param);
    },
};

export default services;