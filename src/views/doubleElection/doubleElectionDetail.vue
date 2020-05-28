<template>
	<div class="container_">
		<v-content >
			<div slot="content" class="wrapper">
				<div class="wrapper_header" v-if="show">
					<!-- <img src="http://iph.href.lu/260x160" /> -->
					<img :src="dataInfo.school_id_logo + '!100x100'" />
					<div class="detail">
						<div class="title_css">
							<div class="title">{{dataInfo.title}}</div>
							<div class="time">
								报名结束时间：
								<span>{{timestampToTime(dataInfo.end_time)}}</span>
							</div>
						</div>

						
						<div class="count_lsit">
							<div class="count_item">
								<img src="@/assets/images/companys.png" class="icon">
								<!-- <v-icon icon-class="icon-company-1" class-name="icon"></v-icon> -->
								<h1>
									<span>{{dataInfo.recruit_count}}</span>单位
								</h1>
							</div>
							<div class="count_item">
								<img src="@/assets/images/jobs.png" class="icon">
								<!-- <v-icon icon-class="icon-job" class-name="icon"></v-icon> -->
								<h1>
									<span>{{dataInfo.job_count}}</span>职位
								</h1>
							</div>
							<div class="count_item">
								<img src="@/assets/images/peoples.png" class="icon">
								<!-- <v-icon icon-class="icon-people-1" class-name="icon"></v-icon> -->
								<h1>
									<span>{{dataInfo.enroll_count}}</span>人
								</h1>
							</div>
							<!-- <div class="time">
								报名结束时间：
								<span>{{timestampToTime(dataInfo.end_time)}}</span>
							</div> -->
						</div>
						<div class="package">
							<div>
								<h1>举办单位： {{dataInfo.school_id_name}}</h1>
								<h1>举办地点： {{dataInfo.field_id_name}}</h1>
								<h1>举办时间：{{timestampToTime(dataInfo.start_time)}}至 {{timestampToTime(dataInfo.end_time)}}</h1>
							</div>
							<div class="right_btn">
								<button @click="toSubmit(dataInfo.id)">单位参会报名</button>
								<button  @click="handleToTotal">进入会场</button>
							</div>
						</div>
					</div>
				</div>
				<div class="meeting_detail">
					<!-- <div class="tab"> -->
					<label>邀请通知</label>
					<!-- <ul class="flex">
					<li v-if="shop" @click="listBtn"  :class="[num==1?'active':'']">邀请通知</li>
					<li v-if="shop" @click="listBtn2" :class="[num==3?'active':'']">双选会统计</li>
					<li v-if="shop" @click="listBtn1" :class="[num==2 ?'active':'']">参会用人单位</li>
					<li v-for="(i,index) in datalist" :key="index" @click="listBtn3(i.id)" :class="[num==i.id ? 'active':'']">
						<div v-if="!shop">{{i.title}}</div>
					</li>
					</ul> -->
					<!-- </div> -->
					<p v-html="dataInfo.remarks"></p>
				</div>
			
				<!-- <router-view class="contentText"></router-view> -->
			</div>
		</v-content>
		<!-- 底部分隔线 -->
		<div class="partition"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: "",
			dataInfo: {},
			datalist:[
				{title:"查看展区",id:4},
				{title:"查看职位",id:5},
			],
			show:true,
			shop:true,
			shops:false,
			num:0
		};
	},
	methods: {
		toSubmit(id){//参会跳转
			window.location.href="http://e.jiuyeb.net/?action=jobfair&id="+id;
		},
		handleToTotal(){//统计页面
			this.$router.push(`/doubleElection/doubleTotal/${this.id}`);
		},
		async jobfairDetail(id) {
			let Culum = await this.service.doubleElection.jobfairDetail({
				id: id
			});
			this.dataInfo = Culum.data;
		},
		listBtn(){
			this.num = 1
			this.show = true
			this.$router.push(`/doubleElection/${this.id}/notice`)
		},
		listBtn1(){
			this.num = 2
			this.show = false
			this.shop = false
			// this.shops = true
			this.$router.push(`/doubleElection/${this.id}/company`)
		},
		listBtn2(){
			this.num = 3
			this.show = false
			this.$router.push(`/doubleElection/${this.id}/statistics`)
		},
		listBtn3(id){
			this.num = id
			// this.$router.push(`/doubleElection/${this.id}/statistics`)
		},
	},
	created() {
		let id = this.$route.params.id;
		this.id = id;
		this.jobfairDetail(id);
	}
};
</script>

<style lang="scss" scoped>
.container_ {
	.wrapper {
		// height: 840px;;
		.wrapper_header {
			@include flex();
			padding: 20px;
			background-color: #ffffff;
			img {
				width: 260px;
				height: 160px;
			}
			.detail {
				width: 100%;
				margin-left: 20px;
				.title_css{
					@include flex(row);
					.title {
						@include word(16, #333333, bold);
					}
					.time {
						@include word(14, #333333);
						margin-left: auto;
						span {
							@include word(14, #c2303a);
						}
					}
				}
		
				.count_lsit {
					@include flex();
					margin-top: 20px;
					.count_item {
						@include flex(row, flex-start, center);
						margin-right: 30px;
						&:nth-child(3) {
							margin-right: 0;
						}
						.icon {
							width: 20px;
							height: 20px;
						}
						h1 {
							@include word(14, #333333);
							margin-left: 8px;
							span {
								@include word(14, #3a71fb);
							}
						}
					}
				}
				.package {
					margin-top: 8px;
					@include flex(row, space-between);
					div {
						h1 {
							@include word(14, #595959);
							margin-top: 12px;
						}
					}
					.right_btn{
						button {
							margin-left: 24px;
							padding:0 24px;
							@include word(14, #ffffff,400, center);
							height:36px;
							background:rgba(82,134,255,1);
							opacity:1;
							border-radius:4px;
							cursor: pointer;
							font-family:MicrosoftYaHeiUI;
							line-height:18px;
							opacity:1;
						}
					}
				}
			}
		}
		.meeting_detail {
			margin-top: 20px;
			background-color: #ffffff;
			padding-top:20px;
			label{
				margin-left:20px;
				font-size:16px;
				font-family:Microsoft YaHei UI;
				font-weight:bold;
				line-height:20px;
				color:rgba(38,38,38,1);
				opacity:1;
			}

			p{
				min-height:600px;
				margin:20px 20px 0 20px;
				/deep/ p{
						text-indent:0 !important;
					/deep/ img{
						width: 100%;
					}
				}
			}
		// .tab {
		//   border-bottom: 1px solid #dedede;
		//   ul{
		//     li {
		//       @include word(16, #8c8c8c);
		//       margin-left: 20px;
		//       padding: 0 24px;
		//       height: 55px;
		//       line-height: 55px;
		//       border-bottom: 1px solid #ffffff;
		//       &.active {
		//         @include word(16, #5286ff);
		//         border-bottom: 1px solid #5286ff;
		//       }
		//     }
		//   }
			
		// }
		}
  	}
	.contentText{
		height: 523px;
	}
   .partition{
		height: 16px;;
		background-color:#F9F9F9;
	}
}
</style>