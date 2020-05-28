<template>
    <div class="container">
        <div class="perfectResume">
            <div class="perfectResume-head flex ">
                <v-icon icon-class="icon-tips" class-name="icon"></v-icon>
                <h1>完善个人简历</h1>
            </div>
            <div class="perfectResume-content">
                <h1>请完善您的个人简历，以便获得更多用人单位青睐。</h1>
            </div>
            <div class="perfectResume-footer">
                <el-progress :percentage="this.resumeNums" :show-text="false" class="jindu"></el-progress>
                <div class="flex">
                    <h1>完善度：</h1>
                    <h2>{{this.resumeNums}}%</h2>
                </div>
            </div>
        </div>
        <div class="myresume flex flex_x_bten flex_y_center">
            <div class="myresume-left"><h1>我的简历</h1></div>
            <div class="myresume-right flex">
                <div class="myresume-rightOpe flex flex_y_center"  @click="setupBtn">
                    <img v-if="isShow==0" src="@/assets/images/public.png" class="icons">
                    <!-- <v-icon  v-if="is_shows==0" icon-class="icon-yes" class-name="icons"></v-icon> -->
                    <v-icon  v-if="isShow==1" icon-class="icon-weixuanzhong" class-name="icons"></v-icon>
                    <h1>公开简历</h1>
                </div>
                <div class="myresume-rightPre flex flex_y_center" @click="previewBtn">
                    <img src="@/assets/images/liulan.png" class="icons">
                    <!-- <v-icon icon-class="icon-preview" class-name="icons"></v-icon> -->
                    <h1>预览简历</h1>
                </div>
                <div class="myresume-rightPre flex flex_y_center" >
                    <img src="@/assets/images/template-fill.png" class="icons1">
                    <!-- <v-icon icon-class="icon-moban" class-name="icons"></v-icon> -->
                    <div @mouseenter="suspensionBtn">
                        <h1>选择模板</h1>
                        <div class="transition" v-if="show" @mouseleave="outsuspensionBtn">
                            <div class="transitionli flex flex_y_center flex_x_center cu_p" v-for="(i,k) in transitionlist" :key="k" @click.stop="transitionBtn(k)" :class="numb==k?'actives':''" >
                                <h1>
                                    <h2 v-if="i.zt==1"></h2>
                                </h1>
                                <span class="span">{{i.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-resume enclosureShow  ></v-resume>
    </div>
</template>

<script>
// let is_show = ""
export default {
    data() {
        return {
            enclosureShow:false,
            resumeNums:0,
            is_shows:0,
            resumeid:0,
            show: false,
            numb:0,
            transitionlist: [
                { text: "青春版", zt: 1 },
                { text: "专业版", zt: 2 },
                { text: "简约版", zt: 3 }
            ],
            isShow:0
        };
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.resumeBtn()
        }
    },
    methods:{
        previewBtn(){     //预览简历
            this.$router.push('/preview')
        },
        async resumeBtn(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
               
                if(resume.code==0){
                    this.resumeNums = resume.data.resumeinfo.completion_degree 
                    this.isShow = resume.data.resumeinfo.is_show
                    this.resumeid = resume.data.resumeinfo.id
                }
            }
        },
        async setupBtn(){   //设置简历是否公开
            if(this.isShow==0){
                this.isShow = 1
            }else{
                this.isShow = 0
            }
            let params = {
                id:this.resumeid,
                is_show:this.isShow
            }
            let resume = await this.service.user.setshow(params)
            if(resume.code == 0){
                this.resumeBtn()
            }
        },
        suspensionBtn() {
            //滑入事件
            this.show = true;
        },
        outsuspensionBtn() {
            //滑出事件
            this.show = false;
        },
        transitionBtn(k) {
            //个人中心  退出登录事件
            this.numb = k;
            switch (k) {
                case 0:
                    // this.transitionlist[1].zt = 2;
                    this.transitionlist[0].zt = 1;
                    this.show= false
                    this.$router.push("/youth");
                break;
                case 1:
                    // this.transitionlist[1].zt = 1;
                    this.transitionlist[0].zt = 2;
                    this.show= false
                    this.$router.push("/major");
                break;
                case 2:
                    // this.transitionlist[1].zt = 1;
                    this.transitionlist[0].zt = 3;
                    this.show= false
                    this.$router.push("/contracted");
                break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    // height: 600px;
    .perfectResume{
        width:880px;
        height:120px;
        background:rgba(239,247,254,1);
        border-radius:4px;
        border:1px solid rgba(169,196,254,1);
        .perfectResume-head{
            padding: 12px 0 0 12px;
            .icon{
                width: 12px;
                height: 12px;
                padding-top: 4px;
            }
            h1{
                height:20px;
                font-size:16px;
                color:rgba(38,38,38,1);
                line-height:20px;
                padding-left: 8px;
            }
        }
        .perfectResume-content{
            padding: 12px 0 0 32px;
            h1{
                height:18px;
                font-size:14px;
                color:rgba(89,89,89,1);
                line-height:18px;
            }
        }
        .perfectResume-footer{
            width: 828px;
            margin-left: 32px;
            .jindu{
                padding-top: 12px;
            }
            div{
                padding-top: 8px;
                h1{
                    height:18px;
                    font-size:14px;
                    color:rgba(89,89,89,1);
                    line-height:18px;
                }
                h2{
                    height:18px;
                    font-size:14px;
                    color:rgba(82,134,255,1);
                    line-height:18px;
                }
            }
        }
    }
    .myresume{
        margin-top: 20px;
        width:880px;
        height:68px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .myresume-left{
            padding-left: 21px;
            h1{
                height:28px;
                font-size:22px;
                font-weight:bold;
                color:rgba(51,51,51,1);
                line-height:28px;  
            }
        }
        .myresume-right{
            .myresume-rightPre{
                padding: 0 24px 0 0;
                position: relative;
                cursor:pointer;
                .icons{
                    width: 14px;
                    height: 10px;
                    padding:4px 8px; 
                }
                .icons1{
                    width: 12px;
                    height: 12px;
                    padding:4px 8px; 
                }
                h1{
                    height:18px;
                    font-size:14px;
                    color:rgba(51,51,51,1);
                    line-height:18px;
                }
                .transition {
                    width: 108px;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
                    border-radius: 4px;
                    position: absolute;
                    right: 3px;
                    top: 28px;
                    z-index: 100;
                    .transitionli {
                        width: 108px;
                        height: 35px;
                        text-align: center;
                        line-height: 35px;
                        color: #595959;
                        span {
                        width: 73%;
                        height: 18px;
                        font-size: 14px;
                        line-height: 18px;
                        text-align: left;
                        }
                        h1 {
                        flex: 1;
                        padding-left: 12px;
                        h2 {
                            width: 6px;
                            height: 6px;
                            background: rgba(82, 134, 255, 0.45);
                            border-radius: 4px;
                        }
                        }
                    }
                    }
            }
            .myresume-rightOpe{
                padding: 0 24px 0 0;
                .icons{
                    width: 12px;
                    height: 12px;
                    padding:4px 8px  ; 
                }
                h1{
                    height:18px;
                    font-size:14px;
                    color:rgba(38,38,38,1);
                    line-height:18px
                }
            }
        }
    }
}
</style>