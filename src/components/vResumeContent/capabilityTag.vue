<template>
    <div class="container"  >
        <!-- <h1>能力标签</h1> -->
        <div class="ability"  @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
            <div class="ability-title flex flex_y_center flex_x_bten">
                <div class="flex flex_y_center">
                    <!-- <v-icon icon-class="icon-ability" class-name="icons"></v-icon> -->
                    <img src="@/assets/images/book.png" class="icons">
                    <h1>能力标签</h1>

                </div>
                <div v-if="num2Show" @click="edit">
                    <v-icon icon-class="icon-edit" class-name="edit"></v-icon>
                </div>
            </div>
            <!-- <div class="ability-contetn flex flex_warp">
                <ul class="flex ">
                    <li v-for="(i,k) in abilityList" :key="k"><h1>{{i.cate_name}}</h1></li>
                </ul>
            </div> -->
            <div class="intention-content flex">
                <div class="intention-contentHa flex">
                    <ul class="flex flex_warp">
                        <li class="flex flex_y_center flex_x_center" v-for="(i,k) in abilityList" :key="k">
                        <h1 class="flex flex_y_center flex_x_center">
                            {{i}}
                            <span v-if="addshow" @click="removeBtn(k)">x</span>
                        </h1>
                        </li>
                        <span @click="addBtn">
                            <!-- <input v-if="addsshows" type="text" v-model="addValue" @blur="contentBtn(numList.id)">   -->
                            <v-icon v-if="addsshow" icon-class="icon_add" class-name="edits" ></v-icon>
                        </span>
                    </ul>
                </div>
            </div>


            <div class="qiuzhizhezhao" v-if="addsshows" >
                <div class="personal">
                    <div class="personal-content">
                        <ul class="flex flex_warp">
                            <li class="flex flex_y_center" v-for="(i,k) in personalArray.children" :key="k" @click="xuanzeBtn(i.id,i.title)" >
                                <h1 :class="xuanzhongNum == i.id ? 'xuanzhongs':''">{{i.title}}</h1>
                            </li>
                        </ul>
                    </div>
                    <div class="personal-footer flex flex_x_center">
                        <h1 class="flex flex_y_center flex_x_center" @click="resumeBtns">
                        <h2>确认</h2>
                        </h1>
                    </div>
                </div>
            </div>

      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
             abilityList:[
                // {cate_name:"责任心"},
                // {cate_name:"抗压能力"},
                // {cate_name:"执行力"},
                // {cate_name:"团队精神"},
                // {cate_name:"办公软件"},
            ],
            addshow:false,
            addsshow:false,
            num2Show:false,
            personalArray:{
                children:[
                    {title:"人才管理",id:1},
                    {title:"商务管理",id:2},
                    {title:"商业敏锐",id:3},
                    {title:"速记能力",id:4}
                ]
            },
            xuanzhongNum:0,
            xuanzhongname:"",
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.resumeBtn()
        }
    },
    methods:{
        xuanzeBtn(id,name){//选中的标签
            this.xuanzhongNum = id;
            this.xuanzhongname = name;
        },
        resumeBtns(){  //确认添加
            this.addsshows = false
            this.outsuspensionBtn();
            this.baocunBtn();
        },
        async baocunBtn(){ //能力标签组添加
            let tagsString='';
            let params={};
            if(this.abilityList.length>0){
                for(let i in this.abilityList){
                    if(tagsString==''){
                        tagsString=this.abilityList[i];
                    }else{
                        tagsString=tagsString+','+this.abilityList[i]
                    }
                }
                params={
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id, 
                    tags:tagsString+','+this.xuanzhongname
                }
            }else{
                params={
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id, 
                    tags:this.xuanzhongname
                }
            }
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn()
            }
        },
        addBtn(id){   //添加
          this.addsshow = false;
          this.addsshows = true;
        },
        edit() {
            this.addshow = true;
            this.addsshow = true;
        },

       async removeBtn(id){   //删除标签
            this.abilityList.splice(id,1);
            let tagsString='';
            for (var key in this.abilityList) {
                if(tagsString==''){
                    tagsString=this.abilityList[key];
                }else{
                    tagsString=tagsString+','+this.abilityList[key]
                }
            }
            let params={
                id:JSON.parse(localStorage.getItem("username")).userinfo.id, 
                tags:tagsString
            }
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.resumeBtn()
            }
        },
        async resumeBtn(){//获取信息
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let resume = await this.service.user.info({
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                })
                if(resume.code==0){
                    this.abilityList=resume.data.resumeinfo.tags.split(",");
                }
            }
       },
        suspensionBtn(){
           this.num2Show = true
        },
        outsuspensionBtn(){
            this.num2Show = false;
            this.addshow=false;
            this.addsshow=false;
        },
         
    }
    
}
</script>
<style lang="scss" scoped>
.xuanzhongs{
  background: #5286FF;
  color:#fff;
}
    .edit{
        width: 14px;
        height: 14px;
        padding: 24px 20px 0 0;
        cursor:pointer;
    }
    .ability{
        margin-top: 20px;
        width:880px;
        height:112px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .ability-title{
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
        .ability-contetn{
            ul{
                li{
                    height:32px;
                    background:rgba(249,249,249,1);
                    border-radius:2px;
                    margin: 20px 12px;
                    h1{
                        height:18px;
                        font-size:14px;
                        font-family:MicrosoftYaHeiUI;
                        color:rgba(89,89,89,1);
                        line-height:18px;
                        padding: 7px 12px;
                    }
                }
            }
        }
    }
    .intention-content {
        div {
        ul { 
            padding: 20px;
            li {
            background: rgba(249, 249, 249, 1);
            border-radius: 2px;
            margin: 0 4px 8px 4px;
            padding: 7px 11px;
            height: 19px;
            h1 {
                height: 18px;
                font-size: 14px;
                color: rgba(89, 89, 89, 1);
                line-height: 18px;
                span{
                    padding-left: 7px;
                    cursor:pointer;
                }
            }
            }
            span{
            display: flex;
            align-items: center;
            justify-content: center;
            input{
                width: 55px;
                border:1px solid #000;
                margin:0px 0 0 5px;
            }
            }
            .edits{
                width: 22px;
                height: 22px;
                padding: 5px 8px;
                cursor:pointer;
            }
        }
        }
    }
    .qiuzhizhezhao{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  .personal{
    position: relative;
    top: 20%;
    left: 50%;
    width:468px;
    height:324px;
    margin-left: -234px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    .personal-header{
      width:100%;
      height:56px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      ul{
        width: 100%;
        height: 100%;
        border-bottom:1px solid rgba(222,222,222,1); 
        li{
          width: 25%;
          height: 100%;
          h1{
            height:23px;
            font-size:18px;
            line-height:23px;
          }
        }
        .shanchu{
          flex: 1;
          text-align: right;
          padding-right: 21px;
          font-size: 23px;
          color: #999999;
        }
      }
    }
    .personal-content{
      ul{
        padding:20px;
        li{
          height:34px;
          background:rgba(249,249,249,1);
          border-radius:2px;
          margin:0 12px 12px 12px; 
          h1{
            height:18px;
            font-size:14px;
            line-height:18px;
            padding: 8px 12px;
          }
        }
      }
       .personal-content-div{
          margin-left: 20px;
          .add{
            padding:10px 0 0 0;
            h1{
              height:18px;
              font-size:14px;
              color:rgba(82,134,255,1);
              line-height:18px;
            }
          }
          /deep/.el-select{
            margin: 0 5px;
          }
        }
    }
    .personal-footer{
      padding-top: 20px;
        h1{
          width:76px;
          height:36px;
          background:rgba(53,121,255,1);
          border-radius:4px;
          h2{
            height:18px;
            font-size:14px;
            color:rgba(255,255,255,1);
            line-height:18px;
          }
        }
    }
  }
}
</style>