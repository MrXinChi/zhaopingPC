<template>
    <div class="container-reset" @click.stop >
		<div class="register-header">
			<h1 class="cu_p">
				重置密码
				<span></span>
			</h1>
		</div>
		<div class="reset-content" v-if="resetShow">
			<div class="reset-div">
				<div v-for="(i,k) in resetList" :key="k" style="margin-bottom:20px;">
					<h1>{{i.title}}</h1>
					<div class="flex flex_y_center">
						<input :type="i.type" :placeholder="i.text" v-model="i.content" />
						<h1 class="cu_p" @click="getVerificationCode" v-if="i.status==1">获取验证码</h1>
						<img @click="getVerificationCode" v-if="i.status==2" :src="img" />
					</div>
				</div>
			</div>
			<div class="reset-logins cu_p" @click="resetnextStepBtn">
				<h1>下一步</h1>
			</div>
		</div>
		<div class="reset-content" v-else>
			<div class="reset-div">
				<div v-for="(i,k) in resetlist" :key="k" style="margin-bottom:20px;">
					<h1>{{i.title}}</h1>
					<div class="flex flex_y_center">
						<input :type="i.type" :placeholder="i.text" v-model="i.content" />
					</div>
				</div>
			</div>
			<div class="reset-logins cu_p" @click="reseconfirmBtn">
				<h1>确认</h1>
			</div>
		</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
	props: {
	},
	data() {
		return {
		img: "",
		resetShow:true,
		resetList: [
			{
				title: "账号：",
				type: "number",
				text: "请使用您的学号",
				content: ""
			},
			{
				title: "手机号",
				type: "number",
				text: "请使用您的手机号",
				content: "",
				status: 1
			},
			{
				title: "手机验证：",
				type: "number",
				text: "请输入您的手机验证码",
				content: "",
			}
		],
		resetlist: [
			{
				title: "账号：",
				type: "number",
				text: "请使用您的手机号码登录账号",
				content: ""
			},
			{
				title: "新密码：",
				type: "password",
				text: "请输8～20位包含数字/字母图/特殊符号的密码",
				content: ""
			},
			{
				title: "确认新密码：",
				type: "password",
				text: "请再次输入密码，以保证密码无误",
				content: ""
			}
		]
		};
	},
	created() {},
	methods: {
		verificationCodeBtn() {    //切换验证码
			this.getVerificationCode()
		},
		resetnextStepBtn() {    //重置密码下一步
			if(this.resetList[0].content==""){
				alert("请输入学号")
				return
			}
			if(this.resetList[1].content==""){
				alert("请输入您的手机号")
				return
			}
			if(this.resetList[2].content==""){
				alert("请输入您的手机验证码")
				return
			}
			this.resetShow = false
			this.resetlist[0].content=this.resetList[1].content  
		},
		async reseconfirmBtn() {  //确认重置密码
			var reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
				let word = reg.test(this.resetlist[1].content)
				if(!word){
					alert("请输8～20位包含数字/字母图/特殊符号的密码")
				return
				}
				if(this.resetlist[2].content == this.resetlist[1].content){
				
				}else{
					alert("请再次输入密码，以保证密码无误")
				return
				}
			let params={
				studentid:this.resetList[0].content,
				phone:this.resetList[1].content,
				code:this.resetList[2].content,
				password:this.resetlist[1].content,
				repassword:this.resetlist[2].content,
			}
			let findWord = await this.service.user.findPassword(params)
			if(findWord.code==1){
				alert(findWord.msg)
			}else{
				this.$emit('reseconfirmBtn',findWord.code)
				this.resetList.map((i)=>{i.content=""})
			}
			console.log(findWord)
		},
		async getVerificationCode() {   //获取验证码
			if(this.resetList[0].content==""){
				alert("请输入学号")
				return
			}
			if(this.resetList[1].content==""){
				alert("请输入您的手机号")
				return
			}
			let params={
				studentid:this.resetList[0].content,
				phone:this.resetList[1].content,
			}
			let resetnextStep = await this.service.user.sendforgetCodeNew(params)
			if(resetnextStep.code == 1){
				alert(resetnextStep.msg)
			}else{
				alert(resetnextStep.msg)
			}
		},
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
					img{
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
</style>