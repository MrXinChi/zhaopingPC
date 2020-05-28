<template>
	<div class="activity_container w_1200">
		<nav>
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for="(item,i) in bannerArray" :key="i">
					<img :src="item.pic_url_name+'!auto'" />
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</nav>

		<main>
			<div class="activity_list">
				<div class="activity_item" v-for="(item,i) in listArray" :key="i" @click="handleToDetail(i)">
					<div v-if="item.status==1" class="sign_in not_started">{{item.status_name}}</div>
					<div v-if="item.status==2" class="sign_in ongoing">{{item.status_name}}</div>
					<div v-if="item.status==3" class="sign_in over">{{item.status_name}}</div>

					<img :src="item.qrcode_id_src + '!100x100'" />
					<div class="content">
						<div class="top">
							<div class="time">{{timestampToTime(item.addtime)}}</div>
							<v-page-view :count="item.viewcount"></v-page-view>
						</div>
						<div class="title">{{item.title}}</div>
						<div class="start_time">开始时间：<font :class="timesStatus(item.start_time)?'label_time_new':'label_time_old'">{{timestampToTime(item.start_time)}}</font></div>
						<div class="number_of_people">已报名：{{item.enrollnum}}人</div>
					</div>
				</div>
			</div>
		</main>

		<div class="pages flex flex_x_center">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			swiperOption: {
				loop: true,
				autoPlay: true,
				pagination: {
				el: '.swiper-pagination'
				}
			},
			bannerArray: [],
			listArray: [],
			page: '',
			reversedMessage: ''
		}
  },
  methods: {
		async jobfairGetlist(index) {
			let Culum = await this.service.activity.activityenroll({
				page: index, //页码
				size: '8' //每页显示
			})
			this.page = Culum.data.page;
			this.listArray = Culum.data.list;
			console.log(Culum);
			this.reversedMessage = Culum.data.allpage * 10;
		},
		handleCurrentChange(index) {
			this.jobfairGetlist(index)
		},
		handleToDetail(index) {
			var id = this.listArray[index].id
			this.$router.push(`/activity/${id}`)
		},
		async schooladGetlist() {
			//活动轮播图
			let Culum = await this.service.home.schooladGetlist({
				cate_id: 1
			})
			this.bannerArray = Culum.data.list
		}
  	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper
		},
		reversedMessage: function() {
			return this.page * 10
		}
	},
	created() {
		this.schooladGetlist()
		this.jobfairGetlist(1)
	}
}
</script>

<style lang="scss" scoped>
.activity_container {
	nav {
		width: 1180px;
		height: 400px;
		.swiper-container {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		/deep/ .swiper-pagination-bullet {
			margin: 0px 10px;
			width: 40px;
			height: 4px;
			border-radius: 1px;
			background: rgba(255, 255, 255, 0.45);
		}
		/deep/ .swiper-pagination-bullet-active {
			background: #ffffff;
		}
	}
	main {
		margin-top: 20px;
		.activity_list {
			@include flex(flex, flex-start, flex-start, 0, wrap);
			.activity_item {
				cursor: pointer;
				&:nth-child(4n) {
					margin-right: 0;
				}
				position: relative;
				margin: 0 20px 32px 0;
				padding: 10px;
				height: 328px;
				width: 260px;
				// background-color: #ffffff;
				border-radius: 4px;
				.sign_in {
					position: absolute;
					top: 20px;
					right: 10px;
					padding: 0 7px 0 23px;
					height: 30px;
					line-height: 30px;
					background-color: rgba(242, 242, 242, 0.81);
					border-radius: 15px 0px 0px 15px;
					&.not_started {
						background-color: #55dec4;
					}
					&.ongoing {
						background-color: #5286ff;
					}
					&.over {
						@include word(14, #333333);
					}
				}
				img {
					width: 260px;
					height: 157px;
				}
				.content {
						padding: 12px;
					.top {
						@include flex(row, space-between, center);
						@include word(12, #8c8c8c);
					}
					.title {
						@include word(16, #333333, bold, justify);
						@include text-overflow(2);
						line-height: 22px;
						margin-top: 10px;
						// min-height: 44px;
					}
					.start_time {
						@include word(14, #595959);
						//   position: relative; 
						// top:10px; 
						margin-top: 12px;
						&.active {
						@include word(14, #f64343);
						}
						.label_time_new{
							color:#F64343;
						}
						.label_time_old{
							color:#8c8c8c;
						}
					}
					.number_of_people {
						@include word(14, #595959);
						margin-top: 10px;
					}
				}
			}
			.activity_item:hover{
				background:rgba(255,255,255,1);
				border-radius:4px;
			}
		}
	}
}
.pages {
  	padding: 30px 0;
}
</style>