<template>
	<div class="containers">
		<div class="search flex flex_y_center">
			<div class="flex flex_y_center">
				<div class="fs14 c_333 gjc">关键词</div>
				<div class="inputGjc">
					<el-input v-model="input" ></el-input>
				</div>
			</div>
			<div class="flex flex_y_center">
				<div class="fs14 c_333 lb">类别</div>
				<div class="inputLb">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
					</el-select>
				</div>
			</div>

			<div class="flex_y_center">
				<el-button class="searchBtn flex_center" @click="searchBtn">搜索</el-button>
			</div>
		</div>

		<v-journalism-list @detailsBtn="detailsBtn" :hostArray="hostArray"></v-journalism-list>
		
		<div class="pages flex flex_x_center">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	data() {
		return {
			hostArray: [
				// {
				// 	day: '23',
				// 	timt: '2019-9',
				// 	title: '关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',
				// 	cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
				// },
			],
			input: '',
			options: [],
			value: '',
			page: '',
			reversedMessage: ''
		}
	},
	methods: {
		searchBtn() {
			this.init(1)
		},
		detailsBtn(id) {
			this.$router.push(`/recruitmentInformation/notice/noticeDetail/${id}`)
		},
		handleCurrentChange(index) {
			this.init(index)
		},
		async init(index) {
			let noticeData = await this.service.recruitment.getlist({
				keywords: this.input,
				type: this.value,
				page: index, //页码
				size: 8 //每页显示
			});
			this.reversedMessage = noticeData.data.allpage * 10;
			this.page = noticeData.data.page;
			this.hostArray = noticeData.data.list;
		},
		async categoryGetLists() {
			let result = await this.service.common.getCategory({ 
				type: "zhiweilb" 
			});
			
			if(result.code==0){
				this.options = result.data.zhiweilb.list;
			}
		}
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10
		}
	},
	created() {
		this.init(1)
		this.categoryGetLists();
	}
}
</script>

<style scoped="scoped" lang="scss">
.search {
	width: 880px;
	height: 74px;
	background: rgba(255, 255, 255, 1);
	border-bottom: 20px solid #F9F9F9;
	.gjc {
		margin-left: 20px;
		margin-right: 8px; 
		font-size:14px;
		font-family:MicrosoftYaHeiUI;
		line-height:18px;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.inputGjc{
		/deep/ .el-input {
			/deep/.el-input__inner {
				width:186px;
				height:34px;
				background:rgba(255,255,255,1);
				border:1px solid rgba(235,235,235,1);
				opacity:1;
				border-radius:4px;
			}
		}
	}
	.lb {
		margin-left: 80px;
		margin-right: 8px;
		font-size:14px;
		font-family:MicrosoftYaHeiUI;
		line-height:18px;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.inputLb{
		/deep/ .el-input {
			/deep/.el-input__inner {
				line-height: 35px;
				width:186px;
				height:34px;
				background:rgba(255,255,255,1);
				border:1px solid rgba(235,235,235,1);
				opacity:1;
				border-radius:4px;
			}
			.el-select__caret {
				line-height: 35px;
			}
			.el-input__icon {
				line-height: 32px;
			}
		}
	}
	// /deep/ .el-button--primary {
	//   margin-left: 50px !important;
	// }
}
.searchBtn{
	margin-left: 40px;
	width:68px;
	height:34px;
	background:rgba(82,134,255,1);
	opacity:1;
	border-radius:4px;
	font-size:14px;
	font-family:MicrosoftYaHeiUI; 
	color:rgba(255,255,255,1);
	opacity:1;
	line-height:0;
}
.pages{
  	padding-bottom: 20px;
}
</style>