import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


//引入一级路由
import Home from '@/views/home/index'; //首页
import NewsBulletin from '@/views/newsBulletin/index'; //新闻公告
import RecruitmentInformation from '@/views/recruitmentInformation/index'; //招聘信息
import PositionDetail from "@/views/recruitmentInformation/position/newsDetail" //招聘信息->详情
//双选会
import DoubleElection from '@/views/doubleElection/index'; //双选会
import DoubleElectionDetail from '@/views/doubleElection/doubleElectionDetail'; // 双选会详情
import Notice from '@/views/doubleElection/notice'; // 双选会详情邀请通知
import DoubleTotal from '@/views/doubleElection/doubleTotal'; // 双选会统计
import DoubleCompanyTab from '@/views/doubleElection/companyTab'; // 双选会展区分类标签
import DoubleCompany from '@/views/doubleElection/company'; // 双选会查看展区
import Position from '@/views/doubleElection/position'; // 双选会查看展区
//宣讲会
import PreachMeeting from '@/views/preachMeeting/index'; //宣讲会
import PreachMeetingDetail from '@/views/preachMeeting/preachMeetingDetail'; //宣讲会详情
//空中直播
import LiveBroadcast from '@/views/liveBroadcast/liveBroadcast'; //空中直播
import AirPreachMeeting from '@/views/liveBroadcast/airPreachMeeting'; //空中宣讲会
import AirPreachMeetingDetail from '@/views/liveBroadcast/airPreachMeetingDetail'; //空中宣讲会详情
//空中宣讲会
import MettingNotice from '@/views/liveBroadcast/mettingNotice'; //空中宣讲会详情 空宣简介
import MettingPosition from '@/views/liveBroadcast/mettingPosition'; //空中宣讲会详情 在线职位
import MettingPosters from '@/views/liveBroadcast/mettingPosters'; //空中宣讲会详情 宣传海报
import MettingPreach from '@/views/liveBroadcast/mettingPreach'; //空中宣讲会详情 宣讲app
//空中双选会
import VideoInterview from '@/views/liveBroadcast/videoInterview'; //空中直播 空中双选会
import videoInterviewDetail from '@/views/liveBroadcast/videoInterviewDetail'; //空中双选会详情
import VideoNotice from '@/views/liveBroadcast/videoNotice'; //空中双选会详情
import VideoTotal from '@/views/liveBroadcast/videoTotal'; // 双选会统计
import VideoTab from '@/views/liveBroadcast/videoTab'; // 双选会展区分类标签
import VideoCompany from '@/views/liveBroadcast/videoCompany'; // 双选会查看展区
import VideoPosition from '@/views/liveBroadcast/videoPosition'; // 双选会查看展区



import AirInterview from '@/views/liveBroadcast/airInterview'; //空中直播 空中面试
import MakeAnAppointment from '@/views/makeAnAppointment/index'; //预约咨询
import Activity from '@/views/activity/index'; //活动报名
import ActivityDetail from '@/views/activity/activityDetail'; //活动报名详情
import Ouestionnaire from '@/views/ouestionnaire/index'; //调查问卷
import ouestDetail from '@/views/ouestionnaire/ouestDetail'; //调查问卷详情
import Login from '@/views/login/index'; //登陆
import Register from '@/views/register/index'; //注册
import PersonalCenter from '@/views/personalCenter/index'; //个人中心
import Preview from '@/views/personalCenter/children/preview/preview.vue'; //预览简历 标准版
import Major from '@/views/personalCenter/children/preview/major.vue'; //预览简历 专业版
import Youth from '@/views/personalCenter/children/preview/youth.vue'; //预览简历 青春版
import Contracted from '@/views/personalCenter/children/preview/contracted.vue'; //预览简历 简约版
import SettingIndex from '@/views/personalCenter/children/setting/index.vue'; //个人中心 设置
import SettingEditFroFile from '@/views/personalCenter/children/setting/editFroFile.vue'; //个人中心 修改资料
import SettingChangePassword from '@/views/personalCenter/children/setting/changePassword.vue'; //个人中心 修改密码


//引入新闻公告二级路由
import newsBulletin from './newsBulletin'
import recruitmentInformation from './recruitmentInformation'
//引入个人中心耳二级路由
import personalCenter from './personalCenter'

const router = new VueRouter({
	linkActiveClass: 'active',
	routes: [{
			path: "/",
			redirect: "/home"
		},
		{
			path: '/home',
			name: "home",
			component: Home
		},
		{
			path: '/newsBulletin',
			name: "newsBulletin",
			component: NewsBulletin,
			children: [...newsBulletin]
		},
		{
			path: '/recruitmentInformation',
			name: "recruitmentInformation",
			component: RecruitmentInformation,
			children: [...recruitmentInformation]
		},
		{
			path: '/recruitmentInformation/detail/:id',
			name: "PositionDetail",
			component: PositionDetail
		},
		{
			path: '/doubleElection',
			name: "doubleElection",
			component: DoubleElection
		},
		{
			path:'/doubleElection/doubleTotal/:id',
			name:"doubleTotal",
			component:DoubleTotal
		},
		{
			path:'/doubleElection/doubleCompany',
			name:"doubleCompany",
			component:DoubleCompany
		},
		{
			path: '/doubleElection/companyTab',
			name: "companyTab",
			component: DoubleCompanyTab,
			children: [{
					path: "/doubleElection/companyTab",
					redirect: "/doubleElection/companyTab/company",
				},
				{
					path: 'company',
					name: "company",
					component: DoubleCompany,
				},
				{
					path: 'position',
					name: "position",
					component: Position,
				}
			]
		},
		{
			path: '/doubleElection/:id',
			name: "doubleElectionDetail",
			component: DoubleElectionDetail,
			children: [
				{
					path: "/doubleElection/:id",
					redirect: "/doubleElection/:id/notice",
				},
				{
					path: 'notice',
					name: "notice",
					component: Notice,
				},
			]
		},
		{
			path: '/preachMeeting',
			name: "preachMeeting",
			component: PreachMeeting
		},
		{
			path: '/preachMeeting/:id',
			name: "preachMeetingDetail",
			component: PreachMeetingDetail
		},
		{
			path: '/liveBroadcast',
			name: "liveBroadcast",
			component: LiveBroadcast,
			children: [{
					path: "/LiveBroadcast",
					redirect: "/liveBroadcast/airPreachMeeting",
				},
				{
					path: 'airPreachMeeting',
					name: "airPreachMeeting",
					component: AirPreachMeeting,
				},
				{
					path: 'videoInterview',
					name: "videoInterview",
					component: VideoInterview,
				},
				{
					path: 'airInterview',
					name: "airInterview",
					component: AirInterview,
				}
			]
		},
		{
			path: '/airPreachMeeting/:id',
			name: "airPreachMeetingDetail",
			component: AirPreachMeetingDetail,
			children: [
				{
					path: "/airPreachMeeting/:id",
					redirect: "/airPreachMeeting/:id/mettingNotice",
				},
				{
					path: 'mettingNotice',
					name: "mettingNotice",
					component: MettingNotice,
				},
				{
					path: 'mettingPosition',
					name: "mettingPosition",
					component: MettingPosition,
				},
				{
					path: 'mettingPosters',
					name: "mettingPosters",
					component: MettingPosters,
				},
				{
					path: 'mettingPreach',
					name: "mettingPreach",
					component: MettingPreach,
				},
			]
		},
		//空中双选会--开始
		{
			path:'/videoInterview/:id',
			name:'videoInterviewDetail',
			component:videoInterviewDetail,
			children: [
				{
					path: "/videoInterview/:id",
					redirect: "/videoInterview/:id/videoNotice",
				},
				{
					path: 'videoNotice',
					name: "videoNotice",
					component: VideoNotice,
				},
			]
		},
		//统计
		{
			path: '/videoTotal/:id',
			name: "videoTotal",
			component: VideoTotal,
		},
		//展区
		{
			path:'/liveBroadcast/videoTab',
			name:"videoTab",
			component:VideoTab,
			children: [
				{
					path: "/liveBroadcast/videoTab",
					redirect: "/liveBroadcast/videoTab/videoCompany",
				},
				{
					path: 'videoCompany',
					name: "videoCompany",
					component: VideoCompany,
				},
				{
					path: 'videoPosition',
					name: "videoPosition",
					component: VideoPosition,
				},
			]
		},
		{
			path: '/makeAnAppointment',
			name: "makeAnAppointment",
			component: MakeAnAppointment,
		},
		{
			path: '/makeAnAppointment/details/:id',
			name: 'makeAnAppointment/details',
			component: () => import('../views/makeAnAppointment/details.vue')
		},

		{
			path: '/activity',
			name: "activity",
			component: Activity
		},
		{
			path: '/activity/:id',
			name: "ActivityDetail",
			component: ActivityDetail
		},
		{
			path: '/ouestionnaire',
			name: "ouestionnaire",
			component: Ouestionnaire
		},
		{
			path: '/ouestionnaire/ouestDetail/:id',
			name: "ouestDetail",
			component: ouestDetail
		},
		{
			path: '/login',
			name: "login",
			component: Login
		},
		{
			path: '/register',
			name: "register",
			component: Register
		},
		{
			path: '/user', //个人
			name: "user",
			component: PersonalCenter,
			children: [...personalCenter]
		},
		{
			path: '/preview', //预览简历  标准版
			name: "preview",
			component: Preview
		},
		{
			path: '/major', //预览简历	  专业版
			name: "major",
			component: Major
		},
		{
			path: '/youth', //预览简历    青春版
			name: "youth",
			component: Youth
		},
		{
			path: '/contracted', //预览简历    简约版
			name: "contracted",
			component: Contracted
		},
		{
			path: '/setting', // 个人设置
			name: "setting",
			component: SettingIndex,
		},
		{
			path: '/editFroFile', // 个人中心 修改资料
			name: "editFroFile",
			component: SettingEditFroFile
		},
		{
			path: '/changePassword', // 个人中心 修改密码
			name: "changePassword",
			component: SettingChangePassword
		},
	]
})

export default router