<template>
	<div class="detail_container"> 
			<div slot="content" class="wrapper flex flex_x_bten">
				<div class="wrapper-left">
					<div class="wrapper-left-header">
						<div class="job_item" @click="handleClick">
						  <div class="wrapper_left">
						    <div class="job_name">{{dataInfo.name}}</div>
						    <div class="sign">
						      <div class="sign_item">{{dataInfo.xingzhi_id_name}}</div>
						      <div class="sign_item">{{dataInfo.guimo_id_name}}</div>
						      <div class="sign_item">{{dataInfo.business_name}}</div> 
						    </div>
						    <!-- <div class="price_range">{{dataInfo.salary_floor}}-{{dataInfo.salay_ceil}}元</div> -->
						    <div class="address">
						      <v-icon icon-class="icon-address" class-name="icon"></v-icon>
						      <span>{{dataInfo.address}}</span>
						      <v-icon icon-class="icon-arrow-right" class-name="icon_arrow"></v-icon>
						    </div>
						  </div>
						  <div class="wrapper_right">
						    <div class="company_name flex flex_y_center">
									<img :src="dataInfo.logo_src+'!100x100'">
								</div> 
						  </div>
						</div>
					</div>
					<div class="wrapper-left-content">
						<borders title="单位标签"></borders>
						<div class="zhiwei">
							<div v-for="(item,index) in dataInfo.tagcomlist" :key="index">{{item.title}}</div>
							<!-- <div>交通便利</div>
							<div>与CEO面对面交流</div>
							<div>团建活动</div>
							<div>五星办公环境</div> -->
						</div>
						<borders title="单位视频"></borders>
						<div class="zhiwei">
							<a href="#">{{dataInfo.video}}</a>
							<!-- <div v-for="(i,index) in dataInfo.tagsList" :key="index">{{i.title}}</div> -->
						</div>
						<borders title="单位简介"></borders>
							<div class="miaoshu">
								<div>{{dataInfo.content}}</div>
							</div>
							<borders title="单位图片"></borders>
							 <div slot="content" class="wrappers">
									<div class="item">
										<img :src="dataInfo.envirement3_src+'!300auto'"  /> 
									</div>
									<div class="item">
										<img :src="dataInfo.envirement4_src+'!300auto'"  /> 
									</div>
								</div> 

						<borders title="职位信息"></borders> 
							<div class="miaoshu">
									<v-job-list @click="jobBtn" ref="vjoblist" :backgroundColor="'#F9F9F9'"></v-job-list>  
							</div>
							
					</div>
				</div> 
			</div> 
	</div>
</template>

<script>
	import borders from "../vBorder.vue";
	export default{
		components:{
			borders, 
		},
		data(){
			return{
				hotzhiArray:[
					{name:'初中数学老师',Price:'6k-10k'},
					{name:'初中数学老师',Price:'6k-10k'},
					{name:'初中数学老师',Price:'6k-10k'}
				],
				isCollection: false,
				dataInfo:{}
			}
		},
		methods:{
			jobBtn(id){
				this.$router.push(`/recruitmentInformation/detail/${id}`)
			},
			detail(id){
					this.init(id);
			},
			handleClick(e) {
			  this.$emit("click", e);
			},
			async handleCancelCollection() {   //投递简历
				let params={
					com_id:this.dataInfo.com_id,
					login_user_id:JSON.parse(localStorage.getItem("username")).userinfo.id,
					id:this.dataInfo.id
				}
				let handlecancelcollection = await this.service.recruitment.deliverZhiwei(params)
				if(handlecancelcollection.code == 0){
					this.$Message ({
						message: '投递成功',
						type: 'success'
					});
				}else{
					this.$Message ({
						message: handlecancelcollection.msg,
						type: 'success'
					});
				}
			},
			handleCollection() {
			  this.isCollection = !this.isCollection;
			},
			async init(id){
				let CompanyData=await this.service.recruitment.getCompanyInfo({
					id:id
				}); 

				this.dataInfo=CompanyData.data;
			},
			async getHotZhi(index){
				let deliverData=await this.service.recruitment.joblist({
					jobtype:1,
					page:index,
					size:5
				});
				this.hotzhiArray=deliverData.data.list;
				},
			},
		created(){
			this.init(this.$route.params.id);
			// this.init("e840577d-852b-890f-d0f6-3bb0a96c0732");//测试id
			// this.getHotZhi(1);
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
	      @include word(16, #262626);
				font-weight:bold;
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
	.wrappers {
  	@include flex(row, flex-start, flex-start, initial, wrap);
  	padding: 30px 0;
		.item {
			padding: 10px; 
			width: 260px;
			background-color: #ffffff;
			border-radius: 4px;
			cursor: pointer; 
			img {
				width: 260px;
				height: 160px;
			}
		}
	} 
	.detail-list{
		background: #F9F9F9;
	}
</style>