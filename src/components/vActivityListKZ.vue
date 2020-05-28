<template>
<div class="activity_wrapper">
	<div class="activity_list">
		<div class="activity_item" v-for="(i,index) in mygetList" :key="index" @click="handleClick(i.id)">
			<img :src="i.com_logo+'!100x100'" />
			<!-- <img src="@/assets/images/company.png" /> -->
			<div class="item_right">
				<div class="name">{{i.com_id_name}}</div>
				<div class="time">空面时间:{{timestampToTimePoint(i.starttime)}}-{{timestampToHours(i.endtime)}}</div>

				<div class="address">
					<span>{{i.ms_zhiwei}}</span>
					<div class="separated"></div>
					<span>{{i.realname}}</span>
				</div>
			</div>
			<div class="status not_started" v-if="i.yqstatus==2">未开始</div>
			<div class="status ongoing" v-if="i.yqstatus==1">进行中</div>
			<div class="status over" v-if="i.yqstatus==3">已结束</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		mygetList:{
			type:Array,
			detailes:[]
		}
	},
	data() {
		return {};
	},
	methods: {
		handleClick(e) {
			this.$emit("click", e);
		}
	}
};
</script>

<style lang="scss" scoped>
.activity_wrapper {
	.activity_list {
		@include flex(row,space-between, flex-start, initial, wrap);
		.activity_item {
			@include flex(row);
			width: 540px;
			position: relative;
			margin-top: 20px;
			padding: 20px;
			background-color: #ffffff;
			border-radius: 8px;
			cursor: pointer;
			img {
				width: 88px;
				height: 88px;
			}
			.item_right {
				@include flex(column, space-between);
				margin-left: 20px;
				// height: 75px;
				.name {
					font-size:16px;
					font-family:MicrosoftYaHeiUI-Bold;
					line-height:20px;
					color:rgba(38,38,38,1);
					opacity:1;
				}
				.time {
					margin-top:12px;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					color:rgba(89,89,89,1);
					opacity:1;
				}
				.address {
					margin-top:12px;
					@include flex(row, flex-start, center);
					.separated{
						width:1px;
						height:12px;
						background:rgba(222,222,222,1);
						opacity:1;
						margin: 0 12px;
					}
					span { 
						font-size:14px;
						font-family:MicrosoftYaHeiUI;
						line-height:18px;
						color:rgba(89,89,89,1);
						opacity:1;
					}
				}
			}
			// .status {
			//   @include word(14, #ffffff, 400, center);
			//   position: absolute;
			//   top: 20px;
			//   right: 20px;
			//   width: 90px;
			//   height: 30px;
			//   line-height: 30px;
			//   border-radius: 30px;
			//   background-color: #f9f9f9;
			//   &.not_started {
			//     background-color: #55dec4;
			//   }
			//   &.ongoing {
			//     background-color: #5286ff;
			//   }
			//   &.over {
			//     @include word(14, #8c8c8c, 400, center);
			//   }
			// }
			.status{
				@include flex(row,center,center);
				width:58px;
				height:24px;
				position: absolute;
				top: 20px;
				right: 20px;
				opacity:1;
				border-radius:8px 0px 8px 0px;
				font-size:14px;
				font-family:MicrosoftYaHeiUI;
				line-height:25px;
				color:rgba(255,255,255,1);
				opacity:1;
				&.not_started {
					background:rgba(1,203,122,1);
				}
				&.ongoing {
					background:rgba(41,113,255,1);
				}
				&.over {
					background:rgba(245,245,245,1);
					@include word(14, #8c8c8c, 400, center);
				}
			}
		}
		.activity_item:hover{
			// background:rgba(255,255,255,1);
			box-shadow:0px 4px 16px rgba(0,0,0,0.07); 
		}
	}
}
</style>