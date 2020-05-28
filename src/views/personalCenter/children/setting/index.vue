<template>
	<div>
		<vContent />
		<div class="container">
			<div class="content_left">
				<v-notice title="个人设置"></v-notice>
				<div class="content_left_nav">
					<span v-for="(item,index) in OrderTitle" :key="index" :class="{'active':index==idx}" @click="OrderItem(index)" >{{item.title}}</span>
				</div>
			</div> 
			<div class="content_right">
				<div class="img_upload">
					<span>头像：</span>
					<el-upload
					class="avatar_uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="imageUrl!=''" :src="imageUrl" class="avatar">
					<img v-else src="@/assets/images/upload_img.png" class="avatar">
					
					<!-- <i v-else class="el-icon-plus avatar_uploader-icon"></i> -->
					</el-upload>
				</div>
				<div class="content_name">
					<span>姓名：</span>
					<input type="text" v-model="myname"/>
				</div>
				<div class="content_sex">
					<div>
						<span>性别：</span>
					</div>
					<div class="content_radio">
						<input id="item1" type="radio" name="sex" value="男" checked v-model="sexman"/>
						<label for="item1"></label>
						<span>男</span>
						<input id="item2" type="radio" name="sex" value="女" v-model="sexgirl"/>
						<label for="item2"></label>
						<span>女</span>
					</div>
				</div>
				<div class="content_button">
					<button>取消</button>
					<button @click="baocunBtn">保存</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vContent from "../../../../components/vContent";
export default {
	data() {
		return {
			OrderTitle: [{ title: "编辑头像" }, { title: "修改密码" }],
			idx: 0,
			imageUrl:'',
			myname:"",
			sexman:"",
			sexgirl:""
		};
	},
	methods: {
		OrderItem(e) {
			if(e==1){
				this.$router.push('/changePassword')
			}
		},
		async baocunBtn(){  //上传头像 性别 名字
			console.log(this.myname,this.sexman,this.sexgirl)
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		}
	},
	components: {
		vContent
	}
};
</script>

<style lang="scss" scoped>
.container {
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
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;

		.img_upload {
			display: flex;
			flex-direction: row;
			width: 240px;
			margin: 0 auto;
			margin-top: 40px;
			.avatar_uploader{
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}
			.avatar_uploader:hover {
				border-color: #409EFF;
			}
			.avatar_uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 140px;
				height: 140px;
				line-height: 140px;
				text-align: center;
			}
			.avatar { 
					width: 140px;
					height: 140px;
					display: block;
			}
			span {
				font-size: 14px;
				color: #333333ff;
				line-height: 18px;
			}
		}
		.content_name {
			display: flex;
			flex-direction: row;
			width: 240px;
			margin: 20px auto;
			align-items: center;
			span {
				font-size: 14px;
				color: #333333ff;
				line-height: 18px;
			}

			input {
				width: 120px;
				height: 18px;
				background: rgba(255, 255, 255, 1);
				border-radius: 4px;
				padding: 8px 10px;
				border: 1px solid rgba(235, 235, 235, 1);
				margin-left: 8px;
			}
		}
		.content_sex {
			width: 240px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			div {
				font-size: 14px;
				color: #333333ff;
				line-height: 18px;
			}
			.content_radio {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 8px;
				font-size: 14px;

				span {
					margin-left: 10px;
					margin-right: 10px;
				}

				input[type="radio"] {
					display: none;
				}

				label {
					/* position: absolute; */
					width: 12px;
					height: 12px;
					border-radius: 50%;
					border: 1px solid gray;
					align-items: center;
					justify-content: center;
				}

				input:checked + label {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				input:checked + label::after {
					/* position: absolute; */
					content: "";
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: rgba(82, 134, 255, 1);
				}
			}
		} 
		.content_button {
			width: 220px;
			margin: 40px auto;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			button {
				width: 76px;
				height: 36px;
				background: rgba(245, 245, 245, 1);
				border-radius: 4px;
				margin-left: 30px;
				color: 14px;
				cursor: pointer;
				&:last-child {
					width: 76px;
					height: 36px;
					background: #5286ff;
					color: #ffffff;
					border-radius: 4px;
					margin-left: 30px;
					color: 14px;
					cursor: pointer;
				}
			}
		}
	}
}
.active {
	background-color: #eff7fe;
	color: #5286ff;
}


</style>