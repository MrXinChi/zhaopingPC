<template>
  <div>
    <vContent />
      <div class="content">
        <div class="content_left">
          <v-notice title="预约咨询"></v-notice>
          <div class="content_left_nav">
            <span v-for="(item,index) in OrderTitle"  :key="index"  :class="{'active3':index==idx3}" @click="OrderItem(index)">{{item.title}}</span>
          </div>
        </div>
        <div class="content_right">
          <div class="content_right_top">
            <img :src="dataInfo.image_id_src+'!100x100'" />
            <div class="content_right_top_span">
              <span>{{dataInfo.name}}</span>
              <span>职业定位：{{dataInfo.zhiwu}}</span>
              <span>已预约数：{{dataInfo.bespnum}}人</span>
            </div>
        </div>
        <!-- 预约时间 -->
        <div class="content_content">
          <div class="content_right_time">
            <div class="content_right_time_top">
              <span>预约时间</span>
            </div>
            <div class="content_swiper">
              <div @click="swper_left(page.page)">
                <v-icon icon-class="icon-arrow-left" class-name="icon"></v-icon>
              </div>
              <div class="content_swiper_box" v-for="(item,index) in page.data" :key="index" @click="swper(index,item.date,item.week)" :class="{'active':idx1===index}">
                <span>{{item.date}}</span>
                <span>{{item.week}}</span>
              </div>
              <div @click="swper_right(page.page)">
                <v-icon icon-class="icon-arrow-right" class-name="icon"></v-icon>
              </div>
            </div>

            <div class="content_radio" v-for="(item,i) in templateData" :key="i">
              <el-radio v-model="radio" :label="i">
                <label for="item1"></label>
                <span>{{item[0].start_time}}-{{item[0].end_time}}</span>
                <span>{{item[0].address}}</span>
                <span>剩余预约数：</span>
                <span class="numberStyle">{{item[0].num}}</span>
              </el-radio>
            </div>

            <!-- <div class="content_radio">
              <input id="item2" type="radio" name="time" value="选项二" />
              <label for="item2"></label>
              <span>10:00-11:30</span>
              <span>工商管理学院1层1022室</span>
              <span>剩余预约数：</span>
              <span>20</span>
            </div>

            <div class="content_radio">
              <input id="item3" type="radio" name="time" value="选项三" />
              <label for="item3"></label>
              <span>10:00-11:30</span>
              <span>工商管理学院1层1022室</span>
              <span>剩余预约数：</span>
              <span>20</span>
            </div>   -->

          </div>

          <!-- 话题选择 -->
          <div class="content_right_choose">
            <div class="content_right_title_span">
              <span>话题选择</span>
            </div>
            
            <div class="content_right_choose_item" v-for="(item,index) in TopicSelection " :key="index">
              <div class="content_right_choose_item_span">{{item.cate_name}}</div>
              <div class="item_button">
                <button v-for="(item1,index1) in item.childList" :key="index1" :class="{active2:item1.states}"
                  @click="active2(index1,item1,index,item)">{{item1.cate_name}}</button>
              </div>
            </div>
          </div>
          <!-- 咨询描述 -->
          <div class="content_right_desriction">
            <div class="content_right_title_span">咨询描述</div>
            <div class="content_right_desriction_total" v-for="(item,index) in question" :key="index">
              <span>{{item.title}}</span>
              <!-- <input type="text" :placeholder="item.description" :disabled="item.isopen==1?false:true" class="input" /> -->
              <input type="text" class="input" placeholder="请输入您所遇到的问题" :disabled="item.isopen==1?false:true" :style="item.isopen==1?'':'background-color:#cccccc'"/>
            </div>
          </div>
          <!-- 学生信息 -->
          <div class="content_right_information">
            <div class="content_information_total">学生信息</div>
            <div class="content_information_content">
              <div class="lab">
                <span>姓名</span>
                <input type="text" :value="name" class="informaton_input" />
              </div>
              <div class="lab">
                <span>电话</span>
                <input type="text" :value="tel" class="informaton_input" />
              </div>
              <div class="lab">
                <span>邮箱</span>
                <input type="text" :value="email" class="informaton_input" />
              </div>
            </div>
            <!--  -->

            <div class="content_information_content">
              <div class="lab">
                <span>目前常住城市</span>
                <el-select v-model="countryName" placeholder="请选择" @change="selT()">
                  <el-option :value="item" v-for="(item) in productList" :key="item.id">
                    <span>{{item.title}}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="lab">
                <span></span>
                <el-select v-model="cityName">
                  <el-option :value="item.title" v-for="(item,index) in countryNameSelectd" :key="index">
                    <span>{{item.title}}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="lab"></div>
            </div>

            <!--  -->

            <div class="content_information_content">
              <div class="lab">
                <span>紧急联系人</span>
                <input type="text" :value="name" class="informaton_input" />
              </div>
              <div class="lab">
                <span>紧急联系人电话</span>
                <input type="text" :value="tel" class="informaton_input" />
              </div>
              <div class="lab"></div>
            </div>

            <!--  -->
            <div class="agree">
              <el-radio v-model="radioSubmit" label="1">阅读并同意</el-radio>
              <a @click="bookBtn">《知情同意书》</a>
            </div>
            <!--  -->
            <div class="agree" @click="signUpBtn">
              <button>预约报名</button>
            </div>
            <div class="partition"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="partitions"></div>
    <div class="zhezhao" v-if="bookShop">
        <div class="zhezhaocontent" v-html="this.bookHtml.remarks"></div>
    </div>
  </div>
</template>

<script>
import vContent from "./../../components/vContent";
export default {
  data() {
    return {
      countryName: "",
      cityName: "",
      countryNameSelectd: "",
      radio:'',
      radioSubmit:'',
      productList: [
        {
          id: "1",
          title: "北京",
          child: [{ title: "昌平" }, { title: "顺义" }, { title: "海淀" }]
        },
        {
          id: "2",
          title: "上海",
          child: [{ title: "上海1" }, { title: "上海2" }, { title: "上海3" }]
        },
        {
          id: "3",
          title: "广州",
          child: [{ title: "广州1" }, { title: "广州2" }, { title: "广州3" }]
        },
        {
          id: "4",
          title: "四川",
          child: [{ title: "四川一" }, { title: "四川二" }, { title: "四川三" }]
        }
      ],
      OrderTitle: [
        { title: "预约咨询" }
      ],
      Time: [
        {
          page: 1,
          data: [
            { date: "2019/11/4", week: "周一" },
            { date: "2019/11/5", week: "周二" },
            { date: "2019/11/6", week: "周三" },
            { date: "2019/11/7", week: "周四" },
            { date: "2019/11/8", week: "周五" }
          ]
        },
        {
          page: 2,
          data: [
            { date: "2019/11/9", week: "周六" },
            { date: "2019/11/10", week: "周日" },
            { date: "2019/11/11", week: "周一" },
            { date: "2019/11/12", week: "周二" },
            { date: "2019/11/13", week: "周三" }
          ]
        },
        {
          page: 3,
          data: [
            { date: "2019/11/14", week: "周四" },
            { date: "2019/11/15", week: "周五" },
            { date: "2019/11/16", week: "周六" },
            { date: "2019/11/17", week: "周日" },
            { date: "2019/11/18", week: "周一" }
          ]
        },
        {
          page: 4,
          data: [
            { date: "2019/11/19", week: "周二" },
            { date: "2019/11/19", week: "周二" },
            { date: "2019/11/20", week: "周三" },
            { date: "2019/11/21", week: "周四" },
            { date: "2019/11/22", week: "周五" }
          ]
        }
      ],
      TopicSelection: [],
      name: "张三三",
      tel: "15412344321",
      email: "AA123@outllok.com",
      idx1: 0,
      idx2: "",
      idx3: 0,
      dataInfo:{},
      yuyuelb:[],
      question:[],
      templateData:[],
      bookHtml:'',
      bookShop:false,
      timeData:""
    };
  },
  methods: {    
    async signUpBtn(){    // 预约报名
      // console.log(
      //   this.name+"=="+
      //   this.tel+"=="+
      //   this.email+"=="+
      //   this.countryName+"=="+
      //   this.cityName+"=="+
      //   this.radioSubmit+"=="
      // )
      let data = new Date(this.dataInfo.besp_starttime)
      let datas = data.getFullYear()+"/"+(data.getMonth()+1)+"/"+data.getDate()
      let params={
        bespid:this.$route.params.id,
        school_id:JSON.parse(localStorage.getItem("username")).userinfo.school_id,
        userid:JSON.parse(localStorage.getItem("username")).userinfo.id,
        besptime:datas,
      }
      let signUpList = await this.service.makeAnAppointment.studentEnrolment(params)
      console.log(signUpList)
    },
    async templateBtn(date,week){    //预约模板
      // let timer = new Date()
      // let timers = timer.getFullYear()+"/"+timer.getMonth()+"/"+timer.getDate()
      switch(week) {
        case '周一':
          week = '1';
        break;
        case '周二':
          week = '2';
        break;
        case '周三':
          week = '3';
        break;
        case '周四':
          week = '4';
        break;
        case '周五':
          week = '5';
        break;
        case '周六':
          week = '6';
          break;
        case '周日':
          week = '7';
        break;
      }
      let param = {
        id:this.$route.params.id,
        week:week,
        userid:JSON.parse(localStorage.getItem("username")).userinfo.id,
        date:date
      }
      let init=await this.service.makeAnAppointment.gettemplate(param);
    },
    async classificationBtn(){  //预约分类
      let param = {school_id:localStorage.getItem("username")==null?1:JSON.parse(localStorage.getItem("username")).userinfo.school_id}
      let init = await this.service.makeAnAppointment.getcategory(param)
      if(init.code == 0){
        let unixTimestamp = new Date( init.data[0].addtime*1000 ) ;
        let commonTime = unixTimestamp.getFullYear()+'/'+(unixTimestamp.getMonth() + 1)+'/'+unixTimestamp.getDate();
        this.timeData = commonTime
        }
    },
    async bookBtn(){  //知情同意书
      let param = {
        id:this.$route.params.id,
        school_id:JSON.parse(localStorage.getItem("username")).userinfo.school_id,
      }
      let init = await this.service.makeAnAppointment.getbespset(param)
      if(init.code == 0){
        this.bookHtml = init.data
        this.bookShop = true
      }
    },
    OrderItem(e) {
      this.idx3 = e;
    },
    swper(e,date,week) {
      this.idx1 = e;
      this.templateBtn(date,week)
    },
    swper_left(e) {
      if (this.idx1 === 0) {
        if (e === 1) {
          alert("前面没有数据了！");
        } else {
          e = e - 2;
          this.page = this.Time[e];
          this.idx1 = 4;
          this.$forceUpdate();
        }
      } else {
        this.idx1 = this.idx1 - 1;
      }
    },
    swper_right(e) {
      if (this.idx1 === 4) {
        if (e === 4) {
          alert("后面没有数据了");
        } else {
          this.page = this.Time[e];
          this.idx1 = 0;
        }
      } else {
        this.idx1 = this.idx1 + 1;
      }
    },
    active2(e, event, y, item) {
      event.states = !event.states;
    },
    selT(value) {
      this.countryNameSelectd = this.countryName.child;
      this.countryName = this.countryName.title;
      this.cityName = this.countryNameSelectd[0];
    },
    async init(id){
      let teacherData=await this.service.makeAnAppointment.detail({
        id:id,
        userid:localStorage.getItem("username")==null?1:JSON.parse(localStorage.getItem("username")).userinfo.id,
      })
      this.dataInfo=teacherData.data;
      this.templateData=teacherData.data.template;
    },
    async gettypelistInit(){
      let gettypeData=await this.service.makeAnAppointment.gettypelist();
      //添加按钮点击状态start
      for(let i in gettypeData.data.yuyuelb.list){
        for(let s in gettypeData.data.yuyuelb.list[i].childList){
          gettypeData.data.yuyuelb.list[i].childList[s].states=false;
        }
      }
      //添加按钮点击状态end
      this.TopicSelection=gettypeData.data.yuyuelb.list;
      this.question=gettypeData.data.question;
    }
  },
  created() {
    this.classificationBtn()
    this.page = this.Time[0];
    this.init(this.$route.params.id);//教师信息
    this.gettypelistInit();//话题类别
  },
  components: {
    vContent
  }
};
</script>
<style lang="scss" scoped>
  .zhezhao{
    position: fixed;
    width:100%;
    height:100%;
    background: #000000;
    opacity: .8;
    .zhezhaocontent{
      width:500px;
      height:500px;
      position: fixed;
      left:50%;
      top: 50%;
      margin-left: -250px;
      margin-top:-250px;
      background: #fff;
    }
  }
  .content {
    @include flex(row, space-between);
    width: 1180px;
    margin: 0 auto;
    .content_left {
      width: 280px;
      .content_left_nav {
        @include flex(column, flex-start, center);
        padding-top:24px;
        width: 280px;
        font-size: 16px;
        color: rgba(38, 38, 38, 1);
        background-color: #ffffff;
        span {
          @include flex(column, center, center);
          width: 240px;
          height: 56px;
          margin-bottom: 20px;
        }
      }
    }
    .content_right {
      width: 880px;
      display: flex;
      flex-direction: column;
      .content_right_top {
        height: 128px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: rgba(255, 255, 255, 1);
        img {
          margin: 0 40px;
          width: 88px;
          height: 88px;
        }
        .content_right_top_span {
          display: flex;
          flex-direction: column;
          span {
            padding-top: 12px;
            font-size: 14px;
            color: rgba(38, 38, 38, 1);
            &:first-child {
              font-size: 18px;
              font-weight: bold;
              color: rgba(38, 38, 38, 1);
            }
          }
        }
      }
      /* 预约时间 */
      .content_content {
        margin-top: 20px;
        padding-top: 24px;
        width: 880px;
        background: rgba(255, 255, 255, 1);
        .content_right_time {
          width: 840px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(222, 222, 222, 1);
          .content_right_time_top {
            font-size: 16px;
            font-weight: bold;
          }
          .content_swiper {
            width: 840px;
            margin: 0 auto;
            height: 140px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            .icon {
              width: 12px;
              height: 20px;
              cursor: pointer;
            }
            .content_swiper_box {
              background: rgba(245, 245, 245, 1);
              border-radius: 4px;
              width: 150px;
              height: 88px;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              cursor: pointer;
              span{
                margin-left:20px;
              }
              &.active {
                background: #5286ff;
                color: #ffffff;
              }
            }
          }
        }
        /* 话题选择 */
        .content_right_choose {
          width: 840px;
          margin: 0 auto;
          border-bottom: 2px solid #dedede;
          .content_right_title_span {
            margin-bottom: 20px;
            font-size: 16px;
            font-weight: bold;
            color: rgba(38, 38, 38, 1);
            margin-top: 20px;
          }
          .content_right_choose_item {
            width: 800px;
            margin: 10px auto 10px;
            display: flex;
            flex-direction: column;
            .content_right_choose_item_span {
              font-size: 14px;
              color: #262626;
              font-weight: bold;
            }
            .item_button {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap; 
              button {
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                color:rgba(89,89,89,1);
                line-height:18px;
                height: 32px;
                background: rgba(255, 255, 255, 1);
                border-radius: 2px;
                border: 1px solid rgba(217, 217, 217, 1);
                margin-right: 12px;
                margin-bottom: 10px;
                margin-top: 12px;
                padding: 0 10px;
                cursor: pointer;
              }
            }
          }
        }
        /* 咨询描述 */
        .content_right_desriction {
          width: 840px;
          margin: 0 auto;
          border-bottom: 2px solid #dedede;
          .content_right_title_span {
            font-size: 16px;
            font-weight: bold;
            color: #262626;
            margin-top: 20px;
          }
          .content_right_desriction_total {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 800px;
            height: 64px;
            font-size: 14px;
            font-family:MicrosoftYaHeiUI;
            color:rgba(38,38,38,1);
            line-height:18px;
            margin: 20px auto;
            input {
              width: 782px;
              height: 18px;
              padding: 8px;
              background: rgba(255, 255, 255, 1);
              border-radius: 4px;
              border: 1px solid rgba(217, 217, 217, 1);
            }
            input::placeholder {
              color: #cccccc;
              font-size: 14px;
            }
          }
        }

        /* 学生信息 */
        .content_right_information {
          width: 840px;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          .content_information_total {
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
            color: rgba(38, 38, 38, 1);
          }
          .content_information_content {
            width: 840px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 0 auto;
          }
        }
      }
    }
  }

  .lab {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 64px;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 14px;
    color: rgba(38, 38, 38, 1);
    margin: 0 auto;
    margin-top: 20px;
    span{
      margin-bottom:12px;
    }
  }

  .informaton_input {
    width: 218px;
    height: 34px;
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
    padding: 0 10px;
  }

  .agree {
    width: 800px;
    margin: 0 auto;
    margin-top:24px;
    font-size: 14px;
    a{
      color:#409EFF;
      cursor: pointer;
    }
    button {
      width: 104px;
      height: 36px;
      background: rgba(82, 134, 255, 1);
      border-radius: 4px;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .partition{
    margin-top: 20px;
  }

  /*修改样式 */
  .hot_header[data-v-475d1518] {
    background-color: #ffffff;
  }

  .content_radio {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
    span {
      margin-left: 10px;
    } 
    .numberStyle{ 
      font-size:14px;
      font-family:MicrosoftYaHeiUI;
      color:rgba(82,134,255,1);
      line-height:18px;
    }
  }

  button {
    cursor: pointer;
  }

  /deep/ .el-select{
    width: 240px;
    height: 34px;
  }

  /deep/.el-input__inner {
    height: 34px;
  }
  /deep/ .el-icon-arrow-up{
    margin-top:4px;
  }
  /deep/ .is-reverse{
    margin-top:-2px;
  }

  /* 变化样式 */
  .active2 {
    border: 1px solid #5286ff !important;//!important优先覆盖样式
    color: #5286ff !important;
  }

  .active3 {
    background-color: #eff7fe;
    color: #5286ff;
  }
  .partitions{
    height: 20px;;
    background-color:#F9F9F9;
  }
</style>