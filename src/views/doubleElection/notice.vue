<template>
	<div class="notice_detail">
		<p v-html="dataInfo"></p>
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
	padding: 20px;
	background-color: #ffffff;
	.p{
		/deep/ p{
			img{
				width: 100%;
				height: 100%;
			}
		}
  	}
}
</style>