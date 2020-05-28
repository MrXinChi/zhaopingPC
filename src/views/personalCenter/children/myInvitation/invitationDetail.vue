<template>
  <div class="container">
      <div class="content">
        <div class="header_title">
          <div v-if="!isStart" class="company_name_icon">
            <label>空面</label>
          </div>
          <h1>亚信科技(中国)有限公司</h1>
        </div>
        <div class="company_info">
          <div class="item_list">
            <!-- 第一行 -->
            <div v-if="!isStart" class="item_initial">
              <div class="item_title">
                <div class="item_label">
                  <label>面试职位</label>
                  <p>PHP开发工程师</p>
                </div>
                <div class="item_label">
                  <label>面试时间</label>
                  <p>2020.03.12 14:00-18:00</p>
                </div>
                <div class="item_label">
                  <label>联系电话</label>
                  <p>13512934828</p>
                </div>
              </div>
              <div class="separated"/>
              <div class="item_content">
                <label>面试须知</label>
                <p>如您在求职中遇到详细打听家庭情况或个人贷款情况、仅电话面试、异地培训、收取各类培训费用的请
                  注意甄别并及时举报。
                </p>
              </div>
            </div>

            <!-- 第二行 -->
            <div v-if="isStart" class="item_initial">
              <div class="item_title">
                <div class="item_label">
                  <label>面试职位</label>
                  <p>PHP开发工程师</p>
                </div>
                <div class="item_label">
                  <label>面试时间</label>
                  <p>2020.03.12 14:00-18:00</p>
                </div>
                <div class="item_label">
                  <label>联系电话</label>
                  <p>13512934828</p>
                </div>
              </div>
              <div class="separated"/>
              <div class="item_title">
                <div class="item_label">
                  <label>联系人</label>
                  <p>张力</p>
                </div>
                <div class="item_label">
                  <label>联系电话</label>
                  <p>13512934828</p>
                </div>
                <div class="item_label">
                  <label>联系邮箱</label>
                  <p>2665229874@qq.com</p>
                </div>
              </div>
              <div class="separated"/>
              <div class="item_content">
                <label>乘车路线</label>
                <p>
                  专35路公交到海淀换成13号线布行400米即到
                </p>
              </div>
              <div class="separated"/>
              <div class="item_content">
                <label>补充内容</label>
                <p>面试请带好个人作品、纸、笔 
                </p>
              </div>
            </div>
            <div v-if="!isStart" class="separated"/>
            <div v-if="!isStart" class="item_submit">
              <button class="buttonSub" @click="onDetail">开始面试</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 微信小程序引导图 -->
      <!-- <m-guide-dialog :visible="isStart"></m-guide-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      isStart:false,
    };
  },
  methods:{
    onDetail(){
      this.isStart=true;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 16px rgba(0,0,0,0.07);
  opacity:1;
  border-radius:8px;
  .content{
    padding: 20px;
    .header_title{
      @include flex(row);
      h1 {
        margin-left: 10px;
        @include word(16, #252323, bold);
      }
      .company_name_icon{
        @include flex(row,center,center);
        width:36px;
        height:18px;
        background:rgba(120,59,255,1);
        opacity:1;
        border-radius:9px;
        label{
          font-size:10px;
          -webkit-transform : scale(0.6,0.6) ;
          color:rgba(255,255,255,1);
        }
      }
    }
    .company_info{
      @include flex(column,center,center);
      padding-bottom: 20px;
      .item_list{
        margin-top:40px;
        width: 75%;
        .item_initial{
          .item_title{
            @include flex(row,space-between);
            .item_label{
              width:196px;
              label{
                font-size:12px;
                font-weight:400;
                line-height:15px;
                color:rgba(140,140,140,1);
                opacity:1;
              }
              p{
                margin-top:12px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                line-height:18px;
                color:rgba(89,89,89,1);
                opacity:1;
              }
            }
          }
        }
        .separated{//分隔线虚线鸭式
          margin:20px 0;
          width: 100%;
          height: 1px;
          background-image: linear-gradient(to right, #DEDEDE 0%, #DEDEDE 70%, transparent 50%);
          background-size: 12px 1px;
          background-repeat: repeat-x;
        }
        .item_content{
          label{
            font-size:12px;
            font-weight:400;
            line-height:15px;
            color:rgba(140,140,140,1);
            opacity:1;
          }
          p{
            margin-top:12px;
            font-size:14px;
            font-weight:400;
            line-height:18px;
            color:rgba(89,89,89,1);
            opacity:1;
          }
        }
        .item_submit{
          height: 88px;
          @include flex(row,center,center);
          .buttonSub{
            width:104px;
            height:34px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(0,183,136,1);
            border-radius:4px;

            font-size:14px; 
            line-height:18px;
            color:rgba(0,183,136,1);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>