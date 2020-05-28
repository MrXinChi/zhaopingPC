<template>
	<div class="containers_">
		<v-journalism-list @detailsBtn="detailsBtn" :hostArray="hostArray"></v-journalism-list>
		<div class="pages flex flex_x_center">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				hostArray: [
					// {
					// 	day: '24',
					// 	timt: '2019-9',
					// 	title: '关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',
					// 	cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
					// },
				],
				page: ''
			}
		},
		methods:{
			handleCurrentChange(index) {
				this.init(index);
			},
			detailsBtn(id){
				this.$router.push(`/newsBulletin/inschool/newsDetail_i/${id}`)
			},
			async init(index){
				let articleData=await this.service.article.getlist({
					cate_id:'35119dfd-c141-4f55-acb2-5b308464cf82',
					page:index,
					size:"8"
				});
				this.page = articleData.data.allpage;
				this.hostArray=articleData.data.list;
			}
		},
		computed: {
			reversedMessage: function() {
				return this.page * 10;
			},
		},
		created(){
			this.init(1);
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.containers_ {
		min-height: 500px;
	}
	
	
</style>