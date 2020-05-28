<template>
	<div class="container_meeting">
		<v-meeting-lists :preachMeetingList="preachMeetingList"></v-meeting-lists>
	</div>
</template>
<script>
export default {
	data() {
		return {
		preachMeetingList:[]
		};
	},
	created(){
		this.preachMeetingBtn()
	},
	methods: {
		async preachMeetingBtn(){
			let preachMeetinglist = await this.service.user.mypreach({login_user_id:JSON.parse(localStorage.getItem("username")).userinfo.id})
			if(preachMeetinglist.code==0){
				if(preachMeetinglist.data.list.length == 0){
					alert("还未报名")
					return
				}
				this.preachMeetingList = preachMeetinglist.data.list;
			}else{
				alert(preachMeetinglist.msg)
			}
		}
	},
};
</script>
<style lang="scss" scoped>
.container_meeting {
  	margin-top: 20px;
}
</style>