<template>
	<div class="company_detail">
		<div class="select_wrapper">
			<el-form ref="form" :model="form" label-width="40px">
				<el-form-item label="职位">
					<el-input v-model="form.type" placeholder="请输入职位名称"></el-input>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="form.nature" placeholder="请选择职位类别  ">
						<el-option v-for="item in natureList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="地点">
					<div class="address_item flex flex_nowarp">
						<el-select v-model="province" placeholder="省">
							<el-option
								v-for="item in provinceList"
								:key="item.id"
								:label="item.region_name"
								:value="item.id">
							</el-option>
						</el-select>
						<el-select v-model="city" placeholder="市" 	:disabled="province!=''?false:true" >
							<el-option
								v-for="item in cityList"
								:key="item.id"
								:label="item.region_name"
								:value="item.id" 
								>
							</el-option>
						</el-select>
					</div>
				</el-form-item>
				<el-form-item label="期望薪资" label-width="73px">
					<el-select v-model="form.industry" placeholder="请选择期望薪资 ">
						<el-option v-for="item in industryList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<div class="button_list flex flex_nowarp">
						<button class="search" @click="handleSearch">搜索</button>
						<button class="reset" @click="handleReset">重置</button>
					</div>
				</el-form-item>
			</el-form>
		</div>

		<div class="list_bottom_footer flex">
			<div class="list_bottom_footers" v-for="(i,index) in 8" :key="index">
				<div class="label_left">
					<h1>PHP开发工程师</h1>
					<p>北京滋星科技有限公司</p>
					<p>招聘人数：56</p>
					<p>展位号：A3</p>
				</div>
				<div class="label_right">
					<button class="details" @click="handleSearch">查看详情</button>
				</div>
			</div>
		</div>

		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="100" 
				layout="prev, pager, next, sizes, jumper"
				:total="400">
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
			currentPage4: 4,
			addressList:[],//全部省市列表
			provinceList:[],//省列表渲染
			cityList:[],//市列表渲染
			province:''
		};
	},
	watch:{
		province(){
			this.city='';
			this.cityList=[];
			for(let i in this.addressList){
				if(this.addressList[i].parent_id==this.province){
					this.cityList.push(this.addressList[i]);
				}
			}
		}
	},
	created() {
		this.form.id = this.$route.params.id;
		this.getIndustry();
		this.getType();
		this.getNature();
		this.getCompanyList(1);
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10;
		}
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
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
			let result = await this.service.common.getCategory(
			{ 
				type: "qucate" 
			});
			// this.industryList = result.data.hangye.list;
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
				size: "10" //每页显示
			});
			this.companyList = result.data.list;
		}
	}
};
</script>

<style lang="scss" scoped>
.company_detail {
	.select_wrapper {
		padding: 20px 20px 0 0px;
		background-color: #ffffff;
		.el-form {
			@include flex(row, space-between);
			.el-form-item {
				margin-left: 20px;
				.address_item{
					/deep/ .el-input__inner{
						margin-left:10px;
						width:80px;
						height: 34px;
					}
				}
				// width: 192px;
				/deep/ .el-form-item__label {
					@include word(14, rgba(38,38,38,1), 400);
					font-family:MicrosoftYaHeiUI;
					padding: 0;
				}
				/deep/ .el-input__inner{
					width:180px;
					height:34px;
					background:rgba(255,255,255,1);
					border:1px solid rgba(235,235,235,1);
					opacity:1;
					border-radius:4px;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					color:rgba(204,204,204,1);
				}
				.button_list {
					position:relative;
					left:-33%;
					margin-top:3px;
					button {
						width: 68px;
						height: 34px;
						border-radius: 4px;
						margin-left: 10px;
						cursor: pointer;
						&.search {
							@include word(14, #ffffff, 400, center);
							background-color: #5286ff;
							border: 1px solid #5286ff;
							font-size:14px;
							font-family:MicrosoftYaHeiUI;
							line-height:18px;
							color:rgba(255,255,255,1);
							opacity:1;
						}
						&.reset {
							@include word(14, #595959, 400, center);
							background-color: #ffffff;
							border: 1px solid #dedede;
				
							font-size:14px;
							font-family:MicrosoftYaHeiUI;
							line-height:18px;
							color:rgba(89,89,89,1);
							opacity:1;
						}
					}
				}
				/deep/ .el-input__inner{
				color: #666666;
				}
			}
		}
	}
	.list_bottom_footer{
		@include flex(row,space-between);
		background:rgba(249,249,249,1);
		width:100%;
		flex-wrap: wrap;
		.list_bottom_footers{
			margin-top:20px;
			background:#FFFFFF;
			width:280px;
			height:140px;
			@include flex(row);
			.label_left{
				margin: 20px 12px 20px 20px;
				width: 150px;
				height: 100px;
				h1{
					font-size:14px;
					font-family:Microsoft YaHei UI;
					font-weight:bold;
					line-height:18px;
					color:rgba(38,38,38,1);
					opacity:1;
					margin-bottom:12px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space:nowrap;//不许换行
				}
				p{
					margin-top:8px;
					font-size:14px;
					font-family:Microsoft YaHei UI;
					font-weight:400;
					line-height:18px;
					color:rgba(89,89,89,1);
					opacity:1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space:nowrap;//不许换行
				}
			}
			.label_right{
				display: none;
				margin-top: 94px;
				.details{
					width:78px;
					height:26px;
					background:rgba(82,134,255,1);
					border-radius:4px;
					font-size:12px;
					font-family:Microsoft YaHei UI;
					font-weight:400;
					line-height:18px;
					color:rgba(255,255,255,1);
					opacity:1;
					cursor: pointer;
				}
			}
		}
		.list_bottom_footers:hover{
			width:280px;
			height:140px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 16px rgba(0,0,0,0.08);
			opacity:1;
			border-radius:4px;
			.label_right{
				display:inline-block;
			}
		}
	}
	.block{
		background: #F9F9F9;
		padding-top:20px;
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
		height: 16px;;
		background-color:#F9F9F9;
	}
}
</style>