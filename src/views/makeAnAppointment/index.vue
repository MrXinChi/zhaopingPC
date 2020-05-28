<template>
	<div>
		<vContent />
		<div class="content">
			<div class="content_left">
				<v-notice title="预约咨询"></v-notice>
				<div class="content_left_nav">
					<span v-for="(item,index) in OrderTitle" :key="index" :class="{'active':index==idx}">{{item.title}}</span>
				</div>
			</div>
			<div class="content_right">
				<div class="content_right_top" v-for="(item,i) in listArray" :key="i">
					<img :src="item.image_id_src+'!100x100'"/>
					<div class="content_right_top_span">
							<label>{{item.name}}</label>
							<p>职业定位：{{item.zhiwu}}</p>
							<p>已预约数：{{item.bespnum}}人</p>
					</div>
					<div class="btn_right"><button @click="ToDetail(item.id)">预约</button></div>
				</div>
				<div class="pages flex flex_x_center">
					<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vContent from './../../components/vContent'
export default {
	data() {
		return {
			OrderTitle: [
				{ title: '预约咨询' }
			],
			idx: 0,
			listArray: [],
			page: '',
			reversedMessage: ''
		}
	},
	methods: {
		ToDetail(id) {
			this.$router.push(`/makeAnAppointment/details/${id}`)
		},
		async jobfairGetlist(index) {
			let Culum = await this.service.makeAnAppointment.getlist({
				page: index, //页码
				size: '8' //每页显示
			})
			this.page = Culum.data.page
			this.listArray = Culum.data.list
		},
		handleCurrentChange(index) {
			this.init(index)
		},
		async init(index) {
			let Culum = await this.service.makeAnAppointment.getlist({
				page: index, //页码
				size: 8 //每页显示
			})
			console.log(Culum)
			this.reversedMessage = Culum.data.allpage
			this.page = Culum.data.page
			this.listArray = Culum.data.list
		}
	},
	components: {
		vContent
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10
		}
	},
	created() {
		this.init()
	}
}
</script>
<style lang="scss" scoped>
.content {
	@include flex(row, space-between);
	width: 1180px;
	margin: 0 auto;
	.content_left {
		width: 280px;
		.content_left_nav {
			@include flex(column, flex-start, center);
			width: 280px;
			font-size: 16px;
			color: rgba(38, 38, 38, 1);
			background-color: #ffffff;
			span {
				@include flex(column, center, center);
				width: 240px;
				height: 56px;
				margin: 20px 0;
			}
		}
	}
	.content_right {
		width: 880px;
		height: 840px;;
		display: flex;
		flex-direction: column;
		.content_right_top {
			@include flex(row,space-between,center);
			height: 128px;
			// display: flex;
			// flex-direction: row;
			// align-items: center;
			background: rgba(255, 255, 255, 1);
			margin-bottom: 20px;
			padding:0 20px;
			img {
				width: 88px;
				height: 88px;
			}
			.btn_right{
				width: 76px;
			}
			button {
				display: none;
				width: 76px;
				height: 32px;
				background: rgba(82, 134, 255, 1);
				border-radius: 4px;
				color: #ffffff;
				font-size: 14px;
				cursor: pointer;
			}
			.content_right_top_span {
				width: 540px;
				position: relative;
				left: -48px;
				label{
					font-size:18px;
					font-family:MicrosoftYaHeiUI-Bold;
					line-height:23px;
					color:rgba(38,38,38,1);
					opacity:1;
				}
				p { 
					margin-top:12px;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					color:rgba(38,38,38,1);
					opacity:1;
				}
			}
		}
	}
	.content_right_top:hover{
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 16px 0px rgba(0,0,0,0.08);
		border-radius:4px;
		button{
			display: inline-block;
		}
	}
}

/* 变化样式 */
.active {
	background-color: #eff7fe;
	color: #5286ff;
}
</style>