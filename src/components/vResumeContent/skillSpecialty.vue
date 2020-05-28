<template>
    <div class="container" >
        <!-- <h1>技能特长</h1> -->
        <div :class="this.skillSpecialtyShow==true?'specialitys':'speciality'" @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
        <div class="speciality-title flex flex_y_center flex_x_bten">
            <div class="flex flex flex_y_center">
                <v-icon icon-class="icon-speciality" class-name="icons"></v-icon>
                <h1>技能特长</h1>
            </div>
            <div v-if="num5Show" class="flex flex_y_center" @click="add()">
                <v-icon icon-class="icon-jia" class-name="edits"></v-icon>
                <h1>添加</h1>
            </div>
        </div>
        <div class="speciality-content flex flex_warp ">
            <div class="speciality-contents" v-for="(i,k) in specialityList" :key='k'>
                <div v-if="i.shop">
                    <div class="flex flex_y_center flex_x_bten">
                        <span class="speciality-contents-span">{{i.jn_techang}}</span>
                        <div class="speciality-contents-spandiv" @click="edits(k)">
                            <v-icon  v-if="i.numShow" icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class=" speciality-contents-div flex flex_y_center flex_x_center"> 
                        <h1>{{i.jn_shuiping}}</h1>
                        <el-progress :percentage="i.num"  :show-text="false" class="jindu"></el-progress>
                    </div>
                    <div class="speciality-content-fenge" v-if="i.zt==1"></div>
                </div>
                <!-- 添加 -->
                <div class="speciality-contents-elem flex flex_y_center" v-if="addShow&&k<1">
                    <div  v-for="(n,k) in i.children" :key="k">
                        <v-input-box :title="n.text" v-model="n.content" v-if="n.status==1 " ></v-input-box>
                        <v-select-box :title="n.text" :options="n.option" v-model="n.content" v-if="n.status==2"></v-select-box>
                    </div>
                    <span style="width:240px"></span>
                </div>


                <!-- 修改 -->
                <div class="speciality-contents-elem flex flex_y_center" v-if="i.shops&&editShow">
                    <div v-for="(n,k) in i.children" :key="k">
                        <v-input-box :title="n.text" v-model="i.jn_techang" v-if="n.status==1 " ></v-input-box>
                        <v-select-box :title="n.text" :options="n.option" v-model="i.jn_shuiping" v-if="n.status==2"></v-select-box>
                    </div>
                    <span style="width:240px"></span>
                </div>
                


            </div>
            <div class="shijian" v-if="buttonshops">
                <el-button size="mini" type="danger" @click="deleteBtn">删除</el-button>
                <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                <el-button v-if="!editShow" size="mini" @click="baocunBtn" type="primary">保存</el-button>
                <el-button v-if="editShow" size="mini" @click="editBtn" type="primary">保存</el-button>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import options from "@/utils/options";
export default {
     inject: ["reload"], //注入App里的reload方法
      props: {
        skillSpecialtyShow: { type: Boolean},
    },
    data(){
        return{
            num5Show:false,
            buttonshops:false,
            specialityList:[
                {id:0,title:"Photoshop",text:"掌握",num:80,numShow:false,zt:1,shop:true,shops:false,children:[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}]},
                {id:1,title:"Illustrator",text:"掌握",num:100,numShow:false,zt:1,shop:true,shops:false,children:[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}]},
                {id:2,title:"CINEMA 4D",text:"一般",num:50,numShow:false,zt:1,shop:true,shops:false,children:[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}]},
                {id:3,title:"Sketch",text:"精通",num:85,numShow:false,zt:2,shop:true,shops:false,children:[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}]},
                {id:4,title:"Adobe XD",text:"精通",num:85,numShow:false,zt:2,shop:true,shops:false,children:[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}]},
            ],

            editShow:false,
            addShow:false,
            onClickId:0//正在修改id

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
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
                if(resume.code==0){
                    this.specialityList = resume.data.resumeinfo.jineng;
                    this.specialityList.map(i=>{
                        this.$set(i,"numShow",false)
                        this.$set(i,"shop",true)
                        this.$set(i,"shops",false)
                        this.$set(i,"children",[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}])
                        if(i.jn_shuiping == 1){
                            i.jn_shuiping="精通"
                            this.$set(i,"num",90)
                        }else if(i.jn_shuiping == 2){
                             i.jn_shuiping="熟练"
                             this.$set(i,"num",80)
                        }else if(i.jn_shuiping == 3){
                             i.jn_shuiping="掌握"
                             this.$set(i,"num",60)
                        }else if(i.jn_shuiping == 4){
                             i.jn_shuiping="一般"
                             this.$set(i,"num",55)
                        }
                    })
                }
            }
        },
        suspensionBtn(){
            this.num5Show = true
            this.specialityList.map((i)=>{i.numShow = true})
        },
        outsuspensionBtn(){
            this.num5Show = false
            this.specialityList.map((i)=>{i.numShow = false})
        },  
        add(id){//添加
            this.addShow = true;
            this.specialityList.map((i)=>{
                i.shop=false
                i.children=[{text:"技能名称",content:"",status:1},{text:"技能水平",content:"",status:2,option:options.skillLevel}]
                });
            this.buttonshops = true;
        },
        edits(id){//修改
            this.onClickId=id;
            this.specialityList.map((i)=>{i.shop=false});
            this.specialityList[id].shops = true;
            this.buttonshops = true;
            this.editShow = true;
        },
        deleteBtn(){
            this.specialityList.splice(this.onClickId, 1);
            this.buttonshops = false;
            this.specialityList.map((i)=>{i.shop=true;i.shops = false});
            this.deletePost();
        },
        fanhuiBtn(){  //返回
            this.buttonshops = false;
            this.editShow = false;
            this.addShow = false;
            this.specialityList.map((i)=>{i.shop=true;i.shops = false});
        },
        
        async baocunBtn(){    //保存
            let editList=[];
            for(let i in this.specialityList){
                editList.push({'jn_techang':this.specialityList[i].jn_techang,'jn_shuiping':this.specialityList[i].jn_shuiping})
            }
            // editList.push({'jn_techang':'fffff','jn_shuiping':2})
            editList.push({'jn_techang':this.specialityList[0].children[0].content,'jn_shuiping':this.specialityList[0].children[1].content})
            let params={id:JSON.parse(localStorage.getItem("username")).userinfo.id,jineng:JSON.stringify(editList)}
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn();
                this.addShow=false;
                this.buttonshops = false;
                this.specialityList.map((i)=>{i.shop=true;i.shops = false});
            }
        },
        async deletePost(){//删除
            let editList=[];
            for(let i in this.specialityList){
                editList.push({'jn_techang':this.specialityList[i].jn_techang,'jn_shuiping':this.specialityList[i].jn_shuiping})
            }
            let params={id:JSON.parse(localStorage.getItem("username")).userinfo.id,jineng:JSON.stringify(editList)}
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn();
                this.addShow=false;
                this.buttonshops = false;
                this.specialityList.map((i)=>{i.shop=true;i.shops = false});
            }
        },
        async editBtn(){    //修改  
            let editList=[];
            for(let i in this.specialityList){
                if(this.specialityList[i].jn_shuiping=='熟练'){
                    this.specialityList[i].jn_shuiping=1;
                }else if(this.specialityList[i].jn_shuiping=='精通'){
                    this.specialityList[i].jn_shuiping=2;
                }else if(this.specialityList[i].jn_shuiping=='掌握'){
                    this.specialityList[i].jn_shuiping=3;
                }else{
                    this.specialityList[i].jn_shuiping=4;
                }
               editList.push({'jn_techang':this.specialityList[i].jn_techang,'jn_shuiping':this.specialityList[i].jn_shuiping})
            }
             
            let params={id:JSON.parse(localStorage.getItem("username")).userinfo.id,jineng:JSON.stringify(editList)}
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn()
                this.buttonshops = false
                this.specialityList.map((i)=>{i.shop=true;i.shops = false})
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .speciality-contents-elem{
        div:nth-of-type(2){
            padding-left: 60px;
        }
        .edit{
            width: 20px;
            height: 20px;
            padding: 22px 0 0 367px;
        }
           
    }
     .shijian{
        padding:10px 0 20px 0;
    }
    .speciality{
        // margin-top: 20px;
        width:880px;
        // height:217px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .speciality-title{
            padding-bottom: 10px;
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
        .speciality-content{
            width: 95%;
            margin: 0 25px;
            .speciality-contents{
                // width: 33%;
                padding: 10px 0;
                div:nth-of-type(1){
                    .speciality-contents-span{
                        height:18px;
                        font-size:14px;
                        color:rgba(89,89,89,1);
                        line-height:18px;
                    }
                    .speciality-contents-spandiv{
                        .edits{
                            width: 14px;
                            height: 14px;
                            padding-right: 25px;
                            cursor:pointer;
                        }
                    }
                }
                .speciality-contents-div{
                    padding: 12px 25px 0 0;
                    h1{
                        height:18px;
                        font-size:14px;
                        color:rgba(89,89,89,1);
                        line-height:18px;
                    }
                    .jindu{
                        margin-left: 8px;
                        width: 214px;
                    }
                }
            }
        }
        .speciality-content-fenge{
                margin:20px 0;
                // width:840px;
                border:1px dashed rgba(222,222,222,1);
            }
    }
    .specialitys{
        // margin-top: 20px;
        width:600px;
        // height:217px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .speciality-title{
            padding-bottom: 10px;
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
        .speciality-content{
            width: 95%;
            margin: 0 25px;
            border-bottom:1px solid #DEDEDE;
            .speciality-contents{
                // width: 33%;
                padding: 10px 0;
                div:nth-of-type(1){
                    .speciality-contents-span{
                        height:18px;
                        font-size:14px;
                        color:rgba(89,89,89,1);
                        line-height:18px;
                    }
                    .speciality-contents-spandiv{
                        .edits{
                            width: 14px;
                            height: 14px;
                            padding-right: 25px;
                            cursor:pointer;
                        }
                    }
                }
                .speciality-contents-div{
                    padding: 12px 25px 0 0;
                    h1{
                        height:18px;
                        font-size:14px;
                        color:rgba(89,89,89,1);
                        line-height:18px;
                    }
                    .jindu{
                        margin-left: 8px;
                        width: 214px;
                    }
                }
            }
        }
        .speciality-content-fenge{
                margin:20px 0;
                border:1px dashed rgba(222,222,222,1);
            }
    }
</style>