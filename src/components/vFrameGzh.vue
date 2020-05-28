<template>
	<div v-if="frameShow" class="frame flex_center">
		<div class="frame-content flex flex_x_center">
			<img @click="dltBtn" class="frame-content-sign" src="@/assets/images/sign_out.png" alt="">
			<img class="frame-content-code" src="@/assets/images/code.png" alt="">
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			frameShow:false
		}
	},
	methods:{
		dltBtn(){
			this.frameShow = false
			document.querySelector('html').style.overflow = "scroll"
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
.frame{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 9;
	.frame-content{
		width: 382px;
		height: 453px;
		background-image: url(../assets/images/card.png);
		background-repeat: no-repeat;
		background-position: center;
		position: relative;
		.frame-content-sign{
			width: 40px;
			height: 86px;
			position: absolute;
			top: -86px;
			left: 50%;
			margin-left: -20px;
		}
		.frame-content-code{
			width: 170px;
			height: 170px;
			margin-top: 80px;
		}
	}
}
</style>
