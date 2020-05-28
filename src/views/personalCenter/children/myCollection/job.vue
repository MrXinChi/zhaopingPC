<template>
    <div class="container_job">
        <v-job-lists ref="jobList" type="collection" @handleCancelCollection="handleCancelCollection"></v-job-lists>
    </div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		async handleCancelCollection(id) {
			let setCelcollection = await this.service.recruitment.setCollection({id:id}); 
			if(setCelcollection.code==0){
				this.init();
				this.$message({
					message: '取消成功',
					type: 'warning',
					center: true
				});
			}
		},
		init(){
			this.$nextTick(()=>{
				this.$refs.jobList.init(1);
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.container_job {
  	margin-top: 20px;
}
</style>