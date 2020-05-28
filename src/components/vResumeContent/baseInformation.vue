<template>
    <div class="container"  >
        <!-- <h1>基本信息</h1> -->
        <div class="basic" @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
            <div class="basic-title flex flex_y_center flex_x_bten">
                <div class="flex flex_y_center">
                    <v-icon icon-class="icon-basic" class-name="icons"></v-icon>
                    <h1>基本信息</h1>
                </div>
                <div v-if="num3Show" @click="edit">
                    <v-icon icon-class="icon-edit" class-name="edit"></v-icon>
                </div>
            </div>
            <div class="basic-content">
                <ul class="flex flex_warp">
                    <li v-for='(i,k) in basicList' :key="k">
                        <div v-if="shop" class="flex">
                            <h1>{{i.text}}</h1>
                            <h1 v-if="i.content!=null">{{i.content}}</h1>
                            <h1 v-if="i.content==null">暂无数据</h1>
                        </div>
                        <div v-else >
                            <v-input-box :title="i.text" v-model="i.content" v-if="i.zt==1"></v-input-box>
                            <v-select-box :title="i.text" :options="i.option" v-model="i.content" v-if="i.zt==2"></v-select-box>
                            <div class="select-item-name" v-if="i.zt==3">
                                <span>*</span>
                                出生日期
                            </div>
                            <div v-if="i.zt==3" >
                                <el-date-picker  class="select-item-input" v-model="i.content" type="date" placeholder="选择日期" ></el-date-picker>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="shijian" v-if="buttonshop">
                    <el-button size="mini" type="danger" @click="shanchuBtn">删除</el-button>
                    <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                    <el-button size="mini" @click="baocunBtn" type="primary">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import options from "@/utils/options";
export default {
    props:{
        baseInformation:{
            type:Object,
            details:{}
        }
    },
    data(){
        return{
            num3Show:false,
            shop:true,
            buttonshop:false,
            basicList:[
                {text:"毕业院校：",title:"22",zt:1,content:""},
                {text:"院系：",title:"22",zt:1,content:""},
                {text:"专业：",title:"22",zt:1,content:""},
                {text:"学历：",title:"硕士",zt:2,content:"",option:options.education},
                {text:"毕业年份：",title:"2012年",zt:1,content:""},
                {text:"政治面貌：",title:"党员",zt:2,content:"",option:options.politicCountenance},
                {text:"民族：",title:"汉族",zt:2,content:"",option:options.nationOptions},
                {text:"籍贯：",title:"浙江杭州",zt:1,content:""},
                {text:"出生日期：",title:"1991-09-12",zt:3,content:"",},
                {text:"手机：",title:"13512344321",zt:1,content:""},
                {text:"微信：",title:"FFAA1234",zt:1,content:""},
                {text:"现居地：",title:"北京",zt:1,content:""},
                {text:"邮箱：",title:"13512344321@163.com",zt:1,content:""},
                {text:"QQ：",title:"3521452324",zt:1,content:""},
            ],
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.resumeBtn()
        }
    },
    methods:{
        async resumeBtn(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let resume = await this.service.user.info({
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                })
                if(resume.code==0){
                    this.basicList[0].content = resume.data.userinfo.school_id_name;
                    this.basicList[1].content = resume.data.userinfo.department_id_name;
                    this.basicList[2].content = resume.data.userinfo.professional_id_name;

                    for(let i in options.education){//学历选择器数据转换
                        if(options.education[i].value==resume.data.resumeinfo.xueli){
                            this.basicList[3].content = options.education[i].label;
                        }
                    }
                    this.basicList[4].content = resume.data.resumeinfo.years;
                    for(let i in options.politicCountenance){//政治面貌选择器数据转换
                        if(options.politicCountenance[i].value==resume.data.resumeinfo.political){
                            this.basicList[5].content = options.politicCountenance[i].label;
                        }
                    }
                    for(let i in options.nationOptions){//民族选择器数据转换
                        if(options.nationOptions[i].value==resume.data.resumeinfo.nation){
                            this.basicList[6].content = options.nationOptions[i].label;
                        }
                    }
                    this.basicList[7].content = resume.data.resumeinfo.native_place;

                    this.basicList[8].content =resume.data.resumeinfo.birthday.substring(0,10);

                    this.basicList[9].content = resume.data.resumeinfo.phone;
                    this.basicList[10].content = resume.data.resumeinfo.weixin;
                    this.basicList[11].content = resume.data.resumeinfo.lives;
                    this.basicList[12].content = resume.data.resumeinfo.email;
                    this.basicList[13].content = resume.data.resumeinfo.qq;
                }
            }
       },
        suspensionBtn(){
           this.num3Show = true
        },
        outsuspensionBtn(){
            this.num3Show = false
        },
        edit(){
            this.shop = false
            this.buttonshop = true
            this.basicList.map((i)=>{
              i.title = i.content
            })
        },
        fanhuiBtn(){
            this.buttonshop = false
            this.shop = true
        },
        shanchuBtn(){
            alert('删除')
            
        },
        async baocunBtn(){    // 保存
            let params={
                id:JSON.parse(localStorage.getItem("username")).userinfo.id,


                xueli:this.basicList[3].content,
                years: this.basicList[4].content,
                political:this.basicList[5].content,
                nation :this.basicList[6].content,
                native_place:this.basicList[7].content,
                birthday:this.basicList[8].content,
                phone:this.basicList[9].content,
                weixin:this.basicList[10].content,
                lives:this.basicList[11].content,
                email:this.basicList[12].content,
                qq:this.basicList[13].content,
            }
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.buttonshop = false
                this.shop = true
                this.resumeBtn()
            }
           
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .select-item-name {
        color: #262626;
        font-size: 14px;
        margin: 12px 0;
        span {
            color: #f64343;
        }
    }
    /deep/.select-item-input{
        height: 35px;
        .el-input__inner{
            margin-top: 12px;
             height: 35px;
        }
        .el-input__icon{
            line-height: 58px;
        }
       
    }
    .edit{
        width: 14px;
        height: 14px;
        padding: 24px 20px 0 0;
        cursor:pointer;
    }
    .basic{
        margin-top: 20px;
        width:880px;
        // height:250px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .basic-title{
            .icons{
                width: 12px;
                height: 12px;
                padding: 23px 10px 0 20px;
            }
            h1{
                height:20px;
                font-size:16px;
                font-weight:bold;
                color:rgba(51,51,51,1);
                line-height:20px;
                padding-top: 20px;
            }
        }
        .basic-content{
            ul{
                padding: 20px 0 0 20px;
                li{
                    width: 30%;
                    padding:0 0 20px 20px;
                    h1:nth-of-type(1){
                        height:18px;
                        font-size:14px;
                        color:rgba(38,38,38,1);
                        line-height:18px;
                        float: left;
                    }
                    h1:nth-of-type(2){
                        float: left;
                        height:18px;
                        font-size:14px;
                        color:rgba(89,89,89,1);
                        line-height:18px;
                    }
                    div{
                        display: block;
                        margin:0 7px;
                    }
                }
            }
            .shijian{
                padding:5px 0 20px 55px;
            }
        }
    }
</style>