import Vue from "vue";

//招录公告
import Notice from "@/views/recruitmentInformation/notice/hotspot"
import NoticeList from "@/views/recruitmentInformation/notice/detailList"
import NoticeDetail from "@/views/recruitmentInformation/notice/newsDetail"
//招聘职位
import Position from "@/views/recruitmentInformation/position/hotspot"
import PositionList from "@/views/recruitmentInformation/position/detailList"
//用人单位
import unitDetail from "@/views/recruitmentInformation/unit/newsDetail"

export const routes = [{
		path: "/recruitmentInformation",
		redirect: "/recruitmentInformation/notice"
	},
	{
		path: 'notice',
		name: "notice",
		component: Notice,
		children: [{
				path: "/recruitmentInformation/notice",
				redirect: "/recruitmentInformation/notice/noticeList"
			},
			{
				path: 'noticeList',
				name: "noticeList",
				component: NoticeList
			}, {
				path: 'noticeDetail/:id',
				name: "noticeDetail",
				component: NoticeDetail
			}
		]
	},
	{
		path: 'position',
		name: "position",
		component: Position,
		children: [{
				path: "/recruitmentInformation/position",
				redirect: "/recruitmentInformation/position/positionList"
			},
			{
				path: 'positionList',
				name: "positionList",
				component: PositionList
			}
		]
	},
	{
		path: 'unit/:id',
		name: "unit",
		component: unitDetail,
		children: [{
				path: "/recruitmentInformation/unit",
				redirect: "/recruitmentInformation/unit/unitDetail"
			},
			{
				path: 'unitDetail/:id',
				name: "unitDetail",
				component: unitDetail
			}
		]
	}
];

export default routes;