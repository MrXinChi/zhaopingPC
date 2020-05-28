<template>
	<div>
		<div class="content">
			<div class="content_left">
				<v-notice title="预约咨询"></v-notice>
				<div class="content_left_nav">
					<span v-for="(item,index) in OrderTitle" :key="index" :class="{'active3':index==idx3}" @click="OrderItem(index)" >{{item.title}}</span>
				</div>
			</div>
		</div>
		<div class="container">进一步修改资料</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
		};
	},
	methods: {

	},
};
</script>

<style lang="scss" scoped>
.content {
	@include flex(row, space-between);
	width: 1180px;
	margin: 0 auto;
	.content_left {
		width: 280px;
		.content_left_nav {
			@include flex(column, flex-start, center);
			width: 280px;
			font-size: 16px;
			color: rgba(38, 38, 38, 1);
			background-color: #ffffff;
			span {
				@include flex(column, center, center);
				width: 240px;
				height: 56px;
				margin-bottom: 20px;
			}
		}
	}
}
</style>