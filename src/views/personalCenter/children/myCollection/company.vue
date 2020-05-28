<template>
	<div class="container_company">
		<div class="company_list">
			<div class="company_item" v-for="(item,i) in 10" :key="i">
				<img src="@/assets/images/xingzhuang.png" alt="暂无">
				<!-- <img src="http://iph.href.lu/80x80" /> -->
				<div class="itemList">
					<div class="item_right">
						<div class="company_name">
							<h1>亚信科技(中国)有限公司</h1>
							<img src="@/assets/images/tianyancha.png" />
						</div>
						<div class="sign_list">
							<div class="sign_item">民营</div>
							<div class="sign_item">100-199人</div>
							<div class="sign_item">通信、网络设置、运营商、增值服务</div>
						</div>
						<div class="address">
							<v-icon icon-class="icon-address" class-name="icon"></v-icon>
							<span>朝阳区上帝西路6号</span>
							<v-icon icon-class="icon-arrow-right" class-name="icon_arrow"></v-icon>
						</div>
					</div>
					<div class="item_rights">
						<button class="collections" @click="handleCancelCollection(i)">取消收藏</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
.container_company {
	.company_list {
		.company_item {
			@include flex(row);
			margin-top: 20px;
			padding: 20px;
			background-color: #ffffff;
			border-radius: 4px;
			img {
				width: 80px;
				height: 80px;
			}
			.itemList{
				width:760px;
				@include flex(row, space-between);
				.item_right {
					@include flex(column, space-between);
					margin-left: 20px;
					height: 80px;
					.company_name {
						@include flex();
						h1 {
							@include word(16, #262626, bold);
						}
						img {
							margin-left: 8px;
							display: block;
							width: 56px;
							height: 16px;
						}
					}
					.sign_list {
						@include flex();
						.sign_item {
							@include word(14, #595959);
							padding: 0 12px;
							border-right: 1px solid #dedede;
							&:first-child {
								padding-left: 0;
							}
							&:last-child {
								padding-right: 0;
								border-right: none;
							}
						}
					}
					.address {
						@include flex(row, flex-start, center);
						.icon {
							width: 10px;
							height: 12px;
						}
						span {
							margin: 0 6px;
							@include word(14, #999999);
						}
						.icon_arrow {
						width: 6px;
						height: 10px;
						}
					}
				}
				.item_rights{
					.collections {
						display:none;
						@include word(14, #ffffff);
						align-self: flex-end;
						position: relative;  
						top:20px;
						width: 96px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						background-color: #5286ff;
						border-radius: 4px;
						cursor: pointer;
					}
				}
			}
		}
		.company_item:hover{ 
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 16px 0px rgba(0,0,0,0.08);
			border-radius:4px;
			cursor:pointer;
		}
		.company_item:hover .item_rights .collections {
			display: inline-block;
		} 
	}
}
</style>