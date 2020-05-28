<template>
  <div class="container">
    	<!-- 头部图片 -->
		<div class="topImg flex flex_y_center" v-if="isHome">
			<div class="header_title flex flex_y_center">
				<router-link to="/home">
					<v-icon icon-class="icon-logo" class-name="icon"></v-icon>
				</router-link>
				<label class="header_left flex flex_y_center">模版三演示大学</label>
				<label class="header_right flex flex_y_center">就业指导中</label>
			</div>
		</div>


		<div :class="[isHome ?'container_tab':'container_tabNoStyle']">
			<div class="nav flex flex_y_center">
				<ul class="flex nav_left">
					<li v-if="!isHome">
						<router-link to="/home">
							<v-icon icon-class="icon-logo" class-name="icon"></v-icon>
						</router-link>
					</li>
					<li>
						<router-link to="/newsBulletin" active-class="onTab">新闻公告</router-link>
					</li>
					<li>
						<router-link to="/recruitmentInformation" active-class="onTab">招聘信息</router-link>
					</li>
						<li @click="handleRecommendation"  active-class="onTab">精准推荐</li>
					<li>
						<router-link to="/doubleElection" active-class="onTab">双选会</router-link>
					</li>
					<li>
						<router-link to="/preachMeeting" active-class="onTab">宣讲会</router-link>
					</li>
					<li>
						<router-link to="/liveBroadcast" active-class="onTab">空中招聘</router-link>
					</li>
					<li>
						<router-link to="/makeAnAppointment" active-class="onTab">预约咨询</router-link>
					</li>
					<li>
						<router-link to="/activity" active-class="onTab">活动报名</router-link>
					</li>
					<li>
						<router-link to="/ouestionnaire" active-class="onTab">调查问卷</router-link>
					</li>
				</ul>
		
				<div class="nav_fdj flex_1 flex flex_x_right cu_p">
					<!-- 未登录 -->
					<v-icon v-if="loginShow" :icon-class="isHome?'icon-search-all-white':'icon-search-black'" class-name="icon"></v-icon>
					<!-- 已登录 -->
					<v-icon v-if="!loginShow" :icon-class="isHome?'icon-search-white':'icon-blocks'" class-name="icon"></v-icon>
				</div>

				<ul class="flex nav_fight" v-if="loginShow">
					<li class="flex_center cu_p">
						<span @click="loginBtn">登录</span>
					</li>
					<li class="flex_center cu_p">
						<span @click="registerBtn">注册</span>
					</li>
				</ul>
				<ul class="flex nav_fight" v-else @click="personalAccess" @mouseenter="suspensionBtn">
					<li class="flex_center cu_p" style="position:relative">
						<img v-if="username.headimg_name=='dsfsd'" :src="username.headimg_name+'!100x100'" alt="..." />
						<div v-else class="user_icon"></div>

						<div class="transition_background" v-if="show" @mouseleave="outsuspensionBtn">
							<div class="transition">
								<div class="transitionli flex flex_y_center flex_x_center cu_p" v-for="(i,k) in transitionlist" :key="k" @click.stop="transitionBtn(k)" :class="numb==k?'actives':''" >
									<h1>
										<h2 v-if="i.zt==1"></h2>
									</h1>
									<span class="span">{{i.text}}</span>
								</div>
							</div>
						</div>

					</li>
					<li class="realname flex_center cu_p">
						<span>{{username.realname}}</span>
					</li>
				</ul>
			</div>
			<v-frame-gzh ref="frame"></v-frame-gzh>
			<v-login ref="Vlogin" :loginShop="loginShop" :register="register" @signIn="signIn" @removeBtn="removeBtn"></v-login>
		</div>
   </div>
</template>
<script>
export default {
	inject: ["reload"], //注入刷新方法
	data() {
		return {
			numb: 0,
			isHome: false,
			routerPath: "",
			loginShop: null, //开启登录页
			register: null,
			loginShow: null,
			username: {},
			show: false,
			transitionlist: [
				{ text: "个人中心", zt: 1 },
				{ text: "退出", zt: 2 }
			]
		};
	},
	watch: {
		$route(to, from) {
			this.routerPath = to.path;
			this.isHome = this.routerPath == "/home";
		}
	},
	created() {
		if (JSON.parse(localStorage.getItem("username")) == null) {
			this.loginShow = true;
		} else {
			this.username = JSON.parse(localStorage.getItem("username")).userinfo;
			this.routerPath = this.$route.path;
			this.isHome = this.routerPath == "/home";
			this.signIn();
		}
	},
	methods: {
		personalAccess() {
			this.$router.push("/user");
		},
		signIn(code) {
			//判断是否登录
			if (code == 0) {
				this.loginShop = false;
				this.loginShow = false;
			}
		},
		handleRecommendation() {
			this.$refs.frame.frameShow = true;
			document.querySelector("html").style.overflow = "hidden";
		},
		loginBtn() {
			//登录
			this.loginShop = true;
			this.register = false;
		},
		registerBtn() {
			this.loginShop = true;
			this.$refs.Vlogin.registerShowBtn();
		},
		removeBtn() {
			//关闭
			this.loginShop = null;
		},
		outsuspensionBtn() {
			//滑出事件
			this.show = false;
		},
		suspensionBtn() {
			//滑入事件
			this.show = true;
		},
		transitionBtn(k) {
			//个人中心  退出登录事件
			this.numb = k;
			switch (k) {
				case 0:
					this.transitionlist[1].zt = 2;
					this.transitionlist[0].zt = 1;
					this.$router.push("/user/resume"); 
				break;
				case 1:
					this.transitionlist[1].zt = 1;
					this.transitionlist[0].zt = 2;
					this.loginShow = true;
					localStorage.removeItem("username");
				break;
			}
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.actives {
	width: 108px;
	height: 35px;
	background: rgba(82, 134, 255, 0.12);
	.span {
		display: inline-block;
		color: #5286ff;
	}
}
.transition_background{
	position: absolute;
	right: -55px;
	top: 40px;
	z-index: 100;
	.transition {
		width: 108px;
		height: 70px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		
		.transitionli {
			width: 108px;
			height: 35px;
			text-align: center;
			line-height: 35px;
			color: #595959;
			span {
				width: 73%;
				height: 18px;
				font-size: 14px;
				line-height: 18px;
				text-align: left;
			}
			h1 {
				flex: 1;
				padding-left: 12px;
				h2 {
					width: 6px;
					height: 6px;
					background: rgba(82, 134, 255, 0.45);
					border-radius: 4px;
				}
			}
		}
	}
}
.container {
	width: 100%;
	.topImg{
		background-image:url(../assets/images/headerImg.png);
		background-repeat: no-repeat;
		background-size: cover;
		height: 120px;
		.header_title{
			width: 1200px;
			height: 80px;
			margin: 0 auto;
			
			.icon {
				width: 35px;
				height: 35px;
			}
			.header_left {
				width:252px;
				height:36px;
				font-size:36px;
				color:rgba(38,38,38,1);
				line-height:43px;
			}
			.header_right{
				width:159px;
				height:30px;
				font-size:24px;
				font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
				font-weight:bold;
				color:rgba(38,38,38,1);
				line-height:30px;
				letter-spacing:3px;
			}
			label{
				margin-left: 16px;
			}
		}
	}
	.container_tab{
		height: 80px;
		background: #5286ff;
	
		.nav {
			width: 1200px;
			height: 80px;
			margin: 0 auto;
			.nav_left {
				li {
					margin-right: 30px;
					cursor: pointer;
					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
			.nav_fdj {
				.icon {
					width: 20px;
					height: 20px;
					margin-right: 20px;
				}
			}
			.nav_fight {
				.realname {
					border: none;
				}
				li {
					width: 64px;
					border-left: 1px solid #fff;
					.user_icon{
						width:24px;
						height:24px;
						background:rgba(249,249,249,1);
						border:1px solid rgba(222,222,222,1);
						border-radius:50%;
						opacity:1;
					}
				}
			}
		}
		ul {
			li {
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				a {
					color: #fff;
				}
				img {
					width:24px;
					height:24px;
					background:rgba(249,249,249,1);
					border:1px solid rgba(222,222,222,1);
					border-radius:50%;
					opacity:1;
				}
			}
		}
	}

	.container_tabNoStyle{
		height: 80px;
		background: #f1f3f2;
	
		.nav {
			width: 1200px;
			height: 80px;
			margin: 0 auto;
			.nav_left {
				li {
				margin-right: 30px;
				cursor: pointer;
					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
			.nav_fdj {
				.icon {
					width: 20px;
					height: 20px;
					margin-right: 20px;
				}
			}
			.nav_fight {
				.realname {
					// margin-left: -25px;
					border: none;
				}
				li {
					width: 64px;
					border-left: 1px solid rgba(222,222,222,1);
					.user_icon{
						width:24px;
						height:24px;
						background:rgba(249,249,249,1);
						border:1px solid rgba(222,222,222,1);
						border-radius:50%;
						opacity:1;
					}
				}
			}
		}
		ul {
			li {
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #262626;
				img {
					width:24px;
					height:24px;
					background:rgba(249,249,249,1);
					border:1px solid rgba(222,222,222,1);
					border-radius:50%;
					opacity:1;
				}
				a{
					color: #262626;
				}
				.onTab{
					color: #5286FF;
				} 
			}
		}
	}
}
</style>