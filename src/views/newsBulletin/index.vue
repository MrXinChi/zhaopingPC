<template>
	<div class="detail_container">
		<v-content>
			<div slot="content" class="wrapper">
				<div class="header flex flex_x_bten">
					<div class="content-left">
						<v-noticeNews :routerArray="routerArray" @backLink="backLink" title="新闻公告"></v-noticeNews>
						<v-hot-header hotNewsShow :preach="preach" :employingArray="employingArray" :hotzhiArray="hotzhiArray" :hotNewsArray="hotNewsArray" title="热门新闻" @detail="detail"></v-hot-header>
					</div>
					<div class="content-right">
						<div v-if="isShowList" class="containers_">
							<v-journalism-list @detailsBtn="detailsBtn" :hostArray="hostArray"></v-journalism-list>
							<div class="pages flex flex_x_center">
								<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
							</div>
						</div>
						<newDetail v-else ref="newDetail"></newDetail>
					</div>
				</div>
			</div>
		</v-content>
	</div>
</template>

<script>
import newDetail from './newsDetail';

export default {
	components: {
		newDetail
	},
	data() {
		return {
			hostArray: [],
				page: '',
			routerArray: [
				// {
				// 	name: '新闻热点',
				// 	link: '/newsBulletin/hotspot'
				// },
				// {
				// 	name: '通知公告',
				// 	link: '/newsBulletin/notice'
				// },
				// {
				// 	name: '校内公告',
				// 	link: '/newsBulletin/inschool'
				// }
			],
			hotNewsArray:[
				// {title:'关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',time:'2019-09-25'},
				// {title:'关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',time:'2019-09-25'}
			],
			hotzhiArray:[
				{name:'初中数学老师',Price:'6k-10k'},
				{name:'初中数学老师',Price:'6k-10k'},
				{name:'初中数学老师',Price:'6k-10k'}
			],
			employingArray:[
				{name:1},
				{name:1},
				{name:1}
			],
			preach:[
				{title:'第一条測試數據'},
				{title:'第二條測試數據哈哈哈哈哈哈哈哈'},
				{title:'第三條条'}
			],
			index:1,
			clickId:0,
			page:'',
			reversedMessage: '',
			isShowList:true
		}
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10;
		}
	},
	methods:{
		async backLink(id,index){
			this.isShowList=true;
			this.clickId=id;
			let articleData=await this.service.article.getlist({
				cate_id:this.routerArray[this.clickId].link,
				page:index,
				size:"8"
			});
			this.page = articleData.data.allpage;
			this.hostArray=articleData.data.list;
			this.reversedMessage = articleData.data.allpage * 10;
		},
		handleCurrentChange(index) {
			this.backLink(this.clickId,index);
		},
		detailsBtn(id){
			this.isShowList=false;
			this.$nextTick(()=>{
				this.$refs.newDetail.init(id);
			});
		},
		async init(){
			let articleData=await this.service.article.getlist({
				cate_id:'ee9f59f3-7294-5a32-eeca-93ef7bbe9281'
			});
			this.hotNewsArray=articleData.data.list;
		},
		async getTitle(){
			let tabData = await this.service.home.ArticlecategoryGetlist({
				parent_id:'5315f373-b321-00b6-ad02-09b10197d258'
			});
			if(tabData.code==0){console.log(tabData.data.list)
				for(let i in tabData.data.list){
					let obj={};
					obj.name=tabData.data.list[i].cate_name;
					obj.link=tabData.data.list[i].id;
					this.routerArray.push(obj);
				}
				this.backLink(0,1);
			}
		},
		detail(id){
			this.isShowList=false;
			this.$nextTick(()=>{
				this.$refs.newDetail.init(id);
			});
		},
	},
	created(){
		this.init();
		this.getTitle();
	}
}
</script>

<style scoped="scoped" lang="scss">
.detail_container {
	.wrapper {
		.header {
			.content-left {
				width: 280px;
				height: 100%;
				margin-bottom: 20px;
			}
			.content-right {
				width: 880px;
				height: 100%;
				background: #fff;
				margin-bottom: 20px;
				padding-bottom: 20px;
			}
		}
	}
}
</style>