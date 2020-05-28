<template>
	<div class="detail_container">
		<v-content>
			<div slot="content" class="wrapper">
				<div class="header">
					<img :src="detail.images_name + '!100x100'" />
					<div class="header_right">
						<div class="top">{{detail.title}}</div>
						<h2>报名人数：{{detail.enrollnum}}人</h2>
						<h2>举办地点： {{detail.address}}</h2>
						<h2>举办时间： {{timestampToTime(detail.start_time)}}至 {{timestampToTime(detail.end_time)}}</h2>
						<div class="status_wrapper">
							<v-collection :isCollection="isCollection" @click="handleCollection"></v-collection>

							<div v-if="detail.status==1" class="status not_started">{{detail.status_name}}</div>
							<div v-if="detail.status==2" class="status ongoing">{{detail.status_name}}</div>
							<div v-if="detail.status==3" class="status over">{{detail.status_name}}</div>
						</div>
					</div>
				</div>
				<div class="desc">
					<p v-html="detail.remarks"></p>
					<template v-if="bao">  
						<template v-if="detail.status == 1">  
							<button class="enlist qian bgcolor">报名成功</button>  
						</template>  
						<template v-else-if="detail.status == 2">  
							<button class="enlist qian bgcolor" @click="qiandaoBtn">签到</button>  
						</template>  
						<template v-else-if="detail.status == 3">  
							<button class="enlist bgcolor3">已报名</button>  
						</template>  
					</template>  
					<template v-else>  
						<template v-if="detail.status == 3">  
							<button class="enlist bgcolor3">已报名</button>  
						</template>  
						<template v-else-if="detail.check_count >= detail.enrollnum">  
							<button class="enlist bgcolor3">人数已满</button>  
						</template>  
						<template v-else>  
							<button class="enlist active bgcolor baomings" @click="signUpBtn">报名</button>  
						</template>  
					</template> 
				</div>
				<div class="partition"></div>
				<div class="success" v-if="succshop" @click="stopShow">
					<div class="succe_pop" @click.stop>
						<span class="cleas" @click.stop="removeShow">×</span>
						<template v-if="zt==1">
							<h4>报名成功</h4>
							<img src="@/assets/images/code.png" alt="">
							<p>请微信扫描二维码关注公众号</p>
							<p>进入“学生入口 - 我的 - 我的活动</p>
							<p>点击相关活动进行签到等操作</p>
						</template>
						<template v-if="zt==2">
							<h4>签到说明</h4>
							<img src="@/assets/images/code.png" alt="">
							<p>请微信扫描二维码关注公众号</p>
							<p>进入“学生入口 - 我的 - 我的活动</p>
							<p>点击相关活动进行签到等操作</p>
						</template>
					</div>
				</div>
			</div>
		</v-content>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isCollection: false,
			detail:'',
			btnshop:true,
			bao:false,
			zt:0,
			succshop:false
		};
	},
	methods: {
		outsuspensionBtn(){
			console.log("")
		},
		timestampToTime(time){
			var date = new Date(time);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y+M+D+h+m+s;
		},
		async handleCollection() {
			if(!this.isCollection){
				let detailData = await this.service.activity.setCollection({
					id:this.detail.id
				});
				if(detailData.code==0){
					this.isCollection = !this.isCollection;	
					this.$message({
						message: '收藏成功',
						type: 'success',
						center: true
					});
				}
			}else{
				let detailData = await this.service.activity.setCollection({
					id:this.detail.id
				});
				if(detailData.code==0){
					this.isCollection = !this.isCollection;	
					this.$message({
						message: '取消成功',
						type: 'warning',
						center: true
					});
				}
			}

			


		},
		async init(id){  //详情  
			let detailData = await this.service.activity.activityenrollDetail({
				id:id
			});
			this.detail=detailData.data;
			this.isCollection=detailData.data.isCollection;
		},
		async signUpBtn(){    //报名
			if(this.detail.wj_id != ""){
				alert('请填写问卷')
				this.$router.push(`/ouestionnaire/ouestDetail/${this.detail.wj_id}`)
				return
			}
			let params = {
				actid:this.$route.params.id,
				userid:JSON.parse(localStorage.getItem("username")).userinfo.id,
				school_id:JSON.parse(localStorage.getItem("username")).userinfo.school_id,
			}
			let modify = await this.service.activity.modify(params)
			if(modify.code==0){
				this.stopShow = true
				this.zt == 1
				this.bao=true
			}
		},
		async isenroll(id){   //是否报名/签到
			let params = {
				actid:id,
				userid:JSON.parse(localStorage.getItem("username")).userinfo.id,
				school_id:JSON.parse(localStorage.getItem("username")).userinfo.school_id,
			}
			let modify = await this.service.activity.isenroll(params)
			if(modify.code ==0 ){
				if(modify.data.rangetime==0 || modify.data.rangetime==0){
					this.bao = true
				}else{
					this.bao = false
				}
			}else{
				this.bao = false
			}
		},
		qiandaoBtn(){
			this.succshop = true
			this.zt = 2
		},
		stopShow(){
			this.succshop = false
		},
		removeShow(){
			this.succshop = false
		}
	},
	created(){
		this.init(this.$route.params.id);
		this.isenroll(this.$route.params.id)
	}
};
</script>

<style lang="scss" scoped>
.bgcolor3{
	margin-top: 20px;
	// width:90px;
	height:36px;
	background:rgba(222,222,222,1);
	border-radius:4px;
	font-size: 14px;

	outline: none;
	cursor: pointer;
	display: block;
	line-height: 18px;
	padding: 7px 24px;
	color: #8C8C8C;
}
.bgcolor{
	margin-top: 20px;
	width:90px;
	height:32px;
	border-radius:16px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:18px;
}
.qian{
	background:#67C23A;
	color: #fff;
}
.active{
	background:#67C23A;
	color: #fff;
}
.detail_container {
	.wrapper {
		.header {
			@include flex();
			position: relative;
			padding: 20px;
			background-color: #ffffff;
			img {
				width: 184px;
				height: 110px;
			}
			.header_right {
				@include flex(column, space-between, flex-start, 1);
				margin-left: 18px;
				height: 110px;
				.top {
					@include text-overflow(1, 750px);
					@include word(16, #333333, bold);
				}
				h2 {
					@include word(14, #595959);
				}
			}
			.status_wrapper {
				@include flex(row, flex-start, center);
				position: absolute;
				top: 20px;
				right: 20px;
				.status {
					@include word(14, #ffffff, 400, center);
					margin-left: 24px;
					width: 90px;
					height: 30px;
					line-height: 30px;
					border-radius: 30px;
					background-color: #f9f9f9;
					&.not_started {
						background-color: #55dec4;
					}
					&.ongoing {
						background-color: #5286ff;
					}
					&.over {
						@include word(14, #8c8c8c, 400, center);
					}
				}
			}
		}
		.desc {
			height: 840px;
			@include word(14, #333333);
			margin-top: 20px;
			padding: 20px;
			line-height: 22px;
			background-color: #ffffff;
		}
		.success{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left:0;
			background:rgba(0,0,0,0.3);
			.succe_pop{
				width: 382px;
				height: 453px;
				position: fixed;
				top: 50%;
				left: 50%;
				margin-left: -191px;
				margin-top: -226px;
				background: #fff;
				span{
					display: block;
					text-align: right;
					font-size: 25px;
					padding: 10px 15px 0 0;
					font-weight: 800;
				}
				img{
					width: 170px;
					height: 170px;
					display: block;
					padding: 50px 106px;
				}
				h4{
					font-size: 25px;
					font-weight: bold;
					text-align: center;
				}
				p{
					text-align: center;
					font-size: 20px;
					line-height: 30px;
					font-weight: 400;
				}
			}
		}
	}
	.partition{
		height: 20px;
	}
}
</style>