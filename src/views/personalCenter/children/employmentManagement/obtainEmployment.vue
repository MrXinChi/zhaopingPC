<template>
	<div class="container">
		<div class="list">
			<div class="item">
				<router-link to="/user/infoVerify">
					<v-icon icon-class="icon-verify" class-name="icon"></v-icon>
					<h1>信息核实</h1>
				</router-link>
			</div>

			<div class="item">
				<router-link to="/user/graduationDestination">
					<v-icon icon-class="icon-whereabouts" class-name="icon"></v-icon>
					<h1>毕业填报去向</h1>
				</router-link>
			</div>

			<div class="item">
				<router-link to="/user/recommendedDetail">
					<v-icon icon-class="icon-recommended" class-name="icon"></v-icon>
					<h1>就业推荐表</h1>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.container {
	.list {
		@include flex(row,space-evenly);
		height: 635px;
		background-color: #ffffff;
		.item {
			margin-top: 70px;
			text-align: center;
			cursor: pointer;
			.icon {
				width: 56px;
				height: 56px;
			}
			h1 {
				@include word(16, #595959, 400, center);
				margin-top: 12px;
			}
		}
	}
}
</style>