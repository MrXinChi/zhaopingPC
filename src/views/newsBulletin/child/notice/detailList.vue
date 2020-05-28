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
			hostArray: [],
			page: ''
		}
	},
	methods:{
		handleCurrentChange(index) {
			this.init(index);
		},
		detailsBtn(id){
			this.$router.push(`/newsBulletin/notice/newsDetail_n/${id}`)
		},
		async init(index){
			let articleData=await this.service.article.getlist({
				cate_id:'e8ef0ca1-2485-5efd-b085-39c8cac57b70',
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