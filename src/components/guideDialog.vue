<template>
    <el-dialog :visible="true" :show-close="false" :lock-scroll="false" center>
        <div class="content">
            <div class="item">
                <img src="@/assets/images/guide_1.png">
                <span>1.关注“就业宝微信小程序”</span>
                <img class="qrcode" src="@/assets/images/guide_er.png">
            </div>
            <img src="@/assets/images/arrow.png">
            <div class="item">
                <img src="@/assets/images/guide_2.png">
                <span>2.进入到个人中心进行登陆->选择“院校”进行登陆</span>
                <span>3.如您默认使用了微信授权登
                    陆的形式进入到小程序，可在
                    个人中心点击“切换身份”即可
                    切换为院校身份
                </span>
            </div>
            <img src="@/assets/images/arrow.png">
            <div class="item">
                <img src="@/assets/images/guide_3.png">
                <span>4.个人中心->面试邀约->邀约列表</span>
            </div>
        </div>
        <div class="bottom_label">
            <label>提示：完美校园APP上投递简历者请直接在APP上面试</label>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeDialog">关闭</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    methods:{
         closeDialog(){
            this.$emit('close');
        },
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog{
    width:896px;
    height:496px;
    background:rgba(255,255,255,1);
    opacity:1;
    border-radius:8px;
    .content{
        @include flex(row,center,center);
        img{
            width: 16px;
            height: 16px;
        }
        .item{
            @include flex(column,flex-start,center);
            margin:0 14px;
            padding:0 20px;
            width:240px;
            height:336px;
            background:rgba(239,247,254,1);
            opacity:1;
            border-radius:8px;
            img{
                margin:56px 0 6px 0;
                width:64px;
                height: 60px;
            }
            .qrcode{
                margin:18px 0 0 0;
            }
            span{
                margin-top: 16px;
                height: 40px;
                font-size:14px;
                font-weight:400;
                line-height:22px;
                color:rgba(89,89,89,1);
                opacity:1;
            }
        }
    }
    .el-dialog__body{
        padding:10px 26px 0 26px;
    }
    .bottom_label{
        @include flex(row,center,center);
        margin-top:24px;
        label{
            font-size:14px;
            line-height:18px;
            color:rgba(42,113,255,1);
            opacity:1;
        }
    }
}
</style>