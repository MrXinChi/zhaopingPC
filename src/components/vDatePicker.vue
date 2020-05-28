<template>
    <div class="container_box">
        <h1>{{title}}</h1>
        <div class="block">
            <el-date-picker
				v-model="value1"
				type="monthrange"
				@change="handleChangeDate"
				range-separator="至"
				start-placeholder="开始月份"
				end-placeholder="结束月份">
            </el-date-picker>
        </div>
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
		// value1: [Number, String],
		options: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			value1: '',
		};
	},
	methods:{
		handleChangeDate(e) {
			var timer = []
			this.value1.map((i)=>{timer.push(i.getTime())})
			this.$emit("input", timer);
		}
	}
};
</script>
<style lang="scss" scoped>
.container_box {
    /deep/.el-date-editor {
        margin-top: 12px;
        height: 35px;
        width: 100%;
    }
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