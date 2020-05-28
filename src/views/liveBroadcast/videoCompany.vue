<template>
	<div class="company_detail">
		<div class="select_wrapper">
			<el-form ref="form" :model="form" label-width="40px">
				<el-form-item label="规模">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option v-for="item in typeList" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性质">
					<el-select v-model="form.nature" placeholder="请选择">
						<el-option v-for="item in natureList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="行业">
					<el-select v-model="form.industry" placeholder="请选择">
						<el-option v-for="item in industryList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			
				<el-form-item>
					<div class="button_list">
						<button class="search" @click="handleSearch">搜索</button>
						<button class="reset" @click="handleReset">重置</button>
					</div>
				</el-form-item>
			</el-form>
		</div>

		<div class="list_bottom_footer flex">
			<div class="list_bottom_footers" v-for="(item,index) in companyList" :key="index" @click="subimtBtn(item.id)">
				<div class="flex top">
					<span >{{item.area}}区{{item.position}}号</span>
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
						<div class="separated"></div>
						<li class="flex flex_x_center">
							<div>需求人数：</div>
							<div>{{item.check_zhiwei_person}}</div>
						</li>
					</ol>
				</div>
			</div>
		</div>

		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="[8, 16, 32, 64]"
				:page-size="100" 
				layout="prev, pager, next, sizes, jumper"
				:total="totalAll">
			</el-pagination>
		</div>
		<!-- 底部分隔线 -->
		<div class="partition"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				id: "", // 双选会id
				companyName: "", // 用人单位
				industry: "", // 行业
				type: "", // 类别
				nature: "" //性质
			},
			companyList: [], // 企业列表
			industryList: [], // 行业
			typeList: [], // 类别
			natureList: [], // 性质
			page: "", // 页数
			currentPage4: 1,
			totalAll:0,
			showList:'8'
		};
	},
	created() {
		this.form.id = this.$route.params.id;
		this.getIndustry();
		this.getType();
		this.getNature();
		this.getCompanyList(1);
	},
	computed: {
		totalAll: function() {
			return this.page * 10;
		}
	},
	methods: {
		handleSizeChange(val) {
			this.showList=val;
			this.getCompanyList(1);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//企业详情跳转
		subimtBtn(id){
			this.$router.push(`/recruitmentInformation/unit/${id}`);
		},
		// 搜索
		handleSearch() {
			this.getCompanyList(1);
		},
		// 重置
		handleReset() {
			this.form.companyName = "";
			this.form.industry = "";
			this.form.type = "";
			this.form.nature = "";
			this.getCompanyList(1);
		},
		// 页码改变
		handleCurrentChange(index) {
			this.getCompanyList(index);
		},
		// 行业
		async getIndustry() {
			let result = await this.service.common.getCategory({ 
				type: "hangye" 
			});
			if(result.code==0){
			this.industryList = result.data.hangye.list;

			}
		},
		// 类别
		async getType() {
			let result = await this.service.doubleElection.jobfairCategory({
				fair_id: this.form.id
			});
			this.typeList = result.data;
		},
		// 性质
		async getNature() {
			let result = await this.service.common.getCategory({
				type: "qyxingzhi "
			});
			this.natureList = result.data.qyxingzhi.list;
		},
		// 获取企业列表
		async getCompanyList(index) {
			let {
				id, 
				companyName,
				industry,
				type, 
				nature 
			} = this.form;
			let result = await this.service.doubleElection.jobfairCompany({
				id: id,
				keywords: companyName,
				hangye_id: industry,
				xingzhi_id: nature,
				category_id: type,

				page: index, //页码
				size: this.showList //每页显示
			});
			this.companyList = result.data.list;
			this.totalAll=result.data.count;
		}
	}
};
</script>

<style lang="scss" scoped>
.company_detail {
	.select_wrapper {
		padding: 20px 20px 0 20px;
		background-color: #ffffff;
		.el-form {
			@include flex(row, space-between);
			.el-form-item {
				// width: 192px;
				/deep/ .el-form-item__label {
					@include word(14, rgba(38,38,38,1), 400);
					font-family:MicrosoftYaHeiUI;
					padding: 0;
				}
				.button_list {
					position:relative;
					left:-30%;
					button {
						margin-left: 16px;
						width: 68px;
						height: 34px;
						border-radius: 4px;
						cursor: pointer;
						&.search {
							@include word(14, #ffffff, 400, center);
							background-color: #5286ff;
							border: 1px solid #5286ff;
						}
						&.reset {
							@include word(14, #595959, 400, center);
							background-color: #ffffff;
							border: 1px solid #dedede;
						}
					}
				}
			}
		}
	}
	.company_list {
		@include flex(row, flex-start, flex-start, initial, wrap);
		background-color: #f9f9f9;
		.company_item {
			@include flex(column, flex-start, center);
			margin: 20px 24px 0 0;
			width: 180px;
			background-color: #ffffff;
			box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
			border-radius: 4px;
			&:nth-child(6n) {
				margin-right: 0;
			}
			img {
				margin-top: 12px;
				width: 88px;
				height: 88px;
			}
			.title {
				@include word(12, #595959);
				@include text-overflow(1, 150px);
				margin-top: 4px;
			}
			.address {
				@include word(14, #595959);
				margin-top: 12px;
				padding: 8px 0;
				width: 100%;
				border-top: 1px solid #f2f2f2;
				text-align: center;
			}
		}
	}
	.list_bottom_footer{
		background:rgba(249,249,249,1);
		// width:100%;
		flex-wrap: wrap;
		padding:0 10px;
		@include flex(row,space-between);
		.list_bottom_footers{
			margin-top:20px;
			background:#FFFFFF;
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
					.separated{
						margin-top:19px;
						width:1px;
						height:12px;
						background:rgba(222,222,222,1);
						opacity:1;
					}
					li{
						width:50%;
						line-height:50px;
						// text-align:center;
						color:#8C8C8C;
						div:nth-of-type(2){
							color:#2A71FF;
						}
					}
				}
			}
		}
	}
	.block{
		padding-top:20px;
		background: #F9F9F9;
		/deep/ .el-pagination{
			@include flex(row,flex-end);
			button{
				background: #F9F9F9;
				padding: 0 !important;
				min-width:24px;
				height:24px;
				border:1px solid rgba(222,222,222,1);
				opacity:1;
				border-radius:4px;
			}
			button:hover{
				border:1px solid rgba(42,113,255,1);
			}
			.el-icon {
				display: block;
				font-size: 11px;
				font-weight: 400;
			}
			.el-pager {
				width: 284px;
				@include flex(row, space-evenly,nowrap);
				li{
					background: #F9F9F9;
					min-width:24px;
					height:24px;
					font-family:MicrosoftYaHeiUI;
					font-size:14px;
					line-height:23px;
					font-weight: 500;
					color:rgba(140,140,140,1);
					border:1px solid rgba(222,222,222,1);
					opacity:1;
					border-radius:4px;
				}
				li.el-icon{
					border: 0px;
				}
				li:hover{
					border:1px solid rgba(42,113,255,1);
					color: rgba(42,113,255,1);
				}
				li.active{
					border:1px solid rgba(42,113,255,1);
					color: rgba(42,113,255,1);
				}
			}
			.el-pagination__sizes{
				margin-left: 5px;
				line-height: 0;
				.el-select .el-input .el-input__inner{
					background: #F9F9F9;
					height:24px;
					border:1px solid rgba(222,222,222,1);
					opacity:1;
					border-radius:4px;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					color:rgba(140,140,140,1);
					opacity:1;
				}
				.el-select .el-input .el-input__inner:hover{
					border:1px solid rgba(42,113,255,1);
					color: rgba(42,113,255,1);
				}
			}
			.el-pagination__jump{
				margin:0;
				margin-right: 20px;
				font-size:14px;
				font-family:MicrosoftYaHeiUI;
				line-height:18px;
				color:rgba(140,140,140,1);
				opacity:1;
				.el-input__inner{
					background: #F9F9F9;
					width:28px;
					height:24px;
					border:1px solid rgba(222,222,222,1);
					opacity:1;
					border-radius:4px;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					color:rgba(140,140,140,1);
				}
				.el-input__inner:hover{
					border:1px solid rgba(42,113,255,1);
					color: rgba(42,113,255,1);
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