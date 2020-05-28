<template>
    <div class="container flex flex_x_center flex_y_center">
        <div class="return" @click="goBackBtn">返回</div>
        <div class="flex containers">
            <div class="container-header">
                <div class=" container-header-bottom">
                    <img v-if="userinfo.headimg_name!=''&&userinfo.headimg_name!=undefined" :src="userinfo.headimg_name+'!auto'" />
                    <img v-else src="@/assets/images/user_default.png" class="content_left-headerImg" />

                    <ul class="flex">
                        <li>{{userinfo.realname}}</li>
                        <li v-if="userinfo.sex==1">男</li>
                        <li v-if="userinfo.sex==2">女</li>
                    </ul>
                </div>
                <div class="container-header-centent">
                    <ul class="flex flex_warp">
                        <li v-for="(i,k) in tags" :key="k"><span>{{i.cate_name}}</span></li>
                    </ul>
                </div>
                <div class="container-header-top">
                    <ul>
                        <li><h1>毕业院校：</h1><h1>{{this.userinfo.school_id_name}}</h1></li>
                        <li><h1>院系：</h1><h1>{{this.userinfo.department_id_name}}</h1></li>
                        <li><h1>专业：</h1><h1>{{this.userinfo.professional_id_name}}</h1></li>
                        <li><h1>学历：</h1><h1>{{this.userinfo.xueli_name}}</h1></li>
                        <li><h1>毕业年份：</h1><h1>{{this.userinfo.biye_name}}</h1></li>
                        <li>
                            <h1>政治面貌：</h1>
                            <h1 v-if="this.resume.resumeinfo.political==''">暂无数据</h1>
                            <h1 v-if="this.resume.resumeinfo.political!=''">{{this.resume.resumeinfo.political}}</h1>
                        </li>
                        <li><h1>民族：</h1><h1>{{this.resume.resumeinfo.nation}}</h1></li>
                        <li><h1>籍贯：</h1><h1>{{this.resume.resumeinfo.native_place}}</h1></li>
                        <li><h1>出生日期：</h1><h1>{{this.resume.resumeinfo.birthday}}</h1></li>
                        <li><h1>手机号：</h1><h1>{{this.resume.resumeinfo.phone}}</h1></li>
                        <li><h1>邮箱：</h1><h1>{{this.resume.resumeinfo.email}}</h1></li>
                        <li><h1>现居地：</h1><h1>{{this.resume.resumeinfo.lives}}</h1></li>
                        <li><h1>微信号：</h1><h1>{{this.resume.resumeinfo.weixin}}</h1></li>
                        <li><h1>QQ号：</h1><h1>{{this.resume.resumeinfo.qq}}</h1></li>
                    </ul>
                </div>
            </div>
            <div class="container-centent">
                <div class="container-centent-header ">
                    <div>
                        <label>个人简历</label>
                        <span>Curriculum vitae</span>
                    </div>
                    <div class="dixian"></div>
                </div>
                <v-majorresume ></v-majorresume>
            </div>
        </div>
        <div class="returnBot flex flex_y_center flex_x_center" @click="goBackBtn">
            <h1>返回</h1>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userinfo:"",
            tags:[],
            resume:""
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.resumeBtn()
        }
    },
    methods:{
        goBackBtn(){    //返回
            this.$router.push('/user/resume')
        },
        async resumeBtn(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
                if(resume.code==0){
                    this.resume = resume.data
                    this.userinfo = resume.data.userinfo
                    this.tags = resume.data.resumeinfo.tags_name
                    console.log(this.resume)
                    
                }
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.container{
    flex-direction: column;
    .return{
        width: 880px;
        height:18px;
        font-size:14px;
        color:rgba(53,121,255,1);
        line-height:18px;
        padding: 20px 0;
        cursor:pointer;
    }
    .containers{
        width:880px;
        height:auto;
    }
    .container-header{
        width:280px;
        background:#333333;
        border-radius:4px;
        padding-top: 40px;
        .container-header-bottom{
            width: 100%;
            height: 140px;
            box-sizing: border-box;
            text-align: center;
            img{
                width:96px;
                height:96px;
                border-radius:60px;
            }
            ul{
                padding-top: 16px;
                li:nth-of-type(1){
                    width: 50%;
                    font-size:22px;
                    font-weight:bold;
                    color:#FFFFFF;
                    line-height:28px;
                    padding-left:25%;
                }   
                li:nth-of-type(2){
                    padding-top: 12px;
                    height:18px;
                    font-size:14px;
                    color:#FFFFFF;
                    padding-left:10px;
                }
            }   
        }
        .container-header-centent{
            ul{
                li{
                    height:32px;
                    background:rgba(249,249,249,1);
                    border-radius:2px;
                    margin:12px 0 12px 10px;
                    text-align: center;
                    line-height:32px;
                    span{
                        font-size:14px;
                        color:rgba(89,89,89,1);
                        padding:7px 12px;
                    }
                }
            }
        }
        .container-header-top{
            padding: 10px 0 0 21px;
            ul{
                li{
                    display:flex;
                    margin-bottom:20px;
                    h1{
                        display: block;
                        color:#FFFFFF;
                    }
                }
            }
        }
    }
    .container-centent{
        width: 600px;
        height: 100%;
        background:rgba(255,255,255,1);
        .container-centent-header{
            margin:0 20px;
            div {
                margin:40px 0 20px 0;
                span:nth-of-type(1){
                    margin-left: 15px;
                    width:56px;
                    height:18px;
                    font-size:14px;
                    color:rgba(89,89,89,1);
                    line-height:18px;
                }
                span:nth-of-type(2){
                    width:110px;
                    height:18px;
                    font-size:14px;
                    color:rgba(89,89,89,1);
                    line-height:18px;
                }
            }
            .dixian{
                width:560px;
                height:2px;
                background:rgba(51,51,51,1);
                margin:0;
            }
        }
    }
    .returnBot{
        margin:20px 0;
        width:76px;
        height:36px;
        background:rgba(53,121,255,1);
        border-radius:4px;
        cursor: pointer;
        h1{
            height:18px;
            font-size:14px;
            color:rgba(255,255,255,1);
            line-height:18px;
        }
    }
}
</style>