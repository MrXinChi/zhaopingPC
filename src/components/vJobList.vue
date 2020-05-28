<template>
	<div class="job_wrapper">
		<div class="job_list">
			<div class="job_item" v-for="(item,i) in deliverList" :key="i" :style="'background-color:'+backgroundColor">
				<div class="wrapper_left" @click="handleClick(item.id)" >
					<div class="job_name">{{item.work_name}}</div>
					<div class="sign">
						<div v-if="item.city_id_name==undefinde?false:true" class="sign_item">{{item.city_id_name}}</div>
						<div v-if="item.xueli_id_name==''?false:true" class="sign_item">{{item.xueli_id_name}}</div>
						<div v-if="item.person_count==''?false:true" class="sign_item">{{item.person_count}}</div>
						<div v-if="item.dalei_id_name==''?false:true" class="sign_item">{{item.dalei_id_name}}</div>
					</div>

					<div v-if="item.salay_ceil=='0'?false:true" class="price_range">{{item.salary_floor}}-{{item.salay_ceil}}元</div>
					<div class="address">
						<v-icon icon-class="icon-address" class-name="icon"></v-icon>
						<span>{{item.province_id_name}}</span>
						<v-icon icon-class="icon-arrow-right" class-name="icon_arrow"></v-icon>
					</div>
				</div>
				<div class="wrapper_right">
					<div class="company_name">{{item.com_id_name}}</div>
					<div class="sign">
						<div class="sign_item">民营</div>
						<div class="sign_item">100-199人</div>
					</div>

					<div class="prompt_box flex flex_y_center">
						<v-collection class="collectionss" :isCollection="item.is_collect" @click="handleCollection(item.id,i)"></v-collection>
						<button class="collections" @click="toHandleCancel(item.id,item.com_id)">投递简历</button>
					</div>
				</div>
			</div>

			<div class="pages flex flex_x_center">
				<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: ''
		},
		backgroundColor: {
			type: String,
			default: '#ffffff'
		}
	},
	data() {
		return {
			jobtype: 1,
			deliverList: [],
			page: '',
			reversedMessage: '',
			isCollection: false,
		}
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10
		}
	},
	methods: {
		async handleCollection(id,index) {
			
			if(!this.deliverList[index].is_collect){
				let setCelcollection = await this.service.recruitment.setCollection({id:id});
				if(setCelcollection.code==0){
					// this.this.deliverList[index].is_collect = !this.this.deliverList[index].is_collect;
					this.$message({
						message: '收藏成功',
						type: 'success',
						center: true
					});
				}
			}else{

				let setCelcollection = await this.service.recruitment.setCollection({id:id}); 
				if(setCelcollection.code==0){
					// this.this.deliverList[index].is_collect = !this.this.deliverList[index].is_collect;
					this.$message({
						message: '取消成功',
						type: 'warning',
						center: true
					});
				}
			}

		},
		handleClick(id) {
			this.$emit('click', id)
		},
		handleCancelCollection(id) {
			this.$emit('handleCancelCollection', id)
		},

		handleCurrentChange(index) {
			this.init(index)
		},
		async toHandleCancel(id,com_id) {   //投递简历
			let params = {
				com_id: com_id,
				id: id
			};
			let handlecancelcollection = await this.service.recruitment.deliverZhiwei(
				params
			); 
			if(handlecancelcollection.code == 0){
				this.$message({
					showClose: true,
					type: 'success',
					message: '投递成功',
				});
			}else{
					this.$message({
					showClose: true,
					type: 'warning',
					message: handlecancelcollection.msg
				});
			}
		},
		async init(index, provinceId, cityId, hangye) {
			let deliverData = await this.service.recruitment.joblist({
				jobtype: this.jobtype,
				province_id: provinceId,
				city_id: cityId,
				// zhiweilb:hangye,
				page: index,
				size: 5
			});
			this.reversedMessage = deliverData.data.allpage * 10
			this.page = deliverData.data.page
			this.deliverList = deliverData.data.list
		}
	},
	created() {
		this.init(1)
	}
}
</script>

<style lang="scss" scoped>
.job_wrapper {
	.job_list {
		.job_item {
			@include flex(row, space-between);
			margin-top: 20px;
			padding: 20px;
			height: 116px;
			// background-color: #ffffff;
			border-radius: 4px;
			&:first-child {
				margin-top: 0;
			}
			.wrapper_left {
				.job_name {
					@include word(16, #262626);
				}
				.sign_item:first-child {
					padding-left: 0;
				}
				.sign_item:last-child {
					padding-right: 0;
					border-right: none;
				}
				.price_range {
					@include word(16, #fd3c3c);
					margin-top: 12px;
				}
				.address {
					@include flex(row, flex-start, center);
					margin-top: 12px;
					.icon {
						width: 10px;
						height: 12px;
					}
					span {
						margin: 0 6px;
						@include word(14, #999999);
					}
					.icon_arrow {
						width: 6px;
						height: 10px;
					}
				}
			}
			.wrapper_right {
				width:171px;
				@include flex(column);
				.company_name {
					@include word(16, #262626); 
					overflow: hidden;
					text-overflow :ellipsis;//多余省略号显示
					white-space:1;//不许换行
					display: -webkit-box;//
					-webkit-line-clamp: 3;//最多三行
					-webkit-box-orient: vertical;//
				}
				.sign_item:first-child {
					padding-left: 0;
				}
				.sign_item:last-child {
					padding-right: 0;
					border-right: none;
				}
				.prompt_box{
					.collections {
						display:none;
						@include word(14, #ffffff);
						align-self: flex-end;
						position: relative;  
						top:20px;
						width: 96px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						background-color: #5286ff;
						border-radius: 4px;
						cursor: pointer;
					}
					.collectionss {
						display:none;
						@include word(14, #ffffff);
						align-self: flex-end;  
						position: relative; 
						top:20px; 
						width: 75px;
						height: 30px;
						line-height: 30px;
						cursor: pointer;
					}
				}
				
			}
			.sign {
				@include flex();
				margin-top: 12px;
				.sign_item {
					@include word(14, #595959);
					padding: 0 12px;
					border-right: 1px solid #dedede;
				}
			}
		}
		.company_name {
			@include word(16, #262626);
		}
		.job_item:hover{
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 16px 0px rgba(0,0,0,0.08);
			border-radius:4px;
			cursor:pointer;
		}
		.job_item:hover .prompt_box .collections,
		.job_item:hover .prompt_box .collectionss {
			display: inline-block;
		} 
		.job_item:hover .job_name{
			@include word(16, #5286FF);
		}
	}
	
	.pages {
		padding: 30px 0;
	}
}
</style>