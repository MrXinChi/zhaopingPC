<template>
	<div v-if="frameShow" class="frame flex_center">
		<div class="inside">
			<div class="inside-header flex flex_y_center">
				<v-icon icon-class="icon-wx" class-name="icon-wx"></v-icon>
				<div>微信分享</div>
				<div class="flex_1 flex flex_y_center flex_x_right">
					<div @click="Close"><v-icon  icon-class="icon-cuo" class-name="icon-cuo"></v-icon></div>
				</div>
			</div>
			<div class="inside-code">
				<div class="flex flex_x_center code"><img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1988308498,3722253542&fm=26&gp=0.jpg" alt="" /></div>
				<div class="flex flex_x_center sys">微信扫一扫，分享给更多人</div>
				<div class="flex flex_x_center">
					<div @click="Close" class="flex flex_center okl">知道了</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			frameShow: false
		};
	},
	methods:{
		Close(){
			this.frameShow  = false
			document.querySelector('html').style.overflow = "scroll"
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.frame {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 99;
	.inside {
		width: 468px;
		height: 324px;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		.inside-header {
			height: 56px;
			width: 100%;
			padding: 0 24px;
			box-sizing: border-box;
			border-bottom: 1px solid #dedede;
			.icon-wx {
				width: 24px;
				height: 20px;
			}
			div {
				color: #333333;
				font-size: 18px;
				margin-left: 15px;
			}
			.icon-cuo {
				width: 18px;
				height: 18px;
			}
		}
		.inside-code {
			height: 268px;
			width: 100%;
			padding-top: 25px;
			box-sizing: border-box;
			.code {
				img {
					width: 140px;
					height: 140px;
				}
			}
			.sys {
				font-size: 14px;
				font-family: MicrosoftYaHeiUI;
				color: rgba(51, 51, 51, 1);
				margin-top: 10px;
			}

			.okl {
				width: 90px;
				height: 36px;
				background: rgba(53, 121, 255, 1);
				border-radius: 4px;
				font-size: 14px;
				font-family: MicrosoftYaHeiUI;
				color: rgba(255, 255, 255, 1);
				margin-top: 15px;
			}
		}
	}
}
</style>
