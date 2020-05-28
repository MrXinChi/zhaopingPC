<template>
	<div class="container_">
		<v-content>
			<div slot="content" class="wrapper">
				<div class="item" v-for="(item, i) in listArray" :key="i" @click="handleToDetail(i)">
					<img :src="item.school_id_logo + '!auto'"/>
					<div class="detail">
						<div class="title" >{{ item.title }}</div>
						<div class="count_list">
							<div class="count_item">{{item.recruit_count}}单位</div>
							<div class="separated"></div>
							<div class="count_item">{{item.job_count}}职位</div>
							<div class="separated"></div>
							<div class="count_item">{{item.enroll_count}}人</div>
						</div>
						<h1>开始时间：<font :class="timesStatus(item.start_time)?'label_time_new':'label_time_old'">{{timestampToTime(item.start_time)}}</font></h1>
						<h1>举办地点：{{ item.field_id_name }}</h1>
					</div>
				</div>
			</div>
		</v-content>
		<div class="pages flex flex_x_center">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="reversedMessage"></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			listArray: [],
			page: '',
			reversedMessage: '',
			timeStatus:false
		}
	},
	methods: {
		handleToDetail(index) {//详情页面
			var id = this.listArray[index].id
			this.$router.push(`/doubleElection/${id}`)
		},
		async jobfairGetlist(index) {
			let Culum = await this.service.doubleElection.jobfairGetlist({
				page: index, //页码
				size: 8 //每页显示
			})
			console.log(Culum)
			this.reversedMessage = Culum.data.allpage * 10
			this.page = Culum.data.page
			this.listArray = Culum.data.list
		},
		handleCurrentChange(index) {
			this.jobfairGetlist(index)
		}
	},
	computed: {
		reversedMessage: function() {
			return this.page * 10
		}
	},
	created() {
		this.jobfairGetlist(1)
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	@include flex(row, flex-start, flex-start, initial, wrap);
	margin-top: 70px;
	.item {
		padding: 10px;
		margin: 0 20px 40px 0;
		width: 265px;
		height: 300px;
		// background-color: #ffffff;
		border-radius: 4px;
		cursor: pointer;
		&:nth-child(4n) {
			margin-right: 0;
		}
		img {
			width: 260px;
			height: 160px;
		}
		.detail {
			padding: 10px;
			.title {
				@include word(16, #333333, bold);
				@include text-overflow(2);
				// min-height: 44px;
				line-height: 22px;
			}
			.count_list {
				@include flex(row);
				// position: relative; 
				// top:10px; 
				margin-top: 10px;
				.count_item {
					@include word(14,rgba(89,89,89,1));
					padding: 0 12px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					opacity:1;

					&:first-child {
						padding-left: 0;
					}
					&:last-child {
						padding-right: 0;
						border-right: none;
					}
				}
				.separated{
				margin-top:4px;
				height: 12px;
				width: 1px;
				background: #dedede;
				}
			}
			h1 {
				@include word(12, #8c8c8c);
				margin-top: 10px;
			
			}
			.label_time_new{
				color:#F64343;
			}
			.label_time_old{
				color:#8c8c8c;
			}
		}
	}
	.item:hover{
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 16px rgba(0,0,0,0.08);
		opacity:1;
		border-radius:4px;
		.detail .count_list .count_item{
			@include word(14,rgba(38,38,38,1));
		}
	}
}
.pages {
  	padding: 30px 0;
}
</style>
