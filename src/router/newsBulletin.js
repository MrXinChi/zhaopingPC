import Vue from "vue";

//新闻热点
import Hotspot from "@/views/newsBulletin/child/hotspot/hotspot"
//新闻热点列表
import DetailList from "@/views/newsBulletin/child/hotspot/detailList"
//新闻热点详情
import NewsDetail from "@/views/newsBulletin/child/hotspot/newsDetail"


//通知公告
import Notice from "@/views/newsBulletin/child/notice/notice"
//通知公告列表
import DetailList_n from "@/views/newsBulletin/child/notice/detailList"
//通知公告详情
import NewsDetail_n from "@/views/newsBulletin/child/notice/newsDetail"


//校内
import Inschool from "@/views/newsBulletin/child/Inschool/Inschool"
//校内列表
import DetailList_i from "@/views/newsBulletin/child/Inschool/detailList"
//校内详情
import NewsDetail_i from "@/views/newsBulletin/child/Inschool/newsDetail"


export const routes = [{
		path: "/newsBulletin",
		redirect: "/newsBulletin/hotspot"
	},
	{
		path: 'hotspot',
		name: "hotspot",
		component: Hotspot,
		children: [{
			path: "/newsBulletin/hotspot",
			redirect: "/newsBulletin/hotspot/detailList"
		}, {
			path: 'detailList',
			name: "detailList",
			component: DetailList
		}, {
			path: 'newsDetail/:id',
			name: "newsDetail",
			component: NewsDetail
		}]
	},
	{
		path: 'notice',
		name: "notice",
		component: Notice,
		children: [{
			path: "/newsBulletin/notice",
			redirect: "/newsBulletin/notice/DetailList_n"
		}, {
			path: 'DetailList_n',
			name: "DetailList_n",
			component: DetailList_n
		}, {
			path: 'newsDetail_n/:id',
			name: "newsDetail_n",
			component: NewsDetail_n
		}]
	},
	{
		path: 'inschool',
		name: "inschool",
		component: Inschool,
		children: [{
			path: "/newsBulletin/inschool",
			redirect: "/newsBulletin/inschool/DetailList_i"
		}, {
			path: 'DetailList_i',
			name: "DetailList_i",
			component: DetailList_i
		}, {
			path: 'newsDetail_i/:id',
			name: "newsDetail_i",
			component: NewsDetail_i
		}]
	},
];

export default routes;