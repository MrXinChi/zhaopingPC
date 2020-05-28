<template>
	<div class="container_">
		<v-article-detail :dataInfo="dataInfo" url="/recruitmentInformation/notice/noticeDetail">
			<div slot="other_content" class="flex_center stbutton">
				<el-button type="primary" :plain="true" @click="handleCancelCollection">投递简历</el-button>
			</div>
		</v-article-detail>
		<!-- <div class="title flex flex_center c_333 fw_b flex">
		<div class="flex_1"></div>
		<div class="flex_3">{{dataInfo.title}}</div>
		<div class="flex_1 flex cu_p flex_x_right">
			<div class="title-fx fs16">分享</div>
			<div class="fx-img flex_center">
			<v-icon icon-class="icon-share" class-name="icon-share"></v-icon>
			</div>
		</div>
		</div>
		<div class="Subheading flex flex_x_bten">
		<div>发布机构：{{dataInfo.create_name}}</div>
		<div>发布时间：{{timestampToTime(dataInfo.addtime)}}</div>
		<div>浏览量：{{dataInfo.viewcount}}</div>
		</div>
		<div class="fwb">
		<p v-html="dataInfo.remarks"></p>
		</div>
		<div class="flex_center stbutton">
		<el-button type="primary" :plain="true" @click="handleCancelCollection">投递简历</el-button>
		</div>
		<div class="front fs16">
		上一篇：
		<span class="cu_p">云南师范大学召开创新创业学院2019年工作研讨会</span>
		</div>
		<div class="behind fs16">
		下一篇：
		<span class="cu_p">云南师范大学召开创新创业学院2019年工作研讨会</span>
		</div>-->
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInfo: {}
		};
	},
	watch: {
		$route(to, from) {
			if (to.params.id != from.params.id) {
				this.init(to.params.id); //重新加载数据
			}
		}
	},
	methods: {
		async init(id) {
			let schoolData = await this.service.recruitment.detail({
				id: id
			});
			this.dataInfo = schoolData.data;
			this.dataInfo.content = this.dataInfo.remarks;
		},
		async handleCancelCollection() {
			//投递简历
			let params = {
				com_id: this.dataInfo.com_id,
				id: this.dataInfo.id
			};
			let handlecancelcollection = await this.service.recruitment.deliverZhiwei(
				params
			);
			if (handlecancelcollection.code == 0) {
				this.$message({
								showClose: true,
								type: 'success',
								message: "投递成功"
				});
				alert(handlecancelcollection.msg);
			} else {
				this.$message({
					showClose: true,
					type: 'warning',
					message: handlecancelcollection.msg
				});
			}
		}
	},
	created() {
		this.init(this.$route.params.id);
	}
};
</script>

<style scoped="scoped" lang="scss">
.stbutton {
	margin: 20px 0;
}
.title {
	margin-top: 20px;
	font-size: 22px;
	.title-fx {
		color: #595959;
		margin-right: 5px;
	}
	.fx-img {
		.icon-share {
			width: 14px;
			height: 14px;
			margin-right: 20px;
		}
	}
}
.Subheading {
	margin-top: 15px;
	padding: 0 245px 0 185px;
	color: #8c8c8c;
}
.banner {
	padding: 0 20px;
	box-sizing: border-box;
	margin-top: 20px;
	img {
		width: 100%;
	}
}
.fwb {
	color: #666666;
	font-size: 16px;
	padding: 0 20px;
	line-height: 20px;
	text-indent: 16px;
	margin: 20px 0;
	img {
		max-width: 100% !important;
	}
}
.front {
	color: #333333;
	margin-left: 20px;
	span {
		color: #3a71fb;
	}
	span:hover {
		border-bottom: 1px solid #3a71fb;
	}
}
.behind {
	color: #333333;
	margin-left: 20px;
	margin-top: 10px;
	span {
		color: #3a71fb;
	}
	span:hover {
		border-bottom: 1px solid #3a71fb;
	}
}
</style>