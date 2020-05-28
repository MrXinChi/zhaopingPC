<template>
<div class="activity_wrapper">
    <div class="activity_list">
		<div class="activity_item" v-for="(i,index) in mygetList" :key="index" @click="handleClick(i.id)">
			<img :src="i.qrcode_id_src+'!100x100'" />
			<div class="item_right">
				<div class="name">{{i.realname}}</div>
				<div class="time">{{timestampToTime(i.addtime)}}</div>
				<div class="address">
					<v-icon icon-class="icon-address" class-name="icon"></v-icon>
					<span>{{i.address}}</span>
				</div>
			</div>
			<!-- <div class="status not_started">未开始</div> -->
			<div class="status ongoing">{{i.status_name}}</div>
			<!-- <div class="status over">已结束</div> -->
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
	created(){
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
		.activity_item {
			@include flex(row);
			position: relative;
			margin-top: 20px;
			padding: 20px;
			background-color: #ffffff;
			border-radius: 4px;
			img {
				width: 121px;
				height: 76px;
			}
			.item_right {
				@include flex(column, space-between);
				margin-left: 20px;
				height: 75px;
				.name {
					@include word(16, #333333, bold);
				}
				.time {
					@include word(14, #595959);
				}
				.address {
					@include flex(row, flex-start, center);
					.icon {
						width: 10px;
						height: 12px;
					}
					span {
						margin: 0 6px;
						@include word(14, #999999);
					}
				}
			}
			.status {
				@include word(14, #ffffff, 400, center);
				position: absolute;
				top: 20px;
				right: 20px;
				width: 90px;
				height: 30px;
				line-height: 30px;
				border-radius: 30px;
				background-color: #f9f9f9;
				&.not_started {
					background-color: #55dec4;
				}
				&.ongoing {
					background-color: #5286ff;
				}
				&.over {
					@include word(14, #8c8c8c, 400, center);
				}
			}
		}
		.activity_item:hover{ 
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 16px rgba(0,0,0,0.08);
			opacity:1;
			border-radius:4px;
		}
	}
}
</style>