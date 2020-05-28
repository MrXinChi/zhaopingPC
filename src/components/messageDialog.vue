<template>
    <el-dialog :visible.sync="visible" :modal="false" center @closed="closeDialog">
        <div class="header">
            <div class="title_left">
                <label>邀请函</label>
                <v-icon icon-class="icon-tips" class-name="icon"></v-icon>
            </div>
            <div class="title_right">
                <i class="el-icon-close" @click="visible=false"></i>
            </div>
        </div>
        <div class="content">
            <div class="content_top">
                <p>张乐同学，你好！</p>
                <p>
                    我单位拟录用（聘用）你为PHP开发工程师岗位员工，请于2019年12月19日24点前给予反馈，办理网签手续，过期不反馈则视为主动放弃。转正后薪资范围：10000-15000元
                </p>
                <p>签约联系人:李经理</p>
                <p>联系电话:0531-12345678</p>
            </div>
            <div class="content_bottom">
                <p>2016年12月12日</p>
                <p>北京大唐盛世集团</p>
            </div>

        </div>

        <span class="bottom">
            <button v-if="isStatus==''" class="button_close" @click="refused">拒绝</button>
            <button v-if="isStatus=='0'" class="button_visted">已拒绝</button>
            
            <button v-if="isStatus==''" class="button_submit" @click="submit">同意</button>
            <button v-if="isStatus=='1'" class="button_visted">已同意</button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            isStatus:'',
            isSignature:false,
            visible:false,
            isNext:0//是否下一步
        };
    },
    methods:{
        closeDialog(){
            this.$emit('close',this.isNext);
        },
        submit(){
            this.visible=false;
            this.isNext=1;
        },
        refused(){
            this.isNext=0;
            this.isStatus='0';
        },
        init(id){
            this.isNext=0;
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog{
    width:468px;
    height:407px;
    background:rgba(255,255,255,1);
    opacity:1;
    border-radius:8px;
    .el-dialog__header{
        display: none;
    }
    .el-dialog__body{
        padding:0;
        .header{
            border-bottom:1px solid #DEDEDE;
            padding:16px 20px;
            @include flex(row,space-between);
            .title_left{
                @include flex(row,flex-start,center);
                label{
                    font-size:18px;
                    color:rgba(38,38,38,1);
                }
                .icon{
                    margin-left: 8px;
                    width: 12px;
                    height: 12px;
                }
            }
        }
        .content{
            margin:20px;
            border-bottom:1px solid #DEDEDE;
            .content_top{
                p{
                    font-size:14px;
                    line-height:18px;
                    color:rgba(89,89,89,1);
                    opacity:1;
                    padding-bottom: 16px;
                }
            }
            .content_bottom{
                margin-bottom: 16px;
                p{
                    padding-bottom:8px;
                    text-align: right;
                    font-size:14px;
                    line-height:18px;
                    color:rgba(89,89,89,1);
                    opacity:1;
                }
            }
        }
    }
    .bottom{
        @include flex(row,center);
        .button_close{
            width:76px;
            height:34px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(254,79,79,1);
            opacity:1;
            border-radius:4px;

            font-size:14px;
            color:rgba(254,79,79,1);
            cursor: pointer;
        }
        .button_submit{
            margin-left: 20px;
            width:76px;
            height:34px;
            background:rgba(1,203,122,1);
            opacity:1;
            border-radius:4px;

            font-size:14px;
            color:rgba(255,255,255,1);
            cursor: pointer;
        }
        .button_visted{
            width:90px;
            height:34px;
            background:rgba(249,249,249,1);
            border-radius:4px;
 
            font-size:14px;  
            color:rgba(89,89,89,1);
            opacity:1;
        }
    }
}
</style>