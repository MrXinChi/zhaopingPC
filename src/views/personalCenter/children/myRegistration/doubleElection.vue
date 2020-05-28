<template>
	<div class="container">
		<v-activity-lists @click="click" :mygetList="mygetList" ></v-activity-lists>
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
		this.Getmylist()
	},
	methods: {
		click(id){
			console.log(id)
		},
		async Getmylist(){
			let jobfairGetmylist = await this.service.doubleElection.jobfairGetmylist()
			this.mygetList = jobfairGetmylist.data.list
			console.log(jobfairGetmylist.data.list)
			if(jobfairGetmylist.data.list.length==0){
				this.mygetList.push( {
					realname:'本科推荐表',
					addtime:1584091500,
					address:' 公寓篮球场（露天广场）',
					status_name:'未开始'
				})
			}
		}
	},
};
</script>
<style lang="scss" scoped>
.container {
}
</style>