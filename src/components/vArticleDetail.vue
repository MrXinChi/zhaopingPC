<template>
<div class="container_">
    <div class="title flex flex_center c_333 fw_b flex">
		<div class="flex_1"></div>
		<div class="flex_3 flex_center">{{dataInfo.title}}</div>
		<div class="flex_1 flex cu_p flex_x_right">
			<div @click="shareBtn" class="title-fx fs14">分享</div>
			<div @click="shareBtn" class="fx-img flex_center">
				<v-icon icon-class="icon-share" class-name="icon-share"></v-icon>
			</div>
		</div>
	</div>
    <div class="Subheading flex flex_x_bten">
		<div>发布机构:{{dataInfo.school_id_name}}</div>
		<div>发布时间:{{timestampToTimeDay(dataInfo.addtime)}}</div>
		<div>浏览量:{{dataInfo.views}}</div>
    </div>
    <div class="fwb">
		<p v-html="formatContent(dataInfo.content)"></p>
    </div>
    <slot name="other_content"></slot>
    <div class="front fs16">
		上一篇：
		<span class="cu_p" @click="handleDetail('upFind')">{{formatData(dataInfo.upFind)}}</span>
    </div>
    <div class="behind fs16">
		下一篇：
		<span class="cu_p" @click="handleDetail('downFind')">{{formatData(dataInfo.downFind)}}</span>
    </div>
    <v-frame ref="frame"></v-frame>
</div>
</template>

<script>
export default {
	props: {
		dataInfo: {
			type: Object,
			default: () => {}
		},
		url: {
			type: String,
			default: "/"
		}
	},
	data() {
		return {};
	},
	methods: {
		shareBtn() {
			this.$refs.frame.frameShow = true;
			document.querySelector("html").style.overflow = "hidden";
		},
		formatData(data) {
			return data === null || data === undefined ? "暂无" : data.title;
		},
		formatContent(data) {
			if (data === undefined || data === null) {
				return;
			}
			const regex = new RegExp("<img", "gi");
			return data.replace(regex, `<img style="max-width: 100%; height: auto"`);
		},
		handleDetail(type) {
			if (this.dataInfo[type] === null || this.dataInfo[type] === undefined) {
				return;
			}
			
			this.$router.push(`${this.url}/${this.dataInfo[type].id}`);
		}
	},

};
</script>

<style scoped="scoped" lang="scss">
.title {
	padding-top: 20px;
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
	margin: 0 auto;
	margin-top: 15px;
	width: 507px; 
	height:18px;
	font-size:14px;
	font-family:MicrosoftYaHeiUI;
	color:rgba(140,140,140,1);
	line-height:18px; 
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
	padding-bottom: 20px;
	span {
		color: #3a71fb;
	}
	span:hover {
		border-bottom: 1px solid #3a71fb;
	}
}
</style>