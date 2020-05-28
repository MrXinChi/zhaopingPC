<template>
    <div class="container">
        <!-- <div class="myresume flex flex_x_bten flex_y_center"> -->
        <div class="myresume">
            <div class="steps">
                <div :class="active==1||active>1?'item_title_1':'item_title_2'">
                    <div v-if="active>1" class="item_success">
                        <img src="@/assets/images/icon_success.png">
                    </div>
                    <div v-else class="item_icon">
                        <label>1</label>
                    </div>
                    <div class="item_label">
                        <label>填写信息</label>
                    </div>
                </div>
                <div class="separate"/>
                <div :class="active==2||active>2?'item_title_1':'item_title_2'">
                    <div v-if="active>2" class="item_success">
                        <img src="@/assets/images/icon_success.png">
                    </div>
                    <div v-else class="item_icon">
                        <label>2</label>
                    </div>
                    <div class="item_label">
                        <label>选择院校/类型</label>
                    </div>
                </div>
                <div class="separate"/>
                <div :class="active==3||active>3?'item_title_1':'item_title_2'">
                    <div v-if="active>3" class="item_success">
                        <img src="@/assets/images/icon_success.png">
                    </div>
                    <div v-else class="item_icon">
                        <label>3</label>
                    </div>
                    <div class="item_label">
                        <label>提交审核</label>
                    </div>
                </div>
            </div>
        </div>
        <v-recomdDetail enclosureShow  ></v-recomdDetail>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:2
        };
    },
    methods:{
        
    }
};
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    .myresume{
        height:112px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        @include flex(row,center,center);
        .steps{
            @include flex(row,center,center);
            .item_title_1{
                @include flex(row,center,center);
                .item_icon{
                    @include flex(row,center,center);
                    width:32px;
                    height:32px;
                    background:rgba(64,158,255,1);
                    border-radius:50%;
                    opacity:1;
                    label{
                        font-size:14px;
                        color:rgba(255,255,255,1);
                    }
                }
                .item_success{
                    img{
                        width: 32px;
                        height: 32px;
                    }
                }
                .item_label{
                    label{
                        margin-left: 16px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(64,158,255,1);
                    }
                }
            }
            .item_title_2{
                @include flex(row,center,center);
                 .item_icon{
                    @include flex(row,center,center);
                    width:32px;
                    height:32px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(222,222,222,1);
                    border-radius:50%;
                    opacity:1;
                    label{
                        font-size:14px;
                        color:rgba(140,140,140,1);
                    }
                }
                .item_label{
                    label{
                        margin-left: 16px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(38,38,38,1);
                    }
                }
            }
            .separate{
                margin:0 24px;
                width:80px;
                height:1px;
                background:rgba(222,222,222,1);
                opacity:1;
            }
        }
    }
}
</style>