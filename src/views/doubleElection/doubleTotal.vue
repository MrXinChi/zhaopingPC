<template>
	<div class="cantainer">
		<nav class="w_1200 box1">
			<div id="box2">
				<img src="@/assets/images/doubleBanner.png" alt="暂无">
			</div>
			<div id="wenzi">2020届线下双选会</div>
			<div class="btn_wrapper">
				<div class="btn_item">
					<img src="@/assets/images/xingzhuang.png" alt="暂无">
					<div class="btn_item_right">
						<p class="btn_item_title">4096</p>
						<p class="btn_item_text">参会用人单位</p>
					</div>
				</div>
				<div class="btn_item">
					<img src="@/assets/images/zhiwei.png" alt="暂无">
					<div class="btn_item_right">
						<p class="btn_item_title">4096</p>
						<p class="btn_item_text">招聘职位</p>
					</div>  
				</div>
				<div class="btn_item">
					<img src="@/assets/images/group.png" alt="暂无">
					<div class="btn_item_right">
						<p class="btn_item_title">4096</p>
						<p class="btn_item_text">招聘人数</p>
					</div>
				</div>
			</div>
		</nav>

	
		<main class="w_1200">
	
			<div class="main_middle">

				<div class="main_recruit">
					<div class="recruit_wrapper">
						<div class="table_title">用人单位签到数<label>{{dataInfoList.signEnterpriseCount}}</label></div>
						<el-table class="tables" height="280" :data="signEnterpriseList" :row-style="{height:'56px'}" :header-cell-style="'background-color:#F4F7FA;height:56px;'">
							<el-table-column fixed prop="date" label="序号" width="90"></el-table-column>
							<el-table-column prop="com_id_info.name" label="用人单位名称" width="240"></el-table-column>
							<el-table-column prop="address" label="签到时间" width="240"></el-table-column>
						</el-table>
					</div>
				</div>


				<div class="main_recruit">
					<div class="recruit_wrapper">
						<div class="table_title">学生签到数<label>{{signUserList.count}}</label></div>
						<el-table class="tables" height="280" :data="signUserList.list" :row-style="{height:'56px'}" :header-cell-style="'background-color:#F4F7FA;height:56px;'">
							<el-table-column fixed prop="date" label="序号" width="90"></el-table-column>
							<el-table-column prop="userInfo.realname" label="学生姓名" width="120"></el-table-column>
							<el-table-column prop="userInfo.department_id_name" label="学院" width="180"></el-table-column>
							<el-table-column prop="addtime" label="签到时间" width="180"></el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<div class="main_middles">
				<div class="main_recruits">
					<div class="recruit_wrapper">
						<div class="table_title">投递简历<label>{{resumeUserList.count}}</label></div>
						<el-table class="tables" height="280" :data="resumeUserList.list" :row-style="{height:'56px'}" :header-cell-style="'background-color:#F4F7FA;height:56px;'">
							<el-table-column fixed prop="date" label="序号" width="90"></el-table-column>
							<el-table-column prop="realname" label="学生姓名" width="120"></el-table-column>
							<el-table-column prop="department_id_name" label="学院" width="180"></el-table-column>
							<el-table-column prop="addtime" label="投递时间" width="180"></el-table-column>
						</el-table>
					</div>
				</div>

				<div class="main_recruits">
					<div class="recruit_wrapper">
						<div class="table_title">
							邀约面试<label>{{resumeUserListYy.count}}</label>
						</div>
						<el-table class="tables" height="280" :data="resumeUserListYy.list" :row-style="{height:'56px'}" :header-cell-style="'background-color:#F4F7FA;height:56px;'">
							<el-table-column prop="date" label="序号" width="90" fixed></el-table-column>
							<el-table-column prop="department_id_name" label="用人单位名称" width="200"></el-table-column>
							<el-table-column prop="realname" label="学生姓名" width="120"></el-table-column>
							<el-table-column prop="addimte" label="邀约时间" width="160"></el-table-column>
						</el-table>
					</div>
				</div>

			</div>

			<div class="list_bottom">
				<div class="list_bottom_header">
					<div class="list_bottom_header_left">
						<h1>双选会展区</h1>
						<h2>{{companyList.count}}</h2>
					</div>
					<div class="list_bottom_header_right">
						<h3 @click="onDoubleCompanyTab">某某某某某某双选会<img src="@/assets/images/direction.png"/></h3>
					</div>
				</div>

				<div class="list_bottom_footer flex">
					<div class="list_bottom_footers" v-for="(item,index) in companyList.list" :key="index">
						
						<div class="flex top">
							<span>{{item.area}}区{{item.position}}号</span>
							<img :src="item.com_id_info.logo_src + '!auto'" class="img" />
						</div>

						<div class="center">
							{{item.com_id_info.name}}
						</div>
						<div class="separated"/>
						<div class="footer">
							<ol class="flex">
								<li class="flex flex_x_center">
									<div>岗位数：</div>
									<div>{{item.check_zhiwei_count}}</div>
								</li>
								<li class="flex">
									<div>需求人数：</div>
									<div>{{item.check_zhiwei_person}}</div>
								</li>
							</ol>
						</div>
					</div>


				</div>


			</div>


		</main>
		<!-- 底部分隔线 -->
		<div class="partition"></div>
	</div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
export default {
	components: {
		elTable: Table,
		elTableColumn: TableColumn
	},
	data() {
		return {
			dataInfoList:[],
			signEnterpriseList:[],
			signUserList:[],
			resumeUserList:[],
			resumeUserListYy:[],
			companyList:[],
		};
	},
	mounted() {},
	methods: {
		onDoubleCompanyTab(){
			this.$router.push('/doubleElection/companyTab');
		},
		async init(id){
			let params={
				id:id
			}
			let dataInfo=await this.service.doubleElection.jobfairOnline({id:id});
			if(dataInfo.code==0){
				this.dataInfoList=dataInfo.data;
				this.signEnterpriseList=dataInfo.data.signEnterpriseList;
				this.signUserList=dataInfo.data.signUserList;
				this.resumeUserList=dataInfo.data.resumeUserList;
				this.resumeUserListYy=dataInfo.data.resumeUserListYy;
			}
		},
		// 获取企业列表
		async getCompanyList(id) {
			let params={
				id:id,
				status:1,
				allotstatus:3,
				confirm_status:0,
			};
			let result = await this.service.doubleElection.jobfairCompany(params);
			if(result.code==0){
				this.companyList = result.data;
			}
		}
	},
	created() {
		// 获取各项表格数据
		this.init(this.$route.params.id);
		// 获取企业列表
		this.getCompanyList(this.$route.params.id);
	}
};
</script>

<style lang="scss" scoped>
.cantainer {
	nav {
		margin-top: 20px;
		height: 400px; 
		position:relative;
		.box2{
			position:relative;
			width:100%;
			height:100%;
		}
		#wenzi{
			position:relative;
			clear:both;
			width:100%;
			top:-50%;
			text-align:center;
			font-size:48px;
			font-family:Microsoft YaHei UI;
			font-weight:bold;
			line-height:61px;
			color:rgba(255,255,255,1);
			opacity:1;
		}
		.btn_wrapper {
			@include flex(row,space-evenly,center);
			position:relative;
			clear:both;
			width:100%;
			top:-30%;
			.btn_item {
				@include flex(row, center, center);
				width:346px;
				height:120px;
				background:rgba(255,255,255,1);
				box-shadow:0px 4px 16px rgba(0,0,0,0.04);
				opacity:1;
				border-radius:24px;
				cursor: pointer;
				z-index:1;
				img {
					width: 56px;
					height: 59px;
				}
				.btn_item_right{
					margin-left: 40px;
					.btn_item_title{
						width:54px;
						height:28px;
						font-size:22px;
						font-family:MicrosoftYaHeiUI-Bold;
						line-height:28px;
						color:rgba(38,38,38,1);
						opacity:1;
					}
					.btn_item_text{
						width:84px;
						height:18px;
						font-size:14px;
						font-family:MicrosoftYaHeiUI;
						line-height:18px;
						color:rgba(89,89,89,1);
						opacity:1;
					}
				}
			}
		}
	}

	main {
		.main_middle {
			@include flex(row, space-between);
			background-color: #FFFFFF;
			padding:0 20px;
			padding-top:40px;
			.main_recruit {
				width: 570px;
				.recruit_wrapper{
					margin-top:-40px;
					height: 341px;
					z-index:999;
					padding-top:90px;
					.table_title{
						font-size:16px;
						font-family:Microsoft YaHei UI;
						font-weight:bold;
						line-height:20px;
						color:rgba(38,38,38,1);
						opacity:1;
						label{ 
							font-size:16px;
							font-family:MicrosoftYaHeiUI;
							line-height:20px;
							color:rgba(42,113,255,1);
							opacity:1;
						}
					}
					.tables{
						margin-top:12px;
						width: 100%;
					}
				}
			}
		}
		.main_middles {
			@include flex(row, space-between);
			background-color: #FFFFFF;
			padding:0 20px;
			.main_recruits {
				width: 570px;
				.recruit_wrapper{
					height: 341px;
					z-index:999;
					.table_title{
						font-size:16px;
						font-family:Microsoft YaHei UI;
						font-weight:bold;
						line-height:20px;
						color:rgba(38,38,38,1);
						opacity:1;
						label{ 
							font-size:16px;
							font-family:MicrosoftYaHeiUI;
							line-height:20px;
							color:rgba(42,113,255,1);
							opacity:1;
						}
					}
					.tables{
						margin-top:12px;
						width: 100%;
					}
				}
			}
		}
		.list_bottom{
			margin-top:20px;
			width:1200px;
			background:#ffffff;
			.list_bottom_header{
				height:55px;
				width:100%;
				border-bottom:1px solid #DEDEDE;
				@include flex(row,space-between);
				.list_bottom_header_left{
					@include flex(row);
					h1{
						font-size:16px;
						font-weight:bold;
						line-height:55px;
						color:rgba(38,38,38,1);
						opacity:1;
						padding-left:20px;
					}
					h2{
						padding-left:8px;
						font-size:16px;
						line-height:55px;
						color:rgba(42,113,255,1);
						opacity:1;
					}
				}
				.list_bottom_header_right{
					h3{
						font-size:16px;
						font-weight:bold;
						line-height:55px;
						color:rgba(42,113,255,1);
						opacity:1;
						padding-right:20px;
						cursor: pointer;
						img{
							margin-left: 8px;
							width: 6px;
							height: 10px;
						}
					}
				}
				
			}
			.list_bottom_footer{
				width:100%;
				flex-wrap: wrap;
				.list_bottom_footers{
					margin: 20px 0 20px 20px;
					background:#f4f7fa;
					width:275px;
					height:177px;
					.top{
						span{
							font-size:14px;
							line-height:18px;
							color:rgba(89,89,89,1);
							opacity:1;
							padding:16px 0 0 16px;
							width:95px;
							overflow: hidden;
							text-overflow :ellipsis;//多余省略号显示
							white-space:nowrap;//不许换行
						}
						.img{
							width:56px;
							height:56px;
							background:rgba(0,0,0,0);
							opacity:1;
							padding-top:24px;
						}
					}
					.center{
						overflow: hidden;
						text-overflow :ellipsis;//多余省略号显示
						white-space:nowrap;//不许换行
						font-size:12px;
						line-height:18px;
						color:rgba(89,89,89,1);
						opacity:1;
						text-indent: 10px;
						padding:12px 20px 12px 20px;
					}
					.separated{//分隔线
						width: 100%;
						height: 1px;
						background-image: linear-gradient(to right, #DEDEDE 0%, #DEDEDE 70%, transparent 50%);
						background-size: 12px 1px;
						background-repeat: repeat-x;
					}
					.footer{
						ol{
							height:50px;
							li{
								width:50%;
								line-height:50px;
								text-align:center;
								color:#8C8C8C;
								div:nth-of-type(2){
									color:#2A71FF;
								}
							}
						}
					}
				}
			}
		}
  	}
	.partition{
		height: 20px;;
		background-color:#F9F9F9;
	}
}
</style>