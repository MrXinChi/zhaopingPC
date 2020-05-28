<template>
	<div class="activity_container w_1200" v-if="loginShop" @click="removeBtn">
		<div class="container-login" v-if="loginShow" @click.stop>
			<div class="login-header">
				<ul class="flex">
					<li v-for="(i,k) in loginList" :key="k" @click="loginBtn(k)">
						<h1 class="cu_p" :class="{active:numb==k}" >
							{{i.title}}
							<span v-if="numb==k"></span>
						</h1>
					</li>
				</ul>
			</div>
			<div class="login-content">
				<div class="content-div">
					<div v-for="(i,k) in loginlist" :key="k" style="margin-bottom:20px;">
						<h1>{{i.title}}</h1>
						<div class="flex flex_y_center" >
							<input :type="i.type" :placeholder="i.text" v-model="i.content" />
							<h1 class="cu_p" @click="getVerificationCode" v-if="i.status==1">获取验证码</h1>
							<img class="cu_p" @click="getVerificationCode" v-if="i.status==2" :src="img" />
						</div>
					</div>
				</div>
				<div class="logins cu_p" @click="signIn">
					<h1>登 录</h1>
				</div>
				<div class="register flex flex_x_right">
					<div class="register-div cu_p" v-if="registerShop" @click="registerBtn">注册账号</div>
					<h1 v-if="registerShop"></h1>
					<div class="forget-div cu_p" @click="forgetBtn">忘记密码</div>
				</div>
			</div>
		</div>
		<Register v-if="registerShow" @goSignIn="goSignIn" @registration="registration"></Register>
		<Reset v-if="resetShop" @reseconfirmBtn="reseconfirmBtn"></Reset>
	</div>
</template>

<script>
import axios from "axios";
import Register from './personal/Register.vue'
import Reset from './personal/Reset.vue'

export default {
	components:{
		Register,
		Reset  
	},
	props: {
		loginShop: { type: Boolean},
		register: { type: Boolean}
	},
	data() {
		return {
			img: "",
			loginShow: null,
			registerShow: null,
			resetShop:null,
			registerShop:true,
			numb: 0,
			loginList: [{ title: "学生" }, { title: "教师" }, { title: "用人单位" }],
			loginlist: [
				{
					title: "账号：",
					type: "number",
					text: "请使用您的手机号码登录账号",
					content: ""
				},
				{
					title: "密码：",
					type: "password",
					text: "请输入您的登录密码",
					content: ""
				},
				{
					title: "手机验证：",
					type: "number",
					text: "请输入您的手机验证码",
					content: "",
					status: 1
				}
			]
		};
	},
	
	created() {
		this.loginShow = !this.register;
		this.registerShow = this.register;
	},
	methods: {
		registerShowBtn(){
			this.loginShow = null;
			this.registerShow = true;
		},
		reseconfirmBtn(code){   //判断密码是否重置成功
			if(code==0){
				this.resetShop=false
				this.loginShow = true
			}
		},
		registration(code){   //判断是否注册成功
			if(code==0){
				this.registerShow=false
				this.loginShow = true
			}
		},
		loginBtn(k) {
			this.numb = k;
			switch (k) {
				case 0:
					this.loginlist.map((i)=>{i.content = ""})
					this.registerShop = true;
				break;
				case 1:
					this.loginlist.map((i)=>{i.content = ""})
					this.registerShop = null;
				break;
				case 2:
					this.loginlist.map((i)=>{i.content = ""})
					this.registerShop = true;
				break;
			}
		},
		registerBtn() {    //学生注册/用人单位注册
			switch (this.numb) {
				case 0:
					this.loginShow = null;
					this.registerShow = true;
				break;
				case 2:
				break;
			}
		},
		forgetBtn(){     //学生忘记密码 / 教师忘记密码 / 用人单位忘记密码
			switch(this.numb){
				case 0:
					this.resetShop = true
					this.loginShow = null
					this.registerShow= null
				break;
			}
		},
		async signIn() {     //学生登录
			if (this.loginlist[0].content == "") {
				this.$message({
					message: '请输入账号',
					type: 'warning',
					center: true
				});
			  return;
			}
			if (this.loginlist[1].content == "") {
				this.$message({
					message: '请输入密码',
					type: 'warning',
					center: true
				});
			  return;
			}
			if (this.loginlist[2].content == "") {
				this.$message({
					message: '请输入验证码',
					type: 'warning',
					center: true
				});
			  return;
			}
			let params = {
			  studentid: this.loginlist[0].content,
			  password: this.loginlist[1].content,
			  txtcode: this.loginlist[2].content,
			};
			let signIn = await this.service.user.userLand(params);
			if (signIn.code == 1) {
				this.$message({
					message: signIn.msg,
					type: 'warning',
					center: true
				});
			  this.loginlist[0].content = ""
			  this.loginlist[1].content = ""
			  this.loginlist[2].content = ""
			  this.getVerificationCode()
			} else {
			 	this.$message({
					message: "登录成功",
					type: 'success',
					center: true
				});
			  this.$emit('signIn',signIn.code);
			  localStorage.setItem("username",(JSON.stringify(signIn.data)));
			  this.loginlist[0].content = ""
			  this.loginlist[1].content = ""
			  this.loginlist[2].content = ""
			}
		
			// this.$emit('signIn',0)
			// localStorage.setItem("username",JSON.stringify({"userinfo":{"id":"d5f5849c-47c6-4c1e-aae0-debe5c63a962","username":"","studentid":"000123","realname":"本科推荐表","sex":1,"nickname":"","password":"202cb962ac59075b964b07152d234b70","register_school_id":"","school_id":"5f431052-b4af-0969-a37a-955f7903c8d5","headimg":"cdd5e14f-3e85-c5fc-2f89-6cf31573abd2","tixing":"0","is_tixing":1,"phone":"","is_xjbd":1,"isbind":0,"bindtime":1575017826,"outbindtime":1582004506,"isbindzfb":0,"bindzfbtime":0,"outbindzfbtime":0,"insert_type":1,"qrcode_id":"cac1f715-3ee9-27f2-bf56-1102e542ed3c","yiyuan_count":0,"work_province":null,"work_city":null,"work_region":null,"work_address":null,"wmid":0,"wmschoolcode":"","dianziqianming":"","link_xcx_userid":"","iswmupdate":0,"register_yuanxi":null,"register_zhuanye":null,"headimg_name":"//s1.jiuyeb.cn/2019/11/29/1575017836-91.jpg","school_info":{"name":"测试大学","sylogo":"32e02ea9-9492-c2aa-a4d6-ad7a5920166a","sylogo_name":"//s1.jiuyeb.cn/2019/05/10/1557471750-47.jpg","link_school_ids":[],"link_url_name":""},"school_id_name":"测试大学","user_base":{"id":"19a94c33-b59f-507b-9489-bae21195e69d","biye":"3c482953-fb7f-cb10-f3ea-30c6a49f9f9d","status":11,"tjb_status":0,"shengyuandi_edit_status":0,"shengyuandi_confirm_des":""},"user_base_extend":{"byqx_status":0,"byqx_type":""},"user_base_heyan":null,"is_now_biye":0},"infoToken":"a08296e9d0329a433c91d78a591e5c94"}));
			// this.loginlist[0].content = ""
			// this.loginlist[1].content = ""
			// this.loginlist[2].content = ""
		},
		async getVerificationCode() {
			//获取验证码
			let result = await this.service.user.codeLand();
			let codeImg  = "data:image/png;base64," + btoa( new Uint8Array(result).reduce( (data, byte) => data + String.fromCharCode(byte), "" ));
			this.img = codeImg; // 测试,记得删除 ,(data和页面上)
			this.loginlist[2].status = 2;
			this.loginlist[2].content = ""
		},
		goSignIn(){           //立即登录即关闭注册页，打开登录页
			this.resetShop = null
			this.loginShow = true
			this.registerShow= null
		},
		removeBtn(){
			this.$emit("removeBtn")
		}
	}
};
</script>

<style lang="scss" scoped>
.active {
  	color: rgba(38, 38, 38, 1) !important;
}
.register-header {
	width: 100%;
	height: 56px;
	border-bottom: 1px solid rgba(222, 222, 222, 1);
	h1 {
		width: 72px;
		height: 23px;
		font-size: 18px;
		font-weight: bold;
		color: rgba(38, 38, 38, 1);
		line-height: 23px;
		padding: 16px 0 0 20px;
		span {
			display: block;
			margin-top: -7px;
			height: 8px;
			background: linear-gradient(270deg,rgba(82, 134, 255, 1) 0%,rgba(144, 177, 255, 1) 100%);
			border-radius: 2px;
		}
	}
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
}

input[type="number"] {
	-moz-appearance: textfield;
}
.activity_container {
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	.container-login {
		width: 432px;
		height: 430px;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -216px;
		margin-top: -215px;
		.login-header {
			width: 100%;
			height: 56px;
			ul {
				height: 100%;
				width: 100%;
				border-bottom: 1px solid rgba(222, 222, 222, 1);
				li {
					text-align: center;
					padding: 16px 0 0 40px;
					h1 {
						height: 23px;
						font-size: 18px;
						font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
						font-weight: bold;
						color: rgba(89, 89, 89, 1);
						line-height: 23px;
						span {
							display: block;
							margin-top: -7px;
							height: 8px;
							background: linear-gradient(270deg,rgba(82, 134, 255, 1) 0%,rgba(144, 177, 255, 1) 100%);
							border-radius: 2px;
						}
					}
				}
			}
		}
		.login-content {
			width: 100%;
			height: 373px;
			box-sizing: border-box;
			padding: 32px 48px;
			.content-div {
				div {
					h1 {
						height: 15px;
						font-size: 12px;
						font-family: MicrosoftYaHeiUI;
						color: rgba(51, 51, 51, 1);
						line-height: 15px;
					}
					div {
						border-bottom: 1px solid rgba(222, 222, 222, 1);
						border-radius: 4px;
						input {
							width: 70%;
							padding: 12px 0;
							font-size: 14px;
							color: rgba(204, 204, 204, 1);
							line-height: 18px;
						}
						h1 {
							height: 18px;
							font-size: 14px;
							color: rgba(82, 134, 255, 1);
							line-height: 18px;
						}
						img {
							width: 88px;
							height: 32px;
						}
					}
				}
			}
			.logins {
				width: 336px;
				height: 36px;
				background: rgba(82, 134, 255, 1);
				border-radius: 4px;
				margin-top: 32px;
				h1 {
					width: 40px;
					padding: 9px 151px;
					height: 18px;
					font-size: 14px;
					font-family: MicrosoftYaHeiUI;
					color: rgba(255, 255, 255, 1);
				}
			}
			.register {
				padding: 20px 0;
				div {
					height: 18px;
					font-size: 14px;
					font-family: MicrosoftYaHeiUI;
					color: rgba(89, 89, 89, 1);
					line-height: 18px;
				}
				h1 {
					margin: 0 16px;
					width: 1px;
					// height:12px;
					background: rgba(222, 222, 222, 1);
				}
			}
		}
	}
	.container-register {
		width: 432px;
		min-height: 350px;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -216px;
		transform: translateY(-50%);
		.register-content {
			width: 100%;
			// min-height: 373px;
			box-sizing: border-box;
			padding: 32px 32px 0 48px;
			.register-div {
				div {
					h1 {
						height: 15px;
						font-size: 12px;
						font-family: MicrosoftYaHeiUI;
						color: rgba(51, 51, 51, 1);
						line-height: 15px;
					}
					div {
						border-bottom: 1px solid rgba(222, 222, 222, 1);
						border-radius: 4px;
						input {
							width: 87%;
							padding: 10px 0;
							font-size: 14px;
							color: rgba(204, 204, 204, 1);
							line-height: 18px;
						}
						h1 {
							font-size: 14px;
							color: rgba(82, 134, 255, 1);
							position: relative;
							bottom: 29px;
							right: 0;
							width: 51%;
							.div1 {
								width: 100%;
								display: block;
								height: 18px;
								font-size: 14px;
								color: rgba(82, 134, 255, 1);
								line-height: 18px;
								text-align: right;
								border: none;
							}
							.span2 {
								font-size: 25px;
								display: block;
								text-align: right;
								img {
									width: 88px;
									height: 32px;
								}
							}
						}
					}
				}
			}
			.register-logins {
				width: 336px;
				height: 36px;
				background: rgba(82, 134, 255, 1);
				border-radius: 4px;
				margin: 32px 0;
				h1 {
					padding: 9px 147px;
					height: 18px;
					font-size: 14px;
					color: rgba(255, 255, 255, 1);
					line-height: 18px;
				}
			}
			.register-register {
				padding: 20px 0;
				div {
					height: 18px;
					font-size: 14px;
					font-family: MicrosoftYaHeiUI;
					color: rgba(89, 89, 89, 1);
					line-height: 18px;
				}
				div:nth-of-type(2) {
					color: #5286ff;
				}
				h1 {
					margin: 0 16px;
					width: 1px;
					background: rgba(222, 222, 222, 1);
				}
			}
		}
	}
	.container-reset {
		width: 432px;
		min-height: 326px;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -216px;
		margin-top: -163px;
		.reset-content {
			width: 100%;
			// min-height: 373px;
			box-sizing: border-box;
			padding: 32px 32px 0 48px;
			.reset-div {
				div {
					h1 {
						height: 15px;
						font-size: 12px;
						font-family: MicrosoftYaHeiUI;
						color: rgba(51, 51, 51, 1);
						line-height: 15px;
					}
					div {
						border-bottom: 1px solid rgba(222, 222, 222, 1);
						border-radius: 4px;
						input {
							width: 77%;
							padding: 12px 0;
							font-size: 14px;
							color: rgba(204, 204, 204, 1);
							line-height: 18px;
						}
						h1 {
							height: 18px;
							font-size: 14px;
							color: rgba(82, 134, 255, 1);
							line-height: 18px;
							position: relative;
							right: 0;
						}
						img {
							width: 88px;
							height: 32px;
						}
					}
				}
			}
			.reset-logins {
				width: 336px;
				height: 36px;
				background: rgba(82, 134, 255, 1);
				border-radius: 4px;
				margin: 32px 0;
				h1 {
					padding: 9px 147px;
					height: 18px;
					font-size: 14px;
					color: rgba(255, 255, 255, 1);
					line-height: 18px;
				}
			}
		}
	}
}
</style>