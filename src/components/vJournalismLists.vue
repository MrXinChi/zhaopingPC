<template>
	<div>
		<div v-for="i in hostArray" @click="detailsBtn(i.id)" class="announcement flex flex_y_center">
			<div class="announcement-left">
				<p class="announcement-left-tit flex flex_x_center">{{timestampDay(i.addtime)}}</p>
				<p class="announcement-left-time flex flex_x_center">{{timestampYear(i.addtime)}}</p>
			</div>
			<div class="announcement-right">
				<p class="announcement-right-header over_1 cu_p">{{i.title}}</p>
				<p class="announcement-right-title over_2 cu_p" v-html="i.remarks!=undefined?i.remarks:i.content"></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		hostArray: Array
	},
	methods: {
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
			this.$emit("detailsBtn",id);
		}
	},
	created(){
		
	}
};
</script>

<style scoped="scoped" lang="scss">
.announcement:last-child .announcement-right {
  	border-bottom: none !important;
}
.announcement {
	width: 100%;
	height: 117px;
	background-color: #ffffff;
	.announcement-left {
		width: 88px;
		height: 74px;
		border: 1px solid #DEDEDE;
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
			color: #8C8C8C;
			margin-top: 8px;
		}
	}
	.announcement-right {
		width: 740px;
		// border-bottom: 1px solid #dedede;
		height: 100%;
		margin-left: 12px;
		.announcement-right-header {
			color: #262626;
			font-size: 14px;
			font-weight: bold;
			margin-top: 25px;
			height: 18px;
			line-height: 18px;
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
	box-shadow:0px 4px 16px rgba(0,0,0,0.08);
	opacity:1;
	border-radius:4px;
}
.announcement:hover .announcement-left {
  	border: 1px solid rgba(82, 134, 255, 0.44);
}
.announcement:hover .announcement-left-tit{
	color:rgba(82,134,255,1);
}
.announcement:hover .announcement-left-time {
  	color: rgba(82, 134, 255, 0.8);
}
</style>