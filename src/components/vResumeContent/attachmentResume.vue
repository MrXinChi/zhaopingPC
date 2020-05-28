<template>
    <div class="container"  >
        <!-- <h1>附件简历</h1> -->
        <div class="enclosure"  @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn" v-if="contentShop">
            <div class="enclosure-title flex flex_y_center flex_x_bten">
                <div>
                    <h1>附件简历</h1>
                </div>
                <div v-if="num9Show" class="flex flex_y_center" @click="edit">
                    <v-icon icon-class="icon-jia" class-name="edits"></v-icon>
                    <h1>添加</h1>
                </div>
            </div>
            <div class="enclosure-content" >
                <ul class="flex flex_x_bten" >
                    <li class="flex flex_y_center" v-for="(i,k) in enclosureList" :key="k">
                        <!-- <v-icon :icon-class="'icon-'+i.icon" class-name="icons"></v-icon> -->
                        <img v-if="k==0" src="@/assets/images/pdfs.png">
                        <img v-else-if="k==1" src="@/assets/images/png.png">
                        <img v-else src="@/assets/images/word.png">


                        <h1>{{i.resume_name}}</h1>
                        <div class="deleteCss" v-if="i.shop" @click="deleteInfo(i.number)">
                            <v-icon icon-class="icon-shanchu" class-name="edit"></v-icon>
                        </div>
                    </li>
                </ul>
            </div>
        
        </div> 
        <div class="enclosures"  @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn" v-else>
            <div class="enclosure-title flex flex_y_center flex_x_bten">
                    <div>
                        <h1>附件简历</h1>
                    </div>
                    <div v-if="num9Show" class="flex flex_y_center" @click="edit">
                        <v-icon icon-class="icon-jia" class-name="edits"></v-icon>
                        <h1>添加</h1>
                    </div>
            </div>
         
          <div class="enclosure-content" >
                <div class="flex flex_y_center" >
                    <v-input-box title="附件名称" v-model="content" v-if="zt==1 " ></v-input-box>
                    <div style="height:60px;">
                        <div style="margin: 0px 0px 10px 0;">附件文件</div>
                        <a href="javascript:;" class="a-upload">
                            <input type="file" name="" id="" @change="fileBtn($event)">{{this.filename_name}}
                        </a>
                    </div>
                </div>
                <div class="shijian" v-if="buttonshops">
                    <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                    <el-button size="mini" @click="baocunBtn" type="primary">保存</el-button>
                </div>
          </div>
        </div> 
        <div class="partition"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            removeShop:false,
            num9Show:false,
            contentShop:true,
            buttonshops:false,
            content:"",
            zt:1,
            enclosureList:[
                // {id:0,text:"简历/林子墨/美术老师.PDF",icon:"hongPdf",shop:false},
                // {id:1,text:"简历/林子墨/美术老师.PDF",icon:"lanPdf",shop:false},
                // {id:2,text:"简历/林子墨/美术老师.PDF",icon:"lvPdf",shop:false},
            ],
            // enclosurelistsssssssssssssssss:[
            //     {text:"附件名称",content:"",zt:1},
            //     {text:"附件文件",content:"",zt:"2"}
            // ],
            filename:"",
            filename_name:"选择文件"
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
                };
                let resume = await this.service.user.info(params);
                if(resume.code==0){
                    this.enclosureList=resume.data.upload_lists;
                    console.log(this.enclosureList)
                    for(let i in this.enclosureList){
                        this.enclosureList[i].shop=false;
                    }
                }
            }
        },
        suspensionBtn(){
            this.num9Show = true;
            this.enclosureList.map((i)=>{i.shop = true})
        },
        outsuspensionBtn(){
            this.num9Show = false 
            this.enclosureList.map((i)=>{i.shop = false})
        },
        edit(){
            this.contentShop = false
            this.buttonshops = true
        },
        async fileBtn(e){
            this.filename = e.target.files[0]
            this.filename_name = e.target.files[0].name
        },
        removeBtn(id){
            for (var key in this.enclosureList) {
                if (this.enclosureList[key].id === id) {
                    this.enclosureList.splice(key, 1)
                }
            }
        },
        fanhuiBtn(){        //返回
            this.contentShow = true
            this.buttonshops = false
            this.contentShop = true;
        },
        async baocunBtn(){//保存 
            const userId = JSON.parse(localStorage.getItem("username")) == null ? 1 : JSON.parse(localStorage.getItem("username")).userinfo.id;
            let param ={};
            for(let i=1; i<4;i++){
                if(this.enclosureList[i-1]==undefined){
                    param ={
                        id:userId,
                        url:this.filename,
                        number:i,
                        resume_name:this.filename_name,
                    }
                    continue;
                }
            }
            let resume = await this.service.user.modifyFile(param);
            if(resume.code == 0){
                this.resumeBtn();
                this.fanhuiBtn();
            }
        },
        async deleteInfo(index){
            let params = {
                id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                number:index
            }
            let resume = await this.service.user.deleteFile(params);
            if(resume.code == 0){
                this.resumeBtn();
                this.fanhuiBtn();
            }


        }
    }
}

</script>
<style lang="scss" scoped>
    .enclosures{
        margin-top: 20px;
        width:880px;
        min-height:140px; 
        background:rgba(255,255,255,1);
        border-radius:4px;
        .enclosure-title{
            padding: 20px 0 0 20px;
            div:nth-of-type(1){
                h1{
                    height:20px;
                        font-size:16px;
                        font-weight:bold;
                        color:rgba(38,38,38,1);
                        line-height:20px;
                }
            }
            div:nth-of-type(2){
                cursor:pointer;
                .edits{
                    width: 14px;
                    height: 14px;
                }
                h1{
                    padding:  0 20px 0 3px;
                    height:20px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(58,113,251,1);
                    line-height:20px;
                }
            }
        }
        .enclosure-content{
            padding:15px 0 22px 24px;
            ul{
                height: 20px;
                li{
                    height: 20px;  
                    width: 30%;
                    .icons{
                        width:13px;
                        height: 16px;
                    }
                    h1{
                        padding-left: 10px;
                    }
                }
            }
            .shijian{
                padding:20px 0 0px 0;
            }
        }
    }
    .edit{
        width: 20px;
        height: 20px;
        padding: 0px 0 0 25px;
    }
    .a-upload {
        padding: 0px 10px;
        height: 34px;
        line-height: 34px;
        position: relative;
        cursor: pointer;
        color: #888;
        background: #fafafa;
        border: 1px dashed #ddd;
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        *display: inline;
        *zoom: 1;
        width:240px;
    }
        
    .a-upload  input {
        position: absolute;
        width: 240px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer
    }
    .a-upload:hover {
        color: #444;
        background: #eee;
        border-color: #ccc;
        text-decoration: none
    }
    .container_box{
        width: 240px;
        padding-right: 60px;
    }
    .enclosure{
        margin-top: 20px;
        width:880px;
        // height:98px; 
        background:rgba(255,255,255,1);
        border-radius:4px;
        .enclosure-title{
            padding: 20px 0 0 20px;
            div:nth-of-type(1){
               h1{
                   height:20px;
                    font-size:16px;
                    font-weight:bold;
                    color:rgba(38,38,38,1);
                    line-height:20px;
               } 
            }
            div:nth-of-type(2){
                cursor:pointer;
                .edits{
                    width: 14px;
                    height: 14px;
                }
                h1{
                    padding:  0 20px 0 3px;
                    height:20px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(58,113,251,1);
                    line-height:20px;
                }
            }
        }
        .enclosure-content{
            padding:20px;
             width: 90%; 
            ul{
                height: 20px;
                li{
                    // margin-right: 20px;
                    height: 20px;  
                    width: 29%; 

                    font-size:14px;
                    font-family:MicrosoftYaHeiUI;
                    line-height:18px;
                    color:rgba(89,89,89,1);
                    opacity:1;
                    .icons{
                        width:13px;
                        height: 16px;
                    }
                    h1{
                        overflow: hidden;
                        text-overflow :ellipsis;//多余省略号显示
                        white-space:nowrap;//不许换行
                        padding-left: 10px;
                    }
                    .deleteCss{
                        margin-left: -15px;
                        width: 1px;
                    }
                }
            }
            .shijian{
                padding:20px 0 0px 20px;
            }
        }
    }
    .partition{
        height: 20px;;
        background-color:#F9F9F9;
    }
</style>