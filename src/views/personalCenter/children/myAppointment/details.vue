<template>
	<div>
		<div class="content_right_top">
			<img :src="item.img" />
			<div class="content_right_top_span">
				<span>王老师</span>
				<span>职业定位：{{item.job}}</span>
				<span>预约时间：{{item.time}}</span>
				<span v-if="(item.state=='待面谈')">预约地点：{{item.address}}</span>
			</div>
		</div>
			<!-- 咨询反馈 -->
			<div class="content_center">
				<div class="center_title">咨询反馈</div>
				<div class="content_item" v-for="(item,index) in data" :key="index">
					<span>{{item.title}}</span>
					<span>{{item.content}}</span>
				</div>
			</div>
			<!-- 问题反馈 -->
			<div class="content_center">
				<div class="center_title">问题反馈</div>
				<div class="topic"></div>
				<div class="descript">
					<div class="descript_title">
						<span>话题选择</span>
					</div>
				<div>
					<span>专业了解类：</span>
					<button>专业转换</button>
					<button>专业去向</button>
				</div>
				<div>
					<span>专业了解类：</span>
					<button>能力探索</button>
					<button>性格探索</button>
				</div>
				<div>
					<span>职业探索类：</span>
					<button>行业探索</button>
					<button>职业探索</button>
					<button>出国留学、公务员、考研方向探索</button>
				</div>
				<div>
					<span>求职技巧类：</span>
					<button>面试辅导</button>
				</div>
			</div>
			<!-- 咨询描述 -->
			<div class="descript">
				<div class="descript_title">
					<span>咨询描述</span>
				</div>
				<div>
					<span>问题描述：</span>
					<button>学生所遇到的问题</button>
				</div>
				<div>
					<span>咨询期待：</span>
					<button>学生希望的面谈内容</button>
				</div>
				<div>
					<span>已有行动：</span>
					<button>学生已经作出的行动</button>
					
				</div>
				<div>
					<span>障碍描述：</span>
					<button>学生的障碍</button>
				</div>
				<div>
					<span>他人意见：</span>
					<button>学生听取的他人意见</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			item: "",
			data: [
				{
					title: "问题解答",
					content:
					"咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问"
				},
				{
					title: "咨询过程",
					content:
					"咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问"
				},
				{
					title: "行动方案",
					content:
					"咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问"
				},
				{
					title: "发展建议",
					content:
					"咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问题咨询情况记录学生学面临的问"
				}
			]
		};
	},
	methods: {
		getItem() {
			this.item = JSON.parse(sessionStorage.getItem("item"));
		}
	},
	mounted() {
		this.getItem();
	}
};
</script>

<style lang="scss" scoped>
.content_right_top {
	width: 880px;
	height: 220px;
	display: flex;
	margin-bottom: 20px;
	flex-direction: row;
	align-items: center;
	background: rgba(255, 255, 255, 1);
	img {
		margin: 0 40px;
		width: 140px;
		height: 140px;
	}
	.content_right_top_span {
		display: flex;
		flex-direction: column;
		width: 300px;
		flex-wrap: wrap;
		span {
			padding-top: 12px;
			font-size: 14px;
			color: rgba(38, 38, 38, 1);
			&:first-child {
				font-size: 18px;
				font-weight: bold;
				color: rgba(38, 38, 38, 1);
			}
		}
	}
}		
// 咨询反馈
.content_center {
	width: 880px;
	background: rgba(255, 255, 255, 1);
	.center_title {
		width: 840px;
		margin: 0 auto;
		font-size: 16px;
		color: #262626;
		font-weight: bold;
		padding-top: 20px;
	}
	.content_item {
		width: 800px;
		margin: 0 auto;
		padding: 20px 0;
		border-bottom: 1px solid #dedede;
		display: flex;
		flex-direction: column;
		span {
			font-size: 14px;
			color: #595959;
			margin-top: 10px;
			line-height: 22px;
			&:first-child {
				font-weight: bold;
				color: #262626;
			}
		}
	}
}
// 问题反馈
.descript {
	width: 800px;
	margin: 0 auto;  
	border-bottom: 1px solid #DEDEDE;
	padding-bottom: 20px;
	margin-bottom: 20px;
	.descript_title span{
		font-size: 16px;
		color: #262626;
		line-height:20px;
	}
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 20px;
		span {
			font-size: 14px;
			color: #262626;
			line-height: 18px;
		}
		button{
			color: #595959;
			background-color:rgba(255, 255, 255, 1);
			cursor: pointer;
			border: none;
			font-size:14px;
			margin-left: 8px;
			line-height:18px;
		}
	}
}
</style>