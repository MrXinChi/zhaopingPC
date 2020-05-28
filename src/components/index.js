import Vue from 'vue'
import vHeader from './vHeader' // 头部
import vFooter from './vFooter' // 底部
import vContent from './vContent' // 内容
import vContentKZZB from './vContentKZZB' // 内容
import vCalendar from './vCalendar' // 日历
import vDateTable from './vDateTable'
import vHotHeader from './vHotHeader'
import vOuestionnaireList from './vOuestionnaireList'
import vNoticeNews from './vNoticeNews' //职位信息
import vNotice from './vNotice' //侧边栏组件
import vJournalismList from './vJournalismList' //新闻列表
import vJournalismLists from './vJournalismLists' //新闻列表
import vPageView from './vPageView' // 浏览量
import vCollection from './vCollection' // 收藏
import vShare from './vShare' // 分享
import vCompanyInfo from './vCompanyInfo' // 企业信息
import vJobList from './vJobList' // 职位
import vJobLists from './vJobLists' // 职位
import vJobListKZ from './vJobListKZ' // 职位
import vActivityList from './vActivityList' // 活动
import vActivityLists from './vActivityLists' // 我的活动
import vActivityListKZ from './vActivityListKZ' // 我的活动
import vResume from './vResume'
import vRecomdDetail from './recomdDetail'//就业推荐表
import vMeetingList from './vMeetingList' // 宣讲会
import vMeetingListCollection from './vMeetingListCollection' // 收藏宣讲会
import vMeetingLists from './vMeetingLists' // 宣讲会2
import vInputBox from './vInputBox' // 输入框
import vSelectBox from './vSelectBox' // 选择框
import vFrame from './vFrame' //弹框
import vFrameCompany from './vFrameCompany' //公司弹框
import vFrameGzh from './vFrameGzh' //公众号弹框
import vDatePicker from './vDatePicker' // 选择框  起止时间
import vLogin from './vLogin' // 登录弹框 
import vImage from './vImage' // 图片 
import vArticleDetail from './vArticleDetail' // 文章详情
import vMajorresume from './vMajorresume'  //简历专业版
import mInvitation from './mInvitation'  //邀请函
import mSignature from './mSignature'  //确认签名
import mGuideDialog from './guideDialog'  //小程序引导图
import mMessageDialog from './messageDialog'  //我的网签 消息弹窗
import mSignatureDialog from './signatureDialog'  //我的网签 签名弹窗

Vue.component('v-content', vContent)
Vue.component('v-contentkzzb', vContentKZZB)
Vue.component('v-header', vHeader)
Vue.component('v-footer', vFooter)
Vue.component('v-calendar', vCalendar)
Vue.component('v-date-table', vDateTable)
Vue.component('v-hot-header', vHotHeader)
Vue.component('v-ouestionnaire-list', vOuestionnaireList)
Vue.component('v-notice', vNotice)
Vue.component('v-noticeNews', vNoticeNews)
Vue.component('v-journalism-list', vJournalismList)
Vue.component('v-journalism-lists', vJournalismLists)
Vue.component('v-page-view', vPageView)
Vue.component('v-collection', vCollection)
Vue.component('v-share', vShare)
Vue.component('v-company-info', vCompanyInfo)
Vue.component('v-job-list', vJobList)
Vue.component('v-job-lists', vJobLists)
Vue.component('v-job-listKZ', vJobListKZ)
Vue.component('v-activity-list', vActivityList)
Vue.component('v-activity-lists', vActivityLists)
Vue.component('v-activity-listKZ', vActivityListKZ)
Vue.component('v-resume', vResume)
Vue.component('v-recomdDetail', vRecomdDetail)
Vue.component('v-majorresume', vMajorresume)
Vue.component('v-meeting-list', vMeetingList)
Vue.component('v-meeting-lists', vMeetingLists)
Vue.component('v-meeting-listCollection', vMeetingListCollection)
Vue.component('v-input-box', vInputBox)
Vue.component('v-select-box', vSelectBox)
Vue.component('v-frame', vFrame)
Vue.component('v-frame-company', vFrameCompany)
Vue.component('v-frame-gzh', vFrameGzh)
Vue.component('v-date-picker', vDatePicker)
Vue.component('v-login', vLogin)
Vue.component('v-image', vImage)
Vue.component('v-article-detail', vArticleDetail)
Vue.component('m-invitation', mInvitation)
Vue.component('m-signature', mSignature)
Vue.component('m-guide-dialog', mGuideDialog)
Vue.component('m-message-dialog', mMessageDialog)
Vue.component('m-signature-dialog', mSignatureDialog)