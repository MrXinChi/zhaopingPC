<template>
	<footer>
		<div class="footer_top">
			<div class="w_1200 flex">
				<div class="footer_top_l flex_2">
					<i style="width: 100%;" class="flex_center">
						<v-icon icon-class="icon-logo" class-name="icon"></v-icon>
					</i>
					<p class="flex flex_x_center fs15 c_fff">版权2012-2019</p>
					<p class="flex flex_x_center fs15 c_fff">演示大学就业指导服务中心</p>
				</div>
				<div class="footer_top_c flex_3">
					<p class="fs15 c_fff">联系方式</p>
					<p class="fs15 c_fff">电话：400-919-9767</p>
					<p class="fs15 c_fff">邮箱：service@jiuyebao2015.com</p>
					<p class="fs15 c_fff">地址：北京朝阳区大屯街道北苑路168号中安盛业大厦806室</p>
				</div>
				<div class="footer_top_r flex_2">
					<img src="../assets/images/code.png" />
				</div>
			</div>
		</div>
		<div class="footer_bottom flex_center">
			<div class="w_1200 flex_center fs15 c_fff" >
				建议使用“360安全浏览器（极速模式）、火狐浏览器、谷歌浏览器、IE9以上版本”访问，以获取最佳浏览效果 | 技术支持：就业宝
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style scoped="scoped" lang="scss">
footer {
	width: 100%;
	height: 230px;
	.footer_top {
		width: 100%;
		height: 180px;
		background: #5286ff;
		div {
			height: 100%;
			.footer_top_l {
				height: 100%;
				.icon {
					width: 35px;
					height: 35px;
					margin: 0 auto;
					margin-top: 40px;
				}
				p {
					width: 100%;
					margin-top: 13px;
				}
			}
			.footer_top_c {
				height: 100%;
				padding-top: 20px;
				box-sizing: border-box;
				p {
					margin-top: 15px;
				}
			}
			.footer_top_r {
				height: 100%;
				img {
					margin-top: 40px;
				}
			}
		}
	}
	.footer_bottom {
		width: 100%;
		min-width: 1200px;
		height: 50px;
		background: #2f66e6;
	}
}
</style>