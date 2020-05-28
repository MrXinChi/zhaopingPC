<template>
	<div v-if="frameShow" class="tycframe flex_center">
		<div class="tycframe-tk">
				<div @click="tcBtn"><v-icon icon-class="icon-tc" class-name="icon-tc"></v-icon></div>
				<div class="tycframe_content">
					<div class="tycframe_left">
						<div class="tycframe-tk-tit1 flex_y_center">
							{{dataInfo.name}}
							<span>{{dataInfo.regStatus}}</span>
							</div>
						<div class="tycframe-tk-tit2"><label>统一社会信用代码：</label><span>{{dataInfo.creditCode}}</span></div>

						<div class="tycframe-tk-tit3">
							<div class="flex">
								<div class="left"><label>行业：</label><span>{{dataInfo.industry}}</span></div>
								<div class="right"><label>性质：</label><span>{{dataInfo.companyOrgType}}</span></div>
							</div>
						</div>
						<div class="tycframe-tk-tit4">
							<div class="flex">
								<div class="left"><label>注册资本：</label><span>{{dataInfo.regCapital}}</span></div>
								<div class="right"><label>规模：</label><span>{{dataInfo.staffNumRange}}</span></div>
							</div>
						</div>
						<div class="tycframe-tk-tit5">
							<div class="flex">
								<div class="left"><label>成立日期：</label><span>{{dataInfo.estiblishTime}}</span></div>
								<div class="right"><label>营业期限：</label><span>{{dataInfo.fromTime}}{{dataInfo.toTime}}</span></div>
							</div>
						</div>


						<div class="tycframe-tk-tit6"><label>地址信息：</label><span>{{dataInfo.regLocation}}</span></div>
					</div>

					<div class="tycframe_right">
						<!-- <img width="40px;" height="40px;"> -->
					</div>
				</div>


			<div class="tycframe-tk-tit7 flex flex_y_center flex_x_center">
				<img src="@/assets/images/tianyancha.png" alt="">
				<div>更多企业信息，快去天眼查：</div>
				<a href="https://www.tianyancha.com">https://www.tianyancha.com</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				frameShow:false,
				dataInfo:{}
			}
		},
		methods:{
			tcBtn(){
				this.frameShow = false
				document.querySelector('html').style.overflow = "scroll"
			},
			async init(name){
				let CompanyData=await this.service.recruitment.getCompanyInfoTYC({
					name:name
				}); 
				this.dataInfo=CompanyData.data;
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
.tycframe{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 99;
	.tycframe-tk{
		width:730px;
		height:299px;
		background:rgba(255,255,255,1);
		border-radius:4px;
		position: relative;
		padding: 0 40px;
		box-sizing: border-box;
		padding-top: 35px;
		.tycframe_content{
			@include flex(row,space-between);
			.tycframe_left{
				width: 80%;
				.tycframe-tk-tit1{
					color: #262626;
					font-size: 16px;
					font-weight: bold;
					span{
						border: 1px solid #01CB7A;
						color: #01CB7A;
						font-size: 12px;
						padding: 1px 5px;
						border-radius: 5px;
						margin-left: 10px;
					}
				}
				.tycframe-tk-tit2{
					margin-top: 15px;
					label{
						font-size:14px;
						line-height:18px;
						color:rgba(38,38,38,1);
						opacity:1;
					}
					span{
						font-size: 14px;
						color: #595959;
					}
				}
				.tycframe-tk-tit3,
				.tycframe-tk-tit4,
				.tycframe-tk-tit5{
					margin: 15px 0;
					label{
						font-size:14px;
						line-height:18px;
						color:rgba(38,38,38,1);
						opacity:1;
					}
					span{
						font-size:14px;
						line-height:18px;
						color:rgba(89,89,89,1);
						opacity:1;
					}
					// @include flex(row,space-between);
					.left{
						width: 240px;
						// flex: 1;
					}
					.right{
						// flex: 2;
					}
				}
				.tycframe-tk-tit6{
					margin-top: 10px;
					color: #262626;
					font-size: 14px;
					padding-bottom: 15px;
					span{
						color: #595959;
					}
				}
				
			}
			.tycframe_right{
				img{
					width:112px;
					height:112px;
					border:1px solid rgba(222,222,222,1);
					opacity:1;
					border-radius:4px;
				}
			}
		}
		.tycframe-tk-tit7{
			width: 100%;
			height: 60px;
			border-top: 1px solid #DEDEDE;
			box-sizing: content-box;
			img{
				width: 70px;
				height: 20px;
			}
			div{
				color: #595959;
				font-size: 12px;
				margin-left: 5px;
			}
			a{
				color: #3579FF;
				font-size: 12px;
			}
		}
		.icon-tc{
			position: absolute;
			right: -20px;
			top: -20px;
			width: 20px;
			height: 20px;
		}
	}
}
</style>
