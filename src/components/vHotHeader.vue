<template>
	<div class="container">
		<div class="hot_header" :style="hotNewsShows||hotzhiShows?'margin-top:-20px;':''">
			<v-icon icon-class="icon-fire" class-name="icon"></v-icon>
			<h1>{{title}}</h1>
		</div>

		<!--热门新闻-->
		<div v-if="hotNewsShow" class="journalism-list">
			<div v-if="index<=4" v-for="(i,index) in hotNewsArray" :key="index" class="journalism-item" @click="backBtn(i.id)">
				<div class="fs14 cu_p">{{i.title}}</div>
				<div class="fs14">{{timestampToTime(i.addtime)}}</div>
			</div>
		</div>

		<!--新闻中心-->
		<div v-if="hotNewsShows" class="journalism-list">
			<div v-if="index<=4" v-for="(i,index) in hotNewsArray" :key="index" class="journalism-item">
				<div class="fs14 cu_p">{{i.title}}</div>
				<div class="fs14">{{timestampToTime(i.addtime)}}</div>
			</div>
		</div>

		<!--热门职位-->
		<div v-if="hotzhiShow" class="hotzhi-list">
			<div v-for="(i,index) in hotzhiArray" :key="index" class="hotzhi-item flex flex_x_bten" @click="backBtn(i.id)">
				<div class="position">{{i.work_name}}</div>
				<div>{{i.salay_ceil}}</div>
			</div>
		</div>

		<!--热门职位-->
		<div v-if="hotzhiShows" class="hotzhi-list">
			<div v-for="(i,index) in hotzhiArray" :key="index" class="hotzhi-item flex flex_x_bten" @click="backBtn(i.id)">
				<div class="position">{{i.work_name}}</div>
				<div>{{i.salay_ceil}}</div>
			</div>
		</div>

		<!--推荐用人单位-->
		<div v-if="employingShow" class="employing-list">
			<div v-for="i in employingArray" class="employing-item cu_p">
				<div class="employing-title">亚信科技(中国)有限公司</div>
				<div class="flex employing-det">
					<div class="fs14">北京</div>
					<div class="fs14">100-199人</div>
					<div class="fs14">通信服务业</div>
				</div>
			</div>
		</div>

		<!--热门宣讲会-->
		<div v-if="preachShow" class="preach-list">
			<div v-for="i in preachArray" :key="i" class="preach-item c_333 fs15 cu_p" @click="backBtn(i.id)">{{i.title}}</div>
		</div>

	</div>
</template>

<script>
export default {
	name: "vHotHeader",
	data() {
		return {};
	},
	methods:{
		timestampToTime(time){
			var date = new Date(time);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			return Y+M+D;
		},
		backBtn(id){
			this.$emit("detail",id);
		}
	},
	props: {
		title: {
			type: String,
			default: ""
		},
		hotNewsArray: Array,
		hotzhiArray: Array,
		employingArray:Array,
		preachArray:Array,
		hotNewsShows:{
			type:Boolean,
			default:false
		},
		hotNewsShow:{
			type:Boolean,
			default:false
		},
		hotzhiShow:{
			type:Boolean,
			default:false
		},
		hotzhiShows:{
			type:Boolean,
			default:false
		},
		employingShow:{
			type:Boolean,
			default:false
		},
		preachShow:{
			type:Boolean,
			default:false
		}
	}
};
</script>
<style scoped lang="scss">
.preach-list{
	padding: 0 20px;
	.preach-item{
		border-bottom: 1px solid #DEDEDE;
		padding: 15px 0;
		line-height: 20px;
	}
	.preach-item:last-child{
		border: none;
	}
}
	.employing-list {
		padding: 0 20px;
		.employing-item {
			padding: 20px 0;
			border-bottom: 1px solid #DEDEDE;
			.employing-title {}
			.employing-det {
				margin-top: 10px;
			}
			.employing-det div:nth-child(1) {
				border-right: 1px solid #DEDEDE;
				padding-right: 10px;
				color: #595959;
			}
			.employing-det div:nth-child(2) {
				border-right: 1px solid #DEDEDE;
				padding: 0 10px;
				color: #595959;
			}
			.employing-det div:nth-child(3) {
				border-right: 1px solid #DEDEDE;
				margin-left: 10px;
				color: #595959;
			}
		}
		.employing-item:last-child{
			border: none;
		}
	}
	
	.hot_header {
		@include flex(row, flex-start, center);
		width: 280px;
		height: 80px;
		background-color: #FFF1F3;
		.icon {
			margin-left: 26px;
			width: 22px;
			height: 28px;
		}
		h1 {
			@include word(22, #262626);
			margin-left: 48px;
		}
	}
	
	.journalism-list {
		background-color: #fff;
		padding: 0 20px 8px 20px;
		.journalism-item {
			border-bottom: 1px solid #DEDEDE;
			padding-bottom: 10px;
		}
		.journalism-item:last-child {
			border: none;
		}
		.journalism-item div:nth-child(1) {
			color: #262626;
			margin-top: 20px;
			line-height: 20px;
		}
		.journalism-item div:nth-child(2) {
			color: #8C8C8C;
			margin-top: 10px;
		}
	}
	
	.hotzhi-list {
		padding: 0 25px 1px 25px;
		.position{
			width: 98px;
			overflow: hidden;
			text-overflow :ellipsis;//多余省略号显示
			white-space:nowrap;//不许换行
		}
	}
	
	.hotzhi-item {
		margin: 20px 0;
	}
	
	.hotzhi-item div:nth-child(1) {
		color: #333333;
		margin: 5px 0;
	}
	
	.hotzhi-item div:nth-child(2) {
		color: #3A71FB;
		margin: 5px 0;
	}
	
	.container {
		background: #fff;
		margin-top: 20px;
	}
</style>