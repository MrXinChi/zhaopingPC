<template>
	<div class="container_">
		<v-content>
			<div slot="content" class="wrapper">
				<v-ouestionnaire-list @detailsBtn="detailsBtn" :hostArray="hostArray"></v-ouestionnaire-list>
				<div class="content_right">
					<v-hot-header hotNewsShows :hotNewsArray="hotNewsArray" title="热门新闻"></v-hot-header>
				</div>
			</div>
		</v-content>
	</div>
</template>

<script>
export default {
	data() {
		return {
			hostArray: [
				{title:'dsfs',addtime:'sdfsdfsf',remarks:'dsfsdfsdf'},
				{title:'dsfs',addtime:'sdfsdfsf',remarks:'dsfsdfsdf'},
				{title:'dsfs',addtime:'sdfsdfsf',remarks:'dsfsdfsdf'},
			],
			hotNewsArray:[]
		};
	},
  	methods: {
	  	detailsBtn(id) {
			this.$router.push(`/ouestionnaire/ouestDetail/${id}`);
		},
		
		handleDetail(id) {
			this.$router.push(`/preachMeeting/${id}`);
		},
		async init(){
			let articleData=await this.service.article.getlist({
				cate_id:'ee9f59f3-7294-5a32-eeca-93ef7bbe9281'
			});
			this.hotNewsArray=articleData.data.list;
			
		}
	},
	created(){
		this.init();
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	@include flex(row, space-between);
	.content_left {
		width: 900px;
	
	}
	.content_right {
		width: 280px;
	}
}
</style>