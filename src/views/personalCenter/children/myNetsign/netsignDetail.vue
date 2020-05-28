<template>
    <div class="container">
        <div class="select_wrapper">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item label="受邀时间">
                <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <div class="button_list">
                <button class="search" @click="handleSearch">搜索</button>
                <button class="reset" @click="handleReset">重置</button>
                </div>
            </el-form>
        </div>

        <div class="company_list">
            <div class="company_item" v-for="(item,i) in infoList" :key="i">
                <div class="item_content">
                    <div class="item_left">
                        <img :src="item.com_info.logo_src+'!auto'">
                    </div>
                    <div class="item_right">
                        <div class="company_name">
                            <h1>{{item.com_info.name}}</h1>
                            <img src="@/assets/images/tianyan.png" />
                            <div class="status ongoing" >已同意</div>
                            <!-- <div class="status not_started" >待答复</div>
                            <div class="status over" >已拒绝</div> -->
                        </div>
                        <div class="sign_list">
                            <div class="sign_item">{{item.zhiwei}}</div>
                            <div class="sign_item">{{item.xinzi}}</div>
                            <div class="sign_item">{{timestampToTimeDay(item.addtime)}}</div>
                        </div>
                        <div class="address">
                            <span>答复截止时间:{{timestampToTime(item.tyjjtime)}}</span>
                            <!-- <v-icon icon-class="icon-arrow-right" class-name="icon_arrow"></v-icon> -->
                        </div>
                    </div>
                </div>

                <div class="rightButton">
                    <button class="buttonSub" @click="ToDetail(item.id)">查看详情</button>
                    <!-- <button class="buttonSub" @click="showInvitation()">查看邀请函</button> -->
                </div>
            </div>
            <m-invitation ref="mInvitation" @close="closeRefresh"></m-invitation>
            <m-message-dialog v-if="isMessage" ref="mMessage" @close="closeMessageDialog"></m-message-dialog>
            <m-signature-dialog v-if="isSignature" ref="mSignature" @close="closeSignatureDialog" ></m-signature-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return { 
            form: {
                time: '' // 举办时间
            },
            infoList:[],
            isMessage:false,
            isSignature:false,
        };
    },
    methods: {
        closeSignatureDialog(){//关闭签名的同时打开消息
            this.isSignature=false;
            this.isMessage=true;
            this.$nextTick(()=>{
                this.$refs.mMessage.visible=true;
                this.$refs.mMessage.init(1);
            });
        },
        closeMessageDialog(id){//关闭消息与跳转签名
            if(id==1){
                this.isSignature=true;
                // this.$nextTick(()=>{
                //     this.$refs.mSignature.visible=true;
                // });
            }else{
                this.isMessage=false;
            }
        },
        ToDetail(id){
            this.isMessage=true;
            this.$nextTick(()=>{
                this.$refs.mMessage.visible=true;
                this.$refs.mMessage.init(id);
            });
        },
        async init(){
            let netsignData=await this.service.netsign.getList();
            if(netsignData.code==0){
                this.infoList=netsignData.data.list;
            }
        },
        closeRefresh(e){
        console.log(e)
        },
        handleSearch(){
        },
        handleReset(){

        }
    },
    created(){
        this.init();
    },
};
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    .select_wrapper {
        padding: 20px;
        background-color: #ffffff;
        .el-form {
            @include flex(row);
            .el-form-item {
                /deep/ .el-form-item__label {
                    @include word(14, #262626, 400, right);
                }
            }
        }   
        .button_list {
            margin-top:5px;
            button {
                margin-left: 20px;
                width: 70px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                &.search {
                    @include word(14, #ffffff, 400, center);
                    background-color: #5286ff;
                    border: 1px solid #5286ff;
                }
                &.reset {
                    @include word(14, #595959, 400, center);
                    background-color: #ffffff;
                    border: 1px solid #dedede;
                }
            }
        }
    }
    .company_list {
        .company_item {
            @include flex(row, space-between);
            margin-top: 20px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 4px;
            cursor: pointer;
            .item_content{
                @include flex(row, space-between);
                .item_left{
                    img {
                        width: 80px;
                        height: 80px;
                    }
                }
                .item_right {
                    @include flex(column, space-between);
                    margin-left: 20px;
                    height: 80px;
                    .company_name {
                        @include flex(row,center,center);
                        h1 {
                            @include word(16, #262626, bold);
                        }
                        img {
                            margin-left: 8px;
                            display: block;
                            width: 16px;
                            height: 16px;
                        }
                        .status{
                            @include flex(row,center,center);
                            margin-left: 10px;
                            width: 58px;
                            height:24px;
                            
                            border-radius:8px 0px 8px 0px;
                            font-size:14px;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            opacity:1;
                            &.not_started {
                                background:#377AFE;
                            }
                            &.ongoing {
                                background:#01CB7A;
                            }
                            &.over {
                                background:#FE4F4F;
                            }
                        }
                    }
                    .sign_list {
                        width:300px;
                        @include flex();
                        .sign_item {
                            @include word(14, #595959);
                            padding: 0 12px;
                            border-right: 1px solid #dedede;
                            &:first-child {
                                padding-left: 0;
                                width: 100px;
                                overflow: hidden;
                                text-overflow :ellipsis;//多余省略号显示
                                white-space:nowrap;//不许换行
                            }
                            &:nth-child(2) {
                                width: 80px;
                                // padding-left: 0px;
                                overflow: hidden;
                                text-overflow :ellipsis;//多余省略号显示
                                white-space:nowrap;//不许换行
                            }

                            &:last-child {
                                // padding-left: 20px;
                                padding-right: 0;
                                border-right: none;
                                width: 110px;
                                // padding-left: 20px;
                                overflow: hidden;
                                text-overflow :ellipsis;//多余省略号显示
                                white-space:nowrap;//不许换行

                            }
                        }
                    }
                    .address {
                        @include flex(row, flex-start, center);
                        .icon {
                            width: 10px;
                            height: 12px;
                        }
                        span {
                            @include word(14, #999999); 
                            font-size:11px;
                            font-family:MicrosoftYaHeiUI;
                            line-height:14px;
                            color:rgba(140,140,140,1);
                            opacity:1;
                        }
                        .icon_arrow {
                            width: 6px;
                            height: 10px;
                        }
                    }
                }
            }
            .rightButton{
                height: 88px;
                @include flex(row,center,center);
                .buttonSub{
                    display:none;
                    width:104px;
                    height:34px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(82,134,255,1);
                    border-radius:4px;

                    font-size:14px; 
                    line-height:18px;
                    color:rgba(82,134,255,1);
                    cursor:pointer;
                }
            }
        }
        .company_item:hover{
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 16px 0px rgba(0,0,0,0.08);
            border-radius:4px;
            cursor:pointer;
        }
        .company_item:hover .buttonSub{
            display: inline-block;
        }
        .company_item:hover .address span{
            color:rgba(253,60,60,1) !important;
        }
    }
}
</style>