<template>
	<div class="container">
		<div class="tab" v-if="isShow">
			
			<router-link to="/user/collection/job">职位</router-link>
			<router-link to="/user/collection/notice">校招公告</router-link>

			<router-link to="/user/collection/preachMeeting">宣讲</router-link>

			<router-link to="/user/collection/company">用人单位</router-link>
			
			<router-link to="/user/collection/activity">活动</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isShow: true,
			routerPath: ""
		};
	},
	watch: {
		$route(to, from) {
			this.routerPath = to.path;
			this.isShow = !(this.routerPath == "/user/collection/noticeDetail");
		}
	},
	created() {
		this.routerPath = this.$route.path;
		this.isShow = !(this.routerPath == "/user/collection/noticeDetail");
	}
};
</script>
<style lang="scss" scoped>
.container {
	.tab {
		@include flex();
		background-color: #ffffff;
		a {
			@include word(16, #8c8c8c);
			margin-left: 20px;
			padding: 0 24px;
			height: 55px;
			line-height: 55px;
			border-bottom: 1px solid #ffffff;
			&.active {
				@include word(16, #5286ff);
				border-bottom: 1px solid #5286ff;
			}
		}
	}
}
</style>