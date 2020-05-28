import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getlist: (param) => { // 校招列表
        return POST("/enrollment/getlist", param);
    },
    detail: (param) => { // 校招详情
        return POST("/enrollment/detail", param);
    },
    joblist: (param) => { // 职位列表
        return POST("/job/getlist", param);
    },
    jobdetail: (param) => { // 职位详情
        return POST("/job/detail", param);
    },
    deliverZhiwei: (param) => { // 投递简历
        return POST("/deliver/zhiwei", param);
    },
    setCollection: (param) => { // 收藏职位
        return POST("/usercollection/job", param);
    },
    getcategory: (param) => {//获取分类栏目
        return POST("/enrollment/getcategory", param);
    },
    getCompanyInfo: (param) => { // 企业详情
        return POST("/com/detail", param);
    },
    getCompanyInfoTYC: (param) => { // 天眼查企业详情
        return POST("/com/tyc", param);
    },
};

export default services;