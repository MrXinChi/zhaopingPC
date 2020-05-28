import {
    POST,
    GET
} from '@/axios/axios'

export const services = {
    checkUserRegister: (param) => { // 学生已注册
        return POST("/Wx/check_user_register", param);
    },
    newUserRegister: (param) => { // 学生未注册
        return POST("/Wx/new_user_register", param);
    },
    userLand: (param) => { // 学生登录
        return POST("/Wx/newuserlogin", param);
    },
    codeLand: () => { //登录验证码使用
        return GET("/captcha", {}, 'arraybuffer');
    },
    sendforgetCodeNew: (param) => { // 忘记密码
        return POST("/Smslog/sendforgetCodeNew", param);
    },
    findPassword: (param) => { // 找回密码
        return POST("/User/findPassword", param);
    },
    mypreach: (param) => { // 我报名的宣讲会
        return POST("preach/mypreach", param);
    },
    updatePassword: (param) => { //登录后修改密码
        return POST("/User/updatePassword", param);
    },
    info: (param) => { //获取简历
        return POST("/Userresume/info", param);
    },
    modify: (param) => { //修改简历
        return POST("/Userresume/modify", param);
    },
    modifyWorkexpect: (param) => { //修改简历
        return POST("/Userworkexpect/modify", param);
    },
    deleteModifyWorkexpect: (param) => { //删除简历
        return POST("/Userworkexpect/realdel", param);
    },
    setshow: (param) => { //设置简历公开和非公开
        return POST("Userresume/setshow", param);
    },
    getAllInfo: (param) => { //推荐表读取
        return POST("User/getAllInfo", param);
    },
    ModifyTjb: (param) => { //保存推荐表
        return POST("User/ModifyTjb", param);
    },
    modifyFile: (param) => { //添加编辑简历
        return POST("/Userresume/addFile", param);
    },
    deleteFile: (param) => { //删除简历
        return POST("/Userresume/delFile", param);
    },
};

export default services;