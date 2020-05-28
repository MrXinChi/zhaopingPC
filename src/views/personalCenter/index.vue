<template>
	<div class="container">
		<!-- 个人中心 -->
		<v-content>
			<div slot="content" class="wrapper flex flex_x_bten">
				<div class="content_left">
					<div class="content_left-header">
						<router-link to="/setting">
							<v-icon icon-class="icon-setting" class-name="icon_setting"></v-icon>
						</router-link>


						<img v-if="userlist.headimg_name!=''&&userlist.headimg_name!=undefined" :src="userlist.headimg_name+'!auto'" class="content_left-headerImg" />

						<img v-else src="@/assets/images/user_default.png" class="content_left-headerImg" />


						<div class="content_left-headerNam flex flex_center flex_y_center">
							<span>{{userlist.realname}}</span>
							<v-icon :icon-class="gender==1?'icon-man':'icon-woman'" class-name="icon"></v-icon>
						</div>
						<div class="content_left-headerMaj flex flex_x_spa">
							<div>{{userlist.school_id_name}}</div>
							<!-- <div>{{userlist.fuxiuzhuanye}}</div> -->
							<div>{{userlist.professional_id_name}}</div>
						</div>
						<div class="content_left-headerTim flex flex_x_center">
							<div>2017.09 ～ 2019.06</div>
						</div>
					</div>
					<div class="content_left-content">
						<div class="content_left-contentDiv flex flex_x_spa">
							<router-link to="/user/registration">
								<h1>110</h1>
								<h1>报名</h1>
							</router-link>
							<router-link to="/user/delivery">
								<h1 style="border-left:1px solid rgba(222,222,222,1);border-right: 1px solid rgba(222,222,222,1);">{{resumenumber}}<span></span></h1>
								<h1>投递</h1>
							</router-link>
							<router-link to="/user/collection">
								<h1>110</h1>
								<h1>收藏</h1>
							</router-link>
						</div>
					</div>
					<div class="content_left-division"></div>
					<div class="content_left-footer flex flex_x_center flex_warp">
						<ul>
							<li>
								<router-link to="/user/resume">我的简历</router-link>
							</li>
							<li>
								<router-link to="/user/appointment">我的预约</router-link>
							</li>
							<li>
								<router-link to="/user/obtainEmployment">就业管理</router-link>
							</li>
							<!-- <li>
								<router-link to="/user/myNews">我的消息</router-link>
							</li> -->
							<li>
								<router-link to="/user/Invitation">面试邀约</router-link>
							</li>
							<li>
								<router-link to="/user/Netsign">我的网签</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="content_right">
				<router-view></router-view>
				</div>
			</div>
		</v-content>
	</div>
</template>

<script>
export default {
	data() {
		return {
			gender: "man",
			userlist:{},
			resumenumber:"0"
		};
	},
	created(){
		this.resumeBtn();
	},
	methods: {
		async resumeBtn(){
			let params = {
				id:JSON.parse(localStorage.getItem("username")).userinfo.id,
				token:JSON.parse(localStorage.getItem("username")).infoToken
			}
			let resume = await this.service.user.info(params)
			if(resume.code==0){
				this.userlist = resume.data.userinfo;
				this.gender = resume.data.userinfo.sex;
				this.resumenumber = resume.data.resumeinfo.deliver_count;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.wrapper {
		width: 1180px;
		height: 100%;
		.content_left {
			width: 280px;
			height: 658px;
			background: #FFFFFF;
			margin-bottom: 20px;
			.content_left-header {
				position: relative;
				a {
					position: absolute;
					top: 20px;
					right: 20px;
					.icon_setting {
						width: 14px;
						height: 14px;
					}
				}
				.content_left-headerImg {
					width: 88px;
					height: 88px;
					border-radius: 50%;
					margin: 40px 96px 12px 96px;
					background: #ccc;
				}
				.content_left-headerNam {
					padding-left: 25px;
					span {
						height: 25px;
						font-size: 20px;
						font-weight: bold;
						color: rgba(38, 38, 38, 1);
						line-height: 25px;
					}
					.icon {
						width: 12px;
						height: 12px;
						padding-left: 9px;
					}
				}
				.content_left-headerMaj {
					padding-top: 18px;
					height: 18px;
					font-size: 14px;
					color: rgba(89, 89, 89, 1);
					line-height: 18px;
				}
				.content_left-headerTim {
					padding-top: 18px;
					height: 18px;
					font-size: 14px;
					color: rgba(89, 89, 89, 1);
					line-height: 18px;
				}
			}
			.content_left-content {
				padding: 24px 20px 0 20px;
				.content_left-contentDiv {
					a {
						text-align: center;
						width: 80px;
						height: 50px;
						background: rgba(255, 255, 255, 1);
						color: #262626;
						cursor: pointer;
						h1:nth-of-type(1) {   
							height: 20px;
							font-size: 16px;
							font-weight: bold;
							line-height: 20px;
						}
						h1:nth-of-type(2) {
							padding-top: 12px;
							font-size:14px;
							font-family:MicrosoftYaHeiUI;
							line-height:18px;  
						}
						&.active {
							color: #5286ff;
						}
					}
				}
			}
			.content_left-division {
				margin: 24px 20px 0 20px;
				width: 240px;
				border: 1px dashed rgba(222, 222, 222, 1);
			}
			.content_left-footer {
				margin-top: 24px;
				ul {
					li {
						a {
							@include word(16, #262626);
							display: block;
							width: 240px;
							height: 56px;
							line-height: 56px;
							text-align: center;
							border-radius: 4px;
							&.active {
								@include word(16, #5286ff, 400, center);
								background: #eff7fe;
							}
						}
					}
				}
			}
		}
		.content_right {
			width: 880px;
			background: #f9f9f9;
		}
	}
}
</style>