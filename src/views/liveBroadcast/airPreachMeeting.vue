<template>
	<div class="container">
		<div class="select_wrapper">
			<el-form ref="form" :model="form" label-width="auto">
				<el-form-item label="用人单位">
					<el-input v-model="form.companyName" placeholder="请输入用人单位名称"></el-input>
				</el-form-item>
				<el-form-item label="举办时间">
					<el-date-picker v-model="form.time" type="date" placeholder="请选择"></el-date-picker>
				</el-form-item>
				<div class="button_list">
					<button class="search" @click="handleSearch">搜索</button>
					<button class="reset" @click="handleReset">重置</button>
				</div>
			</el-form>
		</div>

		<!-- <v-contentkzzb> -->
		<div slot="content" class="wrapper">
			<div class="item" v-for="(item, i) in listArray" :key="i" @click="handleToDetail(i)">
				<img :src="item.com_id_logosrc + '!auto'" />
				<div class="detail">

					<!-- <div class="title" @click="handleToDetail(i)">{{ item.title }}</div> -->
					<div class="content_left">
						<div class="content_left_title">
							<label>
								{{item.title}}
							</label>
							<div v-if="item.timestatus ==1" class="status ongoing">进行中</div>
							<div v-if="item.timestatus ==2" class="status not_started">未开始</div>
							<div v-if="item.timestatus ==3" class="status over">已结束</div>
						</div>
						<p><img class="img1" src="@/assets/images/school.png"/>{{item.com_id_name}}</p>
						<p><img class="img2" src="@/assets/images/gongsi.png"/>{{item.school_id_name}}</p>
						<p><img class="img2" src="@/assets/images/Group-.png"/>{{item.hold_date}}{{item.hold_starttime}}{{item.hold_endtime}}</p>
						<p><img class="img3" src="@/assets/images/icon-.png"/>{{item.address}}</p>
					</div>
				</div>
			</div>
		</div>
		<!-- </v-contentkzzb> -->
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[12, 24, 36, 48]"
				:page-size="currentSize" 
				layout="prev, pager, next, sizes, jumper"
				:total="currentTotal">
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
			listArray: [],
			form: {
				companyName: '', // 用人单位
				time: '' // 举办时间
			},
			currentPage:1,
			currentSize:12,
			currentTotal:0
		}
	},
	methods: {
		handleToDetail(index) {//详情页面
			var id = this.listArray[index].id
			this.$router.push(`/airPreachMeeting/${id}`)
		},
		handleSizeChange(val) {
			this.currentSize=val;
			this.jobfairGetlist();
		},
		handleCurrentChange(val) {
			this.currentPage=val;
			this.jobfairGetlist();
		},
		async jobfairGetlist(name,time) {
			let preachDataList = await this.service.preach.getlist({
				keywords:name,
				page:this.currentPage,
				size:this.currentSize,
				isair:2
			});
			this.listArray = preachDataList.data.list;
			this.currentTotal=preachDataList.data.count;
		},
		// 搜索
		handleSearch() {
			this.jobfairGetlist(this.form.companyName);
		},
		// 重置
		handleReset() {
			this.form={};
		}
	},
	created() {
		this.jobfairGetlist();
	}
}
</script>

<style lang="scss" scoped>
.container {

	.select_wrapper {
		// height:74px;
		padding: 20px 0 20px 20px;
		background-color: #ffffff;
		.el-form {
			@include flex(row);
			.el-form-item {
				margin:0;
					// /deep/ .el-form-item__label {
					//   @include word(14, #262626, 400, right);
					// }
				/deep/ .el-form-item__label {
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					color:rgba(38,38,38,1);
					opacity:1;
				}
				/deep/ .el-input__inner{
					width:192px;
					height:34px;
					background:rgba(255,255,255,1);
					border:1px solid rgba(235,235,235,1);
					opacity:1;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
				}
				&:nth-child(2) {
					margin-left: 25px;
				}
			}
			.button_list {
				@include flex(row, flex-start, center);
				height: 40px;
				button {
					width: 70px;
					height: 34px;
					border-radius: 4px;
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
						margin-left: 16px;
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
		}
	}
	.wrapper {
		padding-top:20px;
		background:#f9f9f9;
		@include flex(row, flex-start, flex-start, initial, wrap);
		@include flex(row,space-between);
		.item {
		
			padding: 16px;
			margin-bottom: 20px;
			width: 248px;
			height: 278px;
			border-radius: 4px;
			cursor: pointer;
			&:nth-child(4n) {
				margin-right: 0;
			}
			img {
				width: 248px;
				height: 132px;
			}
			.detail {
				margin-top:16px;
				.content_left{
					//  width:176px;
					.content_left_title{
						@include flex(row,nowrap);
						label{
							width:190px;
							display: block;
							// margin-bottom: 12px;
					
							font-size:16px;
							font-family:MicrosoftYaHeiUI-Bold;
							line-height:20px;
							color:rgba(38,38,38,1);
							opacity:1;
							cursor: pointer;
							overflow: hidden;
							text-overflow :ellipsis;//多余省略号显示
							white-space:nowrap;//不许换行
						}
						.status{
							@include flex(row,center,center);
							width:58px;
							height:24px;
							// margin-left: 5px;
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
					p{
						margin-top:8px;
						font-size:14px;
						font-family:MicrosoftYaHeiUI;
						line-height:18px;
						color:rgba(89,89,89,1);
						opacity:1;
						overflow: hidden;
						text-overflow :ellipsis;//多余省略号显示
						white-space:nowrap;//不许换行
					.img1{
						margin-right:4px;
						width:12px;
						height:11px;
					}
					.img2{
						margin-right:4px;
						width:12px;
							height:12px;
						}
						.img3{
							margin-right:4px;
							width:9px;
							height:12px;
						}
					}
				}
			}
		}
		.item:hover{ 
			background:rgba(255,255,255,1);
			box-shadow:0px 2px 16px rgba(0,0,0,0.08);
			opacity:1;
			border-radius:4px;
		}
	}
	.block{
		background: #F9F9F9;
		// padding-top:20px;
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
				border:1px solid#f9f9f9;
			}
			/deep/ .el-icon-d-arrow-right{
				position: relative;
				top:-3px;
				border:1px solid#f9f9f9 !important;
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
			cursor: pointer;
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