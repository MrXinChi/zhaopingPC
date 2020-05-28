<template>
	<div class="container_box">
		<h1>{{title}}</h1>
		<el-select :value="value" placeholder="请选择" @change="handleChange" v-if="type == 'default'">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
		<el-date-picker :value="value" type="date" placeholder="选择日期时间" v-if="type == 'date'" @change="handleChangeDate" ></el-date-picker>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: "default"
		},
		title: {
			type: String,
			default: ""
		},
		value: [Number, String],
		options: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {};
	},
	methods: {
		handleChange(e) {
			this.$emit("input", e);
		},
		handleChangeDate(e) {
			this.$emit("input", e.getTime());
		}
	}
};
</script>

<style lang="scss" scoped>
.container_box {
	h1 {
		@include word(14, #262626);
	}
	/deep/ .el-input {
		margin-top: 12px;
		width: 100%;
		/deep/.el-input__inner {
			height: 35px;
			line-height: 35px;
		}
		.el-select__caret {
			line-height: 35px;
		}
		.el-input__icon {
			line-height: 35px;
		}
	}
}
</style>