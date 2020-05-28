<template>
  <div class="container">
		<div class="perfectResumes"> 
			<div class="header_title">
				<div class="head_left">
					<v-icon icon-class="icon-tips" class-name="icon"></v-icon>
					<label>签约须知</label>
				</div>
			</div>
			<div class="perfectResume_content">
				<h2>1.请与用人单位确认好邀请函中的内容</h2>
				<h2>2.应邀后需要提交审核，老师方可审核</h2>
			</div>
    	</div>
		<div class="meeting_detail">
			<div class="tab">
				<router-link to="/user/Netsign/netsignDetail">受邀网签</router-link>
				<router-link to="/user/Netsign/agreementDetail">协议书管理</router-link>
				<router-link to="/user/Netsign/terminationDetail">解约管理</router-link>
			</div>
		</div>
        <router-view></router-view>
  	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    .perfectResumes{
		background: #EEF4FF;
		padding:20px;
		border-radius:4px;
		border:1px solid rgba(169,196,254,1);
		.header_title{
			width: 100%;
			@include flex(row, space-between);
			.head_left{
				.icon{
					width: 14px;
					height: 14px;
					padding-top: 3px;
				}
				label{
					margin-left:10px;
					font-size:14px;
					font-family:Microsoft YaHei UI;
					font-weight:bold;
					line-height:18px;
					color:rgba(38,38,38,1);
					opacity:1;
				}
			}
		}
		.perfectResume_content{
			margin-left: 20px;
			h2{
				margin-top:8px;
			}
		}
	}
	.meeting_detail {
		margin-top: 20px;
		background-color: #ffffff;
		.tab {
			@include flex();
			border-bottom: 1px solid #dedede;
			a {
				@include word(16, #8c8c8c);
				margin-left: 20px;
				padding: 0 24px;
				height: 55px;
				line-height: 55px;
				border-bottom: 1px solid #ffffff;
				&.active {
					@include word(16, #5286ff);
					border-bottom: 1px solid #5286ff;
				}
			}
		}
    }
}
</style>