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
			let preachData = await this.service.preach.detail({
				id: id
			});
			this.dataInfo = formatContent(preachData.data.remarks);
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