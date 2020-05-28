<template>
	<div class="title_wrapper">
		<span class="title">{{title}}</span>
		<div class="iconBox" @click="jumpBtn">
			<v-icon v-if="iconShow" icon-class="icon_arrow_double" class-name="icon"></v-icon>
			<v-icon icon-class="icon_arrow_double_active" class-name="icons"></v-icon>
		</div>
	</div>
</template>

<script>
export default {
	name: "vTitleWrapper",
	props: {
		title: String,
		iconShow:{
			type:Boolean,
			default:true
		},
		column:Number,
	},
	data(){
		return {
			column:''
		}
	},
	methods:{
		jumpBtn(){
			switch(this.column){
				case '1':
					this.$router.push("/newsBulletin");
				break;
				case '2':
					this.$router.push("/recruitmentInformation");
				break;
				case '3':
					this.$router.push("/recruitmentInformation");
				break;
				case '4':
					this.$router.push("/newsBulletin/inschool/DetailList_i");
				break;
				case '5':
					// this.$router.push("/");
				break;
			}
		}
	}
};
</script>
<style scoped lang="scss">
.title_wrapper {
  	@include flex(row, flex-start, center);
	width: 100%;
	border-bottom: 1px solid #dedede;
	margin-bottom: 24px;
	span.title { 
		font-size:22px;
		font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
		font-weight:bold;
		color:rgba(38,38,38,1);
		line-height:28px;
		// @include word(22, #262626, bold);
		opacity:1;
		position: relative;
		// padding-bottom: 5px;
		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: -1px;
			z-index: -1;
			width: 100%;
			height: 8px;
			background: linear-gradient( 270deg, rgba(82, 134, 255, 1) 0%, rgba(144, 177, 255, 1) 100% );
			border-radius: 2px;
		}
	}
	.iconBox{
		cursor: pointer;
		.icon {
			margin-left: 12px;
			width: 14px;
			height: 14px;
		}
		.icons {
			display:none;
			margin-left: 12px;
			width: 14px;
			height: 14px;
		}
	}
	.iconBox:hover {
		.icon{
			display:none;
		}
		.icons {
			display:inline-block;
		}
	}
}
</style>
