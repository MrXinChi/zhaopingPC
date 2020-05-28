<template>
	<div class="container_">
		<v-content>
			<div slot="content" class="wrapper">
				<div class="content_left">
					<v-meeting-list @click="handleDetail"></v-meeting-list>
				</div>
				<div class="content_right">
					<v-calendar></v-calendar>
					<v-hot-header preachShow :preachArray="preachArray" title="热门宣讲会" @detail="handleDetail"></v-hot-header>
				</div>
			</div>
		</v-content>
	</div>
</template>

<script>
export default {
	data() {
		return {
			preachArray:[]
		}
	},
	created() {
		this.calendar();
		this.init();
	},
	methods: {
		handleDetail(id) {
			this.$router.push(`/preachMeeting/${id}`);
		},
		async calendar() {
			//日历插件
			let params = {
				school_id: ' 6f745542-f2f0-61b2-408f-aab3eec8a132'
				// year: 2019,
				// month: 10,
				// is_history: 1
			}
			let calendarstatus = await this.service.preach.calendar(params)
			// console.log(calendarstatus)
		},
		async init(){
			let preachDataList = await this.service.preach.getlist({
				//暂无
				keywords: '',
				province_id: '',
				city_id: '',
				// day: 3,
				page: 1, //页码
				size: 8, //每页显示
				isair:1
			})
			// this.reversedMessage = preachData.data.allpage * 10
			// // console.log(preachData.data)
			// this.page = preachData.data.page
			this.preachArray = preachDataList.data.list
		}
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	@include flex(row, space-between);
	.content_left {
		width: 900px;
	}
	.content_right {
		width: 280px;
	}
}
</style>