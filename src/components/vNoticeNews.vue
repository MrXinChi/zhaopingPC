<template>
	<div>
		<div class="notice-title flex_center">
			<v-icon icon-class="icon-notice" class-name="icon"></v-icon>
			<span>{{title}}</span>
		</div>
		<div class="notice">
			<div class="notice-list flex flex_x_center flex_warp">
				<label v-for="(item,index) in routerArray" :key="index" :class="clickId!=index?'notice-item flex_center fs16':'notice-item active flex_center fs16'" @click="backBtn(index)">
					{{item.name}}
				</label>
			</div>
		</div>
	</div>
</template>

<script> 
	export default {
		props: {
			title: String,
			routerArray:Array
		},
		data() {
			return {
				clickId:0
			}
		},
		methods:{
			// backBtn(index){
			// 	if(index!=2){
			// 		this.$emit("backLink");
			// 	}
			// }
			backBtn(index){
				this.clickId=index;
				this.$emit("backLink",index,1);
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
.notice-title {
	width: 100%;
	height: 80px;
	background: #5286FF;
	color: #FFFFFF;
	font-size: 22px;
	.icon {
		margin-right: 10px;
		width: 32px;
		height: 30px;
	}
	span {
		margin-left: 10px;
	}
}

.notice {
	width: 100%;
	background: #FDFDFD;
	// padding-bottom: 34px;
	.notice-list {
		.notice-item {
			width: 240px;
			height: 56px;
			color: #262626;
			border-radius: 4px;
			margin-top: 24px;
		}
		a:nth-of-type(3){
			margin-bottom: 24px;
		}
		.active {
			background: #EFF7FE !important;
			color: #5286FF !important;
		}
	}
	
}
</style>