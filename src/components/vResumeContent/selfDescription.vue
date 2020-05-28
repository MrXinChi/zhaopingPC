<template>
    <div class="container" >
        <!-- <h1>自我描述</h1> -->
          <div :class="this.selfDescriptionShow==true?'selfs':'self'"  @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
           <div class="self-title flex flex_y_center flex_x_bten">
               <div class="flex flex_y_center">
                   <v-icon icon-class="icon-self" class-name="icons"></v-icon>
                   <h1>{{introduce}}自我描述</h1>
               </div>
                <div v-if="num7Show" @click="edit">
                    <v-icon  icon-class="icon-edit" class-name="edit"></v-icon>
                </div>
          </div>
          <div class="self-content">
              <h1 v-if="describeShop">{{content}}</h1>
              <div v-else>
                    <v-input-box :inputShop="inputShop"  v-model="content" v-if="zt==1" ></v-input-box>
                    <div class="shijian" >
                        <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                        <el-button size="mini" @click="baocunBtn" type="primary">保存</el-button>
                    </div>
              </div>
          </div>
          
      </div>
    </div>
</template>
<script>
export default {
    props: {
        selfDescriptionShow: { type: Boolean},
    },
    data(){
        return{
            describeShop:true,
            num7Show:false,
            content:"",
            zt:1,
            inputShop:true,
            introduce:{}
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
                    this.introduce = resume.data.resumeinfo.introduce
                    this.content = resume.data.resumeinfo.introduction
                }
            }
        },
        suspensionBtn(){
            this.num7Show = true
        },
        outsuspensionBtn(){
            this.num7Show = false
        },
        edit(){
            this.describeShop = false
        },
        fanhuiBtn(){
            this.describeShop = true
        },
        async baocunBtn(){        //保存
            let params = { id:JSON.parse(localStorage.getItem("username")).userinfo.id, introduction:this.content}
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn()
                this.describeShop = true
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .shijian{
        padding:20px 0 20px 0;
    }
    .edit{
        width: 14px;
        height: 14px;
        padding: 24px 20px 0 0;
        cursor:pointer;
    }
    .self{
        margin-top: 20px;
        width:880px;
        min-height:124px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .self-title{
            // padding-bottom: 20px;
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
        }
        .self-content{
            margin: 0 21px;
            h1{
                padding:20px 20px 20px 0px;
                height:44px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                color:rgba(89,89,89,1);
                line-height:22px;
            }
            
        }
    }
    .selfs{
        // margin-top: 20px;
        width:600px;
        min-height:124px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .self-title{
            // padding-bottom: 20px;
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
        }
        .self-content{
            margin: 0 21px;
            border-bottom:1px solid #DEDEDE;
            h1{
                padding:20px 20px 20px 0px;
                height:44px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                color:rgba(89,89,89,1);
                line-height:22px;
            }
            
        }
    }
</style>