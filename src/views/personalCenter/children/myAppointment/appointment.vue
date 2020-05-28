<template>
	<div class="aaa">
		<div v-if="data.list==''"></div>
		
		<div class="content_right_top" v-for="(item,index) in data" :key="index" @click="detail(item)" v-else>
			
			<img :src="item.img" />
			<div class="content_right_top_span">
				<span>王老师</span>
				<span>职业定位：{{item.job}}</span>
				<span>预约时间：{{item.time}}</span>
				<span v-if="(item.state=='待面谈')">预约地点：{{item.address}}</span>
			</div>
			<div class="status" :class="item.state">
				{{item.state}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		data: [
		]
		}
	},
	methods: {
		detail(e) {
			sessionStorage.setItem('item', JSON.stringify(e))
			this.$router.push({ name: 'user/appointment_detail' })
		},
		async initData() {
			let ListData = await this.service.personalCenter.myOrder({
				userid: JSON.parse(localStorage.getItem('username')).userinfo.studentid,
				// status:0,
				// sign:0
			})
			console.log(ListData)
			if (ListData.code === 0) {
				this.data = ListData.data
			}
		}
	},
	created() {
		this.initData()
	}
}
</script>

<style lang="scss" scoped>
.aaa {
  width: 880px;
}
.content_right_top {
	width: 880px;
	height: 220px;
	display: flex;
	margin-bottom: 20px;
	flex-direction: row;
	align-items: center;
	background: rgba(255, 255, 255, 1);
	cursor: pointer;
	img {
		margin: 0 40px;
		width: 140px;
		height: 140px;
	}
	.content_right_top_span {
		display: flex;
		flex-direction: column;
		width: 300px;
		flex-wrap: wrap;
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
	.status {
		font-size: 16px;
		margin-left: 26%;
	}
}
// 变化样式
.待面谈 {
  	color: #3579ff;
}
.已反馈 {
  	color: #707070;
}
.待审核 {
  	color: #00cc7a;
}
.不通过 {
  	color: #df1f1f;
}
.已结束 {
  	color: #707070;
}
</style>