import {
	POST,
	GET
} from '@/axios/axios'

export const services = {
	jobfairGetlist: (param) => { // 双选会列表
		return POST("/jobfair/getlist", param);
	},
	jobfairDetail: (param) => { // 双选会详情
		return POST("/jobfair/detail", param);
	},
	jobfairCompany: (param) => { // 双选会展区
		return POST("/jobfair/signenterprise", param);
	},
	jobfairGetmylist: (param) => { // 我报名的列表
		return POST("/jobfair/getmylist", param);
	},
	jobfairOnline: (param) => { // 在线直播页
		return POST("/jobfair/online", param);
	},
	jobfairCategory: (param) => { // 用人单位类别
		return POST("/jobfair/getcategory", param);
	},

};

export default services;