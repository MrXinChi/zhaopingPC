<template>
    <div class="container flex flex_x_center flex_y_center">
        <div class="return" @click="goBackBtn">返回</div>
        <div class="container-header">
            <div class="container-header-top">
                <v-icon icon-class="icon-lanbej" class-name="icon"></v-icon>
                <v-icon icon-class="icon-bjgeader" class-name="icons"></v-icon>
            </div>
            <div class="container-header-bottom ">
                <img v-if="resumeData.headimg_name!=''&&resumeData.headimg_name!=undefined" :src="resumeData.headimg_name+'!auto'" class="content_left-headerImg" />

                <img v-else src="@/assets/images/user_default.png" class="content_left-headerImg" />

                <ul class="flex flex_x_center">
                    <li>{{resumeData.realname}}</li>
                    <li v-if="resumeData.sex==1">男</li>
                    <li v-else>女</li>
                </ul>
                <v-icon icon-class="icon-bjright" class-name="icons1"></v-icon>
            </div>
        </div>
        <v-resume></v-resume>
        <div class="returnBot flex flex_y_center flex_x_center" @click="goBackBtn">
            <h1>返回</h1>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            resumeData:[]
        }
    },
    methods:{
        goBackBtn(){//返回
            this.$router.push('/user/resume')
        },
        async init(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
               
                if(resume.code==0){
                    this.resumeData = resume.data.userinfo;
                }
            }
        },
    },
    created(){
        this.init();
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
    }
    .container-header{
        .container-header-top{
            width:880pxl;
            height:200px;
            .icon{
                width:100%;
                height:100%;
                z-index:1;
            }
            .icons{
                width:77px;
                height:50px;
                z-index:100;
                position: relative;
                top: -99%;
                left: 80%;
            }
        }
        .container-header-bottom{
            width: 880px;
            height: 140px;
            box-sizing: border-box;
            margin-top:-40px;
            text-align: center;
            img{
                width:96px;
                height:96px;
                border-radius: 50%;
            }
            ul{
                margin:25px 0 25px 20px;
                li:nth-of-type(1){
                    height:28px;
                    font-size:22px;
                    font-weight:bold;
                    color:rgba(38,38,38,1);
                    line-height:28px;
                }   
                li:nth-of-type(2){
                    padding: 6px;
                    height:18px;
                    font-size:14px;
                    color:rgba(89,89,89,1);
                    line-height:18px;
                }
            }
            .icons1{
                width:16px;
                height:33px;
            }
        }
    }
    .returnBot{
        margin:20px 0;
        width:76px;
        height:36px;
        background:rgba(53,121,255,1);
        border-radius:4px;
        h1{
            height:18px;
            font-size:14px;
            color:rgba(255,255,255,1);
            line-height:18px;
        }
    }
}
</style>