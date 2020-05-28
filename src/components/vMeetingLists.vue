<template>
	<div class="list">
		<div class="item" v-for="(i,item) in preachMeetingList" :key="item" @click="handleDetail(item)">
			<img :src="com_id_logosrc+'!100x100'" />
			<div class="content_wrapper">
				<div class="top">{{i.PreachInfo.title}}</div>
				<div class="time">{{i.PreachInfo.hold_date}} {{i.PreachInfo.hold_starttime}}-{{i.PreachInfo.hold_endtime}}</div>
				<div class="address">
					<v-icon icon-class="icon-address" class-name="icon"></v-icon>
					<span>{{i.PreachInfo.address}}</span>
				</div>
			</div>
			<div class="page_view">
				<v-page-view :count="i.PreachInfo.viewcount"></v-page-view>
			</div>
		<!-- <div class="cancel">已取消</div> -->
		</div>
	</div>
</template>

<script>
export default {
	props: {
		preachMeetingList:{
			type:Array,
			detailes:[]
		}
	},
	data() {
		return {};
	},
	methods: {
		handleDetail(e) {
			this.$emit("handleDetail", e);
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	.item {
		@include flex();
		position: relative;
		margin-bottom: 20px;
		padding: 20px;
		background-color: #ffffff;
		overflow: hidden;
		border-radius: 4px;
		cursor: pointer;
		&:last-child {
			margin-bottom: 0;
		}
		img {
			width: 76px;
			height: 76px;
		}
		.content_wrapper {
			margin-left: 15px;
			.top {
				@include word(16, #262626);
				@include text-overflow(1, 700px);
			}
			.time {
				@include word(14, #595959);
				margin-top: 14px;
			}
			.address {
				@include word(14, #595959);
				margin-top: 10px;
				.icon {
					width: 10px;
					height: 12px;
				}
				span {
					margin-left: 4px;
				}
			}
		}
		.cancel {
			@include word(12, #000000, 400, center);
			position: absolute;
			top: 5px;
			left: -25px;
			z-index: 1;
			transform: rotate(-45deg);
			width: 100px;
			height: 30px;
			line-height: 30px;
			background: #f2f2f2;
		}
		.page_view {
			position: absolute;
			top: 20px;
			right: 20px;
		}
	}
}
</style>