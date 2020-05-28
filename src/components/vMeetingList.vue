<template>
	<div class="list">
		<div class="item" v-for="(item,i) in preachList" :key="i" @click="handleDetail(item.id)">
			<img :src="item.com_id_logosrc + '!auto'" />
			<!-- <img :src="item.images_name + '!100x100'" /> -->
			<div class="content_wrapper">
				<div class="top">{{item.title}}</div>
				<div class="time">{{item.hold_date}}</div>
				<div class="address" v-if="item.address==''?false:true">
					<v-icon icon-class="icon-address" class-name="icon"></v-icon>
					<span>{{item.address}}</span>
				</div>
			</div>
			<div class="page_view">
				<v-page-view :count="item.viewcount"></v-page-view>
			</div>
			<!-- <div v-if="item.timestatus ==1" class="status ongoing"><label>进行中</label></div>
			<div v-if="item.timestatus ==2" class="status not_started"><label>未开始</label></div> -->
			<div v-if="item.publish_status==2 || item.timestatus ==3" class="status over"><label>已取消</label></div>
		</div>

		<div class="pages flex flex_x_center">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isCollection: {
			type: Boolean,
			type: false
		}
	},
	data() {
		return {
			preachList: [],
			page: '',
			reversedMessage: ''
		}
	},
	methods: {
		handleDetail(e) {
			this.$emit('click', e)
		},
		async init(index) {
			let preachData = await this.service.preach.getlist({
				//暂无
				keywords: '',
				province_id: '',
				city_id: '',
				// day: 7,

				page: index, //页码
				size: 8 //每页显示
			})
			console.log(preachData)
			this.reversedMessage = preachData.data.allpage * 10
			// console.log(preachData.data)
			this.page = preachData.data.page
			this.preachList = preachData.data.list
		},
		handleCurrentChange(index) {
			this.init(index)
		}
	},
	computed: {
		// reversedMessage: function() {
		//   return this.page * 10
		// }
	},
	created() {
		this.init(1)
	}
}
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
			width: 64px;
			height: 64px;
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
		.status{
			@include flex(row,center,center);
			position: absolute;
			top: 5px;
			left: -25px;
			transform: rotate(-45deg);
			width: 100px;
			height: 20px;
			label{
				width: 70%;
				@include word(12,#FFFFFF,400);
				-webkit-transform : scale(0.6,0.6) ;
			}
			&.not_started {
				background:rgba(1,203,122,1);
			}
			&.ongoing {
				background:rgba(41,113,255,1);
			}
			&.over {
				background: #f2f2f2;
				label{
					color: #000000;
				}
			}
		}
		.page_view {
			position: absolute;
			top: 20px;
			right: 20px;
		}
	}
	.pages {
		padding: 30px 0;
	}
}
</style>