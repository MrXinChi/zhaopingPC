<template>
	<div class="notice_detail">
		<div class="detail-list">
			<v-job-listKZ @click="jobBtn" ref="vjoblist"></v-job-listKZ>
		</div>
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
	padding-top: 20px;
	// background-color: #ffffff;
	.detail-list{
		background: #F9F9F9;
	}
}
</style>