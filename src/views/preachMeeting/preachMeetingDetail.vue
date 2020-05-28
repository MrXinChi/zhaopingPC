<template>
  <div class="container_">
    <v-content>
      <div slot="content" class="wrapper">
        <div class="content_left">
          <div class="header">
            <div class="top">
              <h2>宣讲人：{{dataInfo.contacts}}</h2>
              <div class="top_right">
                <div class="item">
                  <span>已报名</span>
                  <span class="color_blue">{{dataInfo.enroll_count}}</span>人
                </div>
                <div class="item">
                  <v-collection :isCollection="isCollection" @click="handleCollection(dataInfo.id)"></v-collection>
                </div>
                <div class="item">
                  <v-page-view :count="dataInfo.viewcount"></v-page-view>
                </div>
                <div class="item">
                  <v-share @click="shareBtn"></v-share>
                </div>
              </div>
            </div>
            <h1>主办方：{{dataInfo.com_id_name}}</h1>
            <h1>
              <span>举办日期：</span>
              <span class="color_blue">{{dataInfo.hold_date}}</span>
            </h1>
            <h1>详细地址：{{dataInfo.address}}</h1>
            <button class="btn" @click="signupBtn" v-if="number">在线报名</button>
            <button class="btn" @click="cancelApplication" v-else>取消报名</button>
          </div>
          <div class="detail">
            <p v-html="dataInfo.remarks"></p>
          </div>
        </div>
        <div class="content_right">
          <v-company-info class="company_css" :companyInfo="companyInfo"></v-company-info>
          <v-hot-header preachShow :preachArray="preachArray" title="热门宣讲会" @detail="init"></v-hot-header>
        </div>
      </div>
    </v-content>
    <v-frame ref="frame"></v-frame>
    <!-- 底部分隔线 -->
		<div class="partition"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollection: false,
      dataInfo: {},
      number: true,
      companyInfo: {},
      preachArray:[]
    };
  },
  methods: {
    shareBtn(){
      this.$refs.frame.frameShow = true
      document.querySelector('html').style.overflow = "hidden"
    },
    async handleCollection(id) {
      if(!this.isCollection){
        let preachDatas = await this.service.preach.setCollection({
          id: id
        });
        if(preachDatas.code==0){
          this.isCollection = !this.isCollection;
          this.$message({
            message: '收藏成功',
            type: 'success',
            center: true
          });
        }
      }else{
        let preachDatas = await this.service.preach.setCollection({
            id: id
          });
          if(preachDatas.code==0){
            this.isCollection = !this.isCollection;
            this.$message({
              message: '取消成功',
              type: 'warning',
              center: true
          });
        }
      }
    },
    async init(id) {
      let preachData = await this.service.preach.detail({
        id: id
      });
      this.dataInfo = preachData.data;
      this.isCollection = preachData.data.isCollection;
      if (
        preachData.data.comInfo === false ||
        preachData.data.comInfo === null ||
        preachData.data.comInfo === ""
      ) {
        this.companyInfo = {
          logo_src: preachData.data.com_id_logosrc,
          name: preachData.data.com_id_name,
          xingzhi_id_name: "暂无",
          guimo_id_name: "暂无",
          business_name: "暂无"
        };
      } else {
        this.companyInfo = preachData.data.comInfo;
      }
      let preachDataList = await this.service.preach.getlist({
        //暂无
        keywords: '',
        province_id: '',
        city_id: '',
        // day: 3,
        page: 1, //页码
        size: 8 //每页显示
      })
      // this.reversedMessage = preachData.data.allpage * 10
      // // console.log(preachData.data)
      // this.page = preachData.data.page
      this.preachArray = preachDataList.data.list
    },
    async signupBtn() {
      //在线报名
      let signup = await this.service.preach.signUp({
        id: this.$route.params.id
      });
      if (signup.code == 0) {
        this.number = false;
        this.init(this.$route.params.id);
      } else {
        alert(signup.msg);
      }
    },
    async cancelApplication() {
      //取消报名
      let cancelApplication = await this.service.preach.cancelApplication({
        id: this.$route.params.id
      });
      if (cancelApplication.code == 0) {
        this.number = true;
        this.init(this.$route.params.id);
      } else {
        alert(signup.msg);
      }
    }
  },
  created() {
    this.init(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.container_ {
  .wrapper {
    @include flex(row, space-between);
    .content_left {
      width: 900px;
      .color_blue {
        color: #5286ff;
      }
      .header {
        @include word(14, #595959);
        position: relative;
        padding: 20px;
        background-color: #ffffff;
        .top {
          @include flex(row, space-between);
          .top_right {
            @include flex(row, flex-start, center);
            .item {
              margin-left: 24px;
            }
          }
        }
        h1 {
          margin-top: 10px;
        }
        .btn {
          @include word(14, #ffffff, 400, center);
          position: absolute;
          right: 20px;
          bottom: 20px;
          width: 104px;
          height: 36px;
          background: #5286ff;
          border-radius: 36px;
          cursor: pointer;
        }
      }
      .detail {
        height: 678px;
        margin-top: 20px;
        padding: 20px;
        background-color: #ffffff;
        p {
          line-height: 20px;
          text-indent: 28px;
        }
      }
    }
    .content_right {
      width: 280px;
      .company_css{
        background-color: #ffffff;
      }
    }
  }
  .partition{
		height: 20px;;
		background-color:#F9F9F9;
	}
}
</style>