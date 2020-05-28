import {
    POST,
    GET
} from '@/axios/axios'
export const services = {
    activityenroll: (param) => { // 活动列表
        return POST("/Activityenroll/getlist", param);
    },
    activityenrollDetail: (param) => { // 活动列表详情
        return POST("/Activityenroll/detail", param);
    },
    myActivities: (param) => { // 我的活动列表
        return POST("/Activityenroll/mygetlist", param);
    },
    isenroll: (param) => { // 是否报名/签到
        return POST("/Activityenroll/isenroll", param);
    },
    modify: (param) => { // 学生报名活动
        return POST("/Activityenroll/modify", param);
    },
    usersignup: (param) => { // 学生签到
        return POST("/Activityenroll/usersignup", param);
    },
    setCollection: (param) => { // 收藏活动
        return POST("/usercollection/activity", param);
    },
};

export default services;