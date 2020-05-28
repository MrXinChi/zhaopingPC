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
			<label>发布机构:{{dataInfo.school_id_name}}</label>
			<label>发布时间:{{timestampToTimeDay(dataInfo.addtime)}}</label>
			<label>浏览量:{{dataInfo.views}}</label>
		</div>
		<div class="fwb">
			<p v-html="dataInfo.content"></p>
		</div>
		<div class="front fs16">
			上一篇：
			<span class="cu_p" @click="handleDetail('prev')">{{formatData(dataInfo.prev)}}</span>
		</div>
		<div class="behind fs16">
			下一篇：
			<span class="cu_p" @click="handleDetail('next')">{{formatData(dataInfo.next)}}</span>
		</div>
		<v-frame ref="frame"></v-frame>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInfo: {}
		};
	},
	methods: {
		shareBtn() {
			this.$refs.frame.frameShow = true;
			document.querySelector("html").style.overflow = "hidden";
		},
		async init(id) {
			let newsData = await this.service.article.detail({
				id: id
			});
			this.dataInfo = newsData.data;
			
		},
		handleDetail(type) {
			if (this.dataInfo[type] === null) {
				return;
			}
			this.$router.push(
				`/newsBulletin/hotspot/newsDetail/${this.dataInfo[type].id}`
			);
		},
		formatData(data) {
			return data === null || data === undefined ? "暂无" : data.title;
		}
	},
	created() {
		this.init(this.$route.params.id);
	},
	watch: {
		$route(to, from) {
			if (to.params.id != from.params.id) {
				this.id = to.params.id;
				this.init(this.id); //重新加载数据
			}
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
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
  span {
    color: #3a71fb;
  }
  span:hover {
    border-bottom: 1px solid #3a71fb;
  }
}
</style>