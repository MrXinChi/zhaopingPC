<template>
	<div class="page_view_wrapper">
		<!-- <v-icon icon-class="icon-page-view" class-name="icon"></v-icon> -->
		<v-icon icon-class="icon-page-views" class-name="icon"></v-icon>
		
		<span>{{count}}</span>
	</div>
</template>

<script>
export default {
	props: {
		count: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.page_view_wrapper {
	@include flex(row, flex-start, center);
	.icon {
		width: 18px;
		height: 14px;
	}
	span {
		margin-left: 4px;
	}
}
</style>