<template>
	<div>
		<el-image v-bind:style="{ width: width, height: height}" :src="src+size">
			<div slot="placeholder" class="image-slot flex_center">
				加载中
				<span class="dot">...</span>
			</div>
			<div slot="error" class="image-slot flex_center"><i class="el-icon-picture-outline"></i></div>
		</el-image>
	</div>
</template>

<script>
export default{
	props:{
		src:String,
		size:{
			type:String,
			default:'!auto'
		},
		width:{
			type:String,
			default:'100%'
		},
		height:{
			type:String,
			default:'100%'
		},
	},
	data(){
		return{
			
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
.el-image,
.image-slot{
	width: 100%;
	height: 100%;
	.el-icon-picture-outline{
		font-size: 100px;
	}
}
.image-slot{
	font-size: 30px;
}
</style>
