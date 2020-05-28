<template>
	<div class="news_list_wrapper">
		<div class="news_item" v-for="(item,i) in newsList" :key="i" @click="handleToDetail(item.id)">
			<div class="title" :style="{maxWidth:maxWidth+'px'}">{{item.title}}</div>
			<div class="time">{{timestampToTime(item.addtime)}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "vNewsList",
	data() {
		return {};
	},
	props: {
		maxWidth: {
			type: Number,
			default: 0
		},
		newsList: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		timestampToTime(time){
			var date = new Date(time);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			return Y+M+D;
		},
		handleToDetail(id) {
			this.$emit("handleToDetail", id);
		}
	}
};
</script>
<style scoped lang="scss">
.news_list_wrapper {
	height: 233px;
	background-color: #ffffff;
	padding:20px 20px 0px 20px;
	.news_item {
		@include flex(row, space-between);
		margin-bottom: 20px;
		.title { 
			font-size:14px;
			font-family:MicrosoftYaHeiUI;
			line-height:19px;
			color:rgba(89,89,89,1);
			opacity:1;
			@include text-overflow(1, auto);
			cursor: pointer;
		}
		.time {
			@include word(14, #8c8c8c);
		}
	}
}
</style>
