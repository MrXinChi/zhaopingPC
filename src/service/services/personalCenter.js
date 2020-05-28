import {
	POST,
	GET
} from '@/axios/axios'
export const services = {
	myOrder: (param) => { // 我的预约
		return POST("/bespeaknew/getbespeak", param);
	},
};

export default services;