import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getlist: (param) => { // 预约咨询列表
        return POST("/bespeaknew/getlist", param);
    },
    detail: (param) => { // 预约咨询详情
        return POST("/bespeaknew/detail", param);
    },
    gettypelist: (param) => { // 预约咨询话题和配置
        return POST("/bespeaknew/gettypelist", param);
    },
    studentEnrolment: (param) => { // 学生报名
        return POST("/bespeaknew/enroll", param);
    },
    gettemplate: (param) => { // 获取预约模板
        return POST("/bespeaknew/gettemplate", param);
    },
    getcategory: (param) => { // 获取预约分类
        return POST("/bespeaknew/getcategory", param);
    },
    getbespset: (param) => { // 知情同意书
        return POST("/bespeaknew/getbespset", param);
    },
    cancel: (param) => { // 取消预约
        return POST("/bespeaknew/cancel", param);
    },
};

export default services;