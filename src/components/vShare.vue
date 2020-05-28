<template>
	<div class="share_wrapper" @click="handleClick">
		<v-icon icon-class="icon-share" class-name="icon"></v-icon>
		<span>分享</span>
	</div>
</template>

<script>
export default {
	props: {
		isCollection: {
			type: Boolean,
			type: false
		}
	},
	data() {
		return {};
	},
	methods: {
		handleClick(e) {
			this.$emit("click", e);
		}
	}
};
</script>

<style lang="scss" scoped>
.share_wrapper {
	cursor: pointer;
	.icon {
		width: 14px;
		height: 14px;
	}
	span {
		@include word(14, #595959);
		margin-left: 4px;
	}
}
</style>