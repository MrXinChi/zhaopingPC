<template>
	<div class="container">
		<div class="tab">
			<!-- <router-link to="/user/registration/doubleElection">双选会</router-link>
			<router-link to="/user/registration/preachMeeting">宣讲会</router-link> -->
			<router-link to="/user/registration/activity">活动报名</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {};
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