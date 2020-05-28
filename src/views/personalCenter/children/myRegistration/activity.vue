<template>
	<div class="container">
		<v-activity-lists @click="click" :mygetList="mygetList"></v-activity-lists>
	</div>
</template>
<script>
export default {
	data() {
		return {
			mygetList:[]
		};
	},
	created(){
		this.mygetlist();
	},
	methods: {
		click(id){
			console.log(id)
		},
		async mygetlist(){
			let params={
				school_id:JSON.parse(localStorage.getItem("username")).userinfo.school_id,
				userid:JSON.parse(localStorage.getItem("username")).userinfo.id,
			}
			let mygetlist = await this.service.activity.myActivities(params)
			this.mygetList.push(
				{
					realname:'aaaa',
					addtime:'2019-02-25',
					address:'北京市',
					status_name:'未开始'
				}
			)
			// this.mygetList=mygetlist.data.list
			console.log(this.mygetList)
		}
	},
};
</script>
<style lang="scss" scoped>
.container {
}
</style>