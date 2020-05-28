import {
    POST,
    GET,
    FILE
} from '@/axios/axios'

export const services = {
    schooladGetlist: (param) => { // 轮播
        return POST("/Schoolad/getlist", param);
    },
    schooladcategoryGetlist: (param) => { // 
        return POST("/Schooladcategory/getlist", param);
    },
    ArticlecategoryGetlist: (param) => { // 
        return POST("/Articlecategory/getlist", param);
    },
    ArticleGetlist: (param) => { // 
        return POST("/Article/getlist", param);
    },
    category: (param) => { // 通用系统分类
        return POST("/phone/category", param);
    },
    getRecommendedEnterprises(param) { // 用人单位推荐
        return POST("/comshow/getlist", param);
    },
    Systemregion(param) { // 省市列表
        return POST("/Systemregion/getlist", param);
    },
    uploadfile(param) { // 文件上传
        return FILE("/Systemresource/uploadfile", param);
    },
};

export default services;