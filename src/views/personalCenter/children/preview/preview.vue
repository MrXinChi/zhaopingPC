<template>
    <div class="container flex flex_x_center flex_y_center">
        <div class="return" @click="goBackBtn">返回</div>
        <div class="container-header">
            <div class="container-header-bottom ">
                <div class="flex">
                    <img src="http://iph.href.lu/80x80" />
                    <ul>
                        <li>林子墨</li>
                        <li class="flex">
                            <h1>男</h1>
                            <h1>21岁</h1>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
        <v-resume ></v-resume>
        <div class="returnBot flex flex_y_center flex_x_center" @click="goBackBtn">
            <h1>返回</h1>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goBackBtn(){    //返回
            this.$router.push('/user/resume')
        }
    }
}
</script>
<style lang="scss" scoped>
.container{
    flex-direction: column;
    .return{
        width: 880px;
        height:18px;
        font-size:14px;
        color:rgba(53,121,255,1);
        line-height:18px;
        padding: 20px 0;
        cursor:pointer;
    }
    .container-header{
        width:880px;
        height:180px;
        background-image:url(../../../../assets/images/resume_background.png);
        border-radius:4px;
        .container-header-bottom{
            width: 880px;
            height: 140px;
            box-sizing: border-box;
            padding: 44px 0 0 40px;
            div{
                img{
                    width:96px;
                    height:96px;
                }
                ul{
                    padding:25px 0 0 20px;
                    li:nth-of-type(1){
                        height:28px;
                        font-size:22px;
                        font-weight:bold;
                        color:rgba(38,38,38,1);
                        line-height:28px;
                    }   
                    li:nth-of-type(2){
                        padding-top: 12px;
                        h1{
                            height:18px;
                            font-size:14px;
                            color:rgba(89,89,89,1);
                            line-height:18px;
                            padding-right: 25px;
                        }
                    }
                }   
            }
        }
    }
    .returnBot{
        margin:20px 0;
        width:76px;
        height:36px;
        background:rgba(53,121,255,1);
        border-radius:4px;
        h1{
            height:18px;
            font-size:14px;
            color:rgba(255,255,255,1);
            line-height:18px;
        }
    }
}
</style>