<template>
	<div class="container_box">
		<div class="title">
			<h1>{{title}}</h1>
			<slot name="title_extend"></slot>
		</div>
		<el-input  v-if="inputShop" type="textarea" :value="value" :autosize="{ minRows: 3, maxRows: 4}" :placeholder="placeholder" @input="handleInput"></el-input>
		<el-input v-else :value="value" @input="handleInput" :placeholder="placeholder"></el-input>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: "请输入"
		},
		value: [String, Number],
		inputShop:{
			type: Boolean,
		}
	},
	data() {
		return {};
	},
	methods: {
		handleInput(e) {
			this.$emit("input", e);
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/.el-textarea{margin-top: 12px;}
.container_box {
	.title {
		@include flex(row, flex-start, center);
		h1 {
			@include word(14, #262626);
		}
	}
	.el-input {
		margin-top: 12px;
		/deep/.el-input__inner {
			height: 35px;
		}
	}
}
</style>