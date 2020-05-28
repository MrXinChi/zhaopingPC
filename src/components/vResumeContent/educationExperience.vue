<template>
    <div class="container" >
        <!-- <h1>教育经历</h1> -->
         <div :class="this.educationExperienceShow==true?'educations':'education'" @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
          <div class="education-title flex flex_y_center flex_x_bten">
              <div class="flex flex_y_center">
                   <v-icon icon-class="icon-education" class-name="icons"></v-icon>
                   <h1>教育经历</h1>
              </div>
               <div v-if="num4Show" class="flex flex_y_center" @click="addToBtn">
                    <v-icon icon-class="icon-jia" class-name="edits"></v-icon>
                    <h1>添加</h1>
                </div>
          </div>
          
          <div class="education-content">
              <div class="education-contents flex" v-for="(i,k) in educationList" :key="k" >
                    <div v-if="i.shop" >
                        <div class="education-content-top flex flex_y_center flex_x_bten">
                        <div class="flex flex flex_y_center">
                            <h1>{{i.edu_school}}</h1>
                                <h1>{{i.edu_appDate}} - {{i.edu_appDate1}}</h1>
                        </div>
                        <div  v-if="i.Show" class="flex flex_y_center" @click="edit(k)">
                            <v-icon :icon-class="i.icon" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="education-content-center">
                        <ul class="flex ">
                            <li>{{i.edu_xueli}}</li>
                            <li></li>
                            <li>{{i.edu_yuanxi}}</li>
                            <li></li>
                            <li>{{i.edu_zhuanye}}</li>
                        </ul>
                    </div>
                    <div v-if="i.zt==1" class="education-content-fenge"></div>
                  </div>
              </div>
            <div class="tianjia " v-if="shows">
                
                <div v-for="(i,k) in educationlistEdit" :key="k" class="tianjiadiv">
                    <v-input-box  :title="i.text" v-model="i.content" v-if="i.zt==1"></v-input-box>
                    <v-select-box :title="i.text" :options="i.option" v-model="i.content" v-if="i.zt==2"></v-select-box>
                    <!-- <v-select-box :title="i.text" type="date" v-model="i.content" v-if="i.zt==3"></v-select-box> -->
                    <v-date-picker :title="i.text" @input="input"  v-model="i.content" v-if="i.zt==3"></v-date-picker>
                </div>
            </div>
            <!-- 教育经历 -->
            <div class="tianjia " v-if="buttonshop">
                <div v-for="(i,k) in educationlist" :key="k" class="tianjiadiv">
                <v-input-box :title="i.text" v-model="i.content" v-if="i.zt==1" ></v-input-box>
                <v-select-box :title="i.text" :options="i.option" v-model="i.content" v-if="i.zt==2"></v-select-box>
                <v-date-picker :title="i.text" @input="input"  v-model="i.content" v-if="i.zt==3"></v-date-picker>
                </div>
            </div>
            <!-- 通用按钮 -->
            <div class="shijian" v-if="buttonshops">
                <el-button size="mini" type="danger" @click="shanchuBtn">删除</el-button>
                <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                <el-button v-if="buttonshop" size="mini" @click="baocunBtn(0)" type="primary">保存</el-button>
                <el-button v-if="!buttonshop" size="mini" @click="baocunBtn(1)" type="primary">保存</el-button>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import options from "@/utils/options";
export default {
     props: {
        educationExperienceShow: { type: Boolean},
    },
    data(){
        return{
            num4Show:false,
            buttonshop:false,
            buttonshops:false,
            shows:false,
            educationList:[
                {edu_school:"中国学院",edu_appDate:"2006.09 ",edu_appDate1:" 2009.06",icon:"icon-edit",edu_xueli:"学士",edu_yuanxi:"艺术设计与动画影视剧书学院设计学院",edu_zhuanye:"视觉传达设计",Show:false,shop:true,id:1,zt:1},
                {edu_school:"中国美术学院",edu_appDate:"2006.09 ",edu_appDate1:" 2009.06",icon:"icon-edit",edu_xueli:"学士",edu_yuanxi:"艺术设计与动画影视剧书学院设计学院",edu_zhuanye:"视觉传达设计",Show:false,shop:true,id:2,zt:2},
            ],
            educationlist:[
                {text:"院系",content:"",zt:1},
                {text:"专业",content:"",zt:1},
                {text:"学历",content:"",zt:1},
                {text:"学校",content:"",zt:1},
                {text:"在校时间",content:"",zt:3},
                
            ],
            educationlistEdit:[
                {text:"院系",content:"",zt:1},
                {text:"专业",content:"",zt:1},
                {text:"学历",content:"",zt:1},
                {text:"学校",content:"",zt:1},
                {text:"在校时间",content:"",zt:3},
            ],
            edu_appDate:0,
            edu_appDate1:0,
            editId:0
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.init()
        }
    },
    methods:{
         async init(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
                this.educationList = resume.data.resumeinfo.experience
                if(this.educationList != null){
                    this.educationList.map((i)=>{
                        this.$set(i,"Show","false")
                        this.$set(i,"shop","true")
                        this.$set(i,"zt","1")
                        this.$set(i,"icon","icon-edit")
                    })
                    this.educationList[this.educationList.length-1].zt = "2"
                    return
                }
            }
       },
        suspensionBtn(){
            this.num4Show = true;
            this.educationList.map((i)=>{i.Show = true});
        },
        outsuspensionBtn(){
            this.num4Show = false;
            this.educationList.map((i)=>{i.Show = false});
        },
        addToBtn(){         //添加
            this.buttonshop = true;
            this.buttonshops = true;
            this.educationList.map((i)=>{i.zt = 1});
        },
        edit(id){
            this.editId=id;//当前正在修改的id
            this.educationlistEdit[0].content=this.educationList[id].edu_yuanxi;
            this.educationlistEdit[1].content=this.educationList[id].edu_zhuanye;
            this.educationlistEdit[2].content=this.educationList[id].edu_xueli;
            this.educationlistEdit[3].content=this.educationList[id].edu_school;

            this.educationList[id].shop = false;
            this.educationList[id].zt = 1;
            this.buttonshops = true;
            this.shows = true;
        },
        p(s) {
            return s < 10 ? '0' + s : s;
        },
        input(timer){
            var d = new Date(timer[0]);
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            var b = new Date(timer[1]);
            const resData = b.getFullYear() + '-' + this.p((b.getMonth() + 1)) + '-' + this.p(b.getDate())
            this.edu_appDate = resDate;
            this.edu_appDate1 = resData;
        },
        async shanchuBtn(){   //删除
            this.educationList.splice(this.editId,1);
            let params = {
                id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                experience:JSON.stringify(this.educationList)
            }
            let init = await this.service.user.modify(params)
            
            if(init.code == 0){
                this.fanhuiBtn()
                this.init()
            }
        },
        fanhuiBtn(){    //返回
            this.buttonshop = false
            this.buttonshops = false
            this.shows = false
            this.educationList.map((i)=>{i.shop= true})
            let a = this.educationList.length-1
            this.educationList[a].zt = 2
        },
        async baocunBtn(index){    //保存
            let arr  = []
            if(index==0){
                for(let i in this.educationList){
                    arr.push(this.educationList[i]);
                }
                arr.push({
                    "edu_xueli":this.educationlist[0].content,
                    "edu_school":this.educationlist[1].content,
                    "edu_yuanxi":this.educationlist[2].content,
                    "edu_zhuanye":this.educationlist[3].content,
                    "edu_appDate":this.edu_appDate,
                    "edu_appDate1":this.edu_appDate1
                });
            }else{
                let data={
                    "edu_xueli":this.educationlistEdit[0].content,
                    "edu_school":this.educationlistEdit[1].content,
                    "edu_yuanxi":this.educationlistEdit[2].content,
                    "edu_zhuanye":this.educationlistEdit[3].content,
                    "edu_appDate":this.edu_appDate,
                    "edu_appDate1":this.edu_appDate1
                };
                this.educationList[this.editId]=data;
                arr=this.educationList;
            }
            let params = {
                id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                experience:JSON.stringify(arr)
            }
            let init = await this.service.user.modify(params)
            
            if(init.code == 0){
                this.fanhuiBtn()
                this.init()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .educations{
        // margin-top: 20px;
        width:600px;
        // height:217px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .education-title{
            div:nth-of-type(1){
                .icons{
                    width: 12px;
                    height: 12px;
                    padding: 0px 10px 0 20px;
                }
                h1{
                    height:20px;
                    font-size:16px;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    line-height:20px;
                    // padding-top: 20px;
                }
            }
            div:nth-of-type(2){
                cursor:pointer;
                .edits{
                    width: 14px;
                    height: 14px;
                    // padding: 20px 0px 0 0;
                }
                h1{
                    padding:0px 20px 0 3px;
                    height:20px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(58,113,251,1);
                    line-height:20px;
                }
            }
        }
        .education-content{
            margin:0 20px;
            border-bottom:1px solid #DEDEDE;
            .education-contents{
                flex-direction: column;
                .education-content-top{
                    padding: 10px 0;
                    h1:nth-of-type(1){
                        // padding-left:20px;
                        height:18px;
                        font-size:14px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(38,38,38,1);
                        line-height:18px;
                    }
                    h1:nth-of-type(2){
                        padding-left: 12px;
                        height:15px;
                        font-size:12px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(140,140,140,1);
                        line-height:15px;
                    }
                    .edits{
                        width: 14px;
                        height: 14px;
                        padding-right: 20px;
                        cursor:pointer;
                    }
                }
                .education-content-center{
                    padding:12px 0 20px 0px;
                    ul{
                       
                        li:nth-of-type(2){
                            margin: 0 12px;
                            width:1px;
                            height:12px;
                            background:rgba(222,222,222,1);
                        }
                        li:nth-of-type(4){
                            margin: 0 12px;
                            width:1px;
                            height:12px;
                            background:rgba(222,222,222,1);
                        }
                    }
                }
                .education-content-fenge{
                    margin:20px;
                    // width:840px;
                    border:1px dashed rgba(222,222,222,1);
                }
            }
            .tianjia{
                padding-left:10px;
                width: 100%;
                display:flex;
                flex-wrap: wrap-reverse;
                .tianjiadiv{
                    width: 30%;
                    margin: 10px 10px;
                }
            }
            .shijian{
                padding:10px 0 20px 20px;
            }
        }
    }
    .education{
        margin-top: 20px;
        width:880px;
        // height:217px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .education-title{
            div:nth-of-type(1){
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
            div:nth-of-type(2){
                cursor:pointer;
                .edits{
                    width: 14px;
                    height: 14px;
                    padding: 20px 0px 0 0;
                }
                h1{
                    padding:20px 20px 0 3px;
                    height:20px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(58,113,251,1);
                    line-height:20px;
                }
            }
        }
        .education-content{
            padding: 20px;
            .education-contents{
                flex-direction: column;
                .education-content-top{
                    padding: 2px 0;
                    h1:nth-of-type(1){
                        padding-left:20px;
                        height:18px;
                        font-size:14px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(38,38,38,1);
                        line-height:18px;
                    }
                    h1:nth-of-type(2){
                        padding-left: 12px;
                        height:15px;
                        font-size:12px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(140,140,140,1);
                        line-height:15px;
                    }
                    .edits{
                        width: 14px;
                        height: 14px;
                        // padding-right: 20px;
                        cursor:pointer;
                    }
                }
                .education-content-center{
                    padding:12px 0 0 20px;
                    ul{
                       
                        li:nth-of-type(2){
                            margin: 0 12px;
                            width:1px;
                            height:12px;
                            background:rgba(222,222,222,1);
                        }
                        li:nth-of-type(4){
                            margin: 0 12px;
                            width:1px;
                            height:12px;
                            background:rgba(222,222,222,1);
                        }
                    }
                }
                .education-content-fenge{
                    margin:20px;
                    // width:840px;
                    border:1px dashed rgba(222,222,222,1);
                }
            }
            .tianjia{
                padding-left:10px;
                width: 100%;
                display:flex;
                flex-wrap: wrap-reverse;
                .tianjiadiv{
                    width: 30%;
                    margin: 10px 10px;
                }
            }
            .shijian{
                padding:10px 0 20px 20px;
            }
        }
    }
</style>