<template>
	<div class="containers_">
		<router-view></router-view>
		<!--<v-journalism-list @detailsBtn="detailsBtn" :hostArray="hostArray"></v-journalism-list>-->
	</div>
</template>

<script>
export default {
	data() {
		return {
			hostArray: [
				{
					day: '24',
					timt: '2019-9',
					title: '关于用人单位招sdfds聘我校毕业生、到我校举办宣讲会的流程公告',
					cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
				},
				{
					day: '24',
					timt: '2019-9',
					title: '关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',
					cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
				}, {
					day: '24',
					timt: '2019-9',
					title: '关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',
					cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
				}, {
					day: '24',
					timt: '2019-9',
					title: '关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',
					cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
				}, {
					day: '24',
					timt: '2019-9',
					title: '关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',
					cont: '具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）和2019年服'
				}
			]
		}
	},
	methods:{
		detailsBtn(){
			this.$router.push('/dashboard/newsBulletin/newsDetail')
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
	.containers_ {
		min-height: 500px;
	}
</style>