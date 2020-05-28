<template>
	<div class="container">
		<div class="main">
			<div class="wrapper w_1200">
				<div class="tab">
					<router-link to="/liveBroadcast/airPreachMeeting" @click.native="btnShow=false">空中宣讲会</router-link>
					<router-link to="/liveBroadcast/videoInterview" @click.native="btnShow=true">空中双选会</router-link>
					<router-link to="/liveBroadcast/airInterview" @click.native="btnShow=true">空中面试</router-link>
					
					<div class="right_content"><button v-if="btnShow">单位发布空中招聘</button></div>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			btnShow:false
		};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	.main {
		position: relative;
		padding-top: 20px;
		.bannerImg {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 120px;
			background-image: url(../../assets/images/banner1.png);
			background-repeat: no-repeat;
			background-size: cover;
		}
		.wrapper {
			background-color: #ffffff; 
			width:1180px;
			.tab {
				@include flex();
				border-bottom: 1px solid #dedede;
				margin-right: 20px;
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
				.right_content{
					margin-left: 556px;
					margin-top:10px;
					button{
						width:160px;
						height:34px;
						background:rgba(82,134,255,1);
						border-radius:4px;
			
						font-size:14px;
						font-family:Microsoft YaHei UI;
						font-weight:400;
						line-height:18px;
						color:rgba(255,255,255,1);
						opacity:1;
						cursor: pointer;
					}
				}
			}
		}
	}
}
</style>