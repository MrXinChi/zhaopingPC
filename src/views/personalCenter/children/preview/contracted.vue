<template>
    <div class="container flex flex_x_center flex_y_center">
        <div class="return" @click="goBackBtn">返回</div>
        <div class="content">
            <div class="container-header">
                <!-- <img src="@/assets/images/resume_default.png"> -->
                <div class="container-header-bottom">
                    <img v-if="userData.headimg_name!=''&&userData.headimg_name!=undefined" :src="userData.headimg_name+'!auto'" class="content_left-headerImg" />

                    <img v-else src="@/assets/images/user_default.png" class="content_left-headerImg" />

                    <ul class="flex flex_x_center">
                        <li>{{userData.realname}}</li>
                        <li v-if="userData.sex==1">男</li>
                        <li v-else>女</li>
                    </ul>
                </div>
                
            </div>
            <div class="container_content">
                <div class="content_title">
                    <div class="title_top">
                        <label><i class="el-icon-message"/>{{resumeData.phone}}</label>
                        <label><i class="el-icon-message"/>{{resumeData.email}}</label>
                        <label><i class="el-icon-message"/>{{resumeData.weixin}}</label>
                        <label><i class="el-icon-message"/>{{resumeData.qq}}</label>
                    </div>
                    <div class="title_bottom">
                        <div class="ability_item" v-for="i in abilityData" :key="i">
                            <label>{{i}}</label>
                        </div>
                    </div>
                </div>

                <div class="content_item">
                    <div class="item_title">
                        <label>基本信息</label>
                    </div>
                    <div class="item_text">
                        <p class="labels"><label>民族：{{resumeData.nation}}</label><label>籍贯：{{resumeData.native_place}}</label><label>身高：{{resumeData.height}}cm</label><label>体重：{{resumeData.weight}}kg</label></p>
                        <p class="labels"><label>政治面貌：{{resumeData.political}}</label><label>现居地：{{resumeData.address}}</label><label>学历：{{resumeData.education}}</label></p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>求职意向</label>
                    </div>
                    <div class="item_text">
                        <p>所属行业：互联网/电子商务</p>
                        <p>职位类别：网页设计</p>
                        <p>工作地点：北京</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>教育经历</label>
                    </div>
                    <div class="item_text">
                        <p>2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）</p>
                        <p>主要课程：政治经济学、西方经济学、国际经济学、计量经济学、世界经济概论、国际贸易</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>自我描述</label>
                    </div>
                    <div class="item_text">
                        <p>积极救济救济土归土试试手气吧。我在外面等着看电影呢……是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧……在**，s</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>在校任职</label>
                    </div>
                    <div class="item_text">
                        <p><i class="el-icon-star-on"/> 2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学、计量经济学、世界经济概论、国际贸易
                        </p>
                        <p><i class="el-icon-star-on"/>
                            2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>社团经历</label>
                    </div>
                    <div class="item_text">
                        <p><i class="el-icon-star-on"/> 2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学、计量经济学、世界经济概论、国际贸易
                        </p>
                        <p><i class="el-icon-star-on"/>
                            2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>实践经历</label>
                    </div>
                    <div class="item_text">
                        <p><i class="el-icon-star-on"/> 2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学、计量经济学、世界经济概论、国际贸易
                        </p>
                        <p><i class="el-icon-star-on"/>
                            2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>实习经历</label>
                    </div>
                    <div class="item_text">
                        <p><i class="el-icon-star-on"/> 2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学、计量经济学、世界经济概论、国际贸易
                        </p>
                        <p><i class="el-icon-star-on"/>
                            2006.09 - 2016.07   秦皇岛职业技术学院   国际经济与贸易（学士）
                            主要课程：政治经济学、西方经济学、国际经济学</p>
                    </div>
                </div>
                <div class="content_item">
                    <div class="item_title">
                        <label>生活照</label>
                    </div>
                    <div class="item_text">
                        <img src="@/assets/images/life_default.png">
                        <img src="@/assets/images/life_default.png">

                    </div>
                </div>

            </div>


            <!-- <v-resume ></v-resume> -->


            
        </div>
        <div class="returnBot flex flex_y_center flex_x_center" @click="goBackBtn">
            <h1>返回</h1>
        </div>
    </div>
</template>
<script>
import options from "@/utils/options.js";
export default {
    data(){
        return{
            userData:[],
            resumeData:[],
            abilityData:[],
        }
    },
    methods:{
        goBackBtn(){    //返回
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
                    this.userData = resume.data.userinfo;
                    this.resumeData = resume.data.resumeinfo;
                    options.nationOptions.forEach(item => {
                        if(item.value==this.resumeData.nation){
                            this.resumeData.nation=item.label;
                            return;
                        }
                    });
                    options.politicCountenance.forEach(item => {
                        if(item.value==this.resumeData.political){
                            this.resumeData.political=item.label;
                            return;
                        }
                    });
                    this.abilityData=resume.data.resumeinfo.tags.split(',');
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
    .content{
        background-color: #FFFFFF;
        padding-bottom: 150px;
        .container-header{
            .container-header-bottom{
                width: 880px;
                height: 200px;
                background-image: url('../../../../assets/images/resume_default.png');
                background-repeat: no-repeat;
                background-size: cover;
                text-align: center;
                img{
                    margin-top:50px;
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
        .container_content{
            margin-top:13px;
            width: 880px;
            @include flex(column,center,center);
            .content_title{
                width:70%;
                margin-bottom: 60px;
                .title_top{
                    @include flex(row,space-between);

                    label{
                        font-size:16px;
                        color:rgba(102,102,102,1);
                        opacity:1;
                        .el-icon-message{
                            margin-right: 4px;
                        }
                    }
                }
                .title_bottom{
                    @include flex(row,space-evenly);
                    margin-top:28px;
                    .ability_item{
                        @include flex(column,center,center);
                        width:125px;
                        height:32px;
                        background:rgba(251,142,58,1);
                        opacity:1;
                        border-radius:17px;
                        label{
                            font-size:14px;
                            line-height:19px;
                            color:rgba(255,255,255,1);
                            opacity:1;
                        }
                    }
                }
            }
            .content_item{
                width:70%;
                margin-top:40px;
                .item_title{
                    label{
                        font-size:20px;
                        color:rgba(78,126,246,1);
                        opacity:1;
                    }
                }
                .item_text{
                    margin:12px 0 0 20px;
                    p{
                        line-height: 35px;
                        font-size:16px;
                        color:rgba(102,102,102,1);
                        opacity:1;
                        .el-icon-star-on{
                            color: #3A71FB;
                        }
                    } 
                    .labels{
                        @include flex(row,space-between);
                    }
                    img{
                        margin:12px 20px 0 0;
                        width: 161px;
                        height: 161px;
                    }
                }
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