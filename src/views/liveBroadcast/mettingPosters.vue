<template>
	<div class="notice_detail">
		<img src="@/assets/images/posters.png">
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInfo: ""
		};
	},
	methods: {
		async init(id) {
			let Culum = await this.service.doubleElection.jobfairDetail({
				id: id
			});
			this.dataInfo = formatContent(Culum.data.remarks);
		}
	},
	created() {
		this.init(this.$route.params.id);
	}
};
</script>

<style lang="scss" scoped>
.notice_detail {
	padding: 40px;
	background-color: #ffffff; 
}
</style>