<template>
	<div class="tab_info">
		<div class="tab_item" :class="{active : tabIndex == i}" v-for="(item,i) in tabList" :key="i" @mouseover="changeInfoTab(item.id,i)" >{{item.cate_name}}</div>
	</div>
</template>

<script>
export default {
	name: "vInfoTab",
	props: {
		tabList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			tabIndex: 0
		};
	},
	methods: {
		changeInfoTab(id,inx) {
			this.tabIndex = inx;
			this.$emit("changeInfoTab", id,inx);
		}
	}
};
</script>
<style scoped lang="scss">
.tab_info {
	@include flex(row, flex-start, center);
	margin-bottom: 1px;
	height: 40px;
	background: #ffffff;
	.tab_item {
		@include word(16, #8c8c8c);
		position: relative;
		padding: 0 16px;
		cursor: pointer;
		&.active {
			color: #262626;
		}
		&::after {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto 0;
			width: 1px;
			height: 8px;
			background-color: #dedede;
		}
		&:last-child::after {
			background-color: #ffffff;
		}
	}
}
</style>
