<template>
    <div class="container-register" @click.stop>
		<div class="register-header">
			<h1>
				学生注册
				<span></span>
			</h1>
		</div>
		<div class="register-content" v-if="registerShows">
			<div class="register-div">
				<div v-for="(i,k) in registerList" :key="k" style="margin-bottom:20px;">
					<h1>{{i.title}}</h1>
					<div class="flex flex_y_center">
						<input :type="i.type" :placeholder="i.text" v-model="i.content" />
					</div>
				</div>
			</div>
			<div class="register-logins cu_p" @click="nextStepBtn">
				<h1>下一步</h1>
			</div>
			<div class="register-register flex flex_x_right">
				<div class="register-div cu_p">已有账号？</div>
				<h1></h1>
				<div class="forget-div cu_p" @click="goSignIn">立即登陆</div>
			</div>
		</div>
		<div class="register-content" v-else>
			<div class="register-div">
				<div v-for="(i,k) in registerlist" :key="k" style="margin-bottom:20px;">
					<h1>{{i.title}}</h1>
					<div class="flex flex_y_center">
						<input :type="i.type" :placeholder="i.text" :value="i.content" v-model="i.content" />


						<h1 class="cu_p" v-if="i.status==1" @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn" @click="verificationCodeBtn">
							<div class="div1" >
								<span class="span1 cu_p" v-if="codeShop">点击图片，换个验证码</span>
							</div>
							<span class="span2">
								<img  :src="img" />
							</span>
						</h1>


					</div>
				</div>
			</div>
			<div class="register-logins cu_p" @click="registration">
				<h1>注册</h1>
			</div>
      	</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
	props: {},
	data() {
		return {
			img: "",
			registerShows:true,
			registerShop:null,
			codeShop:null,
			registerList: [
				{ 	title: "学号：", type: "number", text: "请输入", content: "" },
				{
					title: "姓名：",
					type: "text",
					text: "请输入您的真实姓名",
					content: ""
				}
			],
			registerlist: [
				{ 	title: "学号：", type: "text", text: "请输入", content: "" },
				{
					title: "姓名：",
					type: "text",
					text: "请输入您的真实姓名",
					content: ""
				},
				{
					title: "密码：",
					type: "password",
					text: "请输8～20位包含数字/字母图/特殊符号的密码",
					content: ""
				},
				{
					title: "确认密码：",
					type: "password",
					text: "请再次输入密码，以保证密码无误",
					content: ""
				},
				{ 	title: "手机号：", type: "number", text: "请输入", content: "" },
				{
					title: "验证码：",
					type: "text",
					text: "请输入您的手机验证码",
					content: "",
					status: 1
				}
			],
		};
	},
	created() {},
	methods: {
		async nextStepBtn() {     //注册下一步
			if(this.registerList[0].content==""){
					this.$message({
						message: '请输入学号',
						type: 'warning',
						center: true
					});
				return
			}
			if(this.registerList[1].content==""){
					this.$message({
						message: '请输入您的姓名',
						type: 'warning',
						center: true
					});
				return
			}
			let params={
				school_id:"6f745542-f2f0-61b2-408f-aab3eec8a132",
				studentid:this.registerList[0].content,
				realname:this.registerList[1].content,
				login_user_id: 1
			}
			let check = await this.service.user.checkUserRegister(params)
			if(check.code==0){
				this.registerlist[0].content=this.registerList[0].content
				this.registerlist[1].content=this.registerList[1].content
				this.getVerificationCode()
				this.registerShows =false
			}else{
				alert(check.msg)
			}
		},
		verificationCodeBtn() {    //切换验证码
			this.getVerificationCode()
		},
		outsuspensionBtn() {    //滑出事件
			this.codeShop=false
		},
		suspensionBtn() {   //滑入事件
			this.codeShop=true
		},
		async getVerificationCode() {   //获取验证码
			let result = await this.service.user.codeLand();
			let codeImg ="data:image/png;base64,"+btoa(new Uint8Array(result).reduce((data, byte) => data + String.fromCharCode(byte),""));
			this.img = codeImg;
		},
		async registration(){     //注册账号
			if(this.registerlist[0].content==""){
					this.$message({
						message: '请输入学号',
						type: 'warning',
						center: true
					});
			return
			}
			if(this.registerlist[1].content==""){
				this.$message({
					message: '请输入姓名',
					type: 'warning',
					center: true
				});
			return
			}
			var reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
			let aa = reg.test(this.registerlist[2].content)
			if(!aa){
				this.$message({
					message: '请输8～20位包含数字/字母图/特殊符号的密码',
					type: 'warning',
					center: true
				});
			return
			}
			if(this.registerlist[3].content == this.registerlist[2].content){
			
			}else{
				this.$message({
					message: '俩次密码输入不同，请重新输入',
					type: 'warning',
					center: true
				});
			return
			}
			if(this.registerlist[4].content==""){
					this.$message({
					message: '请输入手机号',
					type: 'warning',
					center: true
				});
			return
			}
			if(this.registerlist[5].content==""){
				this.$message({
					message: '请输入验证码',
					type: 'warning',
					center: true
				});
			return
			}
			let params={
				school_id:"6f745542-f2f0-61b2-408f-aab3eec8a132",
				studentid:this.registerlist[0].content,
				realname:this.registerlist[1].content,
				password:this.registerlist[2].content,
				repassword:this.registerlist[3].content,
				phone:this.registerlist[4].content,
				txtcode:this.registerlist[5].content,
				login_user_id: 1
			}
			let registration = await this.service.user.newUserRegister(params)
			if(registration.code==1){
				alert(registration.msg)
			}else{
				alert(registration.msg)
				this.$emit("registration",registration.code)
				this.registerlist.map((i)=>{i.content=""})
			}
		
		},
		goSignIn(){   //关闭注册页，打开登录页
			this.$emit("goSignIn");
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
							padding: 12px 0;
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
								font-size: 12px;
								color: rgba(82, 134, 255, 1);
								line-height: 18px;
								text-align: right;
								border: none;
							}
							.span2 {
								font-size: 25px;
								display: block;
								text-align: right;
								img{
									width:88px;
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
					width: 70px;
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
</style>