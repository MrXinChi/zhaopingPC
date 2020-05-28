<template>
	<div class="cantainer">
		<nav class="w_1200">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide class="flex_center" v-for="(i,index) in bannerArray" :key="index">
					<v-image :src="i.pic_url_name"></v-image>
				</swiper-slide>
				<div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div>
			</swiper>
		</nav>
		<div class="btn_wrapper w_1200">
			<button class="btn_item" @click="loginBtn(0)">
				<v-icon icon-class="icon_student" class-name="icon"></v-icon>
				<span>学生登录</span>
			</button>
			<button class="btn_item" @click="loginBtn(1)">
				<v-icon icon-class="icon_enterprise" class-name="icon"></v-icon>
				<span>企业登录</span>
			</button>
			<button class="btn_item" @click="loginBtn(2)">
				<v-icon icon-class="icon_teacher" class-name="icon"></v-icon>
				<span>教师登录</span>
			</button>
		</div>
		<main class="w_1200">
			<div class="main_top">
				<div class="main_notice">
					<v-title-wrapper title="新闻公告" column="1"></v-title-wrapper>
					<div class="notice_wrapper">
						<v-info-tab :tabList="newsTabList" @changeInfoTab="newsTab"></v-info-tab>
						<div class="separated"></div>
						<v-news-lists :newsList="newsList" :maxWidth="660" @handleToDetail="handleToDetail"></v-news-lists>
					</div>
				</div>
				<div class="main_calendar">
					<v-title-wrapper title="招聘日历" column="2"></v-title-wrapper>
					<div class="calendar_wrapper">
						<v-calendar></v-calendar>
					</div>
				</div>
			</div>
			<div class="main_middle">
				<div class="main_recruit">
					<v-title-wrapper title="招聘信息" column="3"></v-title-wrapper>
					<div class="recruit_wrapper">
						<v-info-tab :tabList="recruitTabList" @changeInfoTab="newsTabs"></v-info-tab>
						<div class="separated"></div>
						<div class="info_list">
							<div class="info_item">
								<v-news-list :newsList="recruitInfoList" :maxWidth="260" @handleToDetail="handleZhaoPing" ></v-news-list>
							</div>
							<div class="info_item">
								<v-news-list :newsList="recruitInfoList2" :maxWidth="260" @handleToDetail="handleZhaoPing" ></v-news-list>
							</div>
						</div>
					</div>
				</div>
				<div class="main_announcement">
					<v-title-wrapper title="校招公告" column="4"></v-title-wrapper>
					<div class="announcement_wrapper">
						<v-news-listSch :newsList="enrollmentList" :maxWidth="250" @handleToDetail="handleToDetail" ></v-news-listSch>
					</div>
				</div>
			</div>
			<div class="main_bottom">
				<div class="main_school_enrollment">
					<div class="school_enrollment_tab">
						<div :class="isClick?'tab_item active':'tab_item'" @click="onSubmit(0)">宣讲会</div>
						<div :class="!isClick?'tab_item active':'tab_item'" @click="onSubmit(1)">双选会</div>
						<div class="iconBox" @click="moreBtn">
							<v-icon icon-class="icon_arrow_double" class-name="icon"></v-icon>
							<v-icon icon-class="icon_arrow_double_active" class-name="icons"></v-icon>
						</div>
					</div>
							
					<div class="enterprise_list" v-if="isClick">
						<div class="enterprise_item" v-for="(item,i) in preachList" :key="i" @click="preachBtn(item.id)">
							<div class="item_left">
								<div class="title">{{item.title}}</div>
								<div class="time">{{item.hold_date}}</div>
								<div class="desc">{{item.address}}</div>
							</div>
							<img :src="item.com_id_logosrc+'!100x100'" />
						</div>
					</div>
					<div class="enterprise_list" v-if="!isClick">
						<div class="enterprise_item" v-for="(item,i) in doubleElectionList" :key="i" @click="doubleElectionBtn(item.id)">
							<div class="item_left">
								<div class="title">{{item.title}}</div>
								<div class="time">{{timestampToTime(item.addtime)}}</div>
								<div class="desc">{{item.field_id_name}}</div>
							</div>
							<img :src="item.school_id_logo+'!100x100'" />
						</div>
					</div>
				</div>
				<div class="main_express_lane">
					<v-title-wrapper title="快速通道" column="5"></v-title-wrapper>
					<div class="lane_list">
						<div class="lane_item">政策法规</div>
						<div class="lane_item">就业指导</div>
						<div class="lane_item">办事指南</div>
						<div class="lane_item">下载专区</div>
					</div>
				</div>
			</div>
		</main>
		<section>
			<div class="main_recommend w_1200">
				<div class="title">用人单位推荐</div>
				<div class="companyList">
					<router-link to="/" v-for="(s,item) in companyList" :key="item">
						<img :src="s.com_id_info.logo_src + '!auto'" />
					</router-link>
				</div>
			</div>
			<div class="main_friendship_link w_1200">
				<div class="title">友情链接</div>
				<div class="link_list">
					<div class="link_item" v-for="i in linkList" :key="i.id">
						<el-select v-model="i.children.title" :placeholder="i.cate_name" @change="handleToWebsite">
							<el-option v-for="item in i.children" :key="item.id" :label="item.title" :value="item.link" ></el-option>
						</el-select>
					</div>
				</div>
			</div>
		</section>
		<v-login ref="vlogin" :loginShop="loginShop" @removeBtn="removeBtn"></v-login>
	</div>
</template>

<script>
import vTitleWrapper from "./vTitleWrapper";
import vInfoTab from "./vInfoTab";
import vNewsList from "./vNewsList";
import vNewsLists from "./vNewsLists";
import vNewsListSch from "./vNewsListSch";
import vCalendar from "@/components/vCalendar";
export default {
	inject: ["headerIsShow"], //注入只有首页展示
	components: {
		vTitleWrapper,
		vInfoTab,
		vNewsList,
		vCalendar,
		vNewsLists,
		vNewsListSch
	},
	data() {
		return {
			bannerArray: [],
			loginShop: null, //开启登录页
			// swiper配置
			swiperOption: {
				loop: true,
				autoPlay: true,
				navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
				}
			},
			newsTabList: [],
			newsList: [],
			preachList: [],
			doubleElectionList: [],
			recruitTabList: [],
			recruitInfoList: [],
			recruitInfoList2: [],
			enrollmentList: [],
			linkList: [],
			companyList: [], // 用人单位推荐
			isClick:true,
		};
	},
	mounted() {},
	methods: {
		moreBtn(){
			if(this.isClick){
				this.$router.push('/preachMeeting');
			}else{
				this.$router.push('/doubleElection');
			}
		},
		onSubmit(index){
			if(index==0){
				this.isClick=true;
			}else{
				this.isClick=false;
			}
		},
		handleZhaoPing(id) {
			this.$router.push(`/recruitmentInformation/detail/${id}`);
		},

		handleToDetail(id) {
			this.$router.push(`/recruitmentInformation/notice/noticeDetail/${id}`);
		},

		newsTab(id, inx) {
			this.newsTabGetList(id);
		},
		newsTabs(id, inx) {
			this.jobGetList(inx + 1);
		},
		handleToWebsite(val) {
			window.open(val, "_blank");
		},
		preachBtn(id){
			this.$router.push(`/preachMeeting/${id}`)
		},
		doubleElectionBtn(id){
			this.$router.push(`/doubleElection/${id}`);
		},
		loginBtn(index) {
			this.loginShop = true;
			this.$nextTick(()=>{
				if(index==1){
					this.$refs.vlogin.numb=2;
				}else if(index==2){
					this.$refs.vlogin.registerShop = null;
					this.$refs.vlogin.numb=1;
				}else{
					this.$refs.vlogin.numb=index;
				}
				
			})
		},
		removeBtn() {
			//关闭登录遮罩
			this.loginShop = false;
		},
		async schooladGetlist() {
			let Culum = await this.service.home.schooladGetlist({
				cate_id: 1
			});
			// console.log(Culum.data.list)
			this.bannerArray = Culum.data.list;
		},
		async schooladcategoryGetlist() {
			let Array = await this.service.home.schooladcategoryGetlist();
			this.linkList = Array.data.list;
		},
		async enrollmentGetList() {
			let enrollmenData = await this.service.recruitment.getlist({
				page: 1, //页码
				size: "6" //每页显示
			});
			this.enrollmentList = enrollmenData.data.list;
		},
		async jobGetList(inx) {
			let jobData = await this.service.recruitment.joblist({
				jobtype: inx,
				page: 1, //页码
				size: "8" //每页显示
			});
			this.recruitInfoList = [];
			this.recruitInfoList2 = [];
			for (let i in jobData.data.list) {
				jobData.data.list[i].title = jobData.data.list[i].work_name;
				if (i < 5) {
					this.recruitInfoList.push(jobData.data.list[i]);
				} else {
					this.recruitInfoList2.push(jobData.data.list[i]);
				}
			}
		},
		async preachGetList() {
			let preachData = await this.service.preach.getlist({
				page: 1, //页码
				size: "2" //每页显示
			});
			this.preachList = preachData.data.list;
		},
		async doubleElectionGetList() {
			let doubleElectionData = await this.service.doubleElection.jobfairGetlist({
				page: 1, //页码
				size: "2" //每页显示
			});
			this.doubleElectionList = doubleElectionData.data.list;
		},

		async newsTabsList() {
			//需验证后修改
			let tabData = await this.service.home.ArticlecategoryGetlist({});
			for (let i in tabData.data.list) {
				if (i == 2 || i == 3 || i == 8) {
					this.newsTabList.push(tabData.data.list[i]);
				}
				if (i == 22 || i == 23) {
					this.recruitTabList.push(tabData.data.list[i]);
				}
			}
			this.newsTabGetList(this.newsTabList[0].id); //新闻通知栏目标题
		},

		async newsTabGetList(id) {
			let tabDataList = await this.service.home.ArticleGetlist({
				cate_id: id,
				cate_type: "zidingyi",
				type: 1
			});
			this.newsList = tabDataList.data.list;
		},
		async getRecommendedEnterprises() {
			let result = await this.service.home.getRecommendedEnterprises({
				page: 1,
				size: 5
			});
			this.companyList = result.data.list;
		}
	},
	created() {
		// localStorage.removeItem("username");
		this.headerIsShow();//头部标题图
		this.schooladGetlist(); //轮播图
		this.schooladcategoryGetlist();
		this.enrollmentGetList(); //校招公告
		this.jobGetList(1); //招聘信息
		this.preachGetList(); //宣讲会
		this.doubleElectionGetList(); //双选会
		this.newsTabsList(); //新闻通知栏目标题
		this.getRecommendedEnterprises(); // 用人单位推荐
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	}
};
</script>

<style lang="scss" scoped>
.cantainer {
	nav {
		margin-top: 20px;
		height: 400px;
		.swiper-container {
			height: 400px;
			border-radius: 8px;
			.swiper-button-prev {
				width: 22px;
				height: 38px;
				background-image: url(../../assets/images/icon_arrow_left.png);
			}
			.swiper-button-next {
				width: 22px;
				height: 38px;
				background-image: url(../../assets/images/icon_arrow_right.png);
			}
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.btn_wrapper {
		@include flex(row, space-between);
		margin-top: 20px;
		.btn_item {
			@include flex(row, center, center);
			width: 386px;
			height: 84px;
			border-radius: 4px;
			cursor: pointer;
			.icon {
				width: 40px;
				height: 40px;
			}
			span {
				@include word(16, #ffffff);
				margin-left: 15px;
			}
			&:nth-child(1) {
				background: #3bd5b3;
			}
			&:nth-child(2) {
				background: #ff9443;
			}
			&:nth-child(3) {
				background: #728af7;
			}
		}
	}
	main {
		margin-top: 40px;
		.main_top {
			@include flex(row, space-between);
			.main_notice {
				width: 793px;
				.notice_wrapper{
					background: #ffffff;
					overflow:hidden;
					.separated{
						height: 2px;
						background: #F9F9F9;
					}
				}
			}
			.main_calendar {
				width: 386px;
			}
		}
		.main_middle {
			@include flex(row, space-between);
			margin-top: 40px;
			.main_recruit {
				width: 793px;
				.recruit_wrapper{
					background-color:#FFFFFF;
					height: 252px;
					.separated{
						height: 2px;
						background: #F9F9F9;
					}
				}
				.info_list {
					height: 210px;
					@include flex();
					background:#FFFFFF;
					.info_item {
						width: 50%;
					}
				}
			}
			.main_announcement {
				overflow:hidden;
				width: 386px;
			}
		}
		.main_bottom {
			@include flex(row, space-between);
			margin-top: 40px;
			.main_school_enrollment {
				width: 793px;
				.school_enrollment_tab {
					@include flex(row, flex-start, center);
					width: 100%;
					border-bottom: 1px solid #dedede;
					margin-bottom: 24px;
					.tab_item {
						@include word(22, #8c8c8c, bold);
						position: relative;
						margin-right: 32px;
						padding-bottom: 5px;
						cursor: pointer;
						&.active {
							@include word(22, #262626, bold);
						}
						&.active::after {
							content: "";
							position: absolute;
							left: 0;
							bottom: -1px;
							z-index: -1;
							width: 100%;
							height: 8px;
							background: linear-gradient(270deg,rgba(82, 134, 255, 1) 0%,rgba(144, 177, 255, 1) 100%);
							border-radius: 2px;
						}
					}
					.iconBox{
						cursor: pointer;
						margin-left: -20px;
						.icon {
							
							width: 14px;
							height: 14px;
						}
						.icons {
							display:none;
							width: 14px;
							height: 14px;
						}
					}
					.iconBox:hover {
						.icon{
							display:none;
						}
						.icons {
							display:inline-block;
						}
					}
				}
				.enterprise_list {
					@include flex(row, space-between);
					.enterprise_item {
						@include flex(row, space-between);
						height: 140px;
						padding: 22px 20px 20px 20px;
						width: 386px;
						box-sizing: border-box;
						background-color: #ffffff;
						cursor: pointer;
						.item_left {
							width: 275px;
							.title {
								font-family:MicrosoftYaHeiUI;
								line-height:22px;
								opacity:1;
								@include word(14, rgba(38,38,38,1));
								@include text-overflow(2);
							}
							.time { 
								font-family:MicrosoftYaHeiUI;
								line-height:18px;
								opacity:1;
								@include word(14, rgba(89,89,89,1));
								margin-top: 12px;
							}
							.desc {
								font-family:MicrosoftYaHeiUI;
								line-height:18px;
								opacity:1;
								@include word(14, rgba(89,89,89,1));
								@include text-overflow(1);
								margin-top: 8px;
							}
						}
						img{
							width: 81px;
							height: 83px;
						}
					}
				}
			}
			.main_express_lane {
				width: 386px;
				.lane_list {
					@include flex(row, space-between, flex-start, 1, wrap);
					padding: 20px 20px 0;
					background-color: #ffffff;
					.lane_item {
						@include word(14, #5286ff);
						font-family:MicrosoftYaHeiUI;
						margin-bottom: 20px;
						width: 160px;
						height: 40px;
						line-height: 40px;
						text-align: center;
						background-color: #f9f9f9;
						border-radius: 2px;
						cursor: pointer;
					}
					.lane_item:hover{
						@include word(14,rgba(255,255,255,1));
						font-family:MicrosoftYaHeiUI;
						line-height: 40px;
						background:rgba(82,134,255,1);
						opacity:1;
						text-align: center;
						border-radius:2px;
					}
				}
			}
		}
	}
	section {
		margin-top: 40px;
		padding: 40px 0;
		background-color: #ffffff;
		.title {
			@include word(20, #262626, bold);
			position: relative;
			margin: 0 auto;
			width: 120px;
			text-align: center;
			&::before {
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				left: -164px;
				margin: auto 0;
				width: 140px;
				height: 1px;
				background-color: #dedede;
			}
			&::after {
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				right: -164px;
				margin: auto 0;
				width: 140px;
				height: 1px;
				background-color: #dedede;
			}
		}
		.main_recommend {
			.companyList {
				@include flex(row, flex-start, flex-start, 1, wrap);
				margin-top: 40px;
				a {
					margin: 0 25px 40px 0;
					width: 220px;
					height: 144px;
					display: block;
					&:nth-child(5n) {
						margin-right: 0;
					}
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.main_friendship_link {
			.link_list {
			@include flex(row, space-between);
				margin-top: 40px;
				.link_item {
					@include flex(row, center,center);
					width: 280px;
					.el-select {
						width: 100%;
						/deep/.el-input__inner {
							border:0;
							// width:360px;
							height:48px;
							background:rgba(249,249,249,1);
							border-radius:4px;
						}
					}
				}
			}
		}
	}
}
.el-image,
.image-slot {
	width: 100%;
	height: 100%;
	.el-icon-picture-outline {
		font-size: 100px;
	}
}
.image-slot {
	font-size: 30px;
}
</style>