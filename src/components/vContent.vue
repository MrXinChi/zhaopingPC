<template>
	<div class="main">
		<div class="bannerImg"></div>
		<div class="content_ w_1200">
			<slot name="content"></slot>
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
.main {
	position: relative;
	padding-top: 170px;
	.bannerImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 208px;
		background-image: url(../assets/images/banner.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
}
</style>