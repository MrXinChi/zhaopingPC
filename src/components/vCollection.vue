<template>
	<div class="collection" @click="handleClick">
		<v-icon :icon-class="isCollection?'icon-star-blue':'icon-star'" class-name="icon"></v-icon>
		<span>收藏</span>
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
.collection {
	cursor: pointer;
	.icon {
		width: 16px;
		height: 16px;
	}
	span {
		@include word(14, #595959);
		margin-left: 4px;
	}
}
</style>