<template>
	<div class="container">
		<h1 class="title">
			我的消息
		</h1>
		<div class="content"> 
			<img src="@/assets/images/xiaoxi.png" alt="">
			<!-- <v-icon icon-class="icon-xiaoxi" class-name="edit"></v-icon> -->
			<h2 class="flex flex_y_center">
				<v-icon class="xiaoxi" icon-class="icon-xiaoxitishi" class-name="edit"></v-icon>
				<span>如有消息将会发送到您的手机端，如图所示</span>
			</h2>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	}
};
</script>
<style lang="scss" scoped>
.container {
    h1{
		height:20px;
		font-size:16px;
		font-weight:bold;
		color:rgba(38,38,38,1);
		line-height:20px;
		padding: 20px 0 0 20px;
    }
    .content{
		padding: 12px 0 0 300px;
		width: 283px;
		height: 458px;
		img{
			width: 283px;
			height: 100%;
		}
		h2{
			height:18px;
			font-size:14px;
			color:rgba(82,134,255,1);
			line-height:18px;
			.xiaoxi{
				width: 12px;
				height: 12px;
				padding-right: 3px;
			}
			span{
				flex:1;
				box-sizing: border-box;
			}
		}
    }
}
</style>