<template>
	<div class="detail_container">
		<v-content>
			<div slot="content" class="wrapper flex flex_x_bten">
				<div class="wrapper-left">
					<div class="wrapper-left-header">
						<div class="job_item" @click="handleClick">
						  <div class="wrapper_left">
						    <div class="job_name">{{dataInfo.work_name}}</div>
						    <div class="sign">
						      <div class="sign_item">{{dataInfo.city_id_name}}</div>
						      <div class="sign_item">{{dataInfo.xueli_id_name}}</div>
						      <div class="sign_item">{{dataInfo.person_count}}</div>
						      <div class="sign_item">{{dataInfo.dalei_id_name}}</div>
						    </div>
						    <div class="price_range">{{dataInfo.salary_floor}}-{{dataInfo.salay_ceil}}元</div>
						    <div class="address">
						      <v-icon icon-class="icon-address" class-name="icon"></v-icon>
						      <span>{{dataInfo.address}}</span>
						      <v-icon icon-class="icon-arrow-right" class-name="icon_arrow"></v-icon>
						    </div>
						  </div>
						  <div class="wrapper_right">
						    <div class="company_name flex flex_y_center">
								<v-collection :isCollection="isCollection" @click="handleCollection"></v-collection>
								<v-page-view :count="dataInfo.viewcount"></v-page-view>
							</div>
						    <div class="sign">
						      <div class="sign_item"></div>
						      <div class="sign_item"></div>
						    </div>
						    <button class="collections" @click="handleCancelCollection" >投递简历</button>
						  </div>
						</div>
					</div>
					<div class="wrapper-left-content">
						<borders title="招聘专业"></borders>
						<div class="zhiwei">
							<div>{{dataInfo.work_name}}/ {{dataInfo.person_count}}</div>
							<!-- 其他专业 -->
							<!-- <div v-for="(item,index) in jobData.otherJobList" :key="index">{{item.work_name}}/{{item.person_count}}</div> -->
						</div>
						<borders title="职位亮点"></borders>
						<div class="zhiwei">
							<div v-for="(i,index) in dataInfo.tagsList" :key="index">{{i.title}}</div>
						</div>
						<borders title="职位描述"></borders>
							<div class="miaoshu">
								<p v-html="dataInfo.remarks"></p>
							</div>
						<borders title="本校提示"></borders>
						<div class="tishi">
							{{dataInfo.xueli_id_name}}
							<!-- 请各位同学在求职时提高警惕，凡涉及收取各种费用；几乎不面试就给出录取通知，且到外地就职的招聘等情况，要仔细辨别，谨防上当受骗。 -->
						</div>
					</div>
				</div>

				<div class="wrapper-right">
					<div class="content_right">
							<v-company-info :companyInfo="companyInfo"></v-company-info>
					</div>
					<v-hot-header hotzhiShows :hotzhiArray="hotzhiArray"  title="热门职位" @detail="detail"></v-hot-header>
				</div>
			
			</div>
		</v-content>
		<!-- 底部分隔线 -->
		<div class="partition"></div>
	</div>
</template>

<script>
	import borders from "../vBorder.vue";
	import Vue from 'vue';
	export default{
		components:{
			borders
		},
		data(){
			return{
				companyInfo: {},
				hotzhiArray:[
					{name:'初中数学老师',Price:'6k-10k'},
					{name:'初中数学老师',Price:'6k-10k'},
					{name:'初中数学老师',Price:'6k-10k'}
				],
				isCollection: false,
				dataInfo:{},
				jobData:{}
			}
		},
		methods:{
			detail(id){
				this.init(id);
			},
			handleClick(e) {
			  this.$emit("click", e);
			},
			async handleCancelCollection() {   //投递简历
				let params = {
					com_id: this.dataInfo.com_id,
					id: this.dataInfo.id
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
			async handleCollection() {

				if(!this.isCollection){
					let setCelcollection = await this.service.recruitment.setCollection({id:this.jobData.id}); 
					if(setCelcollection.code==0){
						this.isCollection = !this.isCollection;
						this.$message({
							message: '收藏成功',
							type: 'success',
							center: true
						});
					}
				}else{
					let setCelcollection = await this.service.recruitment.setCollection({id:this.jobData.id}); 
					if(setCelcollection.code==0){
						this.isCollection = !this.isCollection;
						this.$message({
							message: '取消成功',
							type: 'warning',
							center: true
						});
					}
				}
			},
			async init(id){
				let jobData=await this.service.recruitment.jobdetail({
					id:id
				});
				this.dataInfo=jobData.data.jobInfo;
				this.jobData=jobData.data;
				this.isCollection=jobData.data.isCollection;
				if (
					jobData.data.comInfo === false ||
					jobData.data.comInfo === null ||
					jobData.data.comInfo === ""
				) {
					this.companyInfo = {
					
						logo_src: jobData.data.com_id_logosrc,
						name: jobData.data.com_id_name,
						xingzhi_id_name: "暂无",
						guimo_id_name: "暂无",
						business_name: "暂无"
					};
				} else {
					this.companyInfo = jobData.data.comInfo;
					this.companyInfo.id=jobData.data.jobInfo.com_id;
				}
			},
			async getHotZhi(index){
				let deliverData=await this.service.recruitment.joblist({
					jobtype:1,
					page:index,
					size:5
				});
				this.hotzhiArray=deliverData.data.list;
				}
			},
		created(){
			this.init(this.$route.params.id);
			this.getHotZhi(1);
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.wrapper{
		.wrapper-left{
			width: 880px;
		}
		.wrapper-right{
			width: 280px;
		}
	}
	.job_item {
	  @include flex(row, space-between);
	  margin-top: 20px;
	  padding: 20px;
	  background-color: #ffffff;
	  border-radius: 4px;
	  &:first-child {
	    margin-top: 0;
	  }
	  .wrapper_left {
	    .job_name {
				font-size:16px;
				font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
				font-weight:bold;
				color:rgba(38,38,38,1);
				line-height:20px;
	    }
	    .sign_item:first-child {
	      padding-left: 0;
	    }
	    .sign_item:last-child {
	      padding-right: 0;
	      border-right: none;
	    }
	    .price_range { 
	      margin-top: 12px; 
				font-size:16px;
				font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
				font-weight:bold;
				color:rgba(253,60,60,1);
				line-height:20px;
				letter-spacing:1px;
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
	    @include flex(column);
	    .company_name {
	      @include word(16, #262626);
	    }
	    .sign_item:first-child {
	      padding-left: 0;
	    }
	    .sign_item:last-child {
	      padding-right: 0;
	      border-right: none;
	    }
	    .collections {
	      @include word(14, #ffffff);
	      align-self: flex-end;
	      margin-top: 30px;
	      width: 96px;
	      height: 30px;
	      line-height: 30px;
	      text-align: center;
	      background-color: #5286ff;
	      border-radius: 4px;
	      cursor: pointer;
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
	.page_view_wrapper{
		margin-left: 10px;
		margin-top: 3px;
	}
	.wrapper-left-content{
		margin-top: 20px;
		padding: 20px;
		box-sizing: border-box;
		background: #fff;
	}
	.zhiwei{
		padding: 30px 0;
		div{
			background: #F9F9F9;
			display: inline-block;
			margin: 5px 6px;
			padding: 8px 12px;
			border-radius: 4px;
			color: #595959;
			font-size: 14px;
		}
		div:nth-child(1){
			margin-left: 0;
		}
	}
	.miaoshu{
		padding: 30px 0;
		div{
			font-size:16px;
			font-family:MicrosoftYaHeiUI;
			color:rgba(89,89,89,1);
			line-height:30px;
		}
	}
	.tishi{
		padding: 10px 0;
		font-size:16px;
		font-family:MicrosoftYaHeiUI;
		color:rgba(89,89,89,1);
		line-height:25px;
	}
	.partition{
		height: 20px;;
		background-color:#F9F9F9;
	}
	.content_right {
		width: 280px;
		background-color: #ffffff;
		margin-bottom: 40px;
	}
</style>