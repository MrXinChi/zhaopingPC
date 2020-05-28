<template>
    <div class="container"  >
        <!-- <h1>生活照</h1> -->
        <div :class="this.lifePhotosShow==true?'lifes':'life'"  @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn">
            <div class="life-title flex flex_y_center flex_x_bten">
                    <div class="flex flex_y_center">
                        <v-icon icon-class="icon-life" class-name="icons"></v-icon>
                        <h1>生活照</h1>
                    </div>
                <div v-if="num8Show" class="flex flex_y_center" @click="edit">
                        <v-icon icon-class="icon-jia" class-name="edits"></v-icon>
                        <h1>添加</h1>
                    </div>
            </div>
            <div class="life-content flex flex_warp">
                <div v-if="contentShow">
                    <img class="showImg" :src="item+'!auto'" v-for="(item,index) in imageList" :key="index"/>
                </div>
                <div v-else>
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="fileList" :on-change="handleprogress" :limit="2">
                        <i slot="default" class="el-icon-plus"></i>
                        
                        <div slot="file" slot-scope="{file}">
                            <img v-if="file.isShow" class="el-upload-list__item-thumbnail" :src="file.url+'!auto'" alt="" >
                            <img v-else class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                            

                            <span class="el-upload-list__item-actions">
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file.index)" >
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>
            <div class="shijian" v-if="buttonshops">
                <el-button size="mini" @click="fanhuiBtn">返回</el-button>
                <el-button size="mini" @click="baocunBtn" type="primary">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
     props: {
        lifePhotosShow: { type: Boolean},
    },
    data(){
        return{
            contentShow:true,
            num8Show:false,
            dialogImageUrl: '',
            dialogVisible: false,
            buttonshops:false,
            file:'',
            imageList:[],

            fileList:[],
            disabled: false,
            imageNull:[]
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.resumeBtn()
        }
    },
    
    methods:{
        handleRemove(index) {
            let params={};
            if(index==0){
                params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    image1_name:'',
                    image1:''
                }
            }else{
                params= {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    image2_name:'',
                    image2:''
                }
            }
            this.updatePost(params);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async resumeBtn(){
            this.fileList=[];
            this.imageList=[];
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
                if(resume.code==0){
                    if(resume.data.resumeinfo.image1_name!=undefined){
                        this.fileList.push({
                            name:resume.data.resumeinfo.image1,
                            url:resume.data.resumeinfo.image1_name,
                            isShow:true,
                            index:0
                        })
                        this.imageList.push(resume.data.resumeinfo.image1_name);
                    }else{
                        this.imageNull.push(0);
                    }
                    if(resume.data.resumeinfo.image2_name!=undefined){
                         this.fileList.push({
                            name:resume.data.resumeinfo.image2,
                            url:resume.data.resumeinfo.image2_name,
                            isShow:true,
                            index:1
                        })
                        this.imageList.push(resume.data.resumeinfo.image2_name);
                    }else{
                        this.imageNull.push(1);
                    }
                }
            }
        },
        suspensionBtn(){
            this.num8Show = true
        },
        outsuspensionBtn(){
            this.num8Show = false
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleprogress(file){  //上传
            this.imagesShow=true;
            let index=0;
            if(this.imageNull[0]==1){
                index=1
            }
            this.fileList.push({
                name:file.name,
                url:file.url,
                isShow:false,
                file:file.raw,
                index:index
            });
        },
        edit(){  //添加
            this.contentShow = false
            this.buttonshops = true
        },
        fanhuiBtn(){        //返回
            this.contentShow = true
            this.buttonshops = false
        },
        async baocunBtn(){//保存 
            const userId = JSON.parse(localStorage.getItem("username")) == null ? 1 : JSON.parse(localStorage.getItem("username")).userinfo.id;
            for(let i in this.fileList){
                let param = new FormData();
                param.append("input_name", this.fileList[i].file);
                param.append("type", 2);
                param.append("login_user_id", userId);    
                let resume = await this.service.home.uploadfile(param);
                if(resume.code==0){
                let params={};
                if(this.imageNull[0]==0){
                    params = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        image1_name:resume.data.url,
                        image1:resume.data.id
                    }
                }else{
                    params = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        image2_name:resume.data.url,
                        image2:resume.data.id
                    }
                }
                this.updatePost(params);
            }
            }
           
            
        },
        async updatePost(params){//修改生活照
            let init = await this.service.user.modify(params)
            if(init.code == 0){
                this.contentShow = true;
                this.buttonshops = false;
                this.resumeBtn();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .lifes{
        // margin-top: 20px;
        width:600px;
        // height:237px;
        background:rgba(255,255,255,1);
        border-radius:4px;
         .life-title{
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
        .life-content{
            padding-left: 20px;
            img{
                width: 260px;
                height: 157px;
                margin: 10px ;
            }
        }
        .shijian{
            padding:10px 0 20px 20px;
        }
    }
    .life{
        margin-top: 20px;
        width:880px;
        padding-bottom: 10px;
        // height:237px;
        background:rgba(255,255,255,1);
        border-radius:4px;
         .life-title{
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
        .life-content{
            padding-left: 20px;
            .showImg{
                width: 260px;
                height: 157px;
                margin: 10px ;
            }
            .el-upload-list__item-thumbnail{
                width: 100%;
            }
        }
        .shijian{
            padding:10px 0 20px 20px;
        }
    }
</style>