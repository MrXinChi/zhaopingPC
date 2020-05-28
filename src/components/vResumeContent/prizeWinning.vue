<template>
    <div class="container">
        <!-- <h1>获奖情况</h1> -->
         <div :class="this.prizeWinningShow==true?'prizewinnings':'prizewinning'" @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
           <div class="prizewinning-title flex flex_y_center flex_x_bten">
                <div class="flex flex_y_center">
                    <v-icon icon-class="icon-prizewinning" class-name="icons"></v-icon>
                    <h1>获奖情况</h1>
                </div>
                <div v-if="num6Show" class="flex flex_y_center" @click="addBtn">
                    <v-icon icon-class="icon-jia" class-name="edits"></v-icon>
                    <h1>添加</h1>
                </div>
          </div>
          <div class="prizewinning-content">
              <div v-if="contentShop">
                  <div v-for="(i,k) in prizewinningArray" :key="k">
                      <ul class="flex flex_y_center flex_x_bten">
                        <li class="flex flex_y_center">
                            <h1>{{i.hj_name}}</h1>
                            <h1>{{i.hj_appDate}}</h1>
                        </li>
                        <li @click="edit(k)">
                            <v-icon v-if="num6Show" icon-class="icon-edit" class-name="edits"></v-icon>
                        </li>
                    </ul>
                    <h2>{{i.hj_dw}}</h2>
                    <h3>{{i.hj_content}}</h3>
                  </div>
              </div>

              <div v-if="addShow" class="flex">
                  <div style="width:30%;margin:0 20px 0 0" v-for="(n,k) in prizewinningList" :key="k">
                        <v-input-box :title="n.text" v-model="n.content" v-if="n.zt==1 " ></v-input-box>
                        <span v-if="n.zt==2" class="demonstration">{{n.text}}</span>
                        <el-date-picker @input="input" v-model="n.content" type="datetime" :placeholder="n.text"  v-if="n.zt==2"></el-date-picker>
                  </div>
              </div>

              <div v-if="editShow" class="flex">
                  <div style="width:30%;margin:0 20px 0 0" v-for="(n,k) in prizewinningList" :key="k">
                        <v-input-box :title="n.text" v-model="prizewinningArray[itemId].hj_name" v-if="n.text=='获奖项'" ></v-input-box>
                        <v-input-box :title="n.text" v-model="prizewinningArray[itemId].hj_dw" v-if="n.text=='获奖地址'" ></v-input-box>
                        <span v-if="n.zt==2" class="demonstration">{{n.text}}</span>
                        <el-date-picker @input="input" v-model="prizewinningArray[itemId].hj_appDate" type="datetime" :placeholder="n.text"  v-if="n.zt==2"></el-date-picker>
                  </div>
              </div>


              <div style="margin:15px 50px 0 0;" v-if="!contentShop">
                <v-input-box v-if="zt==1&&!editShow" :inputShop="inputShop" :title="text" v-model="content"></v-input-box>
                <v-input-box v-if="zt==1&&editShow" :inputShop="inputShop" :title="text" v-model="prizewinningArray[itemId].hj_content"></v-input-box>
                <div class="shijian" >
                    <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                    <el-button v-if="!editShow" size="mini" @click="baocunBtn" type="primary">保存</el-button>
                    <el-button v-if="editShow" size="mini" @click="editBtn" type="primary">保存</el-button>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
let arr = []
export default {
     props: {
        prizeWinningShow: { type: Boolean},
    },
    data(){
        return{
            inputShop:true,
            num6Show:false,
            contentShop:true,
            prizewinningArray:[],
            prizewinningList:[
                {text:"获奖项",zt:1,content:""},
                {text:"获奖时间",zt:2,content:""},
                {text:"获奖地址",zt:1,content:""},
            ],
            text:"获奖内容",content:"",zt:1,
            hj_appDate:0,
            addShow:false,
            editShow:false,
            itemId:0
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
                    this.prizewinningArray = resume.data.resumeinfo.huojiang;
                    console.log(this.prizewinningArray);
                }
            }
        },
        suspensionBtn(){
            this.num6Show = true
        },
        outsuspensionBtn(){
            this.num6Show = false
        },
        addBtn(){   //添加
            this.contentShop=false;
            this.addShow=true;
            this.editShow=false;
        },
        fanhuiBtn(){    //返回
            this.contentShop = !this.contentShop
            this.addShow=false;
            this.editShow=false;
        },
         p(s) {
            return s < 10 ? '0' + s : s
        },
        input(time){
            var d = new Date(time)
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            this.prizewinningList[1].content = resDate
        },
        async baocunBtn(){       //保存
        let editList=[];
        for(let i in this.prizewinningArray){
            editList.push({'hj_appDate':this.prizewinningArray[i].hj_appDate,"hj_name":this.prizewinningArray[i].hj_name,"hj_dw":this.prizewinningArray[i].hj_dw,'hj_content':this.prizewinningArray[i].hj_content})
        }
            editList.push({'hj_appDate':this.prizewinningList[1].content,"hj_name":this.prizewinningList[0].content,"hj_dw":this.prizewinningList[2].content,'hj_content':this.content})
            let params = {id:JSON.parse(localStorage.getItem("username")).userinfo.id,huojiang:JSON.stringify(editList)}
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn();
                this.contentShop = !this.contentShop;
                this.addShow=false;
                this.editShow=false;
            }
        },
        async editBtn(){       //修改
        let editList=[];
        for(let i in this.prizewinningArray){
            editList.push({'hj_appDate':this.prizewinningArray[i].hj_appDate,"hj_name":this.prizewinningArray[i].hj_name,"hj_dw":this.prizewinningArray[i].hj_dw,'hj_content':this.prizewinningArray[i].hj_content})
        }
            let params = {id:JSON.parse(localStorage.getItem("username")).userinfo.id,huojiang:JSON.stringify(editList)}
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn();
                this.contentShop = !this.contentShop;
                this.addShow=false;
                this.editShow=false;
            }
        },
        edit(id){  //编辑
        this.itemId=id;
            this.contentShop =false;
            this.editShow=true;
            this.addShow=false;
        }
    }
}
</script>
<style lang="scss" scoped>
    .shijian{
        padding:20px 0 20px 20px;
    }
    /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
        margin-top: 12px;
        height: 35px;
        input{
            height: 35px;
        }
    }
    .prizewinning{
        margin-top: 20px;
        width:880px;
        // height:184px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .prizewinning-title{
            padding-bottom: 20px;
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
        .prizewinning-content{
            padding-left:20px;
            ul{
                li:nth-of-type(1){
                    h1:nth-of-type(1){
                        height:18px;
                        font-size:14px;
                        color:rgba(38,38,38,1);
                        line-height:18px;
                    }
                    h1:nth-of-type(2){
                         padding-left: 16px;
                        height:15px;
                        font-size:12px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(140,140,140,1);
                        line-height:15px;
                    }
                }
                li:nth-of-type(2){
                   .edits{
                       width: 14px;
                       height: 14px;
                       padding-right: 20px;
                       cursor:pointer;
                   }
                }
            }
            h2{
                height:18px;
                font-size:14px;
                color:rgba(38,38,38,1);
                line-height:18px;
                padding: 12px 0;
            }
            h3{
                height:44px;
                font-size:14px;
                color:rgba(89,89,89,1);
                line-height:22px;
            }
        }
    }
    .prizewinnings{
        // margin-top: 20px;
        width:600px;
        // height:184px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .prizewinning-title{
            padding-bottom: 20px;
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
        .prizewinning-content{
            margin:0 20px;
            border-bottom:1px solid #DEDEDE;
            ul{
                li:nth-of-type(1){
                    h1:nth-of-type(1){
                        height:18px;
                        font-size:14px;
                        color:rgba(38,38,38,1);
                        line-height:18px;
                    }
                    h1:nth-of-type(2){
                         padding-left: 16px;
                        height:15px;
                        font-size:12px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(140,140,140,1);
                        line-height:15px;
                    }
                }
                li:nth-of-type(2){
                   .edits{
                       width: 14px;
                       height: 14px;
                       padding-right: 20px;
                       cursor:pointer;
                   }
                }
            }
            h2{
                height:18px;
                font-size:14px;
                color:rgba(38,38,38,1);
                line-height:18px;
                padding: 12px 0;
            }
            h3{
                height:44px;
                font-size:14px;
                color:rgba(89,89,89,1);
                line-height:22px;
            }
        }
    }
</style>