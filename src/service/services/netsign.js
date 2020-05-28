import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    getList: (param) => { // 我的网签列表
        return POST("/Netsign/getlist", param);
    },
    getDostatus: (param) => { // 同意、拒绝邀请
        return POST("/Netsign/dostatus", param);
    },
};

export default services;