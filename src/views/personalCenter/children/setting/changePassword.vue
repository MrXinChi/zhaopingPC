<template>
	<div>
		<vContent />
		<div class="content">
			<div class="content_left">
				<v-notice title="个人设置"></v-notice>
				<div class="content_left_nav">
					<span v-for="(item,index) in OrderTitle" :key="index" :class="{'active':index==idx}" @click="chengeTitle(index)" >{{item.title}}</span>
				</div>
			</div> 
			<div class="content_right" >
				<div class="right_content" v-for="(i,k) in inputList" :key="k"> 
					<span>{{i.text}}</span>
					<input type="password"  :placeholder="i.tent" v-model="i.content"/>
				</div>
				<div class="right_content_button" @click="determineBtn">
					<button>确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vContent from "../../../../components/vContent";
export default {
	components: {
		vContent
	},
	data() {
		return {
			OrderTitle: [
				{
					title: "编辑头像"
				},
				{
					title: "修改密码"
				}
			],
			inputList:[
				{text:"旧密码：",tent:"请输入您的旧密码",content:"",zt:1},
				{text:"新密码：",tent:"请输入您的新密码",content:"",zt:1},
				{text:"再次输入：",tent:"再次确认新密码",content:"",zt:1},
			],
			idx: 1,
			Template:true
		};
	},
	methods: {
		chengeTitle(e) {
			if(e==0){
			this.$router.push('/setting')
			}
		},
		chengeTmplate(){
			this.Template=false;
		},
		async determineBtn(){
			var reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
			let aa = reg.test(this.inputList[0].content)
			let bb = reg.test(this.inputList[1].content)
			let cc = reg.test(this.inputList[2].content)
			if(!aa || !bb || !cc){
				alert("请输8～20位包含数字/字母图/特殊符号的密码")
				return
			}
			let params={
				id:JSON.parse(localStorage.getItem("username")).userinfo.id,
				oldpassword:this.inputList[0].content,
				password:this.inputList[1].content,
				repassword:this.inputList[2].content,
			}
			let determine = await this.service.user.updatePassword(params)
			if(determine.code == 0){
				alert(determine.msg)
				this.$router.push("user")
			}else{
				alert(determine.msg)
			}
		}
	},
};
</script>

<style lang="scss" scoped>
input ::placeholder{
	color: #CCCCCCFF;
	font-size:14px;
}
.content {
	@include flex(row, space-between);
	width: 1180px;
	margin: 0 auto;
	.content_left {
		width: 280px;
		.content_left_nav {
			padding-top:20px;
			@include flex(column, flex-start, center);
			width: 280px;
			font-size: 16px;
			color: rgba(38, 38, 38, 1);
			background-color: #ffffff;
			span {
				@include flex(column, center, center);
				width: 240px;
				height: 56px;
				margin-bottom: 20px;
				cursor: pointer;
			}
		}
	}
	.content_right {
		width: 880px;
		height: 631px;
		display: flex;
		flex-direction: column;
		background-color: #ffffffff;
		align-items: center;
		justify-content: center;
		.right_span {
			width: 410px;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 20px;
			span {
				width: 70px;
				height: 18px;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				color: #333333ff;
				font-size: 14px;
				line-height: 18px;
			}
			input {
				width: 228px;
				height: 18px;
				background: rgba(255, 255, 255, 1);
				border-radius: 4px;
				padding: 8px 12px;
				border: 1px solid rgba(235, 235, 235, 1);
				margin: 0 8px;
			}
			button {
				width: 70px;
				height: 18px;
				font-size: 14px;
				color: rgba(82, 134, 255, 1);
				line-height: 18px;
				cursor: pointer;
			}
			.right_button {
				width: 90px;
				height: 36px;
				background: rgba(82, 134, 255, 1);
				border-radius: 4px;
				color: #ffffffff;
				font-size: 14px;
				margin-left: 8px;
				margin-top: 40px;
				cursor: pointer;
			}
		}
	}
}
// 进一步修改密码
.right_content {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 20px;
	span {
		width: 120px;
		height: 18px;
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		line-height: 18px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	input {
		width: 238px;
		height: 18px;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		border: 1px solid rgba(235, 235, 235, 1);
		padding: 8px 12px;
		margin-left: 8px;
	}
}
.right_content_button {
	margin-top: 40px;
	button {
		width: 76px;
		height: 36px;
		background: rgba(82, 134, 255, 1);
		border-radius: 4px;
		color: #FFFFFFFF;
		cursor: pointer;
	}
}
/* 变化样式 */
.active {
	background-color: #eff7fe;
	color: #5286ff;
}
</style>