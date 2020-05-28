<template>
	<div class="container">
		<div class="main">
			<div class="wrapper w_1180">
				<div class="tab">
					<router-link to="/doubleElection/companyTab/company">查看展区</router-link>
					<router-link to="/doubleElection/companyTab/position">查看职位</router-link>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	.main {
		position: relative;
		padding-top: 20px;
		.wrapper {
			background-color: #ffffff;
			.tab {
				@include flex();
				border-bottom: 1px solid #dedede;
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
	}
}
</style>