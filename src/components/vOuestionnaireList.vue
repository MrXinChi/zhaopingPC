<template>
	<div class="container">
		<div v-for="(item,i) in hostArray" @click="detailsBtn(item.id)" :key="i" class="announcement flex flex_y_center">
			<div class="announcement-left">
				<p class="announcement-left-tit flex flex_x_center">{{timestampDay(item.addtime)}}</p>
				<p class="announcement-left-time flex flex_x_center">{{timestampYear(item.addtime)}}</p>
			</div>
			<div class="announcement-right">
				<p class="announcement-right-header over_1 cu_p">{{item.title}}</p>
				<p class="announcement-right-title over_2 cu_p" v-html="item.remarks!=undefined?item.remarks:item.content"></p>
			</div>

			<button class="submitbutton">填答</button>
		</div> 
		<div class="pages flex flex_x_center">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
		</div> 

	</div>
</template>

<script>
export default {
	props: {
		hostArray: Array
	},
	data(){
		return{
			page:'',
		};
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10;
		},
	},
	methods: {
		handleCurrentChange(index) {
			// this.init(index);
		},
		timestampDay(time){
			var date = new Date(time);
			var D = date.getDate() + ' ';
			return D;
		},
		timestampYear(time){
			var date = new Date(time);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
			return Y+M;
		},
		detailsBtn(id) {
			// console.log(this.hostArray)
			this.$emit("detailsBtn",id);
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.container{
  	height: 840px;
	.announcement:last-child .announcement-right {
		border-bottom: none !important;
	}
	.announcement {
		margin-bottom: 20px;
		// padding-right: 20px;
		width:880px;
		height:104px;
		background:rgba(255,255,255,1);
		border-radius:4px;

		.announcement-left {
			width: 88px;
			height: 74px;
			border: 1px solid #595959;
			border-radius: 4px;
			margin-left: 20px;
			.announcement-left-tit {
				font-size: 22px;
				letter-spacing: 1px;
				margin-top: 12px;
				color: #595959;
			}
			.announcement-left-time {
				font-size: 14px;
				color: #595959;
				margin-top: 8px;
			}
		}
		.announcement-right {
			width: 655px;
			height: 100%;
			margin-left: 12px;
			.announcement-right-header {
				color: #262626;
				font-size: 14px;
				font-weight: bold;
				margin-top: 25px;
			}
			.announcement-right-title {
				color: #595959;
				font-size: 14px;
				margin-top: 12px;
				line-height: 20px;
			}
		}
	}
	.announcement:hover{
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 16px 0px rgba(0,0,0,0.08);
		border-radius:4px;
		.submitbutton{
			display: inline;
		}
	}
	.announcement:hover .announcement-left {
		border:1px solid rgba(82,134,255,0.45);
	}
	.announcement:hover .announcement-left-tit,
	.announcement:hover .announcement-left-time {
		color: rgba(82, 134, 255, 1);
	}
	.submitbutton {
		display:none;
		
		width: 76px;
		height: 32px;
		background: rgba(82, 134, 255, 1);
		border-radius: 4px;
		font-size: 14px; 
		
		font-family:MicrosoftYaHeiUI;
		color:rgba(255,255,255,1);
		line-height:18px;

		cursor: pointer;
	}
}
</style>