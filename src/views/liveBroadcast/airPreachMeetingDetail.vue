<template>
  <div class="container_">
		<v-contentkzzb>
			<div slot="content" class="wrapper">
				<div class="wrapper_header" v-if="show">
				<!-- <img src="http://iph.href.lu/260x160" /> -->
				<!-- <img :src="dataInfo.school_id_logo + '!100x100'" /> -->
				<div class="detail">
					<div class="title flex flex_y_center">{{dataInfo.title}}
						<div v-if="dataInfo.publish_status==2" class="status over">已取消</div>
						<div v-if="dataInfo.publish_status==1" class="status ongoing">进行中</div>
						<div v-if="dataInfo.publish_status==2" class="status not_started">未开始</div>
						<div v-if="dataInfo.publish_status==3" class="status over">已结束</div>
					</div>
					<div class="package">

						<div class="textLabel">
							<h1><img src="@/assets/images/school.png"/>{{dataInfo.com_id_name}}</h1>
							<h1><img src="@/assets/images/Group-.png"/>{{dataInfo.hold_date}}{{dataInfo.hold_starttime}}-{{dataInfo.hold_endtime}}</h1>
						</div>

						<div class="textLabel">
							<h1><img src="@/assets/images/gongsi.png"/>{{dataInfo.school_id_name}}</h1>
							<h1 v-if="dataInfo.address==''"><img src="@/assets/images/icon-.png" style="width:9px;"/>暂无数据</h1>
							<h1 v-else><img src="@/assets/images/icon-.png" style="width:9px;"/>{{dataInfo.address}}</h1>
						</div>

						<div class="textLabel"> 
							<h1><img src="@/assets/images/touxiang.png"/>{{dataInfo.contacts}}</h1>
						</div>
						<img class="imgstyle" :src="dataInfo.com_id_logosrc + '!100x100'" />
					</div>
					<button>进入空宣</button>
				</div>
		

				</div>
				<div class="meeting_detail">
					<div class="tab"> 
						<ul class="flex">
							<li v-if="shop" @click="listBtn"  :class="[num==1?'active':'']">空宣简介</li>
							<li v-if="shop" @click="listBtn1" :class="[num==2?'active':'']">在招职位</li>
							<li v-if="shop" @click="listBtn2" :class="[num==3?'active':'']">宣传海报</li>
							<li v-if="shop" @click="listBtn3" :class="[num==4?'active':'']">宣讲PDF</li>
						</ul>
					</div>
				</div>
				<router-view class="contentText"></router-view>
				<div v-if="num==2" class="partitions"></div>
				<div v-else class="partition"></div>
			</div>
		</v-contentkzzb>
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
		show:true,//头部职位信息
		shop:true,//内容中导航标签
		num:1
		};
	},
	methods: {
		async jobfairDetail(id) {
			let preachData = await this.service.preach.detail({
				id: id
			});
			this.dataInfo = preachData.data;
			this.listBtn();
		},
		listBtn(){
			this.num = 1;
			this.show = true;
			this.$router.push(`/airPreachMeeting/${this.id}/mettingNotice`);
		},
		listBtn1(){
			this.num = 2;
			this.show = true;
			this.shop = true;
			this.$router.push(`/airPreachMeeting/${this.id}/mettingPosition`);
		},
		listBtn2(){
			this.num = 3;
			this.show = true;
			this.shop = true;
			this.$router.push(`/airPreachMeeting/${this.id}/mettingPosters`);
		},
		listBtn3(){
			this.num = 4;
			this.show = true;
			this.shop = true;
			this.$router.push(`/airPreachMeeting/${this.id}/mettingPreach`);
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
		.wrapper_header {
			@include flex();
			padding: 20px;
			padding-top:40px;
			background-color: #ffffff;
			img {
				width: 260px;
				height: 160px;
			}
			.detail {
				width: 100%;
				margin-left: 20px;
				.title {
					@include word(16, #333333, bold);
					.status{
						@include word(14,#FFFFFF, 400, center);
						margin-left: 20px;
						@include flex(row,center,center);
						width:58px;
						height:24px;
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
				.package {
					margin-top: 8px;
					@include flex(row);
					.textLabel {
						width:240px;
						h1 {
							@include word(14, #595959);
							margin-top: 12px;
							img{
								margin-right:8px;
								width:12px;
								height:12px;
							}
						}
					}
					.imgstyle{
						margin:-32px 0px 0 312px;
						width:93px;
						height:96px;
					}
				}
				button{
					margin-top:15px;
					width:104px;
					height:34px;
					background:rgba(82,134,255,1); 
					border-radius:4px;
					
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					// line-height:18px;
					color:rgba(255,255,255,1);
					opacity:1;
				}
			}
		}
		.meeting_detail {
			margin-top: 20px;
			background-color: #ffffff; 
			label{
				margin-left:20px;
				font-size:16px;
				font-family:Microsoft YaHei UI;
				font-weight:bold;
				line-height:20px;
				color:rgba(38,38,38,1);
				opacity:1;
			}
			.tab {
				border-bottom: 1px solid #dedede;
				ul{
					li {
						@include word(16, #8c8c8c);
						margin-left: 20px;
						padding: 0 24px;
						height: 55px;
						line-height: 55px;
						border-bottom: 1px solid #ffffff;
						&.active {
							@include word(16, #5286ff);
							border-bottom: 1px solid #5286ff;
						}
					}
				}
			}
		}
	}
	.contentText{
		height: 455px;
	}
	.partition{
		margin-top: 20px;
	}
	.partitions{
		margin-top: 500px;
	}
}
</style>