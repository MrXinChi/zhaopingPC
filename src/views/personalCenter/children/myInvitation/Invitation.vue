<template>
  <div class="container">
    <div class="perfectResumes"> 
      <el-collapse v-model="activeValue">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="header_title">
              <div class="head_left">
                <v-icon icon-class="icon-tips" class-name="icon"></v-icon>
                <label>使用须知（请务必认真阅读）</label>
              </div>
              <div class="head_right">
                <label>{{activeValue=="1"?"收起":"展开"}}</label>
              </div>
            </div>
          </template>
          <div class="perfectResume-content">
              <h2>1. 空中面试仅支持最新版谷歌浏览器</h2>
              <h2>2. 第一次使用该功能，进入视频页面，请务必点击面试窗口右上方“刷新”加载插件</h2>
              <h2>3. 如遇视频画面卡顿、不显示等情况，请点击面试窗口右上方“刷新”按钮</h2>
              <h2>4. 用人单位进入面试后，您才能进入面试。系统会发送面试开始通知，请耐心等待</h2>
              <h2>5. 如约定时间过长仍没有开始面试，请拨打用人单位联系电话</h2>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="select_wrapper">
       <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="用人单位">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="举办时间">
          <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <div class="button_list">
          <button class="search" @click="handleSearch">搜索</button>
          <button class="reset" @click="handleReset">重置</button>
        </div>
      </el-form>
    </div>

     <div class="company_list">
      <div class="company_item" v-for="(item,i) in 10" :key="i">
        <div class="item_content">
          <div class="item_left">
            <img src="@/assets/images/company.png" />
          </div>
          <div class="item_right">
            <div class="company_name">
              <div class="company_name_icon">
                <label>空面</label>
              </div>
              <h1>亚信科技(中国)有限公司</h1>
              <div class="company_name_phone">
                <div class="separated"></div>
                <label>15165165651</label>
                <!-- <div class="status not_started" >合格</div> -->
                <div class="status ongoing" >不合格</div>
              </div>
            </div>
            <div class="sign_list">
              <div class="sign_item">PHP开发工程师</div>
            </div>
            <div class="address">
              <span>2020.03.12 14:00-18:00</span>
              <div class="separated"></div>
              <span>北京市海淀区烈格庄东路1208</span>
            </div>
          </div>
        </div>
        <div class="item_center_right">
          <button class="buttonSub" @click="onDetail(item.id)">查看详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      activeValue: '1',
      form: {
        companyName: '', // 用人单位
        time: '' // 举办时间
      }
    };
  },
  methods: {
    handleSearch(){

    },
    handleReset(){
    },
    onDetail(id){
      this.$router.push('/user/invitationDetail');
    }
  },
  created(){
    
  },
};
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  .perfectResumes{
    // width:880px;
    // height:193px;
    // background:#EEF4FF;
    border-radius:4px;
    border:1px solid rgba(169,196,254,1);
    .header_title{
      width: 100%;
      @include flex(row, space-between);
      .head_left{
        .icon{
          width: 14px;
          height: 14px;
          padding-top: 3px;
        }
        label{
          margin-left:10px;
          font-size:14px;
          font-family:Microsoft YaHei UI;
          font-weight:bold;
          line-height:18px;
          color:rgba(38,38,38,1);
          opacity:1;
        }
      }
      .head_right{
        label{
          font-size:14px;
          font-family:MicrosoftYaHeiUI;
          color:rgba(41,113,255,1);
          opacity:1;
          cursor: pointer;
        }
      }
    }   
    /deep/ .el-collapse {
      background: #EEF4FF;
      padding:5px 20px;
      .el-collapse-item__header{
        background: #EEF4FF;
      }
      .el-collapse-item__content{
        padding-left: 25px;
        background: #EEF4FF;
      }
    }
  }
  .select_wrapper {
    padding: 20px;
    margin-top: 20px;
    background-color: #ffffff;
    .el-form {
      @include flex(row, space-between);
      .el-form-item {
        /deep/ .el-form-item__label {
          @include word(14, #262626, 400, right);
        }
      }
    }
    .button_list {
      @include flex(row, flex-end);
      button {
        margin-left: 16px;
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
      @include flex(row,space-between);
      margin-top: 20px;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 4px;
      .item_content{
        @include flex(row, space-between);
        .item_left{
          img {
            width: 88px;
            height: 88px;
          }
        }
        .item_right {
          @include flex(column, space-between);
          margin-left: 20px;
          height: 80px;
          .company_name {
            @include flex(row,center,center);
            h1 {
              margin-left: 5px;
              @include word(16, #8C8C8C, bold);
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
            .company_name_phone{
              margin-top: 1px;
              @include flex(row,center,center);
              .separated{
                height: 12px;
                margin:0 15px;
                border-left:1px solid rgba(222,222,222,1);
              }
              label{
                font-size:14px;
                font-weight:400;
                line-height:18px;
                color:rgba(204,204,204,1);
                opacity:1;
              }
              .status{
                @include flex(row,center,center);
                margin-left: 10px;
                height:24px;
                border-radius:8px 0px 8px 0px;
                font-size:14px;
                font-weight:400;
                color:rgba(255,255,255,1);
                opacity:1;

                &.not_started {
                  width: 44px;
                  background:rgba(1,203,122,1);
                }
                &.ongoing {
                  width: 58px;
                  background:rgba(254,79,79,1);
                }
              }
            }
          }
          .sign_list {
            @include flex();
            .sign_item {
              @include word(14, #CCCCCC);
              padding: 0 12px;
              border-right: 1px solid #dedede;
              &:first-child {
                padding-left: 0;
              }
              &:last-child {
                padding-right: 0;
                border-right: none;
              }
            }
          }
          .address {
            @include flex(row, flex-start, center);
            span {
              // margin: 0 6px;
              @include word(14, #CCCCCC);
            }
            .separated{
              height: 12px;
              margin:0 15px;
              border-left:1px solid rgba(222,222,222,1);
            }
          }
        
        }
      }
      .item_center_right{
        height: 88px;
        @include flex(row,center,center);
        .buttonSub{
          display:none;
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
    .company_item:hover{
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 16px 0px rgba(0,0,0,0.08);
      border-radius:4px;
      cursor:pointer;
    }
    .company_item:hover .buttonSub{
      display: inline-block;
    } 
    .company_item:hover .company_name h1{
      color: #252323 !important;
    }
    .company_item:hover .company_name .company_name_phone label,
    .company_item:hover .sign_list .sign_item,
    .company_item:hover .address span{
      color: #595959 !important;
    }
  }
}
</style>