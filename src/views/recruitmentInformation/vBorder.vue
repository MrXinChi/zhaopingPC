<template>
	<div class="mbx-w">
		<span class="mbx-n"><i>{{title}}</i></span>
	</div>
</template>

<script>
	export default{
		props:{
			title:String
		}
	}
</script>

<style scoped="scoped" lang="scss">
.mbx-w{
	border-bottom: 1px solid #DEDEDE;
	position: relative;
}
.mbx-n{
	font-size:18px;
	font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
	font-weight:bold;
	color:rgba(51,51,51,1);
	line-height:18px;
	border-bottom: 8px solid #5286FF;
	display: inline-block;
	width: 75px;
	position: relative;
	bottom: -5px;
	i{
		position: absolute;
		bottom: -3px;
	}
}
</style>
